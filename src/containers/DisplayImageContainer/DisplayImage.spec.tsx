import { fireEvent, render, screen, within } from "@testing-library/react";
import { expect } from "@jest/globals";
import DisplayImage from ".";

describe("<DisplayImage />", () => {
  let uploadHandlerMock: jest.Mock;

  beforeEach(async function () {
    uploadHandlerMock = jest.fn();
    render(<DisplayImage link="/image.png" />);
  });

  it("should redered a image", async () => {
    const imageSrc: HTMLImageElement = screen.getByTestId("image-src");

    expect(imageSrc.src).toContain("image.png");
  });
});
