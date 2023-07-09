import { useState } from "react";

type CopyClickBoardProps = {
  link: string;
};

export default function CopyClickBoard({ link }: CopyClickBoardProps) {
  const [isCopied, setCopied] = useState<boolean>(false);
  function copyHandler() {
    navigator.clipboard.writeText(link);
    setCopied(true)
  }
  return (
    <div className="copy-click-board">
      <div className="copy-click-board__url" data-testid="url-image">{link}</div>
      <button className="copy-click-board__button" data-testid="copy-button" onClick={copyHandler}>
     { !isCopied? 'Copy Link':'Copied!'}
      </button>
    </div>
  );
}
