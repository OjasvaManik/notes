"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList, } from "@/components/ui/command"
import { CommandItem } from "cmdk"
import { FileLock, LockOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { graphql } from "@/gql"
import { useLazyQuery, useMutation } from "@apollo/client/react"

// 1. Query to fetch locked notes (requires password)
const ACCESS_LOCKED_NOTES = graphql( `
    query AccessLockedNotes($password: String!) {
        accessLockedNotes(lockedPassword: $password) {
            id
            title
            emoji
            isLocked
        }
    }
` )

// 2. Mutation to unlock a note directly from the dialog
const UNLOCK_NOTE_FROM_DIALOG = graphql( `
    mutation UnlockNoteFromDialog($id: ID!) {
        lockNote(id: $id) {
            id
            isLocked
        }
    }
` )

const AccessLockDialog = () => {
  const [ open, setOpen ] = React.useState( false )
  const [ password, setPassword ] = React.useState( "" )
  const [ isAuthenticated, setIsAuthenticated ] = React.useState( false )
  const router = useRouter()

  const [ fetchLockedNotes, { data, loading } ] = useLazyQuery( ACCESS_LOCKED_NOTES, {
    fetchPolicy: "network-only"
  } )

  // Ensure the main sidebar updates if a note is unlocked
  const [ unlockNote ] = useMutation( UNLOCK_NOTE_FROM_DIALOG, {
    refetchQueries: [ 'GetNotes' ]
  } )

  // Reset state whenever the dialog is closed for security
  React.useEffect( () => {
    if ( !open ) {
      setPassword( "" )
      setIsAuthenticated( false )
    }
  }, [ open ] )

  const handleSubmit = async () => {
    if ( !password ) return

    try {
      const res = await fetchLockedNotes( { variables: { password } } )

      if ( res.error ) {
        toast.error( "Incorrect Password. Try again." )
      } else if ( res.data ) {
        setIsAuthenticated( true )
      }
    } catch ( error ) {
      toast.error( "Incorrect Password. Try again." )
    }
  }

  // Safely grab the notes and filter out any we optimistically unlocked
  const notes = data?.accessLockedNotes?.filter( n => n.isLocked ) || []

  const handleUnlock = async ( e: React.MouseEvent, noteId: string ) => {
    e.stopPropagation();
    try {
      await unlockNote( {
        variables: { id: noteId },
        optimisticResponse: {
          lockNote: {
            __typename: "Note",
            id: noteId,
            isLocked: false // Instantly hides it from the locked list
          }
        }
      } )
      toast.success( "Note unlocked" )
    } catch ( error ) {
      toast.error( "Failed to unlock note" )
    }
  }

  return (
    <Dialog open={ open } onOpenChange={ setOpen }>
      <DialogTrigger asChild>
        <Button variant={ 'secondary' } className={ 'w-full gap-2' }>
          <FileLock size={ 18 }/>
          <p>Locked</p>
        </Button>
      </DialogTrigger>

      {/* Remove padding if authenticated so the Command component touches the edges */ }
      <DialogContent className={ isAuthenticated ? "p-0 overflow-hidden max-w-xl" : "" }>

        { !isAuthenticated ? (
          <>
            <DialogHeader>
              <DialogTitle>Note is locked</DialogTitle>
              <DialogDescription>
                Enter Correct Password to proceed.
              </DialogDescription>
            </DialogHeader>

            <div className={ 'space-y-2' }>
              <Input
                type="password"
                placeholder="Password"
                className="w-full text-sm"
                value={ password }
                onChange={ ( e ) => setPassword( e.target.value ) }
                onKeyDown={ ( e ) => {
                  if ( e.key === "Enter" ) handleSubmit()
                } }
                disabled={ loading }
              />

              <Button
                className="w-full"
                onClick={ handleSubmit }
                disabled={ loading }
              >
                { loading ? "Checking..." : "Submit" }
              </Button>
            </div>
          </>
        ) : (
          <Command>
            <CommandInput placeholder="Search locked notes..."/>
            <CommandList>
              <CommandGroup heading="Locked Notes">
                { notes.length === 0 && <CommandEmpty>No locked notes found.</CommandEmpty> }

                { notes.map( ( note ) => (
                  <CommandItem
                    key={ note.id }
                    value={ note.title || "" }
                    className={ 'px-3 py-2 rounded-xl flex items-center justify-between gap-2 hover:bg-sidebar/50 transition-all cursor-pointer' }
                    onSelect={ () => {
                      setOpen( false )
                      router.push( `/note/${ note.id }` )
                    } }
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span>{ note.emoji }</span>
                      <span className={ 'truncate' }>{ note.title }</span>
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 z-10 relative hover:bg-background/80"
                      onClick={ ( e ) => handleUnlock( e, note.id ) }
                      title="Unlock Note"
                    >
                      <LockOpen className="w-4 h-4 text-green-500"/>
                    </Button>
                  </CommandItem>
                ) ) }
              </CommandGroup>
            </CommandList>
          </Command>
        ) }
      </DialogContent>
    </Dialog>
  )
}

export default AccessLockDialog