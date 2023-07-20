import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import uploader from "@/lib/uploader";
import { getImage } from "@/lib/parserForm";
import { File } from "@/domain/uploader.interface";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const image: File = await getImage(req);
    const url = await uploader.upload(image);
    res.status(201).json(url);
  } else {
    res.status(404).send("not found");
  }
}