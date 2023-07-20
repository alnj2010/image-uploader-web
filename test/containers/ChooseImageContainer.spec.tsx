import { act, fireEvent, render, screen } from "@testing-library/react";
import ChooseImageContainer from "@/containers/ChooseImageContainer";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { filesToDataEvent, webImageDummy, webJSONFileDummy } from "../dummies";

describe("ChooseImageContainer component", () => {
  let uploaderService: jest.Mock;
  beforeEach(() => {
    uploaderService = jest.fn();
    render(<ChooseImageContainer uploadHandler={uploaderService} />);
  });

  it("Should render properly", () => {
    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("subtitle")).toBeInTheDocument();
    expect(screen.getByTestId("dropzone-container")).toBeInTheDocument();
    expect(screen.getByTestId("button-container")).toBeInTheDocument();
  });

  it("Should upload a image using dropzone", async () => {
    const data = filesToDataEvent([webImageDummy]);
    const dropZone = screen.getByTestId("dropzone");
    await act(() => fireEvent.drop(dropZone, data));
    expect(uploaderService).toHaveBeenCalledWith(webImageDummy);
  });

  it("Should upload a image using button", async () => {
    const file = new File([new Blob()], "dummy.png", {
      type: "image/*",
    });
    const button = screen.getByTestId("upload-button");
    await userEvent.upload(button, file);
    expect(uploaderService).toHaveBeenCalledWith(file);
  });

  it("Should return a error message when upload a file different to images", async () => {
    const data = filesToDataEvent([webJSONFileDummy]);
    const dropZone = screen.getByTestId("dropzone");
    await act(() => fireEvent.drop(dropZone, data));
    expect(screen.getByTestId("subtitle")).toHaveClass("error");
  });
});
