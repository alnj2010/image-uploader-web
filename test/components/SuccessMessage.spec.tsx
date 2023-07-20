import { render, screen } from "@testing-library/react";
import SuccessMessage from "@/components/SuccessMessage";
import "@testing-library/jest-dom";

describe("SuccessMessage component", () => {
  beforeEach(() => {
    render(<SuccessMessage />);
  });

  it("Should render properly", () => {
    expect(screen.getByTestId("success-image")).toBeInTheDocument();
    expect(screen.getByTestId("success-text")).toBeInTheDocument();
  });
});
