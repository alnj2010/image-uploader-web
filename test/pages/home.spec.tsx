import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";

describe("Home page", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("Should render properly", () => {});
});