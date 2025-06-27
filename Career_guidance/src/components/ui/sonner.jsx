import { Toaster as Sonner, toast } from "sonner"

const Toaster = (props) => {
  return <Sonner theme="light" {...props} />
}

export { Toaster, toast }

