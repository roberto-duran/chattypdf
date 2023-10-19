'use client'

import { BiSend } from 'react-icons/bi'
import React, {useState, ChangeEvent, SetStateAction} from "react";
import {generateChatAI} from "@/_actions/ai_chat_processor";
import {Message} from "@/db/models/messages";

type ActionsProps = {
  addMessage: (message: Message) => void;
  chatId: string;
}

export default function ChatActions ({ addMessage, chatId }: ActionsProps) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value)
    if(e.currentTarget.value === '') {
      return
    }
  }

  const handleSubmit = async () => {
    if(message === '') {
      return
    }
    setLoading(true)
    const dataToSave = {
      text: message,
      author: "user",
      chatId: chatId,
      id: Math.floor(Math.random() * 1000000)
    } satisfies Message



    const result = await generateChatAI('asdfds', dataToSave)

    setLoading(false)
    addMessage(result)
    addMessage(dataToSave) //optimistic update haha
    setMessage('')
  }

  return (
    <form action={handleSubmit} className='flex gap-4 w-full mt-6'>
      <input
        type='text'
        placeholder='Ask here...'
        className='input input-bordered input-success w-full rounded-full'
        onChange={handleMessageChange}
        disabled={loading}
      />
      <button type="submit" className='btn btn-circle cool-btn' disabled={!message || loading}>
        {loading ? <i className="loading loading-infinity loading-lg"></i> : <BiSend className='h-6 w-6' />}
      </button>
    </form>
  )
}
