'use server'
import { unstable_noStore as noStore } from 'next/cache'

import { Message } from '@/db/models/messages'

export async function generateChatAI(
  conversationID: string,
  message: Message
): Promise<Message[]> {
  noStore()
  console.log('conversationID: ', conversationID, message)
  console.log('message: ', message)
  await new Promise(resolve => setTimeout(resolve, 3000))

  return [
    message,
    { text: 'hello', author: 'system', id: 121, chatId: 'sdf23werwe' }
  ]
}
