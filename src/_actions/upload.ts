"use server";

import { v2 as cloudinary } from "cloudinary";

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

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "next" },
    //@ts-ignore
    cloudinaryConfig.api_secret
  );

  return { timestamp, signature };
}

export async function saveToDatabase({
  public_id,
  version,
  signature,
}: {
  public_id: string;
  version: string;
  signature: string;
}) {
  // verify the data the ts-ignores are bcs cloudinary is not typed
  const expectedSignature = cloudinary.utils.api_sign_request(
    { public_id, version },
    //@ts-ignore
    cloudinaryConfig.api_secret
  );

  if (expectedSignature === signature) {
    // safe to write to database
    console.log({ public_id });
  }
}
