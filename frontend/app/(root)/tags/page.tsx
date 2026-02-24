import React from 'react'
import TagsView from "@/components/tags/tags-view"
import { graphql } from '@/gql'
import { query } from "@/providers/apollo-server";

const GET_ALL_TAGS = graphql( `
    query GetAllTags {
        getAllTags {
            id
        }
    }
` )

const TagsPage = async () => {
  const { data, error } = await query( {
    query: GET_ALL_TAGS,
  } );

  const tagStrings: string[] = data?.getAllTags?.map( tag => tag.id ) || [];

  return (
    <div className={ 'px-3 py-2' }>
      <h1 className={ 'font-bold uppercase border-b-2 pb-1 mb-1' }>Locked Notes</h1>
      <TagsView initialTags={ tagStrings }/>
    </div>
  )
}

export default TagsPage