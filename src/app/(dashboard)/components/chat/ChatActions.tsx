import { BiSend } from 'react-icons/bi'

export default function ChatActions () {
  return (
    <div className='flex gap-4 w-full mt-6'>
      <input
        type='text'
        placeholder='Ask here...'
        className='input input-bordered input-success w-full rounded-full'
      />
      <button className='btn btn-circle cool-btn'>
        <BiSend className='h-6 w-6' />
      </button>
    </div>
  )
}
