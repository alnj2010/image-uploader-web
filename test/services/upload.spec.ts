import upload from "@/services/upload";
import { ImageURLs } from "@/domain/types";
import { imageURLsDummy, webImageDummy } from "../dummies";

describe("Upload service", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(imageURLsDummy.url),
    });
    global.URL.createObjectURL = jest
      .fn()
      .mockReturnValue(imageURLsDummy.temporalUrl);
  });

  it("Should upload a file properly", async () => {
    const result: ImageURLs = await upload(webImageDummy);

    expect(global.fetch).toBeCalledTimes(1);
    expect(global.URL.createObjectURL).toBeCalledTimes(1);
    expect(result).toEqual(imageURLsDummy);
  });
});
