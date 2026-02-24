'use client'

import React, { useCallback } from "react"
import "@blocknote/core/fonts/inter.css"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/shadcn"
import "@blocknote/shadcn/style.css"
import { PartialBlock } from "@blocknote/core"
import { useTheme } from "next-themes"
import { graphql } from "@/gql"
import { useMutation } from "@apollo/client/react"

const UPDATE_NOTE_CONTENT = graphql( `
    mutation UpdateNoteContent($input: UpdateNoteInput!) {
        updateNote(input: $input) {
            id
            content
        }
    }
` )

type Props = {
  noteId: string
  initialContent?: PartialBlock[]
}

const Editor = ( { noteId, initialContent }: Props ) => {
  const { theme } = useTheme()
  const editor = useCreateBlockNote( {
    initialContent
  } )

  const [ updateNote ] = useMutation( UPDATE_NOTE_CONTENT )

  const handleChange = useCallback( async () => {
    const content = JSON.stringify( editor.document )

    try {
      await updateNote( {
        variables: {
          input: {
            id: noteId,
            content: content
          }
        }
      } )
    } catch ( error ) {
      console.error( "Failed to save note content:", error )
    }
  }, [ editor, noteId, updateNote ] )

  return (
    <BlockNoteView
      editor={ editor }
      onChange={ handleChange }
      theme={ theme === "dark" ? "dark" : "light" }
      className="bg-transparent"
      shadCNComponents={ {} }
    />
  )
}

export default Editor