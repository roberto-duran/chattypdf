import { asc, eq, InferInsertModel } from 'drizzle-orm'
import { db } from '..'
import { messages } from '@/db/schema'
import { getSession } from '@/lib/auth/session'

export type Message = InferInsertModel<typeof messages>

export const getMessagesByChatId = async (chatId: string) => {
  return db
    .select()
    .from(messages)
    .where(eq(messages.chatId, chatId))
    .orderBy(asc(messages.created_at))
}

export const createMessage = async (message: Message) => {
  const session = getSession()
  if (!session) {
    throw new Error('Unauthorized')
  }
  const newMessage = await db
    .insert(messages)
    .values({
      chatId: message.chatId,
      author: message.author,
      text: message.text
    })
    .returning()
  return newMessage.length ? newMessage[0] : null
}
