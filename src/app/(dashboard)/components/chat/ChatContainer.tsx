'use client'

import { getMessagesByChatId } from '@/db/models/messages'
import { useState } from 'react'
import ChatActions from './ChatActions'
import {Message} from '@/db/models/messages'
import ChatMessages from "@/app/(dashboard)/components/chat/ChatMessages";

type Props = {
  chatId: string
}

export default function ChatContainer ({ chatId }: Props) {
  const existingMessages = [
    {
      chatId: '423423wedfs',
      text: 'hello',
      author: "system",
      id: 123
    },
    {
      chatId: '423423wedfs',
      text: 'How are you?',
      author: "user",
      id: 124
    }
  ] satisfies Message[]
  const [messages, setMessages] =
    useState<Message[]>(existingMessages)

  const addMessage = async (message: Message) => {
    setMessages([...messages, message])
  }

  return (
    <div className='flex flex-col justify-end w-full h-full rounded-lg border-double border-4 border-teal-500 p-4'>
      {/* chat messages */}
      <ChatMessages messages={messages} />
      <ChatActions addMessage={addMessage} chatId={chatId} />
    </div>
  )
}
