'use client'

import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { graphql } from "@/gql"
import { useMutation, useQuery } from "@apollo/client/react"
import { useRouter } from "next/navigation"

const GET_ALL_TAGS_FOR_DROPDOWN = graphql( `
    query GetAllTagsForDropdown {
        getAllTags {
            id
        }
    }
` )

const ADD_TAG_TO_NOTE = graphql( `
    mutation AddTagToNote($noteId: ID!, $tagName: String!) {
        addTagToNote(noteId: $noteId, tagName: $tagName)
    }
` )

type Props = {
  id: string
  currentTags: { id: string }[]
}

const AddTagsToNote = ( { id, currentTags }: Props ) => {
  const router = useRouter()
  const [ value, setValue ] = useState<string>( "" )

  const { data, loading: fetchingTags } = useQuery( GET_ALL_TAGS_FOR_DROPDOWN )
  const [ addTag, { loading: addingTag } ] = useMutation( ADD_TAG_TO_NOTE )

  // Extract string IDs to easily filter out tags the note already has
  const currentTagNames = currentTags.map( tag => tag.id )
  const allAvailableTags = data?.getAllTags?.map( tag => tag.id ) || []
  const selectableTags = allAvailableTags.filter( tag => !currentTagNames.includes( tag ) )

  const handleSelect = async ( selectedTag: string ) => {
    if ( selectedTag === "__no_tags__" ) return;

    try {
      await addTag( {
        variables: {
          noteId: id,
          tagName: selectedTag
        }
      } )
      toast.success( `Tag #${ selectedTag } added` )
      setValue( "" )
      router.refresh()
    } catch ( error ) {
      console.error( error )
      toast.error( "Failed to add tag" )
    }
  }

  return (
    <div className="flex items-center px-3 py-0 mt-0">
      <Select
        value={ value }
        onValueChange={ handleSelect }
        disabled={ fetchingTags || addingTag }
      >
        <SelectTrigger className="w-40 border-0 shadow-md focus-visible:ring-0 focus-visible:border-0">
          <SelectValue placeholder={ fetchingTags ? "Loading..." : "Add tag" }/>
        </SelectTrigger>
        <SelectContent>
          { selectableTags.length > 0 ? (
            selectableTags.map( tag => (
              <SelectItem key={ tag } value={ tag }>
                #{ tag }
              </SelectItem>
            ) )
          ) : (
            <SelectItem
              value="__no_tags__"
              className="text-xs text-muted-foreground"
              disabled
            >
              No available tags
            </SelectItem>
          ) }
        </SelectContent>
      </Select>
    </div>
  )
}

export default AddTagsToNote