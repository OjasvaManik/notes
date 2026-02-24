import Image from "next/image"
import UploadFile from "@/components/notes/upload-file"
import RemoveFile from "@/components/notes/remove-file"
import NotePageButtons from "@/components/notes/note-page-buttons"

type Props = {
  bannerUrl?: string | null;
  noteId: string;
  isLocked: boolean;
  isPinned: boolean;
}

const Banner = ( {
                   bannerUrl, // 1. Added to destructured props
                   noteId,
                   isPinned,
                   isLocked
                 }: Props ) => {
  // 2. Updated to match the backend URL used in your other components
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"

  // 3. Resolve the unified bannerUrl
  const bannerSrc = bannerUrl?.startsWith( 'http' )
    ? bannerUrl
    : bannerUrl ? `${ baseUrl }${ bannerUrl }` : null

  if ( !bannerSrc ) {
    return (
      <div className="flex h-16 w-full items-center justify-between border-b border-border bg-secondary group">
        <div className={ 'ml-4 mb-3' }>
          <NotePageButtons
            noteId={ noteId }
            isLocked={ isLocked }
            isPinned={ isPinned }
          />
        </div>
        <div
          className="flex gap-2 transition-opacity duration-200 lg:opacity-0 group-hover:opacity-100">
          <UploadFile noteId={ noteId }/>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative h-72 w-full border-b border-border">
      <Image
        src={ bannerSrc }
        alt="banner"
        fill
        className="object-cover"
        sizes="100vw"
        priority
        unoptimized
      />

      <div
        className="absolute right-4 top-4 z-10 flex gap-2 transition-opacity duration-200 lg:opacity-0 group-hover:opacity-100">
        <UploadFile noteId={ noteId }/>
        <RemoveFile noteId={ noteId }/>
      </div>

      <div className="absolute left-4 top-4 z-10 flex gap-2">
        <NotePageButtons
          noteId={ noteId }
          isLocked={ isLocked }
          isPinned={ isPinned }
        />
      </div>
    </div>
  )
}

export default Banner