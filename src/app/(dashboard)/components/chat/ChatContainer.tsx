'use client'

import { Message } from '@/db/models/messages'
import { useOptimistic, useState } from 'react'
import ChatActions from './ChatActions'
import ChatMessages from '@/app/(dashboard)/components/chat/ChatMessages'

type Props = {
  chatId: string
  existingMessages: Message[]
}

export default function ChatContainer({ chatId, existingMessages }: Props) {
  const [messages, setMessages] = useState<Message[]>(existingMessages)
  const [optimisticMessages, setOptimisticMessage] = useOptimistic(messages)

  const addMessage = async (messages: Message[]) => {
    setMessages(prev => [...prev, ...messages])
  }

  const addOptimistic = async (message: Message) => {
    setOptimisticMessage(prev => [...prev, message])
  }

  return (
    <div className="flex h-full w-full flex-col justify-end rounded-lg border-4 border-double border-teal-500 p-4">
      <ChatMessages messages={optimisticMessages} />
      <ChatActions
        addMessages={addMessage}
        addOptimistic={addOptimistic}
        chatId={chatId}
      />
    </div>
  )
}
