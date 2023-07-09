import Loading from "@/components/Loading";
import { useState } from "react";
import ChooseImageContainer from "../ChooseImageContainer";
import DisplayImageContainer from "../DisplayImageContainer";

type UploaderContainerProps = {
  uploadService: (file: File) => Promise<string>;
};

export default function UploaderContainer({
  uploadService,
}: UploaderContainerProps) {
  const [load, setLoad] = useState<boolean>(false);
  const [link, setLink] = useState<string | null>(null);

  async function uploadHandler(file: File) {
    setLoad(true);
    const linkImage = await uploadService(file);
    setLink(linkImage);
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
