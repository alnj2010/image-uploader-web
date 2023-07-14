import { ImageURLs } from "./types";

export interface Uploader {
  upload(file: File): Promise<string>;
}
