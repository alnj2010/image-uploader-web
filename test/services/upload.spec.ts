import upload from "@/services/upload";
import { rest } from "msw";
import { setupServer } from "msw/node";
import fetch from "cross-fetch";
import { ImageURLs } from "@/domain/types";

const imageURLsDummy: ImageURLs = {
  url: "/url",
  temporalUrl: "/temp",
};

const fetchMock = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue(imageURLsDummy.url),
});

const createObjectURLMock = jest
  .fn()
  .mockReturnValue(imageURLsDummy.temporalUrl);

global.fetch = fetchMock;
global.URL.createObjectURL = createObjectURLMock;

describe("Upload service", () => {
  beforeEach(() => {
    fetchMock.mockClear();
    createObjectURLMock.mockClear();
  });

  it("Should upload a file properly", async () => {
    const image = new File([new Blob()], "dummy.png", {
      type: "image/*",
    });

    const result: ImageURLs = await upload(image);

    expect(fetchMock).toBeCalledTimes(1);
    expect(createObjectURLMock).toBeCalledTimes(1);
    expect(result).toEqual(imageURLsDummy);
  });
});
