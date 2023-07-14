"use client";

import Loading from "@/components/Loading";
import styles from "./page.module.css";
import ChooseImageContainer from "@/containers/ChooseImageContainer";
import DisplayImageContainer from "@/containers/DisplayImageContainer";
import { useState } from "react";
import upload from "@/services/upload";
import { ImageURLs } from "@/domain/types";

export default function Home() {
  const [load, setLoad] = useState<boolean>(false);
  const [imageURLs, setImageURLs] = useState<ImageURLs | null>(null);

  async function uploadHandler(file: File) {
    setLoad(true);
    try {
      const imageURLs: ImageURLs = await upload(file);
      setLoad(false);
      setImageURLs(imageURLs);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className={styles["uploader-container"]}>
      {!imageURLs && !load && (
        <ChooseImageContainer uploadHandler={uploadHandler} />
      )}
      {!imageURLs && load && <Loading />}
      {imageURLs && !load && <DisplayImageContainer imageURLs={imageURLs} />}
    </main>
  );
}
