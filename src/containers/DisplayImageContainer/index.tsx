import Image from "next/image";
import CopyClickBoard from "../../components/CopyClickBoard";
import SuccessMessage from "@/components/SuccessMessage";
import { UploadResponse } from "@/services/upload";

type DisplayImageContainerProps = {
  link: UploadResponse;
};

export default function DisplayImageContainer({
  link,
}: DisplayImageContainerProps) {
  return (
    <div className="display-image-container">
      <div className="display-image-container__success-message">
        <SuccessMessage />
      </div>
      
      <Image
        src={link.path}
        alt="imagen uploded"
        data-testid="image-src"
        className="display-image-container__image"
        width={500}
        height={500}
      />
      <div className="display-image-container__copyclickboard">
        <CopyClickBoard link={link.url} />
      </div>
    </div>
  );
}
