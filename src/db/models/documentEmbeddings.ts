import { eq, InferInsertModel } from "drizzle-orm";
import { db } from "..";
import { documentEmbeddings } from "@/db/schema";

export type DocumentEmbedding = InferInsertModel<typeof documentEmbeddings>;

export const createChat = async (
  documentEmbedding: DocumentEmbedding
): Promise<number | null> => {
  const result = await db
    .insert(documentEmbeddings)
    .values({
      documentId: documentEmbedding.documentId,
      embedding: documentEmbedding.embedding,
      documentPage: documentEmbedding.documentPage,
      documentText: documentEmbedding.documentText,
    })
    .returning({ insertedId: documentEmbeddings.id });
  return result.length ? result[0].insertedId : null;
};
