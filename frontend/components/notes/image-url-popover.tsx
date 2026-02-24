"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Check, LinkIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { graphql } from "@/gql"
import { useMutation } from "@apollo/client/react"

const UPDATE_BANNER_URL = graphql( `
    mutation UpdateBannerUrl($input: UpdateNoteInput!) {
        updateNote(input: $input) {
            id
            bannerUrl
        }
    }
` )

type Props = {
  noteId: string
}

const ImageUrlPopover = ( { noteId }: Props ) => {
  const [ urlInput, setUrlInput ] = useState( "" )
  const [ isOpen, setIsOpen ] = useState( false )
  const router = useRouter()

  const [ updateNote, { loading } ] = useMutation( UPDATE_BANNER_URL )

  const handleUrlSubmit = async () => {
    if ( !urlInput.trim() ) return

    try {
      await updateNote( {
        variables: {
          input: {
            id: noteId,
            bannerUrl: urlInput.trim()
          }
        }
      } )

      setUrlInput( "" )
      toast.success( "Image URL updated" )
      setIsOpen( false )
      router.refresh()
    } catch ( error ) {
      console.error( "Failed to update banner URL:", error )
      toast.error( "Failed to update image URL" )
    }
  }

  return (
    <Popover open={ isOpen } onOpenChange={ setIsOpen }>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="gap-2"
          disabled={ loading }
        >
          <LinkIcon className="h-4 w-4"/>
          Add URL
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80">
        <PopoverHeader>
          <PopoverTitle>Paste Link</PopoverTitle>
          <PopoverDescription>
            Set the link of the image to be displayed in the note.
          </PopoverDescription>
        </PopoverHeader>

        <div className="flex items-center gap-2 mt-4">
          <Input
            placeholder="Paste image URL..."
            value={ urlInput }
            onChange={ ( e ) => setUrlInput( e.target.value ) }
            disabled={ loading }
            onKeyDown={ ( e ) => {
              if ( e.key === "Enter" ) handleUrlSubmit()
            } }
          />
          <Button
            onClick={ handleUrlSubmit }
            disabled={ loading || !urlInput.trim() }
            size="icon"
          >
            <Check className="h-4 w-4"/>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ImageUrlPopover