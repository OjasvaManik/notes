"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FilterHorizontalIcon,
  SortByDown01Icon,
  SortByUp01Icon,
  Sorting05Icon,
  SortingAZ02Icon,
  SortingZA01Icon
} from "@hugeicons/core-free-icons"

type Props = { tags: string[] }

export const NotesFilter = ( { tags }: Props ) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilterChange = ( val: string ) => {
    const params = new URLSearchParams( searchParams.toString() )
    params.set( 'filter', val )
    router.push( `?${ params.toString() }` )
  }

  const handleSortChange = ( val: string ) => {
    const params = new URLSearchParams( searchParams.toString() )

    if ( val.startsWith( "title_" ) ) {
      params.set( "sortBy", "title" )
      params.set( "sortDir", val.split( "_" )[ 1 ].toUpperCase() )
    } else {
      params.set( "sortBy", "updatedAt" )
      params.set( "sortDir", val.toUpperCase() )
    }

    router.push( `?${ params.toString() }` )
  }

  return (
    <div className='space-y-1'>
      <Select onValueChange={ handleFilterChange }>
        <SelectTrigger className='min-w-full'>
          {/*<Blinds className="w-4 h-4 mr-2"/>*/ }
          <HugeiconsIcon icon={ FilterHorizontalIcon }/>
          <SelectValue placeholder='Filter'/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Views</SelectLabel>
            <SelectItem value="all">All Notes</SelectItem>
            <SelectItem value="pinned">Pinned</SelectItem>
          </SelectGroup>
          <SelectSeparator/>
          <SelectGroup>
            <SelectLabel>Tags</SelectLabel>
            { tags.map( ( tag ) => (
              <SelectItem key={ tag } value={ tag }>{ tag }</SelectItem>
            ) ) }
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={ handleSortChange } defaultValue="desc">
        <SelectTrigger className='min-w-full'>
          {/*<ArrowDownToLine className="w-4 h-4 mr-2"/>*/ }
          <HugeiconsIcon icon={ Sorting05Icon }/>
          <SelectValue placeholder='Sort Order'/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Order</SelectLabel>
            <SelectItem value="desc"><HugeiconsIcon icon={ SortByUp01Icon }/> Newest First</SelectItem>
            <SelectItem value="asc"><HugeiconsIcon icon={ SortByDown01Icon }/> Oldest First</SelectItem>
          </SelectGroup>

          <SelectSeparator/>

          <SelectGroup>
            <SelectLabel>Alphabetical</SelectLabel>
            <SelectItem value="title_asc"><HugeiconsIcon icon={ SortingAZ02Icon }/> A → Z</SelectItem>
            <SelectItem value="title_desc"><HugeiconsIcon icon={ SortingZA01Icon }/> Z → A</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}