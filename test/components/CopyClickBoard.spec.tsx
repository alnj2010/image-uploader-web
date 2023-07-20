import { render, screen } from "@testing-library/react";
import CopyClickBoard from "@/components/CopyClickBoard";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { imageURLsDummy } from "../dummies";

const writeText = jest.fn();

Object.assign(navigator, {
  clipboard: {
    writeText,
  },
});

describe("CopyClickBoard component", () => {
  it("Should render properly", () => {
    render(<CopyClickBoard link={imageURLsDummy.url} />);
    const urlImage = screen.getByTestId("url-image");
    const copyButton = screen.getByTestId("copy-button");

    expect(urlImage).toHaveTextContent(imageURLsDummy.url);
    expect(copyButton).toHaveTextContent("Copy Link");
  });

  it("Should copy link in the clipboard", async () => {
    render(<CopyClickBoard link={imageURLsDummy.url} />);
    const copyButton = screen.getByTestId("copy-button");
    await userEvent.click(copyButton);
    expect(copyButton).toHaveTextContent("Copied!");
    expect(writeText).toBeCalledTimes(1);
  });
});
