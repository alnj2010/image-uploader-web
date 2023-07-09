export type UploadResponse = {
  url: string;
  path: string;
};
export async function uploadImage(image: File): Promise<UploadResponse> {
  const body = new FormData();
  body.append("image", image);
  const response: Response = await fetch("/api/upload", {
    method: "POST",
    body,
  });

  const data: UploadResponse = await response.json();
  return data;
}
