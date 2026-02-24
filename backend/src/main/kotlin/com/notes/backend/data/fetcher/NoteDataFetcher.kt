package com.notes.backend.data.fetcher

import com.netflix.graphql.dgs.DgsComponent
import com.netflix.graphql.dgs.DgsMutation
import com.netflix.graphql.dgs.DgsQuery
import com.netflix.graphql.dgs.InputArgument
import com.notes.backend.codegen.types.Note
import com.notes.backend.codegen.types.NoteFilter
import com.notes.backend.codegen.types.NoteSortInput
import com.notes.backend.codegen.types.UpdateNoteInput
import com.notes.backend.data.source.NoteSource

@DgsComponent
class NoteDataFetcher(
	private val noteSource: NoteSource
) {

	@DgsMutation
	fun createNote(): String = noteSource.createNote()

	@DgsMutation
	fun updateNote(@InputArgument input: UpdateNoteInput): Note = noteSource.updateNote(input = input)

	@DgsMutation
	fun lockNote(id: String): Note = noteSource.lockNote(id = id)

	@DgsMutation
	fun pinNote(id: String): Note = noteSource.pinNote(id = id)

	@DgsMutation
	fun trashNote(id: String): Note = noteSource.trashNote(id = id)

	@DgsMutation
	fun deleteBanner(id: String): Note = noteSource.deleteBanner(id = id)

	@DgsMutation
	fun deleteNote(id: String): Boolean = noteSource.deleteNote(id = id)

	@DgsQuery
	fun getNotes(@InputArgument input: NoteFilter?, @InputArgument sort: NoteSortInput?): List<Note> =
		noteSource.getNotes(input, sort)

	@DgsQuery
	fun getNote(id: String): Note = noteSource.getNote(id)

	@DgsQuery
	fun accessLockedNotes(lockedPassword: String): List<Note> =
		noteSource.accessLockedNotes(lockedPassword = lockedPassword)

}