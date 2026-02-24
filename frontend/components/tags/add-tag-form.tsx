"use client"

import React, { useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon } from "@hugeicons/core-free-icons"
import { graphql } from '@/gql'
import { useMutation } from '@apollo/client/react'
import { useRouter } from 'next/navigation'

const CREATE_TAG = graphql( `
    mutation CreateTag($tagName: String) {
        createTag(tagName: $tagName) {
            id
        }
    }
` )

const AddTagForm = () => {
  const formRef = useRef<HTMLFormElement>( null )
  const router = useRouter()

  const [ createTag ] = useMutation( CREATE_TAG )

  const handleAddTag = async ( formData: FormData ) => {
    const tagName = formData.get( "tagName" ) as string
    if ( !tagName || tagName.trim() === "" ) return

    try {
      await createTag( { variables: { tagName } } )
      toast.success( "Tag added successfully" )
      formRef.current?.reset()
      router.refresh()
    } catch ( error ) {
      console.error( error )
      toast.error( "Failed to add tag" )
    }
  }

  return (
    <form
      ref={ formRef }
      action={ handleAddTag }
      className="w-full lg:max-w-sm items-center space-y-2"
    >
      <Input
        type="text"
        name="tagName"
        placeholder="New tag name..."
        required
      />
      <Button type="submit" className={ 'w-full' }>
        <HugeiconsIcon icon={ Add01Icon } className="mr-2 h-4 w-4"/> Add
      </Button>
    </form>
  )
}

export default AddTagForm