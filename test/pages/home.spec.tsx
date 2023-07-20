import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/pages";
import {
  filesToDataEvent,
  imageURLsDummy,
  webImageDummy,
  webJSONFileDummy,
} from "../dummies";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

const writeText = jest.fn();

Object.assign(navigator, {
  clipboard: {
    writeText,
  },
});

describe("Home page", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(imageURLsDummy.url),
    });
    global.URL.createObjectURL = jest
      .fn()
      .mockReturnValue(imageURLsDummy.temporalUrl);

    global.navigator.clipboard.writeText = jest.fn();
    writeText.mockClear();
    render(<Home />);
  });

  it("Should render properly", () => {
    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("subtitle")).toBeInTheDocument();
    expect(screen.getByTestId("dropzone-container")).toBeInTheDocument();
    expect(screen.getByTestId("dropzone-text")).toBeInTheDocument();
    expect(screen.getByTestId("upload-button")).toBeInTheDocument();
  });
  it("Should drag and drop an image to upload it", async () => {
    const data = filesToDataEvent([webImageDummy]);
    const dropZone = screen.getByTestId("dropzone");
    await act(() => fireEvent.drop(dropZone, data));
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("Should choose to select an image from my folder", async () => {
    const button = screen.getByTestId("upload-button");
    await userEvent.upload(button, webImageDummy);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("Should see a loader when uploading", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject());

    const button = screen.getByTestId("upload-button");
    await userEvent.upload(button, webImageDummy);
    expect(screen.getByTestId("uploading-text")).toBeInTheDocument();
    expect(screen.getByTestId("progress")).toBeInTheDocument();
  });
  it("When the image is uploaded, Should see the image and copy it", async () => {
    const button = screen.getByTestId("upload-button");
    await userEvent.upload(button, webImageDummy);
    expect(screen.getByTestId("success-image")).toBeInTheDocument();
    expect(screen.getByTestId("copy-button")).toBeInTheDocument();
  });
  it("When the image is uploaded, Should choose to copy to the clipboard", async () => {
    const button = screen.getByTestId("upload-button");
    await userEvent.upload(button, webImageDummy);
    const copyButton = screen.getByTestId("copy-button");
    await userEvent.click(copyButton);
    expect(copyButton).toHaveTextContent("Copied!");
    waitFor(() => expect(writeText).toBeCalledWith(imageURLsDummy.url));
  });

  it("Should go /500 route", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject());

    const button = screen.getByTestId("upload-button");
    await userEvent.upload(button, webImageDummy);
    expect(mockRouter.asPath).toBe("/500");
  });

  it("Should return a error message when upload a file different to images", async () => {
    const button = screen.getByTestId("upload-button");
    await userEvent.upload(button, webJSONFileDummy);
    expect(screen.getByTestId("subtitle")).toHaveClass("error");
  });
});
