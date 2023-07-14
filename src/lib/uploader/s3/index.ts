import { Uploader } from "@/domain/uploader.interface";
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
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const params = {
      Bucket: process.env.S3_BUCKET as string,
      Key: file.name,
      Body: buffer,
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
