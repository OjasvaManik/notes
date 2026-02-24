'use client'

import React, { useState } from "react"
import EmojiPicker, { EmojiClickData } from "emoji-picker-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { graphql } from "@/gql"
import { useMutation } from "@apollo/client/react"
import { useRouter } from "next/navigation"

const UPDATE_NOTE_EMOJI = graphql( `
    mutation UpdateNoteEmoji($input: UpdateNoteInput!) {
        updateNote(input: $input) {
            id
            emoji
        }
    }
` )

type Props = {
  noteId: string
  currentEmoji?: string | null
}

const NoteEmojiPicker = ( { noteId, currentEmoji }: Props ) => {
  const router = useRouter()
  const [ emoji, setEmoji ] = useState<string>( currentEmoji || "" )
  const [ open, setOpen ] = useState( false )

  const [ updateNote, { loading } ] = useMutation( UPDATE_NOTE_EMOJI )

  const handleSelect = async ( data: EmojiClickData ) => {
    const selected = data.emoji

    // Instantly update the local UI
    setEmoji( selected )
    setOpen( false )

    try {
      await updateNote( {
        variables: {
          input: {
            id: noteId,
            emoji: selected
          }
        }
      } )

      toast.success( "Emoji updated" )

      router.refresh()
    } catch ( error ) {
      console.error( "Failed to update emoji:", error )
      toast.error( "Failed to update emoji" )

      // Revert the local UI if the server fails
      setEmoji( currentEmoji || "" )
    }
  }

  return (
    <div className="relative">
      <Button
        onClick={ () => setOpen( prev => !prev ) }
        disabled={ loading }
        className="h-14 w-14 flex items-center justify-center text-3xl bg-secondary rounded-full shadow-md hover:scale-105 transition"
      >
        { emoji || <PlusIcon/> }
      </Button>

      { open && (
        <div className="absolute z-50 mt-2">
          <EmojiPicker onEmojiClick={ handleSelect }/>
        </div>
      ) }
    </div>
  )
}

export default NoteEmojiPicker