import Image from "next/image";
import CopyClickBoard from "../../components/CopyClickBoard";
import SuccessMessage from "@/components/SuccessMessage";
import styles from "./display-image-container.module.css";
import { ImageURLs } from "@/utils/uploader";

type DisplayImageContainerProps = {
  imageURLs: ImageURLs;
};

export default function DisplayImageContainer({
  imageURLs,
}: DisplayImageContainerProps) {
  return (
    <div className="display-image-container">
      <div className={styles["success-message"]}>
        <SuccessMessage />
      </div>

      <div className={styles.imagecontainer}>
        <Image
          src={imageURLs.temporalUrl}
          alt="imagen uploded"
          data-testid="image-src"
          className={styles.image}
          width={500}
          height={500}
        />
      </div>
      <div className={styles.copyclickboard}>
        <CopyClickBoard link={imageURLs.url} />
      </div>
    </div>
  );
}
