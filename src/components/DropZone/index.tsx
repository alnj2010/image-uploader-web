import styles from "./drop-zone.module.css";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

type DropZoneProps = {
  validateAndUploadHandler: (file: File | null, isThereError: boolean) => void;
};

export default function DropZone({ validateAndUploadHandler }: DropZoneProps) {
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length == 1) {
      validateAndUploadHandler(acceptedFiles[0], false);
    } else {
      validateAndUploadHandler(null, true);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div
      data-testid="dropzone"
      {...getRootProps({
        className: `${styles.dropzone} ${isDragActive && styles.dragactive}`,
      })}
    >
      <input {...getInputProps()} />
      <>
        <Image
          priority
          src="/image.svg"
          alt="dropzone image"
          data-testid="dropzone-image"
          className={styles.image}
          width={114}
          height={88}
        />
        <div className={styles.text} data-testid="dropzone-text">
          Drag & Drop your image here
        </div>
      </>
    </div>
  );
}
