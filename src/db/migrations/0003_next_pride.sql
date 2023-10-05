CREATE TABLE IF NOT EXISTS "documentEmbedding" (
	"id" serial PRIMARY KEY NOT NULL,
	"documentId" integer NOT NULL,
	"documentPage" integer NOT NULL,
	"documentText" text NOT NULL,
	embeddings extensions.vector(1536) null,
	"created_at" timestamp DEFAULT now() NOT NULL
);
