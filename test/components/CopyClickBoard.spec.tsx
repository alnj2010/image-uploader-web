import { render, screen } from "@testing-library/react";
import CopyClickBoard from "@/components/CopyClickBoard";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const writeText = jest.fn();

Object.assign(navigator, {
  clipboard: {
    writeText,
  },
});

describe("CopyClickBoard component", () => {
  const urlDummy = "url-dummy";

  it("Should render properly", () => {
    render(<CopyClickBoard link={urlDummy} />);
    const urlImage = screen.getByTestId("url-image");
    const copyButton = screen.getByTestId("copy-button");

    expect(urlImage).toHaveTextContent(urlDummy);
    expect(copyButton).toHaveTextContent("Copy Link");
  });

  it("Should copy link in the clipboard", async () => {
    render(<CopyClickBoard link={urlDummy} />);
    const copyButton = screen.getByTestId("copy-button");
    await userEvent.click(copyButton);
    expect(copyButton).toHaveTextContent("Copied!");
    expect(writeText).toBeCalledTimes(1);
  });
});
