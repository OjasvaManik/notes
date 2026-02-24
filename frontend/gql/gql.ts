/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    query GetAllTags {\n        getAllTags {\n            id\n        }\n    }\n": typeof types.GetAllTagsDocument,
    "\n    query GetNoteHeader($id: String!) {\n        getNote(id: $id) {\n            id\n            title\n            emoji\n        }\n    }\n": typeof types.GetNoteHeaderDocument,
    "\n    query GetNote($id: String!) {\n        getNote(id: $id) {\n            id\n            bannerUrl\n            emoji\n            title\n            content\n            tags {\n                id\n            }\n            isLocked\n            isPinned\n            isTrashed\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.GetNoteDocument,
    "\n    query AccessLockedNotes($password: String!) {\n        accessLockedNotes(lockedPassword: $password) {\n            id\n            title\n            emoji\n            isLocked\n        }\n    }\n": typeof types.AccessLockedNotesDocument,
    "\n    mutation UnlockNoteFromDialog($id: ID!) {\n        lockNote(id: $id) {\n            id\n            isLocked\n        }\n    }\n": typeof types.UnlockNoteFromDialogDocument,
    "\n    query GetAllTagsForDropdown {\n        getAllTags {\n            id\n        }\n    }\n": typeof types.GetAllTagsForDropdownDocument,
    "\n    mutation AddTagToNote($noteId: ID!, $tagName: String!) {\n        addTagToNote(noteId: $noteId, tagName: $tagName)\n    }\n": typeof types.AddTagToNoteDocument,
    "\n    mutation CreateNote {\n        createNote\n    }\n": typeof types.CreateNoteDocument,
    "\n    mutation UpdateNoteContent($input: UpdateNoteInput!) {\n        updateNote(input: $input) {\n            id\n            content\n        }\n    }\n": typeof types.UpdateNoteContentDocument,
    "\n    mutation UpdateBannerUrl($input: UpdateNoteInput!) {\n        updateNote(input: $input) {\n            id\n            bannerUrl\n        }\n    }\n": typeof types.UpdateBannerUrlDocument,
    "\n    mutation PinNote($id: ID!) {\n        pinNote(id: $id) {\n            id\n            isPinned\n        }\n    }\n": typeof types.PinNoteDocument,
    "\n    mutation LockNote($id: ID!) {\n        lockNote(id: $id) {\n            id\n            isLocked\n        }\n    }\n": typeof types.LockNoteDocument,
    "\n    mutation TrashNote($id: ID!) {\n        trashNote(id: $id) {\n            id\n            isTrashed\n        }\n    }\n": typeof types.TrashNoteDocument,
    "\n    mutation UpdateNoteEmoji($input: UpdateNoteInput!) {\n        updateNote(input: $input) {\n            id\n            emoji\n        }\n    }\n": typeof types.UpdateNoteEmojiDocument,
    "\n    mutation PinNotePage($id: ID!) {\n        pinNote(id: $id) {\n            id\n            isPinned\n        }\n    }\n": typeof types.PinNotePageDocument,
    "\n    mutation LockNotePage($id: ID!) {\n        lockNote(id: $id) {\n            id\n            isLocked\n        }\n    }\n": typeof types.LockNotePageDocument,
    "\n    mutation TrashNotePage($id: ID!) {\n        trashNote(id: $id) {\n            id\n            isTrashed\n        }\n    }\n": typeof types.TrashNotePageDocument,
    "\n    query GetNotes($input: NoteFilter, $sort: NoteSortInput) {\n        getNotes(input: $input, sort: $sort) {\n            id\n            title\n            emoji\n            bannerUrl\n            isPinned\n            isLocked\n            isTrashed\n            updatedAt\n            tags {\n                id\n            }\n        }\n    }\n": typeof types.GetNotesDocument,
    "\n    mutation DeleteBanner($id: ID!) {\n        deleteBanner(id: $id) {\n            id\n            bannerUrl\n        }\n    }\n": typeof types.DeleteBannerDocument,
    "\n    mutation RemoveTagFromNote($noteId: ID!, $tagName: String!) {\n        removeTagFromNote(noteId: $noteId, tagName: $tagName)\n    }\n": typeof types.RemoveTagFromNoteDocument,
    "\n    mutation UpdateNoteTitle($input: UpdateNoteInput!) {\n        updateNote(input: $input) {\n            id\n            title\n        }\n    }\n": typeof types.UpdateNoteTitleDocument,
    "\n    query GetNotesForSearch($input: NoteFilter) {\n        getNotes(input: $input) {\n            id\n            title\n            emoji\n        }\n    }\n": typeof types.GetNotesForSearchDocument,
    "\n    mutation CreateTag($tagName: String) {\n        createTag(tagName: $tagName) {\n            id\n        }\n    }\n": typeof types.CreateTagDocument,
    "\n    mutation DeleteTag($tagName: String) {\n        deleteTag(tagName: $tagName)\n    }\n": typeof types.DeleteTagDocument,
    "\n    query GetTrashedNotes {\n        getNotes(input: { isTrashed: true }) {\n            id\n            title\n            isTrashed\n        }\n    }\n": typeof types.GetTrashedNotesDocument,
    "\n    mutation RestoreNote($id: ID!) {\n        trashNote(id: $id) {\n            id\n            isTrashed\n        }\n    }\n": typeof types.RestoreNoteDocument,
    "\n    mutation DeleteNotePermanently($id: ID!) {\n        deleteNote(id: $id)\n    }\n": typeof types.DeleteNotePermanentlyDocument,
};
const documents: Documents = {
    "\n    query GetAllTags {\n        getAllTags {\n            id\n        }\n    }\n": types.GetAllTagsDocument,
    "\n    query GetNoteHeader($id: String!) {\n        getNote(id: $id) {\n            id\n            title\n            emoji\n        }\n    }\n": types.GetNoteHeaderDocument,
    "\n    query GetNote($id: String!) {\n        getNote(id: $id) {\n            id\n            bannerUrl\n            emoji\n            title\n            content\n            tags {\n                id\n            }\n            isLocked\n            isPinned\n            isTrashed\n            createdAt\n            updatedAt\n        }\n    }\n": types.GetNoteDocument,
    "\n    query AccessLockedNotes($password: String!) {\n        accessLockedNotes(lockedPassword: $password) {\n            id\n            title\n            emoji\n            isLocked\n        }\n    }\n": types.AccessLockedNotesDocument,
    "\n    mutation UnlockNoteFromDialog($id: ID!) {\n        lockNote(id: $id) {\n            id\n            isLocked\n        }\n    }\n": types.UnlockNoteFromDialogDocument,
    "\n    query GetAllTagsForDropdown {\n        getAllTags {\n            id\n        }\n    }\n": types.GetAllTagsForDropdownDocument,
    "\n    mutation AddTagToNote($noteId: ID!, $tagName: String!) {\n        addTagToNote(noteId: $noteId, tagName: $tagName)\n    }\n": types.AddTagToNoteDocument,
    "\n    mutation CreateNote {\n        createNote\n    }\n": types.CreateNoteDocument,
    "\n    mutation UpdateNoteContent($input: UpdateNoteInput!) {\n        updateNote(input: $input) {\n            id\n            content\n        }\n    }\n": types.UpdateNoteContentDocument,
    "\n    mutation UpdateBannerUrl($input: UpdateNoteInput!) {\n        updateNote(input: $input) {\n            id\n            bannerUrl\n        }\n    }\n": types.UpdateBannerUrlDocument,
    "\n    mutation PinNote($id: ID!) {\n        pinNote(id: $id) {\n            id\n            isPinned\n        }\n    }\n": types.PinNoteDocument,
    "\n    mutation LockNote($id: ID!) {\n        lockNote(id: $id) {\n            id\n            isLocked\n        }\n    }\n": types.LockNoteDocument,
    "\n    mutation TrashNote($id: ID!) {\n        trashNote(id: $id) {\n            id\n            isTrashed\n        }\n    }\n": types.TrashNoteDocument,
    "\n    mutation UpdateNoteEmoji($input: UpdateNoteInput!) {\n        updateNote(input: $input) {\n            id\n            emoji\n        }\n    }\n": types.UpdateNoteEmojiDocument,
    "\n    mutation PinNotePage($id: ID!) {\n        pinNote(id: $id) {\n            id\n            isPinned\n        }\n    }\n": types.PinNotePageDocument,
    "\n    mutation LockNotePage($id: ID!) {\n        lockNote(id: $id) {\n            id\n            isLocked\n        }\n    }\n": types.LockNotePageDocument,
    "\n    mutation TrashNotePage($id: ID!) {\n        trashNote(id: $id) {\n            id\n            isTrashed\n        }\n    }\n": types.TrashNotePageDocument,
    "\n    query GetNotes($input: NoteFilter, $sort: NoteSortInput) {\n        getNotes(input: $input, sort: $sort) {\n            id\n            title\n            emoji\n            bannerUrl\n            isPinned\n            isLocked\n            isTrashed\n            updatedAt\n            tags {\n                id\n            }\n        }\n    }\n": types.GetNotesDocument,
    "\n    mutation DeleteBanner($id: ID!) {\n        deleteBanner(id: $id) {\n            id\n            bannerUrl\n        }\n    }\n": types.DeleteBannerDocument,
    "\n    mutation RemoveTagFromNote($noteId: ID!, $tagName: String!) {\n        removeTagFromNote(noteId: $noteId, tagName: $tagName)\n    }\n": types.RemoveTagFromNoteDocument,
    "\n    mutation UpdateNoteTitle($input: UpdateNoteInput!) {\n        updateNote(input: $input) {\n            id\n            title\n        }\n    }\n": types.UpdateNoteTitleDocument,
    "\n    query GetNotesForSearch($input: NoteFilter) {\n        getNotes(input: $input) {\n            id\n            title\n            emoji\n        }\n    }\n": types.GetNotesForSearchDocument,
    "\n    mutation CreateTag($tagName: String) {\n        createTag(tagName: $tagName) {\n            id\n        }\n    }\n": types.CreateTagDocument,
    "\n    mutation DeleteTag($tagName: String) {\n        deleteTag(tagName: $tagName)\n    }\n": types.DeleteTagDocument,
    "\n    query GetTrashedNotes {\n        getNotes(input: { isTrashed: true }) {\n            id\n            title\n            isTrashed\n        }\n    }\n": types.GetTrashedNotesDocument,
    "\n    mutation RestoreNote($id: ID!) {\n        trashNote(id: $id) {\n            id\n            isTrashed\n        }\n    }\n": types.RestoreNoteDocument,
    "\n    mutation DeleteNotePermanently($id: ID!) {\n        deleteNote(id: $id)\n    }\n": types.DeleteNotePermanentlyDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetAllTags {\n        getAllTags {\n            id\n        }\n    }\n"): (typeof documents)["\n    query GetAllTags {\n        getAllTags {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetNoteHeader($id: String!) {\n        getNote(id: $id) {\n            id\n            title\n            emoji\n        }\n    }\n"): (typeof documents)["\n    query GetNoteHeader($id: String!) {\n        getNote(id: $id) {\n            id\n            title\n            emoji\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetNote($id: String!) {\n        getNote(id: $id) {\n            id\n            bannerUrl\n            emoji\n            title\n            content\n            tags {\n                id\n            }\n            isLocked\n            isPinned\n            isTrashed\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query GetNote($id: String!) {\n        getNote(id: $id) {\n            id\n            bannerUrl\n            emoji\n            title\n            content\n            tags {\n                id\n            }\n            isLocked\n            isPinned\n            isTrashed\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query AccessLockedNotes($password: String!) {\n        accessLockedNotes(lockedPassword: $password) {\n            id\n            title\n            emoji\n            isLocked\n        }\n    }\n"): (typeof documents)["\n    query AccessLockedNotes($password: String!) {\n        accessLockedNotes(lockedPassword: $password) {\n            id\n            title\n            emoji\n            isLocked\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UnlockNoteFromDialog($id: ID!) {\n        lockNote(id: $id) {\n            id\n            isLocked\n        }\n    }\n"): (typeof documents)["\n    mutation UnlockNoteFromDialog($id: ID!) {\n        lockNote(id: $id) {\n            id\n            isLocked\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetAllTagsForDropdown {\n        getAllTags {\n            id\n        }\n    }\n"): (typeof documents)["\n    query GetAllTagsForDropdown {\n        getAllTags {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddTagToNote($noteId: ID!, $tagName: String!) {\n        addTagToNote(noteId: $noteId, tagName: $tagName)\n    }\n"): (typeof documents)["\n    mutation AddTagToNote($noteId: ID!, $tagName: String!) {\n        addTagToNote(noteId: $noteId, tagName: $tagName)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateNote {\n        createNote\n    }\n"): (typeof documents)["\n    mutation CreateNote {\n        createNote\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateNoteContent($input: UpdateNoteInput!) {\n        updateNote(input: $input) {\n            id\n            content\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateNoteContent($input: UpdateNoteInput!) {\n        updateNote(input: $input) {\n            id\n            content\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateBannerUrl($input: UpdateNoteInput!) {\n        updateNote(input: $input) {\n            id\n            bannerUrl\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateBannerUrl($input: UpdateNoteInput!) {\n        updateNote(input: $input) {\n            id\n            bannerUrl\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation PinNote($id: ID!) {\n        pinNote(id: $id) {\n            id\n            isPinned\n        }\n    }\n"): (typeof documents)["\n    mutation PinNote($id: ID!) {\n        pinNote(id: $id) {\n            id\n            isPinned\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation LockNote($id: ID!) {\n        lockNote(id: $id) {\n            id\n            isLocked\n        }\n    }\n"): (typeof documents)["\n    mutation LockNote($id: ID!) {\n        lockNote(id: $id) {\n            id\n            isLocked\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation TrashNote($id: ID!) {\n        trashNote(id: $id) {\n            id\n            isTrashed\n        }\n    }\n"): (typeof documents)["\n    mutation TrashNote($id: ID!) {\n        trashNote(id: $id) {\n            id\n            isTrashed\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateNoteEmoji($input: UpdateNoteInput!) {\n        updateNote(input: $input) {\n            id\n            emoji\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateNoteEmoji($input: UpdateNoteInput!) {\n        updateNote(input: $input) {\n            id\n            emoji\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation PinNotePage($id: ID!) {\n        pinNote(id: $id) {\n            id\n            isPinned\n        }\n    }\n"): (typeof documents)["\n    mutation PinNotePage($id: ID!) {\n        pinNote(id: $id) {\n            id\n            isPinned\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation LockNotePage($id: ID!) {\n        lockNote(id: $id) {\n            id\n            isLocked\n        }\n    }\n"): (typeof documents)["\n    mutation LockNotePage($id: ID!) {\n        lockNote(id: $id) {\n            id\n            isLocked\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation TrashNotePage($id: ID!) {\n        trashNote(id: $id) {\n            id\n            isTrashed\n        }\n    }\n"): (typeof documents)["\n    mutation TrashNotePage($id: ID!) {\n        trashNote(id: $id) {\n            id\n            isTrashed\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetNotes($input: NoteFilter, $sort: NoteSortInput) {\n        getNotes(input: $input, sort: $sort) {\n            id\n            title\n            emoji\n            bannerUrl\n            isPinned\n            isLocked\n            isTrashed\n            updatedAt\n            tags {\n                id\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetNotes($input: NoteFilter, $sort: NoteSortInput) {\n        getNotes(input: $input, sort: $sort) {\n            id\n            title\n            emoji\n            bannerUrl\n            isPinned\n            isLocked\n            isTrashed\n            updatedAt\n            tags {\n                id\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteBanner($id: ID!) {\n        deleteBanner(id: $id) {\n            id\n            bannerUrl\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteBanner($id: ID!) {\n        deleteBanner(id: $id) {\n            id\n            bannerUrl\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RemoveTagFromNote($noteId: ID!, $tagName: String!) {\n        removeTagFromNote(noteId: $noteId, tagName: $tagName)\n    }\n"): (typeof documents)["\n    mutation RemoveTagFromNote($noteId: ID!, $tagName: String!) {\n        removeTagFromNote(noteId: $noteId, tagName: $tagName)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateNoteTitle($input: UpdateNoteInput!) {\n        updateNote(input: $input) {\n            id\n            title\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateNoteTitle($input: UpdateNoteInput!) {\n        updateNote(input: $input) {\n            id\n            title\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetNotesForSearch($input: NoteFilter) {\n        getNotes(input: $input) {\n            id\n            title\n            emoji\n        }\n    }\n"): (typeof documents)["\n    query GetNotesForSearch($input: NoteFilter) {\n        getNotes(input: $input) {\n            id\n            title\n            emoji\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateTag($tagName: String) {\n        createTag(tagName: $tagName) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation CreateTag($tagName: String) {\n        createTag(tagName: $tagName) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteTag($tagName: String) {\n        deleteTag(tagName: $tagName)\n    }\n"): (typeof documents)["\n    mutation DeleteTag($tagName: String) {\n        deleteTag(tagName: $tagName)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetTrashedNotes {\n        getNotes(input: { isTrashed: true }) {\n            id\n            title\n            isTrashed\n        }\n    }\n"): (typeof documents)["\n    query GetTrashedNotes {\n        getNotes(input: { isTrashed: true }) {\n            id\n            title\n            isTrashed\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RestoreNote($id: ID!) {\n        trashNote(id: $id) {\n            id\n            isTrashed\n        }\n    }\n"): (typeof documents)["\n    mutation RestoreNote($id: ID!) {\n        trashNote(id: $id) {\n            id\n            isTrashed\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteNotePermanently($id: ID!) {\n        deleteNote(id: $id)\n    }\n"): (typeof documents)["\n    mutation DeleteNotePermanently($id: ID!) {\n        deleteNote(id: $id)\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;