import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, File } from "formidable";
import fs from "fs";

type Data = {
  url: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const form = new IncomingForm();
  const url: string = await new Promise(async (resolve, reject) => {
    form.parse(req, async function (err, fields, files) {
      const image = files.image as File;
      const data = fs.readFileSync(image.filepath);
      const url = `./public/uploads/${image.newFilename}`;
      fs.writeFileSync(url, data);
      await fs.unlinkSync(image.filepath);

      resolve("url");
    });
  });
  res.status(201).json({ url: url });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
