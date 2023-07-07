import { useState } from "react";

type NewMessageFormProps = {
  onSend: (newMessage: string) => void;
};

export default function NewMessageForm(props: NewMessageFormProps) {
  const [inputText, setInputText] = useState("");

  function handleTextChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputText(event.target.value);
  }

  function handleSend() {
    setInputText("");
    props.onSend(inputText);
  }

  return (
    <>
      <input
        type="text"
        data-testid="messageText"
        value={inputText}
        onChange={handleTextChange}
      />
      <button data-testid="sendButton" onClick={handleSend}>
        Send
      </button>
    </>
  );
}
