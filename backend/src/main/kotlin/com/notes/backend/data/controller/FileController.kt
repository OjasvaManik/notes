package com.notes.backend.data.controller

import com.notes.backend.data.source.StorageService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/upload")
class FileController(
	private val storageService: StorageService
) {

	@PostMapping("/{noteId}")
	fun uploadFile(
		@PathVariable noteId: String,
		@RequestParam("file") file: MultipartFile
	): ResponseEntity<Map<String, String>> {
		val fileUrl = storageService.storeBannerForNote(noteId, file)
		return ResponseEntity.ok(mapOf("url" to fileUrl))
	}
	
}