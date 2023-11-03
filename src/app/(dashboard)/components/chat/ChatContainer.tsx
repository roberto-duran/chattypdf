'use client'

import { Message } from '@/db/models/messages'
import { useOptimistic, useState } from 'react'
import ChatActions from './ChatActions'
import ChatMessages from '@/app/(dashboard)/components/chat/ChatMessages'

type Props = {
  chatId: string
}

export default function ChatContainer({ chatId }: Props) {
  const existingMessages = [
    {
      chatId: '423423wedfs',
      text: 'hello',
      author: 'system',
      id: 123
    },
    {
      chatId: '423423wedfs',
      text: 'How are you?',
      author: 'user',
      id: 124
    }
  ] satisfies Message[]
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
      {/* chat messages */}
      <ChatMessages messages={optimisticMessages} />
      <ChatActions
        addMessages={addMessage}
        addOptimistic={addOptimistic}
        chatId={chatId}
      />
    </div>
  )
}
