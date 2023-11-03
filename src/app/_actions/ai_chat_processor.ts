'use server'

import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PGVectorStore } from 'langchain/vectorstores/pgvector'
import { PoolConfig } from 'pg'

import { unstable_noStore as noStore } from 'next/cache'
import { createMessage, Message } from '@/db/models/messages'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const config = {
  postgresConnectionOptions: {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  } as PoolConfig,
  tableName: 'documentEmbedding',
  columns: {
    idColumnName: 'id',
    vectorColumnName: 'embedding',
    contentColumnName: 'documentText',
    metadataColumnName: 'documentPage'
  }
}

export async function generateChatAI(
  conversationID: string,
  message: Message
): Promise<Message[]> {
  noStore()
  const userMessage = await createMessage(message)

  const pgvectorStore = await PGVectorStore.initialize(
    new OpenAIEmbeddings(),
    config
  )

  const getEmbeddings = await pgvectorStore.similaritySearch(
    'La Llorona when she was a living person',
    2
  )
  console.log('getEmbedding', getEmbeddings)

  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
      The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      START CONTEXT BLOCK
      ${'context'}
      END OF CONTEXT BLOCK
      AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
      If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
      AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
      AI assistant will not invent anything that is not drawn directly from the context.
      `
      },
      { role: 'user', content: message.text }
    ]
  })

  console.log(chatCompletion.choices)

  return [
    userMessage as Message,
    { text: 'hello', author: 'system', id: 121, chatId: 'sdf23werwe' }
  ]
}
