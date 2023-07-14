import { NextResponse } from "next/server";
import uploader from "@/lib/uploader";

export async function POST(request: Request) {
  const data = await request.formData();
  const file: File | null = data.get("image") as unknown as File;

  const url = await uploader.upload(file);
  return NextResponse.json<string>(url);
}
