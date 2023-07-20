import { act, fireEvent, render, screen } from "@testing-library/react";
import DropZone from "@/components/DropZone";
import "@testing-library/jest-dom";
import { filesToDataEvent, webImageDummy, webJSONFileDummy } from "../dummies";

describe("DropZone component", () => {
  let validateAndUploadHandler: jest.Mock;
  beforeEach(() => {
    validateAndUploadHandler = jest.fn();
    render(<DropZone validateAndUploadHandler={validateAndUploadHandler} />);
  });

  it("Should render properly", () => {
    expect(screen.getByTestId("dropzone-image")).toBeInTheDocument();
    expect(screen.getByTestId("dropzone-text")).toHaveTextContent(
      "Drag & Drop your image here"
    );
  });

  it("Should upload a image", async () => {
    const data = filesToDataEvent([webImageDummy]);
    const dropZone = screen.getByTestId("dropzone");
    await act(() => fireEvent.drop(dropZone, data));
    expect(validateAndUploadHandler).toHaveBeenCalled();
  });

  it("Should return a error message when upload a file different to images", async () => {
    const data = filesToDataEvent([webJSONFileDummy]);
    const dropZone = screen.getByTestId("dropzone");
    await act(() => fireEvent.drop(dropZone, data));
    expect(validateAndUploadHandler).toHaveBeenCalledWith(null, true);
  });

  it("Should return error message when upload multiples images", async () => {
    const data = filesToDataEvent([webImageDummy, webImageDummy]);
    const dropZone = screen.getByTestId("dropzone");
    await act(() => fireEvent.drop(dropZone, data));
    expect(validateAndUploadHandler).toHaveBeenCalledWith(null, true);
  });
});
