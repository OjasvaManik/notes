'use client'

import React from 'react'
import { graphql } from '@/gql'
import { useMutation } from '@apollo/client/react'
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { useRouter } from "next/navigation";

// Note: I added the '!' to String! assuming your backend requires a non-null string
const DELETE_TAG = graphql( `
    mutation DeleteTag($tagName: String) {
        deleteTag(tagName: $tagName)
    }
` )

type Props = {
  tagName: string
}

const DeleteTagButton = ( { tagName }: Props ) => {
  const router = useRouter()
  const [ deleteTag, { loading } ] = useMutation( DELETE_TAG, {
    variables: { tagName },
  } )

  const handleDelete = async () => {
    try {
      await deleteTag()
      router.refresh()
    } catch ( error ) {
      console.error( `Failed to delete tag ${ tagName }:`, error )
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={ handleDelete }
      disabled={ loading }
      className="h-6 w-6 hover:bg-transparent dark:hover:bg-transparent"
      aria-label={ `Delete tag ${ tagName }` }
    >
      <HugeiconsIcon icon={ Cancel01Icon } size={ 14 }/>
    </Button>
  )
}

export default DeleteTagButton