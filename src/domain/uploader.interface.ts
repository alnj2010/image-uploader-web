export type File = {
  filename: string;
  buffer: Buffer;
};
export interface Uploader {
  upload(file: File): Promise<string>;
}
