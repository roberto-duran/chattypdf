'use server'

import {Message} from "@/db/models/messages";

export async function generateChatAI(conversationID: string, message: Message): Promise<Message> {
  console.log("conversationID: ", conversationID,message)
  console.log("message: ",message)
  return {id: 121, chatId:'sdf23werwe', author: 'system', text: 'hello'}
}
