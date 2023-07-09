import SelectImageButton from "@/components/SelectImageButton";
import { ChangeEvent, useState } from "react";

type ChooseImageContainerProps = {
  uploadHandler: (file: File) => void;
};

export default function ChooseImageContainer({
  uploadHandler,
}: ChooseImageContainerProps) {
  return (
    <div className="choose-image-container">
      <div className="choose-image-container__title">Upload your image</div>
      <div className="choose-image-container__subtitle">
        File should be Jpeg, Png,...
      </div>
      <div className="choose-image-container__button">
        <SelectImageButton uploadHandler={uploadHandler} />
      </div>
    </div>
  );
}
