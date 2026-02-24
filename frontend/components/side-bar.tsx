import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight05Icon, DiscountTag01Icon } from "@hugeicons/core-free-icons"
import CreateNotesButton from "@/components/notes/create-notes-button";
import { NotesFilter } from "@/components/notes/notes-filter";
import { graphql } from "@/gql";
import { query } from "@/providers/apollo-server";
import NotesList from "@/components/notes/notes-list";
import SearchNotes from "@/components/search-notes";
import { TrashMenu } from "@/components/trash-menu";
import AccessLockDialog from "@/components/access-lock-dialog";

const GET_ALL_TAGS = graphql( `
    query GetAllTags {
        getAllTags {
            id
        }
    }
` )

const SideBar = async () => {
  const { data, error } = await query( {
    query: GET_ALL_TAGS,
  } );

  const tagStrings: string[] = data?.getAllTags?.map( tag => tag.id ) || [];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <HugeiconsIcon icon={ ArrowRight05Icon } className="w-12 h-12" strokeWidth={ 2 }/>
        </Button>
      </SheetTrigger>
      <SheetContent side={ 'left' } className="w-100 sm:w-135 flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Notes</SheetTitle>
          <SheetDescription>Select filters to organize your view.</SheetDescription>
        </SheetHeader>

        {/* Removed px-6 from this parent container */ }
        <div className='w-full space-y-2 flex flex-col h-full'>

          {/* Group: Elements that need px-6 */ }
          <div className="px-6 space-y-2">
            <div className='grid grid-cols-2 w-full gap-1'>
              <CreateNotesButton/>
              <TrashMenu/>
              <Link href={ '/tags' }>
                <Button variant={ 'secondary' } className={ 'w-full' }>
                  <HugeiconsIcon icon={ DiscountTag01Icon }/>
                  <p>Tags</p>
                </Button>
              </Link>
              <AccessLockDialog/>
            </div>
            <SearchNotes/>
            <NotesFilter tags={ tagStrings }/>
          </div>
          <div className="px-5 h-full">
            <NotesList/>
          </div>

        </div>

      </SheetContent>
    </Sheet>
  )
}
export default SideBar