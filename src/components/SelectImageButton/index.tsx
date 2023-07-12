import { ChangeEvent } from "react";
import styles from "./select-image-button.module.css";

type SelectImageButtonProps = {
  uploadHandler: (file: File) => void;
};



export default function SelectImageButton({
  uploadHandler,
}: SelectImageButtonProps) {
  const handleImageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadHandler(e.target.files[0]);
    }
  };

  return (
    <label
      className={styles["select-image-button"]}
      htmlFor="contained-button-file"
    >
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageSelect}
        id="contained-button-file"
        data-testid="upload-button"
      />
      Choose a file
    </label>
  );
}
