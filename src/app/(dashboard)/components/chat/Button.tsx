import { useFormStatus } from 'react-dom'
import { BiSend } from 'react-icons/bi'

export default function Button() {
  const { pending } = useFormStatus()
  return (
    <>
      <button
        type="submit"
        className="cool-btn btn btn-circle"
        disabled={pending}
        aria-label="Submit action"
      >
        {pending ? (
          <i className="loading loading-infinity loading-lg"></i>
        ) : (
          <BiSend className="h-6 w-6" />
        )}
      </button>
    </>
  )
}
