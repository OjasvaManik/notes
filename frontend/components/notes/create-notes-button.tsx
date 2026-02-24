"use client"

import React from 'react'
import { useMutation } from '@apollo/client/react'
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon } from "@hugeicons/core-free-icons"
import { useRouter } from "next/navigation"
import { graphql } from '@/gql'

const CREATE_NOTE = graphql( `
    mutation CreateNote {
        createNote
    }
` )

const CreateNotesButton = () => {
  const router = useRouter()
  const [ createNote ] = useMutation( CREATE_NOTE, {
    refetchQueries: [ 'GetNotesList' ]
  } )

  const handleCreateNote = async () => {
    try {
      const { data } = await createNote()
      if ( data?.createNote ) {
        router.push( `/note/${ data.createNote }` )
      }
    } catch ( error ) {
      console.error( "Failed to create note:", error )
    }
  }

  return (
    <Button className={ 'w-full' } variant={ 'default' } onClick={ handleCreateNote }>
      <HugeiconsIcon icon={ Add01Icon }/>
      <p>Create Note</p>
    </Button>
  )
}

export default CreateNotesButton