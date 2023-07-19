import { act, fireEvent, render, screen } from "@testing-library/react";
import DropZone from "@/components/DropZone";
import "@testing-library/jest-dom";

function mockData(files: File[]) {
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
    const file = new File([new Blob()], "dummy.png", {
      type: "image/*",
    });
    const data = mockData([file]);
    const dropZone = screen.getByTestId("dropzone");
    await act(() => fireEvent.drop(dropZone, data));
    expect(validateAndUploadHandler).toHaveBeenCalled();
  });

  it("Should return a error message when upload a file different to images", async () => {
    const file = new File([JSON.stringify({ ping: true })], "ping.json", {
      type: "application/json",
    });
    const data = mockData([file]);
    const dropZone = screen.getByTestId("dropzone");
    await act(() => fireEvent.drop(dropZone, data));
    expect(validateAndUploadHandler).toHaveBeenCalledWith(null, true);
  });

  it("Should return error message when upload multiples images", async () => {
    const file = new File([new Blob()], "dummy.png", {
      type: "image/*",
    });
    const data = mockData([file, file]);
    const dropZone = screen.getByTestId("dropzone");
    await act(() => fireEvent.drop(dropZone, data));
    expect(validateAndUploadHandler).toHaveBeenCalledWith(null, true);
  });
});
