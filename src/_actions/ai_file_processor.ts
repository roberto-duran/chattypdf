"use server";

import { v2 as cloudinary } from "cloudinary";
import { getSession } from "@/lib/auth/session";
import { generateEmbeddingsFrom } from "@/lib/langchain";

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
  url: string;
};

export async function createChat({
  public_id,
  version,
  signature,
  original_filename,
  url,
}: UploadResponse) {
  const expectedSignature = cloudinary.utils.api_sign_request(
    { public_id, version },
    cloudinaryConfig.api_secret!
  );

  // this mean that the file was uploaded successfully
  if (expectedSignature === signature) {
    generateEmbeddingsFrom(url);
  }
}
