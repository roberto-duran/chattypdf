import { eq } from "drizzle-orm";
import { db } from "../db";
import { documents } from "@/db/schema";

export const getDocumentById = async (id: number) => {
  return await db.select().from(documents).where(eq(documents.id, id));
};

export const getFirstDocumentByUser = async (user_id: string) => {
  const result = await db
    .select()
    .from(documents)
    .where(eq(documents.userId, user_id))
    .limit(1);
  return result.length ? result[0] : null;
};

export const createDocument = async (document) => {
  const result = await db
    .insert(documents)
    .values({
      chatId: document.chatId,
      name: document.name,
      url: document.url,
      slug: document.slug,
      size: document.size,
      type: document.type,
      mime: document.mime,
    })
    .returning({ insertedId: document.id });
  return result.length ? result[0] : null;
};
