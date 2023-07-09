import UploaderContainer from "@/containers/UploaderContainer";
import { uploadImage } from "@/services/upload";


export default function Home() {
  return (
    <div className="main">
      <UploaderContainer uploadService={uploadImage} />
    </div>
  );
}
