import { pgTable, pgEnum, serial, integer, text, timestamp } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"
export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])
export const authors = pgEnum("authors", ['user', 'system'])


export const documentEmbedding = pgTable("documentEmbedding", {
	id: serial("id").primaryKey().notNull(),
	documentId: integer("documentId").notNull(),
	documentPage: integer("documentPage").notNull(),
	documentText: text("documentText").notNull(),
	embedding: text("embedding").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	// TODO: failed to parse database type 'vector(1536)'
	embeddings: unknown("embeddings"),
});