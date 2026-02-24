'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
import { toast } from "sonner"
import { graphql } from "@/gql"
import { useMutation } from "@apollo/client/react"
import { useRouter } from "next/navigation"

const REMOVE_TAG_FROM_NOTE = graphql( `
    mutation RemoveTagFromNote($noteId: ID!, $tagName: String!) {
        removeTagFromNote(noteId: $noteId, tagName: $tagName)
    }
` )

type Props = {
  noteId: string
  tagName: string
}

const RemoveTagButton = ( { noteId, tagName }: Props ) => {
  const router = useRouter()
  const [ removeTag, { loading } ] = useMutation( REMOVE_TAG_FROM_NOTE )

  const handleRemoveTag = async () => {
    try {
      await removeTag( {
        variables: {
          noteId,
          tagName
        }
      } )
      toast.success( `Tag #${ tagName } removed` )
      router.refresh()
    } catch ( error ) {
      console.error( error )
      toast.error( "Failed to remove tag" )
    }
  }

  return (
    <Button
      variant="ghost"
      onClick={ handleRemoveTag }
      disabled={ loading }
      className="hover:bg-transparent"
    >
      <XIcon/>
    </Button>
  )
}

export default RemoveTagButton