package com.notes.backend.data.fetcher

import com.netflix.graphql.dgs.DgsComponent
import com.netflix.graphql.dgs.DgsMutation
import com.netflix.graphql.dgs.DgsQuery
import com.netflix.graphql.dgs.InputArgument
import com.notes.backend.codegen.types.Tag
import com.notes.backend.data.source.NoteSource

@DgsComponent
class TagDataFetcher(
	private val noteSource: NoteSource
) {

	@DgsMutation
	fun createTag(@InputArgument tagName: String): Tag =
		noteSource.createTag(tagName = tagName)

	@DgsMutation
	fun deleteTag(@InputArgument tagName: String): Boolean =
		noteSource.deleteTag(tagName = tagName)

	@DgsMutation
	fun addTagToNote(@InputArgument noteId: String, @InputArgument tagName: String): String =
		noteSource.addTagToNote(noteId, tagName)

	@DgsMutation
	fun removeTagFromNote(@InputArgument noteId: String, @InputArgument tagName: String): String =
		noteSource.removeTagFromNote(noteId, tagName)

	@DgsQuery
	fun getAllTags(): List<Tag> =
		noteSource.getAllTags()

}