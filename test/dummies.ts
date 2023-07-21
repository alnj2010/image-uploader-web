import { ImageURLs } from "@/domain/types";
import { File as CustomFile } from "@/domain/uploader.interface";

export const customAPIFileDummy: CustomFile = {
  filename: "dummy.png",
  buffer: Buffer.from(""),
};

export const webImageDummy = new File([new Blob()], customAPIFileDummy.filename, {
  type: "image/*",
});

export const webJSONFileDummy = new File(
  [JSON.stringify({ ping: true })],
  "ping.json",
  {
    type: "application/json",
  }
);

export const imageURLsDummy: ImageURLs = {
  url: `/${customAPIFileDummy.filename}`,
  temporalUrl: `/${customAPIFileDummy.filename}`,
};

export function filesToDataEvent(files: File[]) {
  return {
    dataTransfer: {
      files,
      items: files.map((file) => ({
        kind: "file",
        type: file.type,
        getAsFile: () => file,
      })),
      types: ["Files"],
    },
  };
}
