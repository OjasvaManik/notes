import React from 'react'
import { notFound } from "next/navigation";
import { graphql } from "@/gql";
import { query } from "@/providers/apollo-server";
import { Editor } from "@/components/notes/dynamic-editor";
import NoteEmojiPicker from "@/components/notes/note-emoji-picker";
import TitleBar from "@/components/notes/title-bar";
import Banner from "@/components/notes/banner";
import AddTagsToNote from "@/components/notes/add-tags-to-note";
import NoteTagsList from "@/components/notes/note-tags-list";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const GET_NOTE = graphql( `
    query GetNote($id: String!) {
        getNote(id: $id) {
            id
            bannerUrl
            emoji
            title
            content
            tags {
                id
            }
            isLocked
            isPinned
            isTrashed
            createdAt
            updatedAt
        }
    }
` )

const NotePage = async ( { params }: Props ) => {
  const { id } = await params;

  const { data, error } = await query( {
    query: GET_NOTE,
    variables: { id }
  } );

  const note = data?.getNote;

  if ( !note || error ) {
    notFound();
  }

  const parsedContent = note.content
    ? JSON.parse( note.content )
    : undefined

  const validTags = ( note.tags?.filter( tag => tag !== null ) || [] ) as { id: string }[];

  return (
    <div>
      <Banner
        bannerUrl={ note.bannerUrl }
        noteId={ id }
        isLocked={ note.isLocked ?? false }
        isPinned={ note.isPinned ?? false }
      />
      <div className={ 'flex justify-start items-center px-3 py-2 space-x-2 w-fit' }>
        <NoteEmojiPicker noteId={ id } currentEmoji={ note.emoji }/>
        <TitleBar title={ note.title || "Untitled" } noteId={ id }/>
        <div className={ 'hidden lg:flex flex-col justify-center' }>
          <AddTagsToNote id={ note.id } currentTags={ validTags }/>
          <NoteTagsList tags={ validTags } noteId={ note.id }/>
        </div>
      </div>
      <div className={ 'lg:hidden' }>
        <AddTagsToNote id={ note.id } currentTags={ validTags }/>
        <NoteTagsList tags={ validTags } noteId={ note.id }/>
      </div>
      <Editor noteId={ note.id } initialContent={ parsedContent }/>
    </div>
  );
};

export default NotePage;