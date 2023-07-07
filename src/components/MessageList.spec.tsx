import { render, screen } from "@testing-library/react";
import { expect } from "@jest/globals";
import MessageList from "./MessageList";

describe("<MessageList />", () => {
  beforeEach(async function () {
    render(<MessageList messages={["msg1", "msg2"]} />);
  });

  it("showing list of messages", async () => {
    const msgsList = Array.from(
      screen.getByTestId("messagelist").querySelectorAll("li")
    ).map((item) => item.textContent);

    expect(msgsList).toEqual(["msg1", "msg2"]);
  });
});
