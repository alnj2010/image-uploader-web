import { render, screen } from "@testing-library/react";
import DisplayImageContainer from "@/containers/DisplayImageContainer";
import "@testing-library/jest-dom";
import { imageURLsDummy } from "../dummies";

describe("DisplayImageContainer component", () => {
  beforeEach(() => {
    render(<DisplayImageContainer imageURLs={imageURLsDummy} />);
  });

  it("Should render properly", () => {
    expect(screen.getByTestId("image-src")).toBeInTheDocument();
    expect(screen.getByTestId("url-image")).toBeInTheDocument();
  });

  it("Should show url", async () => {
    expect(screen.getByTestId("url-image")).toHaveTextContent(
      imageURLsDummy.url
    );
  });
});
