"use server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function createEmbedding(text: string) {
  try {
    const response = await openai.embeddings.create({
      input: text.replace(/\n/g, " "),
      model: "text-embedding-ada-002",
    });
    return response;
  } catch (error) {
    console.log("error creating embeddings", error);
    throw error;
  }
}
