import React from 'react'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, } from "@/components/ui/empty"
import { HugeiconsIcon } from "@hugeicons/react"
import { Book04Icon } from "@hugeicons/core-free-icons"
import CreateNotesButton from "@/components/notes/create-notes-button";

const HomePage = () => {
  return (
    <div className={ 'w-full min-h-[90vh] flex items-center justify-center' }>
      <Empty className={ 'w-full h-full' }>
        <EmptyHeader>
          <EmptyMedia variant="default" className={ 'text-primary h-12 w-12' }>
            <HugeiconsIcon icon={ Book04Icon } height={ 48 } width={ 48 }/>
          </EmptyMedia>
          <EmptyTitle>No notes</EmptyTitle>
          <EmptyDescription>
            <p>No note is opened.</p>
            <p>Create or open a note.</p>
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className={ 'flex items-center justify-center gap-x-2 w-fit' }>
          <CreateNotesButton/>
        </EmptyContent>
      </Empty>
    </div>
  )
}
export default HomePage
