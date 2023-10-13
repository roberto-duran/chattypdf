import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TokenTextSplitter } from "langchain/text_splitter";
import { createEmbedding } from "./embeddings";
import { downloadPDF } from "./document";

type PDF = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function generateEmbeddingsFrom(url: string, document_id: number) {
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
  //@ts-ignore
  const vectors = await Promise.all(documents.flat().map(embedDocument));
  //

  return vectors;
}

async function embedDocument(doc: PDF) {
  try {
    const embeddings = await createEmbedding(doc.pageContent);
    const docEmbedding = {
      embedding: embeddings.data[0].embedding,
      documentPage: doc.metadata.loc.pageNumber,
      documentText: doc.pageContent,
    };
    return docEmbedding;
  } catch (error) {
    console.error("error embedding document", error);
    throw error;
  }
}

async function prepareDocument(page: PDF) {
  let { pageContent } = page;
  pageContent = pageContent.replace(/\n/g, "");
  const splitter = new TokenTextSplitter({
    encodingName: "gpt2",
    chunkSize: 256,
    chunkOverlap: 0,
  });

  const outputs = await splitter.createDocuments([pageContent]);
  const documentsPerPage = [];

  for (const document of outputs) {
    const prepareDocument = {
      pageContent: document.pageContent,
      metadata: {
        loc: { pageNumber: page.metadata.loc.pageNumber },
      },
    };
    documentsPerPage.push(prepareDocument);
  }

  return documentsPerPage;
}
