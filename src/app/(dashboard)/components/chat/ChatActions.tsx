'use client'

import { ChangeEvent, useRef, useState } from 'react'
import { generateChatAI } from '@/app/_actions/ai_chat_processor'
import { Message } from '@/db/models/messages'
import Button from '@/app/(dashboard)/components/chat/Button'

type ActionsProps = {
  addMessages: (message: Message[]) => void
  addOptimistic: (message: Message) => void
  chatId: string
}

export default function ChatActions({
  addMessages,
  addOptimistic,
  chatId
}: ActionsProps) {
  const refFrom = useRef<HTMLFormElement>(null)
  const [message, setMessage] = useState('')

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value)
    if (e.currentTarget.value === '') {
      return
    }
  }

  const handleSubmit = async () => {
    if (message === '') {
      return
    }

    refFrom.current?.reset()

    const dataToSave = {
      text: message,
      author: 'user',
      chatId: chatId,
      id: Math.floor(Math.random() * 1000000),
      created_at: new Date()
    } satisfies Message

    addOptimistic(dataToSave) //optimistic update haha
    const result = await generateChatAI('asdfds', dataToSave)

    addMessages(result as unknown as Message[])
  }

  return (
    <form
      ref={refFrom}
      action={handleSubmit}
      className="mt-6 flex w-full gap-4"
    >
      <input
        type="text"
        placeholder="Ask here..."
        className="input input-bordered input-success w-full rounded-full"
        onChange={handleMessageChange}
      />
      <Button />
    </form>
  )
}
