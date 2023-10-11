import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";

export const downloadPDF = async (url: string, path: string) =>
  pipeline(
    // @ts-ignore
    (await fetch(url, { cache: "no-cache" })).body,
    createWriteStream(path)
  );
