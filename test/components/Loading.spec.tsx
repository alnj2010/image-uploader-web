import { render, screen } from "@testing-library/react";
import Loading from "@/components/Loading";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("Loading component", () => {
  const urlDummy = "url-dummy";

  it("Should render properly", () => {
    render(<Loading />);
    const text = screen.getByTestId("uploading-text");
    const progress = screen.getByTestId("progress");

    expect(text).toBeInTheDocument();
    expect(progress).toBeInTheDocument();
  });
});
