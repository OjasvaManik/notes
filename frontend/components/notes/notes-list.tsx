"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { graphql } from "@/gql"
import { useQuery } from "@apollo/client/react"
import { Spinner } from "@/components/ui/spinner";
import NoteButtons from "@/components/notes/note-buttons";

const GET_NOTES = graphql( `
    query GetNotes($input: NoteFilter, $sort: NoteSortInput) {
        getNotes(input: $input, sort: $sort) {
            id
            title
            emoji
            bannerUrl
            isPinned
            isLocked
            isTrashed
            updatedAt
            tags {
                id
            }
        }
    }
` )

const NotesList = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"

  const filterParam = searchParams.get( "filter" ) || "all"
  const sortDirParam = ( searchParams.get( "sortDir" ) || "DESC" ).toUpperCase()

  const sortByParam = searchParams.get( "sortBy" ) || "updatedAt"
  const sortByEnum = sortByParam === "updatedAt" ? "UPDATED_AT" :
    sortByParam === "createdAt" ? "CREATED_AT" : "TITLE"

  const filterInput: any = {
    isTrashed: false,
    isLocked: false
  }

  if ( filterParam === "pinned" ) {
    filterInput.isPinned = true
  } else if ( filterParam !== "all" ) {
    filterInput.tagName = filterParam
  }

  const { data, loading } = useQuery( GET_NOTES, {
    variables: {
      input: filterInput,
      sort: {
        field: sortByEnum as any,
        direction: sortDirParam as any
      }
    }
  } )

  const displayedNotes = data?.getNotes || []

  return (
    <div className="h-full overflow-y-auto no-scrollbar space-y-2 p-1 pb-60">
      { displayedNotes.map( note => {
        // Adapt to the new bannerUrl system
        const bannerSrc = note.bannerUrl?.startsWith( 'http' )
          ? note.bannerUrl
          : note.bannerUrl ? `${ baseUrl }${ note.bannerUrl }` : null

        return (
          <div
            key={ note.id }
            onClick={ () => router.push( `/note/${ note.id }` ) }
            className={ cn(
              "group relative w-full bg-card shadow-md p-2 overflow-hidden cursor-pointer transition-all rounded-md",
              !bannerSrc && "hover:bg-secondary/50"
            ) }
          >
            { bannerSrc && (
              <div
                className="absolute right-0 top-0 bottom-0 w-3/5 opacity-50 group-hover:opacity-100 pointer-events-none">
                <Image
                  src={ bannerSrc }
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-linear-to-r from-card via-card/60 to-transparent"/>
              </div>
            ) }

            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start w-full">
                <div className="flex justify-start items-center space-x-1">
                  <p className="text-[16px]">{ note.emoji }</p>
                  <p className="font-semibold text-base truncate pr-2 max-w-64">
                    { note.title }
                  </p>
                </div>

                { note.isPinned && (
                  <span
                    className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium shadow-sm">
                    Pinned
                  </span>
                ) }
              </div>

              <div className="flex justify-between items-end text-xs text-muted-foreground mt-2">
                <div className="flex gap-1 flex-wrap max-w-[65%]">
                  {/* Map GraphQL Tag objects to Strings */ }
                  { note.tags?.map( t => (
                    <span
                      key={ t?.id }
                      className="bg-muted/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] border border-border/50"
                    >
                      #{ t?.id }
                    </span>
                  ) ) }
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px]">
                    { note.updatedAt
                      ? new Date( note.updatedAt ).toLocaleDateString()
                      : "—" }
                  </span>

                  {/* Note: setNotes is removed because Apollo manages cache updates automatically now */ }
                  <NoteButtons note={ note as any }/>
                </div>
              </div>
            </div>
          </div>
        )
      } ) }

      <div className="h-4 w-full flex justify-center items-center py-4">
        { loading && (
          <Spinner/>
        ) }

        { !loading && displayedNotes.length === 0 && (
          <span className="text-xs text-muted-foreground">
            No notes found.
          </span>
        ) }

        { !loading && displayedNotes.length > 0 && (
          <span className="text-[10px] text-muted-foreground">
            End of list
          </span>
        ) }
      </div>
    </div>
  )
}

export default NotesList