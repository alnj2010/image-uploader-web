
export async function uploadImage(image: File): Promise<string> {
  console.log("call endpoint...");
  const body = new FormData();
  body.append("image", image);
  const response = await fetch("/api/upload", {
    method: "POST",
    body,
  });

  return URL.createObjectURL(image);
}
