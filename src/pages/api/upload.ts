import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, File } from "formidable";
import fs from "fs";

type Data = {
  path: string;
  url: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const form = new IncomingForm();

  const image: File = await new Promise(async (resolve, reject) => {
    form.parse(req, async function (err, fields, files) {
      if (err) {
        reject(err);
      }
      const file = files.image as File;
      resolve(file);
    });
  });
  const filename = `${image.newFilename}_${image.originalFilename}`;
  const path = `/upload/${filename}`;
  const url = `${req.headers.host}${path}`;
  const data = fs.readFileSync(image.filepath);
  const destination = `public${path}`;
  if (!fs.existsSync('public/upload')){
    fs.mkdirSync('public/upload');
}
  fs.writeFileSync(destination, data);
  await fs.unlinkSync(image.filepath);
  res.status(201).json({
    path,
    url,
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
