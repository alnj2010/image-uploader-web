import styles from "./index.module.css";
import Link from "next/link";

export default function Custom500() {
  return (
    <div className={styles["uploader-container"]}>
      <p>An error in the upload has occurred</p>
      <Link href="/">please try again</Link>
    </div>
  );
}
