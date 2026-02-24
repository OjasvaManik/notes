"use client"

import { useMutation } from "@apollo/client/react"
import { graphql } from "@/gql"
import { Button } from "@/components/ui/button"
import { Loader2, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const DELETE_BANNER = graphql( `
    mutation DeleteBanner($id: ID!) {
        deleteBanner(id: $id) {
            id
            bannerUrl
        }
    }
` )

type Props = {
  noteId: string
}

const RemoveFile = ( { noteId }: Props ) => {
  const router = useRouter()
  const [ deleteBanner, { loading } ] = useMutation( DELETE_BANNER )

  const handleRemove = async () => {
    try {
      await deleteBanner( {
        variables: { id: noteId }
      } )
      toast.success( "File removed" )
      router.refresh()
    } catch ( error ) {
      console.error( "Failed to remove file:", error )
      toast.error( "Failed to remove file" )
    }
  }

  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={ handleRemove }
      disabled={ loading }
    >
      { loading ? (
        <Loader2 className="h-4 w-4 animate-spin"/>
      ) : (
        <Trash2 className="h-4 w-4"/>
      ) }
    </Button>
  )
}

export default RemoveFile