"use client"

import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { graphql } from "@/gql"
import { useMutation } from "@apollo/client/react"
import { useRouter } from "next/navigation"
import React from "react";

const UPDATE_NOTE_TITLE = graphql( `
    mutation UpdateNoteTitle($input: UpdateNoteInput!) {
        updateNote(input: $input) {
            id
            title
        }
    }
` )

type Props = {
  title: string
  noteId: string
}

const TitleBar = ( { title, noteId }: Props ) => {
  const router = useRouter()
  const [ updateNote, { loading } ] = useMutation( UPDATE_NOTE_TITLE )

  const handleUpdate = async ( e: React.FocusEvent<HTMLInputElement> ) => {
    const newTitle = e.target.value
    if ( newTitle === title ) return

    if ( newTitle.trim() === "" ) {
      toast.error( "Title cannot be empty" )
      e.target.value = title // Reset the input to the original title
      return
    }

    try {
      await updateNote( {
        variables: {
          input: {
            id: noteId,
            title: newTitle
          }
        }
      } )
      toast.success( "Title updated" )

      // Refresh the route so the server-rendered NavBar picks up the new title
      router.refresh()
    } catch ( error ) {
      console.error( error )
      toast.error( "Failed to update title" )
    }
  }

  const handleKeyDown = ( e: React.KeyboardEvent<HTMLInputElement> ) => {
    if ( e.key === "Enter" ) {
      e.currentTarget.blur()
    }
  }

  return (
    <Input
      defaultValue={ title }
      type="text"
      disabled={ loading }
      onBlur={ handleUpdate }
      onKeyDown={ handleKeyDown }
      className="h-14 max-w-2xl border-0 bg-card text-5xl font-bold shadow-md focus-visible:border-none focus-visible:ring-0 md:text-5xl"
    />
  )
}

export default TitleBar