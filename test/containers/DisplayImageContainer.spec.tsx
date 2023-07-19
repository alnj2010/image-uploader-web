import { render, screen } from "@testing-library/react";
import DisplayImageContainer from "@/containers/DisplayImageContainer";
import "@testing-library/jest-dom";
import { ImageURLs } from "@/domain/types";

const imageURLDummy: ImageURLs = {
  url: "urlDummy",
  temporalUrl: "/temporal",
};

describe("DisplayImageContainer component", () => {
  beforeEach(() => {
    render(<DisplayImageContainer imageURLs={imageURLDummy} />);
  });

  it("Should render properly", () => {
    expect(screen.getByTestId("image-src")).toBeInTheDocument();
    expect(screen.getByTestId("url-image")).toBeInTheDocument();
  });

  it("Should show url", async () => {
    expect(screen.getByTestId("url-image")).toHaveTextContent(
      imageURLDummy.url
    );
  });
});
