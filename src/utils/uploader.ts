import { S3 } from "aws-sdk";

export type ImageURLs = {
  url: string;
  temporalUrl: string;
};

const s3 = new S3({
  accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_S3_REGION,
});

export async function upload(file: File): Promise<ImageURLs> {
  console.log(process.env);
  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET as string,
    Key: file.name,
    Body: file,
  };

  try {
    const payload = await s3.upload(params).promise();
    return {
      url: payload.Location,
      temporalUrl: URL.createObjectURL(file),
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
