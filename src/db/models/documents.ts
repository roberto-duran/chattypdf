import { eq, InferInsertModel } from 'drizzle-orm'
import { db } from '..'
import { chats, documents } from '@/db/schema'

export type Document = InferInsertModel<typeof documents>

export const getDocumentById = async (id: number) => {
  return await db.select().from(documents).where(eq(documents.id, id))
}

export const getFirstDocumentByUser = async (user_id: string) => {
  const result = await db
    .select({
      slug: chats.slug,
      chatId: documents.chatId,
      id: documents.id
    })
    .from(documents)
    .where(eq(chats.userId, user_id))
    .innerJoin(chats, eq(chats.id, documents.chatId))
    .limit(1)
  return result.length ? result[0] : null
}

export const createDocument = async (
  document: Document
): Promise<number | null> => {
  const result = await db
    .insert(documents)
    .values({
      chatId: document.chatId,
      name: document.name,
      url: document.url,
      size: document.size,
      type: document.type,
      mime: document.mime
    })
    .returning({ insertedId: documents.id })
  return result.length ? result[0].insertedId : null
}

export const getDocumentInfoFromChatId = async (chatId: string) => {
  const result = await db
    .select({
      id: documents.id,
      url: documents.url
    })
    .from(documents)
    .where(eq(documents.chatId, chatId))
    .limit(1)
  console.log(result)
  return result.length ? result[0] : null
}
