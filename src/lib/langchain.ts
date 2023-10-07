import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { createEmbedding } from "./embeddings";
import { documentEmbeddings } from "@/db/schema";
type PDF = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function generateEmbeddingsFromUrl(url: string) {
  const loader = new PDFLoader(url);
  const pages = (await loader.load()) as PDF[];

  // 2. split and segment the pdf
  const documents = await Promise.all(pages.map(prepareDocument));
  console.log("documents", documents);
  // 3. vectorise and embed individual documents
  // const vectors = await Promise.all(documents.flat().map(embedDocument));

  //

  return documents[0];
}

// async function embedDocument(doc: typeof documentEmbeddings) {
//   try {
//     const embeddings = await createEmbedding(doc.documentText);
//     const hash = md5(doc.pageContent);

//     return {
//       id: hash,
//       values: embeddings,
//       metadata: {
//         text: doc.metadata.text,
//         pageNumber: doc.metadata.pageNumber,
//       },
//     } as PineconeRecord;
//   } catch (error) {
//     console.log("error embedding document", error);
//     throw error;
//   }
// }

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page: PDF) {
  let { pageContent } = page;
  pageContent = pageContent.replace(/\n/g, "");

  return pageContent;
}
