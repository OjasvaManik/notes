import NavBar from "@/components/nav-bar";
import React from "react";
import { graphql } from "@/gql";
import { query } from "@/providers/apollo-server";

// Define a leaner query just for the layout requirements
const GET_NOTE_HEADER = graphql( `
    query GetNoteHeader($id: String!) {
        getNote(id: $id) {
            id
            title
            emoji
        }
    }
` )

export default async function NoteLayout( {
                                            children,
                                            params,
                                          }: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
} ) {
  const { id } = await params;

  // Execute server-side Apollo query
  const { data } = await query( {
    query: GET_NOTE_HEADER,
    variables: { id }
  } );

  const title = data?.getNote?.title || "Untitled";
  const emoji = data?.getNote?.emoji || "";

  return (
    <>
      <NavBar title={ title } emoji={ emoji }/>
      { children }
    </>
  );
}