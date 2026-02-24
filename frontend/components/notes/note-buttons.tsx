'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useMutation } from "@apollo/client/react"
import { graphql } from "@/gql"
import { HugeiconsIcon } from "@hugeicons/react";
import { CircleLock02Icon, CircleUnlock02Icon, DeleteThrowIcon, PinIcon, PinOffIcon } from "@hugeicons/core-free-icons"

const PIN_NOTE = graphql( `
    mutation PinNote($id: ID!) {
        pinNote(id: $id) {
            id
            isPinned
        }
    }
` )

const LOCK_NOTE = graphql( `
    mutation LockNote($id: ID!) {
        lockNote(id: $id) {
            id
            isLocked
        }
    }
` )

const TRASH_NOTE = graphql( `
    mutation TrashNote($id: ID!) {
        trashNote(id: $id) {
            id
            isTrashed
        }
    }
` )

type Props = {
  note: {
    id: string;
    isPinned: boolean;
    isLocked: boolean;
    isTrashed: boolean;
  }
}

const NoteButtons = ( { note }: Props ) => {
  const router = useRouter()
  const params = useParams()

  // Add refetchQueries pointing to the operation name "GetNotes"
  const [ pinNote ] = useMutation( PIN_NOTE, {
    refetchQueries: [ "GetNotes" ]
  } )

  const [ lockNote ] = useMutation( LOCK_NOTE, {
    refetchQueries: [ "GetNotes" ]
  } )

  const [ trashNote ] = useMutation( TRASH_NOTE, {
    refetchQueries: [ "GetNotes" ]
  } )

  const handlePin = async ( e: React.MouseEvent ) => {
    e.stopPropagation()
    try {
      await pinNote( {
        variables: { id: note.id },
        optimisticResponse: {
          pinNote: {
            __typename: "Note",
            id: note.id,
            isPinned: !note.isPinned,
          }
        }
      } )
      toast.success( "Pin status changed" )
    } catch ( error ) {
      toast.error( "Failed to update pin status" )
    }
  }

  const handleLock = async ( e: React.MouseEvent ) => {
    e.stopPropagation()

    if ( params.id === note.id ) {
      router.push( "/" )
    }

    try {
      await lockNote( {
        variables: { id: note.id },
        optimisticResponse: {
          lockNote: {
            __typename: "Note",
            id: note.id,
            isLocked: !note.isLocked,
          }
        }
      } )
      toast.success( "Note Locked" )
    } catch ( error ) {
      toast.error( "Failed to lock note" )
    }
  }

  const handleTrash = async ( e: React.MouseEvent ) => {
    e.stopPropagation()

    if ( params.id === note.id ) {
      router.push( "/" )
    }

    try {
      await trashNote( {
        variables: { id: note.id },
        optimisticResponse: {
          trashNote: {
            __typename: "Note",
            id: note.id,
            isTrashed: true,
          }
        }
      } )
      toast.success( "Note Trashed" )
    } catch ( error ) {
      toast.error( "Failed to trash note" )
    }
  }

  return (
    <div className="flex gap-1">
      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6 hover:bg-background/80"
        onClick={ handleLock }
      >
        { note.isLocked
          ? <HugeiconsIcon icon={ CircleLock02Icon } className={ 'text-red-500' }/>
          : <HugeiconsIcon icon={ CircleUnlock02Icon }/> }
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6 hover:bg-background/80"
        onClick={ handlePin }
      >
        { note.isPinned
          ? <HugeiconsIcon icon={ PinOffIcon } className={ 'text-primary' }/>
          : <HugeiconsIcon icon={ PinIcon }/> }
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6 hover:text-destructive hover:bg-background/80"
        onClick={ handleTrash }
      >
        <HugeiconsIcon icon={ DeleteThrowIcon }/>
      </Button>
    </div>
  )
}

export default NoteButtons