import { ImageURLs } from "@/domain/types";

export default async function upload(image: File): Promise<ImageURLs> {
  const body = new FormData();
  body.append("image", image);
  const response: Response = await fetch("/api/upload", {
    method: "POST",
    body,
  });

  const url: string = await response.json();
  return { url, temporalUrl: URL.createObjectURL(image) };
}
