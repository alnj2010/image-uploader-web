import DropZone from "@/components/DropZone";
import styles from "./chosee-image-container.module.css";
import SelectImageButton from "@/components/SelectImageButton";

type ChooseImageContainerProps = {
  uploadHandler: (file: File) => void;
};

export default function ChooseImageContainer({
  uploadHandler,
}: ChooseImageContainerProps) {
  return (
    <div className={styles["choose-image-container"]}>
      <div className={styles.title}>Upload your image</div>
      <div className={styles.subtitle}>File should be Jpeg, Png,...</div>

      <div className={styles.dropzone}>
        <DropZone uploadHandler={uploadHandler} />
      </div>
      <div className={styles.or}>Or</div>

      <div className={styles.button}>
        <SelectImageButton uploadHandler={uploadHandler} />
      </div>
    </div>
  );
}
