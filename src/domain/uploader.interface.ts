export interface Uploader {
  upload(file: File): Promise<string>;
}
