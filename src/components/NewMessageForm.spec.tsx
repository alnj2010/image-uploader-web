import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewMessageForm from "./NewMessageForm";
import { expect } from "@jest/globals";

describe("<NewMessageForm />", () => {
  let sendHandler: any;

  beforeEach(async function () {
    const user = userEvent.setup();

    sendHandler = jest.fn().mockName("sendHandler");

    render(<NewMessageForm onSend={sendHandler} />);

    await user.type(screen.getByTestId("messageText"), "New message");
    await user.click(screen.getByTestId("sendButton"));
  });

  describe("clicking the send button", () => {
    it("clears the text field", async () => {
      expect(
        (screen.getByTestId("messageText") as HTMLInputElement).value
      ).toEqual("");
    });

    it("calls the send handler", async () => {
      expect(sendHandler).toHaveBeenCalledWith("New message");
    });
  });
});
