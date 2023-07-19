import { act, fireEvent, render, screen } from "@testing-library/react";
import SelectImageButton from "@/components/SelectImageButton";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("SelectImageButton component", () => {
  let validateAndUploadHandler: jest.Mock;
  beforeEach(() => {
    validateAndUploadHandler = jest.fn();
    render(
      <SelectImageButton validateAndUploadHandler={validateAndUploadHandler} />
    );
  });

  it("Should render properly", () => {
    expect(screen.getByTestId("upload-button")).toBeInTheDocument();
  });

  it("Should upload a image", async () => {
    const file = new File([new Blob()], "dummy.png", {
      type: "image/*",
    });
    const button = screen.getByTestId("upload-button");
    await userEvent.upload(button, file);
    expect(validateAndUploadHandler).toHaveBeenCalledWith(file, false);
  });

  it("Should return a error message when upload a file different to images", async () => {
    const file = new File([JSON.stringify({ ping: true })], "ping.json", {
      type: "application/json",
    });
    const button = screen.getByTestId("upload-button");
    await userEvent.upload(button, file);
    expect(validateAndUploadHandler).toHaveBeenCalledWith(null, true);
  });
});
