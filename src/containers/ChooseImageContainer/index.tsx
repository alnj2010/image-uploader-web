import DropZone from "@/components/DropZone";
import styles from "./chosee-image-container.module.css";
import SelectImageButton from "@/components/SelectImageButton";
import { useState } from "react";

type ChooseImageContainerProps = {
  uploadHandler: (file: File) => void;
};

export default function ChooseImageContainer({
  uploadHandler,
}: ChooseImageContainerProps) {
  const [error, setError] = useState<boolean>(false);
  const validateAndUploadHandler = (
    file: File | null,
    isThereError: boolean | null
  ) => {
    if (file && !isThereError) uploadHandler(file);
    else {
      setError(!!isThereError);
    }
  };

  return (
    <div className={styles["choose-image-container"]}>
      <div className={styles.title} data-testid="title">
        Upload your image
      </div>
      <div
        className={`${styles.subtitle} ${error ? styles.error : null}`}
        data-testid="subtitle"
      >
        File should be Jpeg, Png,...
      </div>

      <div className={styles.dropzone} data-testid="dropzone-container">
        <DropZone validateAndUploadHandler={validateAndUploadHandler} />
      </div>
      <div className={styles.or}>Or</div>

      <div className={styles.button} data-testid="button-container">
        <SelectImageButton
          validateAndUploadHandler={validateAndUploadHandler}
        />
      </div>
    </div>
  );
}
