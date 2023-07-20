import { render, screen } from "@testing-library/react";
import SelectImageButton from "@/components/SelectImageButton";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { webImageDummy, webJSONFileDummy } from "../dummies";

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
    const button = screen.getByTestId("upload-button");
    await userEvent.upload(button, webImageDummy);
    expect(validateAndUploadHandler).toHaveBeenCalledWith(webImageDummy, false);
  });

  it("Should return a error message when upload a file different to images", async () => {
    const button = screen.getByTestId("upload-button");
    await userEvent.upload(button, webJSONFileDummy);
    expect(validateAndUploadHandler).toHaveBeenCalledWith(null, true);
  });
});
