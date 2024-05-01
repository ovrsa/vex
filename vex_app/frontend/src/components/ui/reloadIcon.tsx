import { ReloadIcon } from "@radix-ui/react-icons"
 
 
export function ButtonLoading() {
  return (
    <div role="button" aria-disabled="true" className="button-like-styles flex items-center justify-center">
      <ReloadIcon className="mr-2 h-4 w-5 animate-spin" />
      Please wait
    </div>
  )
}

