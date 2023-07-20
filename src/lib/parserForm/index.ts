import * as fs from "fs";
import { NextApiRequest } from "next";
import { IncomingForm, File as FormidableFile } from "formidable";
import { File } from "@/domain/uploader.interface";

export function getImage(req: NextApiRequest): Promise<File> {
  const form = new IncomingForm();

  return new Promise(async (resolve, reject) => {
    form.parse(req, async function (err, fields, files) {
      if (err) {
        reject(err);
      }
      const buffer = fs.readFileSync((files.image as FormidableFile).filepath);
      resolve({
        filename:
          (files.image as FormidableFile).originalFilename ?? "unnameless",
        buffer: buffer,
      });
    });
  });
}
