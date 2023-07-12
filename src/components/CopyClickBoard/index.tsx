import { useState } from "react";
import styles from "./copy-click-board.module.css";


type CopyClickBoardProps = {
  link: string;
};

export default function CopyClickBoard({ link }: CopyClickBoardProps) {
  const [isCopied, setCopied] = useState<boolean>(false);
  function copyHandler() {
    navigator.clipboard.writeText(link);
    setCopied(true);
  }
  return (
    <div className={styles["copy-click-board"]}>
      <div className={styles.url} data-testid="url-image">
        {link}
      </div>
      <button
        className={styles.button}
        data-testid="copy-button"
        onClick={copyHandler}
      >
        {!isCopied ? "Copy Link" : "Copied!"}
      </button>
    </div>
  );
}
