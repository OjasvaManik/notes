'use client'

import React from 'react'
import { Button } from "@/components/ui/button";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandList } from "@/components/ui/command";
import { CommandItem } from "cmdk";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { graphql } from "@/gql";
import { useQuery } from "@apollo/client/react";

const GET_NOTES_FOR_SEARCH = graphql( `
    query GetNotesForSearch($input: NoteFilter) {
        getNotes(input: $input) {
            id
            title
            emoji
        }
    }
` )

const SearchNotes = () => {
  const [ open, setOpen ] = React.useState( false )
  const router = useRouter()

  // Apollo handles the fetching automatically, but only when 'open' is true
  const { data, loading } = useQuery( GET_NOTES_FOR_SEARCH, {
    variables: {
      input: {
        isTrashed: false,
        isLocked: false // Assumes locked notes shouldn't appear in a standard search
      }
    },
    skip: !open,
    fetchPolicy: "network-only" // Ensures you always search against fresh data
  } )

  // Safely fallback to an empty array
  const notes = data?.getNotes || []

  return (
    <div className="flex flex-col gap-4">
      <Button variant={ 'outline' } className={ 'w-full flex items-center gap-2 justify-start' }
              onClick={ () => setOpen( true ) }>
        <SearchIcon/>
        <p>Search</p>
      </Button>
      <CommandDialog open={ open } onOpenChange={ setOpen }>
        <Command>
          <CommandInput placeholder="Type a command or search..."/>
          <CommandList>
            <CommandGroup heading="Search Notes">
              { loading && <CommandEmpty>Loading notes...</CommandEmpty> }
              { !loading && notes.length === 0 && <CommandEmpty>No results found.</CommandEmpty> }

              { notes.map( ( note ) => (
                <CommandItem key={ note.id } value={ note.title || "" }
                             className={ 'px-3 py-1 rounded-xl flex items-center justify-start gap-2 hover:bg-sidebar/50 transition-all cursor-pointer' }
                             onSelect={ () => {
                               setOpen( false )
                               router.push( `/note/${ note.id }` )
                             } }
                >
                  <span className={ 'truncate' }>{ note.emoji }</span>
                  <span className={ 'truncate' }>{ note.title }</span>
                </CommandItem>
              ) ) }
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}

export default SearchNotes