"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandList, } from "@/components/ui/command"
import { CommandItem } from "cmdk";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { graphql } from "@/gql";
import { useMutation, useQuery } from "@apollo/client/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete04Icon, DeletePutBackIcon } from "@hugeicons/core-free-icons";

const GET_TRASHED_NOTES = graphql( `
    query GetTrashedNotes {
        getNotes(input: { isTrashed: true }) {
            id
            title
            isTrashed
        }
    }
` )

const RESTORE_NOTE = graphql( `
    mutation RestoreNote($id: ID!) {
        trashNote(id: $id) {
            id
            isTrashed
        }
    }
` )

const DELETE_NOTE_PERMANENTLY = graphql( `
    mutation DeleteNotePermanently($id: ID!) {
        deleteNote(id: $id)
    }
` )

export function TrashMenu() {
  const [ open, setOpen ] = React.useState( false )
  const params = useParams();
  const router = useRouter();

  const { data, loading } = useQuery( GET_TRASHED_NOTES, {
    skip: !open,
    fetchPolicy: "network-only"
  } )

  const [ restoreNote ] = useMutation( RESTORE_NOTE, {
    refetchQueries: [ 'GetNotes' ]
  } )

  const [ deleteNote ] = useMutation( DELETE_NOTE_PERMANENTLY )

  const notes = data?.getNotes?.filter( n => n.isTrashed ) || []

  const handleRestore = async ( e: React.MouseEvent, noteId: string ) => {
    e.stopPropagation();

    try {
      await restoreNote( {
        variables: { id: noteId },
        optimisticResponse: {
          trashNote: {
            __typename: "Note",
            id: noteId,
            isTrashed: false
          }
        }
      } );
      toast.success( "Note removed from trash" );
    } catch ( error ) {
      console.error( "Failed to restore note", error );
      toast.error( "Failed to restore note" );
    }
  };

  const handleDelete = async ( e: React.MouseEvent, noteId: string ) => {
    e.stopPropagation();

    if ( params.id === noteId ) {
      router.push( "/" );
    }

    try {
      await deleteNote( {
        variables: { id: noteId },
        update: ( cache ) => {
          cache.evict( { id: cache.identify( { __typename: "Note", id: noteId } ) } )
          cache.gc()
        }
      } );
      toast.success( "Note permanently deleted" );
    } catch ( error ) {
      console.error( "Failed to delete note", error );
      toast.error( "Failed to permanently delete note" );
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={ () => setOpen( true ) } variant="destructive" className="gap-2">
        <HugeiconsIcon icon={ Delete04Icon } size={ 18 }/>
        <p>Trash</p>
      </Button>
      <CommandDialog open={ open } onOpenChange={ setOpen }>
        <Command>
          <CommandInput placeholder="Type a command or search..."/>
          <CommandList>
            <CommandGroup heading="Trash Items">
              { loading && <CommandEmpty>Loading trash...</CommandEmpty> }
              { !loading && notes.length === 0 && <CommandEmpty>No results found.</CommandEmpty> }

              { notes.map( ( note ) => (
                <CommandItem key={ note.id } value={ note.title || "" }
                             className={ 'px-3 py-1 rounded-xl flex items-center justify-between gap-2 hover:bg-sidebar/50 transition-all' }>
                  <span className={ 'truncate' }>{ note.title }</span>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 z-10 relative hover:bg-background/80"
                      onClick={ ( e ) => handleRestore( e, note.id ) }
                    >
                      <HugeiconsIcon icon={ DeletePutBackIcon } size={ 14 }/>
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-6 w-6 z-10 relative"
                      onClick={ ( e ) => handleDelete( e, note.id ) }
                    >
                      <HugeiconsIcon icon={ Delete04Icon } size={ 14 }/>
                    </Button>
                  </div>
                </CommandItem>
              ) ) }
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}