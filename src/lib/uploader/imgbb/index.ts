import { Uploader } from "@/domain/uploader.interface";

export class ImgbbUploader implements Uploader {
  constructor() {}

  async upload(file: File): Promise<string> {
    const body = new FormData();
    body.append("image", file);

    const response: any = await fetch(
      `https://api.imgbb.com/1/upload?expiration=${600}&key=${
        process.env.IMGBB_API_KEY
      }`,
      {
        method: "POST",
        body,
      }
    );

    return response.data.url;
  }
}
