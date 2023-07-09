import { ChangeEvent, useState } from "react";

type SelectImageButtonProps = {
  uploadHandler: (file: File) => void;
};

export default function SelectImageButton({
  uploadHandler,
}: SelectImageButtonProps) {
  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadHandler(e.target.files[0]);
    }
  };

  return (
    <label
      className="select-image-button"
      htmlFor="contained-button-file"
    >
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageSelect}
        id="contained-button-file"
        data-testid="upload-button"
      />
      Choose a file
    </label>
  );
}
