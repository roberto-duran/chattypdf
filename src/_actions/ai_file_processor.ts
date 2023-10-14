"use server";

import { v2 as cloudinary } from "cloudinary";
import { getSession } from "@/lib/auth/session";
import { generateEmbeddingsFrom } from "@/lib/langchain";
import { generateSlug } from "@/utils";
import { createChat } from "@/db/models/chats";
import { createDocument, Document } from "@/db/models/documents";
import { creatBatchDocumentEmbedding } from "@/db/models/documentEmbeddings";

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

type Signature = {
  timestamp: string;
  signature: string;
};

export async function getSignature(): Promise<Signature> {
  const timestamp: string = Math.round(new Date().getTime() / 1000).toString();
  const session = await getSession();
  if (!session) {
    throw new Error("No session found");
  }
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "pdf" },
    cloudinaryConfig.api_secret!
  );

  return { timestamp, signature };
}

type UploadResponse = {
  public_id: string;
  version: string;
  signature: string;
  original_filename: string;
  size: number;
  url: string;
};

export async function generateChatAI({
  public_id,
  version,
  signature,
  original_filename,
  size,
  url,
}: UploadResponse) {
  const expectedSignature = cloudinary.utils.api_sign_request(
    { public_id, version },
    cloudinaryConfig.api_secret!
  );

  // this mean that the file was uploaded successfully
  if (expectedSignature === signature) {
    const session = await getSession();
    if (!session) {
      throw new Error("No session found");
    }
    const userId = session.user.id;
    const newChat = await createChat({
      name: original_filename,
      slug: generateSlug(original_filename),
      userId: userId,
    });

    const document_id = await createDocument({
      size,
      url,
      name: original_filename,
      type: "pdf",
      mime: "application/pdf",
      chatId: newChat?.insertedId as string,
    });

    const saveEnbeddings = _save_embeddings(
      (await generateEmbeddingsFrom(url)) as [],
      document_id as number
    );

    if (!saveEnbeddings) {
      throw new Error("Could not save embeddings");
    }

    return newChat?.slug;
  }
}

async function _save_embeddings(embeddings: [], document_id: number) {
  embeddings.forEach((embedding: any) => {
    embedding.documentId = document_id;
  });

  //split the embeddings into chunks of 50
  const chunkSize = 50;
  const chunks = [];

  for (let i = 0; i < embeddings.length; i += chunkSize) {
    chunks.push(embeddings.slice(i, i + chunkSize));
  }

  chunks.forEach(async (chunk) => {
    await creatBatchDocumentEmbedding(chunk);
  });

  return true;
}
