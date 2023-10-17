import { getMessagesByChatId } from '@/db/models/messages'
import React from 'react'
import ChatActions from './ChatActions'

type Props = {
  chatId: string
}

export default async function ChatContainer ({ chatId }: Props) {
  const messages = await getMessagesByChatId(chatId)
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
      <ChatActions />
    </div>
  )
}
