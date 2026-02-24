'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useMutation } from "@apollo/client/react"
import { graphql } from "@/gql"
import { HugeiconsIcon } from "@hugeicons/react"
import { CircleLock02Icon, CircleUnlock02Icon, DeleteThrowIcon, PinIcon, PinOffIcon } from "@hugeicons/core-free-icons"

const PIN_NOTE = graphql( `
    mutation PinNotePage($id: ID!) {
        pinNote(id: $id) {
            id
            isPinned
        }
    }
` )

const LOCK_NOTE = graphql( `
    mutation LockNotePage($id: ID!) {
        lockNote(id: $id) {
            id
            isLocked
        }
    }
` )

const TRASH_NOTE = graphql( `
    mutation TrashNotePage($id: ID!) {
        trashNote(id: $id) {
            id
            isTrashed
        }
    }
` )

type Props = {
  noteId: string
  isLocked: boolean
  isPinned: boolean
}

const NotePageButtons = ( { noteId, isLocked, isPinned }: Props ) => {
  const router = useRouter()

  const [ pinNote, { loading: pinLoading } ] = useMutation( PIN_NOTE, {
    refetchQueries: [ "GetNotes" ]
  } )

  const [ lockNote, { loading: lockLoading } ] = useMutation( LOCK_NOTE, {
    refetchQueries: [ "GetNotes" ]
  } )

  const [ trashNote, { loading: trashLoading } ] = useMutation( TRASH_NOTE, {
    refetchQueries: [ "GetNotes" ]
  } )

  const handlePin = async ( e: React.MouseEvent ) => {
    e.stopPropagation()
    try {
      await pinNote( {
        variables: { id: noteId },
        optimisticResponse: {
          pinNote: {
            __typename: "Note",
            id: noteId,
            isPinned: !isPinned
          }
        }
      } )
      toast.success( "Pin status changed" )
      router.refresh()
    } catch ( error ) {
      toast.error( "Failed to change pin status" )
    }
  }

  const handleLock = async ( e: React.MouseEvent ) => {
    e.stopPropagation()
    try {
      await lockNote( {
        variables: { id: noteId },
        optimisticResponse: {
          lockNote: {
            __typename: "Note",
            id: noteId,
            isLocked: !isLocked
          }
        }
      } )
      toast.success( "Lock status changed" )

      if ( !isLocked ) {
        router.push( "/" )
      } else {
        router.refresh()
      }
    } catch ( error ) {
      toast.error( "Failed to change lock status" )
    }
  }

  const handleTrash = async ( e: React.MouseEvent ) => {
    e.stopPropagation()
    try {
      await trashNote( {
        variables: { id: noteId },
        optimisticResponse: {
          trashNote: {
            __typename: "Note",
            id: noteId,
            isTrashed: true
          }
        }
      } )
      toast.success( "Note trashed" )
      router.push( "/" )
    } catch ( error ) {
      toast.error( "Failed to trash note" )
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        size="icon"
        variant="ghost"
        onClick={ handleLock }
        disabled={ lockLoading }
      >
        { isLocked
          ? <HugeiconsIcon icon={ CircleLock02Icon } className="w-4 h-4 text-red-500"/>
          : <HugeiconsIcon icon={ CircleUnlock02Icon } className="w-4 h-4"/> }
      </Button>

      <Button
        size="icon"
        variant="ghost"
        onClick={ handlePin }
        disabled={ pinLoading }
      >
        { isPinned
          ? <HugeiconsIcon icon={ PinOffIcon } className="w-4 h-4 text-primary"/>
          : <HugeiconsIcon icon={ PinIcon } className="w-4 h-4"/> }
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className="hover:text-destructive"
        onClick={ handleTrash }
        disabled={ trashLoading }
      >
        <HugeiconsIcon icon={ DeleteThrowIcon } className="w-4 h-4"/>
      </Button>
    </div>
  )
}

export default NotePageButtons