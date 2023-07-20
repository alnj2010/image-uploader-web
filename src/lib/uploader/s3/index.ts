import { Uploader, File } from "@/domain/uploader.interface";
import { S3 } from "aws-sdk";

export class S3Uploader implements Uploader {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      region: process.env.S3_REGION,
    });
  }

  async upload(file: File): Promise<string> {
    const params = {
      Bucket: process.env.S3_BUCKET as string,
      Key: file.filename,
      Body: file.buffer,
    };

    try {
      const payload = await this.s3.upload(params).promise();
      return payload.Location;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
