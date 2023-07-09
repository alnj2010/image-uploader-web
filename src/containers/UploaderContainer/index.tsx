import Loading from "@/components/Loading";
import { useState } from "react";
import ChooseImageContainer from "../ChooseImageContainer";
import DisplayImageContainer from "../DisplayImageContainer";
import { UploadResponse } from "@/services/upload";

type UploaderContainerProps = {
  uploadService: (file: File) => Promise<UploadResponse>;
};

export default function UploaderContainer({
  uploadService,
}: UploaderContainerProps) {
  const [load, setLoad] = useState<boolean>(false);
  const [link, setLink] = useState<UploadResponse | null>(null);

  async function uploadHandler(file: File) {
    setLoad(true);
    const data = await uploadService(file);
    setLink(data);
    setLoad(false);
  }

  return (
    <div className="uploader-container">
      {!link && !load && <ChooseImageContainer uploadHandler={uploadHandler} />}
      {!link && load && <Loading />}
      {link && !load && <DisplayImageContainer link={link} />}
    </div>
  );
}
