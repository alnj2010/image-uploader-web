import { createMocks } from "node-mocks-http";
import handleUpload from "@/pages/api/upload";
import { customAPIFileDummy, imageURLsDummy, webImageDummy } from "../dummies";
import * as parserForm from "@/lib/parserForm";
import uploader from "@/lib/uploader";

jest.mock("../../src/lib/parserForm", () => {
  return {
    getImage: jest.fn(),
  };
});

jest.mock("../../src/lib/uploader", () => {
  return {
    upload: jest.fn(),
  };
});

describe("endpoint POST /upload", () => {
  beforeEach(() => {});

  it("Should upload a file properly", async () => {
    jest.spyOn(parserForm, "getImage").mockResolvedValue(customAPIFileDummy);
    jest.spyOn(uploader, "upload").mockResolvedValue(imageURLsDummy.url);

    const body = new FormData();
    body.append("image", webImageDummy);

    const { req, res } = createMocks({
      method: "POST",
      body,
    });
    await handleUpload(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toBe(imageURLsDummy.url);
  });

  it("Should return 404 code when http method is incorrect", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });
    await handleUpload(req, res);
    expect(res.statusCode).toBe(404);
  });

  it("Should return 500 code when a error has occurred", async () => {
    jest.spyOn(parserForm, "getImage").mockResolvedValue(customAPIFileDummy);
    jest.spyOn(uploader, "upload").mockRejectedValue("error");

    const body = new FormData();
    body.append("image", webImageDummy);

    const { req, res } = createMocks({
      method: "POST",
      body,
    });

    await handleUpload(req, res);
    expect(res.statusCode).toBe(500);
  });

  it("Should return 400 code when a bad request error has occurred", async () => {
    jest
      .spyOn(parserForm, "getImage")
      .mockRejectedValue({ codeStatus: 400, message: "bad request" });

    const body = new FormData();
    body.append("badimage", webImageDummy);

    const { req, res } = createMocks({
      method: "POST",
      body,
    });

    await handleUpload(req, res);
    expect(res.statusCode).toBe(400);
  });
});
