import { eq, InferInsertModel } from "drizzle-orm";
import { db } from "..";
import { messages } from "@/db/schema";
import { getSession } from "@/lib/auth/session";

export type Message = InferInsertModel<typeof messages>;

export const getMessagesByChatId = async (chatId: string) => {
  return await db.select().from(messages).where(eq(messages.chatId, chatId));
};
