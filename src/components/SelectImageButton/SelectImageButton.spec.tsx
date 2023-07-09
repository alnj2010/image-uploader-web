import { fireEvent, render, screen, within } from "@testing-library/react";
import { expect } from "@jest/globals";
import SelectImageButton from ".";

describe("<SelectImageButton />", () => {
  let uploadHandlerMock:jest.Mock

  beforeEach(async function () {
    uploadHandlerMock=jest.fn()
    render(<SelectImageButton uploadHandler={uploadHandlerMock} />);
  });

  it("should retrive the selected image", async () => {

    const fileInput = screen.getByTestId('upload-button');
    const file = new File(['test file content'], 'test.png', {
        type: 'image/png',
    });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(uploadHandlerMock.mock.calls).toHaveLength(1);
    expect(uploadHandlerMock.mock.calls[0].length).toBe(1);
    expect(uploadHandlerMock.mock.calls[0][0]).toBe(file);
  });
});
