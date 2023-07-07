import { useState } from "react";

type MessageListProps = {
  messages: Array<string>;
};

export default function MessageList({ messages }: MessageListProps) {
  return (
    <ul data-testid="messagelist">
      {messages.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
}
