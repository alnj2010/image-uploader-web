import { ImageURLs } from "@/domain/types";

export const webImageDummy = new File([new Blob()], "dummy.png", {
  type: "image/*",
});

export const webJSONFileDummy = new File([JSON.stringify({ ping: true })], "ping.json", {
  type: "application/json",
});

export const imageURLsDummy: ImageURLs = {
    url: "/dummy.png",
    temporalUrl: "/dummy.png",
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
