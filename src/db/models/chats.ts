import { eq, InferInsertModel } from "drizzle-orm";
import { db } from "..";
import { chats } from "@/db/schema";

export type Chat = InferInsertModel<typeof chats>;

export const getFirstChatByUser = async (user_id: string) => {
  const result = await db
    .select()
    .from(chats)
    .where(eq(chats.userId, user_id))
    .limit(1);
  return result.length ? result[0] : null;
};

export const createChat = async (chat: Chat): Promise<string | null> => {
  const result = await db
    .insert(chats)
    .values({
      name: chat.name,
      userId: chat.userId,
      slug: chat.slug,
    })
    .returning({ insertedId: chats.id });
  return result.length ? result[0].insertedId : null;
};
