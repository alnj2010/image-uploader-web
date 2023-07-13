import { useCallback } from "react";
import styles from "./drop-zone.module.css";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

type DropZoneProps = {
  uploadHandler: (file: File) => void;
};

export default function DropZone({ uploadHandler }: DropZoneProps) {
  const onDrop = (acceptedFiles: any) => {
    uploadHandler(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
  return (
    <div {...getRootProps({ className: styles.dropzone })}>
      <input {...getInputProps()} />
      <>
        <Image
          priority
          src="/image.svg"
          alt="dragzone image"
          data-testid="dragzone-image"
          className={styles.image}
          width={114}
          height={88}
        />
        <div className={styles.text}>Drag & Drop your image here</div>
      </>
    </div>
  );
}
