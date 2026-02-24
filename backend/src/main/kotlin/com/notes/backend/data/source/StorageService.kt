package com.notes.backend.data.source

import com.notes.backend.entity.NoteRepo
import jakarta.annotation.PostConstruct
import org.springframework.beans.factory.annotation.Value
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.util.*

@Service
class StorageService(
	@Value("\${app.file.storage.path}") private val storagePath: String,
	private val noteRepo: NoteRepo
) {
	private lateinit var rootLocation: Path
	private lateinit var tempLocation: Path

	@PostConstruct
	fun init() {
		rootLocation = Paths.get("$storagePath/images")
		tempLocation = Paths.get("$storagePath/temp")

		if (!Files.exists(rootLocation)) Files.createDirectories(rootLocation)
		if (!Files.exists(tempLocation)) Files.createDirectories(tempLocation)
	}

	private fun saveFileToDisk(file: MultipartFile): String {
		if (file.isEmpty) throw RuntimeException("Failed to store empty file.")

		val contentType = file.contentType ?: ""
		val cleanFilename = (file.originalFilename ?: "unknown").replace(Regex("[^a-zA-Z0-9.\\-]"), "_")
		val uniquePrefix = UUID.randomUUID().toString()

		if (contentType.startsWith("video/")) {
			val baseName = cleanFilename.substringBeforeLast(".")
			val gifFilename = "${uniquePrefix}_${baseName}.gif"

			val tempVideoFile =
				tempLocation.resolve("${uniquePrefix}_$cleanFilename").normalize().toAbsolutePath().toFile()
			val tempPaletteFile =
				tempLocation.resolve("${uniquePrefix}_palette.png").normalize().toAbsolutePath().toFile()
			val destinationGifFile = rootLocation.resolve(gifFilename).normalize().toAbsolutePath().toFile()

			if (!destinationGifFile.parentFile.absolutePath.equals(rootLocation.toAbsolutePath().toString())) {
				throw RuntimeException("Cannot store file outside current directory.")
			}

			try {
				file.transferTo(tempVideoFile)
				generateGif(tempVideoFile, destinationGifFile, tempPaletteFile)
				return "/uploads/images/$gifFilename"

			} finally {
				if (tempVideoFile.exists()) tempVideoFile.delete()
				if (tempPaletteFile.exists()) tempPaletteFile.delete()
			}
		}

		val uniqueFilename = "${uniquePrefix}_$cleanFilename"
		val destinationFile = rootLocation.resolve(Paths.get(uniqueFilename)).normalize().toAbsolutePath()

		if (!destinationFile.parent.equals(rootLocation.toAbsolutePath())) {
			throw RuntimeException("Cannot store file outside current directory.")
		}

		file.inputStream.use { inputStream ->
			Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING)
		}

		return "/uploads/images/$uniqueFilename"
	}

	fun storeBannerForNote(noteId: String, file: MultipartFile): String {
		val noteEntity = noteRepo.findByIdOrNull(UUID.fromString(noteId))
			?: throw RuntimeException("Note not found")
		val fileUrl = saveFileToDisk(file)
		noteEntity.bannerUrl = fileUrl
		noteRepo.save(noteEntity)

		return fileUrl
	}

	fun deleteFile(fileUrl: String) {
		try {
			val filename = fileUrl.substringAfterLast("/uploads/images/")
			if (filename.isNotBlank() && filename != fileUrl) {
				val fileToDelete = rootLocation.resolve(Paths.get(filename)).normalize().toAbsolutePath()
				if (fileToDelete.parent.equals(rootLocation.toAbsolutePath())) {
					Files.deleteIfExists(fileToDelete)
				}
			}
		} catch (e: Exception) {
			println("Warning: Failed to delete physical file: ${e.message}")
		}
	}

	private fun generateGif(input: File, output: File, palette: File) {
		val paletteCmd = listOf(
			"ffmpeg", "-y",
			"-i", input.absolutePath,
			"-vf", "fps=12,scale=480:-1:flags=lanczos,palettegen",
			palette.absolutePath
		)

		val gifCmd = listOf(
			"ffmpeg", "-y",
			"-i", input.absolutePath,
			"-i", palette.absolutePath,
			"-filter_complex",
			"fps=12,scale=480:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer",
			output.absolutePath
		)

		runCommand(paletteCmd)
		runCommand(gifCmd)
	}

	private fun runCommand(command: List<String>) {
		val process = ProcessBuilder(command)
			.redirectErrorStream(true)
			.start()

		val exitCode = process.waitFor()

		if (exitCode != 0) {
			val errorOutput = process.inputStream.bufferedReader().readText()
			throw RuntimeException("FFmpeg failed with exit code $exitCode. Output: $errorOutput")
		}
	}
}