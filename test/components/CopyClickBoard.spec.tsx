import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CopyClickBoard from "@/components/CopyClickBoard";

describe("CopyClickBoard component", () => {
  it("Should render properly", () => {
    const urlDummy = "url-dummy";

    render(<CopyClickBoard link={urlDummy} />);
    const urlImage = screen.getByTestId("url-image");
    const copyButton = screen.getByTestId("copy-button");

    expect(urlImage).toHaveTextContent(urlDummy);
    expect(copyButton).toHaveTextContent("Copy Link");
  });
});
