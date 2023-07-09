import { render, screen } from "@testing-library/react";
import { expect } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import CopyClickBoard from ".";

describe("<CopyClickBoard />", () => {
  let uploadHandlerMock: jest.Mock;

  beforeEach(async function () {
    uploadHandlerMock = jest.fn();
    render(<CopyClickBoard link="/image.png" />);
  });

  it("should copy url", async () => {
    const copyButton = screen.getByTestId("copy-button");
    const user = userEvent.setup();

    await user.click(copyButton);

    expect(copyButton.textContent).toBe("Copied!");
  });
});
