import React from 'react'
import { BiSend } from 'react-icons/bi'

type Props = {}

export default function Chat ({}: Props) {
  return (
    <div className='flex flex-col justify-end w-full h-full rounded-lg border-double border-4 border-teal-500 p-4'>
      {/* chat container */}
      <div>
        <div className='chat chat-start'>
          <div className='chat-bubble text-white'>
            What kind of nonsense is this
          </div>
        </div>
        <div className='chat chat-end'>
          <div className='chat-bubble bg-teal-600 text-white'>
            You have been given a great honor.
          </div>
        </div>
      </div>
      {/* chat action */}
      <div className='flex gap-4 w-full mt-6'>
        <input
          type='text'
          placeholder='Type here'
          className='input input-bordered input-success w-full rounded-full'
        />
        <button className='btn btn-circle hover:bg-teal-500 hover:text-white'>
          <BiSend className='h-6 w-6' />
        </button>
      </div>
    </div>
  )
}
