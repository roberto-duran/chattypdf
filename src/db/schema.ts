import {
  timestamp,
  pgTable,
  text,
  serial,
  primaryKey,
  integer,
  uniqueIndex,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

import { vector } from "./custonTypes/vector";

export const AuthorsEnum = pgEnum("authors", ["user", "system"]);

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

export const chats = pgTable("chat", {
  id: uuid("id").notNull().defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const messages = pgTable("message", {
  id: serial("id").notNull().primaryKey(),
  text: text("text").notNull(),
  author: AuthorsEnum("authors").notNull(),
  chatId: uuid("chatId").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const documents = pgTable(
  "document",
  {
    id: serial("id").notNull().primaryKey(),
    name: text("name").notNull(),
    size: integer("size").notNull(),
    type: text("type").notNull(),
    mime: text("mime").notNull(),
    url: text("url").notNull(),
    chatId: text("chatId").notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
  },
  (document) => ({
    nameIndex: uniqueIndex("documents_name_idx").on(document.name),
  })
);

export const documentEmbeddings = pgTable("documentEmbedding", {
  id: serial("id").notNull().primaryKey(),
  documentId: integer("documentId").notNull(),
  documentPage: integer("documentPage").notNull(),
  documentText: text("documentText").notNull(),
  embedding: vector("embedding", { dimension: 1536 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});
