import { act, fireEvent, render, screen } from "@testing-library/react";
import SuccessMessage from "@/components/SuccessMessage";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("SuccessMessage component", () => {
  beforeEach(() => {
    render(<SuccessMessage />);
  });

  it("Should render properly", () => {
    expect(screen.getByTestId("success-image")).toBeInTheDocument();
    expect(screen.getByTestId("success-text")).toBeInTheDocument();
  });
});
