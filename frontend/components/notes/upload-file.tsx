"use client"

import React, { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ImagePlus, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import ImageUrlPopover from "@/components/notes/image-url-popover"
import { useApolloClient } from "@apollo/client/react" // 1. Import Apollo Client

type Props = {
  noteId: string
}

const UploadFile = ( { noteId }: Props ) => {
  const [ isPending, setIsPending ] = useState( false )
  const inputRef = useRef<HTMLInputElement>( null )
  const router = useRouter()

  const client = useApolloClient() // 2. Initialize client

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"

  const handleFileChange = async ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const file = e.target.files?.[ 0 ]
    if ( !file ) return

    setIsPending( true )

    const formData = new FormData()
    formData.append( "file", file )

    try {
      const res = await fetch( `${ baseUrl }/upload/${ noteId }`, {
        method: "POST",
        body: formData,
      } )

      if ( !res.ok ) {
        const errorData = await res.json().catch( () => ( {} ) );
        throw new Error( errorData.error || `Server error: ${ res.status }` );
      }

      const responseData = await res.json()

      client.cache.modify( {
        id: client.cache.identify( { __typename: 'Note', id: noteId } ),
        fields: {
          bannerUrl() {
            return responseData.url;
          }
        }
      } );

      toast.success( "File uploaded successfully" )
      router.refresh()
    } catch ( error: any ) {
      console.error( "File upload exception:", error )
      toast.error( error.message || "Failed to upload file." )
    } finally {
      setIsPending( false )
      if ( inputRef.current ) inputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center justify-end">
        <Input
          type="file"
          accept="image/*,video/*"
          className="hidden"
          ref={ inputRef }
          onChange={ handleFileChange }
          disabled={ isPending }
        />

        <Button
          onClick={ () => inputRef.current?.click() }
          disabled={ isPending }
          variant="outline"
          className="gap-2 w-22.5"
        >
          { isPending ? (
            <Loader2 className="h-4 w-4 animate-spin"/>
          ) : (
            <ImagePlus className="h-4 w-4"/>
          ) }
          Upload
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <ImageUrlPopover noteId={ noteId }/>
      </div>
    </div>
  )
}

export default UploadFile