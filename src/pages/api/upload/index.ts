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
    try {
      const image: File = await getImage(req);
      const url = await uploader.upload(image);
      res.status(201).json(url);
    } catch (error: any) {
      res
        .status(error.codeStatus ?? 500)
        .send(error.message ?? "internal server error");
    }
  } else {
    res.status(404).send("not found");
  }
}
