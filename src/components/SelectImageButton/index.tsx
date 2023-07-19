import { ChangeEvent } from "react";
import styles from "./select-image-button.module.css";

type SelectImageButtonProps = {
  validateAndUploadHandler: (file: File | null, isThereError: boolean) => void;
};

export default function SelectImageButton({
  validateAndUploadHandler,
}: SelectImageButtonProps) {
  const handleImageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    const allowedExtensions = /(\.png|\.gif|\.jpeg|\.jpg|\.svg)$/i;
    if (files && files.length === 1 && allowedExtensions.exec(files[0].name)) {
      validateAndUploadHandler(files[0], false);
    } else {
      validateAndUploadHandler(null, true);
    }
  };

  return (
    <label
      className={styles["select-image-button"]}
      htmlFor="contained-button-file"
    >
      <input
        multiple={false}
        type="file"
        style={{ display: "none" }}
        onChange={handleImageSelect}
        id="contained-button-file"
        data-testid="upload-button"
      />
      Choose a file
    </label>
  );
}
