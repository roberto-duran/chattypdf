import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TokenTextSplitter } from "langchain/text_splitter";
import { createEmbedding } from "./embeddings";
import { downloadPDF } from "./document";
import { CreateEmbeddingResponse } from "openai";

type PDF = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function generateEmbeddingsFrom(url: string) {
  const file_name = `/tmp/doc${Date.now().toString()}.pdf`;
  await downloadPDF(url, file_name);
  if (!file_name) {
    throw new Error("could not download from s3");
  }

  const loader = new PDFLoader(file_name);
  const pages = (await loader.load()) as PDF[];

  // 2. split and segment the pdf
  const documents = await Promise.all(pages.map(prepareDocument));
  // 3. vectorise and embed individual documents
  const vectors = await Promise.all(documents.flat().map(embedDocument));
  console.log("vectors", vectors);
  //

  return documents[0];
}

async function embedDocument(doc: PDF): Promise<CreateEmbeddingResponse> {
  try {
    console.log("doc", doc);
    const embeddings = await createEmbedding(doc.pageContent);
    return embeddings;
  } catch (error) {
    console.error("error embedding document", error);
    throw error;
  }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page: PDF) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");
  const splitter = new TokenTextSplitter({
    encodingName: "gpt2",
    chunkSize: 256,
    chunkOverlap: 0,
  });
  const output = await splitter.createDocuments([pageContent]);
  return output;
}
