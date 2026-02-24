package com.notes.backend.data.source

import com.notes.backend.codegen.types.*
import com.notes.backend.entity.NoteEntity
import com.notes.backend.entity.NoteRepo
import com.notes.backend.entity.TagEntity
import com.notes.backend.entity.TagRepo
import jakarta.persistence.criteria.Predicate
import org.springframework.beans.factory.annotation.Value
import org.springframework.data.domain.Sort
import org.springframework.data.jpa.domain.Specification
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.util.*

@Service
class NoteSource(
	private val noteRepo: NoteRepo,
	private val tagRepo: TagRepo,
	private val storageService: StorageService,
	@Value("\${app.notes.locked.password}") private val lockedPassword: String,
) {

	fun createNote(): String {
		try {
			val note = noteRepo.save(
				NoteEntity(
					title = "Untitled",
				)
			)
			return note.id.toString()
		} catch (e: Exception) {
			throw e
		}
	}

	fun updateNote(input: UpdateNoteInput): Note {
		try {
			val noteId = UUID.fromString(input.id)
			val entity = noteRepo.findByIdOrNull(noteId)
				?: throw RuntimeException("Note not found")

			input.title?.let { entity.title = it }
			input.content?.let { entity.content = it }
			input.emoji?.let { entity.emoji = it }
			input.bannerUrl?.let { newBannerUrl ->
				val currentBannerUrl = entity.bannerUrl
				if (currentBannerUrl != null
					&& currentBannerUrl != newBannerUrl
					&& currentBannerUrl.contains("/uploads/")
				) {
					storageService.deleteFile(currentBannerUrl)
				}
				entity.bannerUrl = newBannerUrl
			}

			val savedEntity = noteRepo.save(entity)
			return mapToGraphQLType(savedEntity)
		} catch (e: Exception) {
			throw e
		}
	}

	fun pinNote(id: String): Note {
		return try {
			val noteId = UUID.fromString(id)
			val entity = noteRepo.findByIdOrNull(noteId)
				?: throw RuntimeException("Note not found")

			entity.isPinned = !entity.isPinned
			val savedEntity = noteRepo.save(entity)
			mapToGraphQLType(savedEntity)
		} catch (e: Exception) {
			throw e
		}
	}

	fun lockNote(id: String): Note {
		return try {
			val noteId = UUID.fromString(id)
			val entity = noteRepo.findByIdOrNull(noteId)
				?: throw RuntimeException("Note not found")

			entity.isLocked = !entity.isLocked
			val savedEntity = noteRepo.save(entity)
			mapToGraphQLType(savedEntity)
		} catch (e: Exception) {
			throw e
		}
	}

	fun trashNote(id: String): Note {
		return try {
			val noteId = UUID.fromString(id)
			val entity = noteRepo.findByIdOrNull(noteId)
				?: throw RuntimeException("Note not found")

			entity.isTrashed = !entity.isTrashed
			val savedEntity = noteRepo.save(entity)
			mapToGraphQLType(savedEntity)
		} catch (e: Exception) {
			throw e
		}
	}

	fun deleteBanner(id: String): Note {
		val noteId = UUID.fromString(id)
		val entity = noteRepo.findByIdOrNull(noteId)
			?: throw RuntimeException("Note not found")
		entity.bannerUrl?.let {
			storageService.deleteFile(it)
		}
		entity.bannerUrl = null

		val savedEntity = noteRepo.save(entity)
		return mapToGraphQLType(savedEntity)
	}

	fun deleteNote(id: String): Boolean {
		return try {
			val noteId = UUID.fromString(id)
			noteRepo.findByIdOrNull(noteId)?.let { entity ->
				entity.bannerUrl?.let { url ->
					storageService.deleteFile(url)
				}
			}
			noteRepo.deleteById(noteId)
			true
		} catch (e: Exception) {
			throw e
		}
	}

	fun getNotes(filter: NoteFilter?, sortInput: NoteSortInput?): List<Note> {
		val spec = Specification<NoteEntity> { root, _, cb ->
			val predicates = mutableListOf<Predicate>()
			if (filter != null) {
				filter.isLocked?.let {
					predicates.add(cb.equal(root.get<Boolean>("isLocked"), it))
				}
				filter.isPinned?.let {
					predicates.add(cb.equal(root.get<Boolean>("isPinned"), it))
				}
				filter.isTrashed?.let {
					predicates.add(cb.equal(root.get<Boolean>("isTrashed"), it))
				}
				filter.tagName?.let { tagName ->
					val tagsJoin = root.join<NoteEntity, TagEntity>("tags")
					predicates.add(cb.equal(tagsJoin.get<String>("tagName"), tagName))
				}
			} else {
				predicates.add(cb.isFalse(root.get<Boolean>("isTrashed")))
			}
			cb.and(*predicates.toTypedArray())
		}
		val direction = if (sortInput?.direction == SortDirection.ASC) {
			Sort.Direction.ASC
		} else {
			Sort.Direction.DESC
		}

		val sortProperty = when (sortInput?.field) {
			NoteSortField.TITLE -> "title"
			NoteSortField.CREATED_AT -> "createdAt"
			NoteSortField.UPDATED_AT -> "updatedAt"
			null -> "updatedAt"
		}

		val dynamicSort = Sort.by(direction, sortProperty)
		val finalSort = Sort.by(Sort.Direction.DESC, "isPinned").and(dynamicSort)
		val notes = noteRepo.findAll(spec, finalSort)
		return notes.map { mapToGraphQLType(it) }
	}

	fun getNote(id: String): Note {
		val noteId = UUID.fromString(id)
		val entity = noteRepo.findByIdOrNull(noteId)
			?: throw RuntimeException("Note not found")
		return mapToGraphQLType(entity)
	}

	fun createTag(tagName: String): Tag {
		val formattedTagName = tagName.trim().replace(Regex("\\s+"), "_")
		val existingTags = tagRepo.findByTagNameContainingIgnoreCase(formattedTagName)
		if (existingTags.isNotEmpty()) {
			return Tag(id = existingTags.first().tagName)
		}
		val savedTag = tagRepo.save(TagEntity(formattedTagName))
		return Tag(id = savedTag.tagName)
	}

	fun deleteTag(tagName: String): Boolean {
		val tagEntity = tagRepo.findByTagNameContainingIgnoreCase(tagName).firstOrNull()
			?: throw RuntimeException("Tag not found")
		tagRepo.delete(tagEntity)
		return true
	}

	fun addTagToNote(noteId: String, tagName: String): String {
		val formattedTagName = tagName.trim().replace(Regex("\\s+"), "_")
		val noteEntity = noteRepo.findByIdOrNull(UUID.fromString(noteId))
			?: throw RuntimeException("Note not found")
		val tagEntity = tagRepo.findByTagNameContainingIgnoreCase(formattedTagName).firstOrNull()
			?: tagRepo.save(TagEntity(formattedTagName))
		val isAlreadyTagged = noteEntity.tags.any {
			it.tagName.equals(tagEntity.tagName, ignoreCase = true)
		}
		if (isAlreadyTagged) {
			return "Note is already tagged with '${tagEntity.tagName}'"
		}
		noteEntity.tags.add(tagEntity)
		noteRepo.save(noteEntity)
		return "Success"
	}

	fun removeTagFromNote(noteId: String, tagName: String): String {
		val noteEntity = noteRepo.findByIdOrNull(UUID.fromString(noteId)) ?: throw RuntimeException("Note not found")
		val tagEntity =
			tagRepo.findByTagNameContainingIgnoreCase(tagName).firstOrNull() ?: throw RuntimeException("Tag not found")
		noteEntity.tags.remove(tagEntity)
		noteRepo.save(noteEntity)
		return "Success"
	}

	fun getAllTags(): List<Tag> {
		try {
			return tagRepo.findAll().map { Tag(id = it.tagName) }
		} catch (e: Exception) {
			throw e
		}
	}

	fun accessLockedNotes(lockedPassword: String): List<Note> {
		if (this.lockedPassword != lockedPassword) {
			throw RuntimeException("Incorrect Password")
		}
		val notes = noteRepo.findAllByIsLocked(true)
		return notes.sortedByDescending { it.updatedAt }.map { mapToGraphQLType(it) }
	}

	private fun mapToGraphQLType(entity: NoteEntity): Note {
		return Note(
			id = entity.id.toString(),
			title = entity.title,
			content = entity.content,
			bannerUrl = entity.bannerUrl,
			emoji = entity.emoji,
			tags = entity.tags.map { Tag(id = it.tagName) },
			isLocked = entity.isLocked,
			isPinned = entity.isPinned,
			isTrashed = entity.isTrashed,
			createdAt = entity.createdAt.toString(),
			updatedAt = entity.updatedAt.toString()
		)
	}

}