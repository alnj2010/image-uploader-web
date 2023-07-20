"use client";
import Loading from "@/components/Loading";
import styles from "./index.module.css";
import ChooseImageContainer from "@/containers/ChooseImageContainer/index";
import DisplayImageContainer from "@/containers/DisplayImageContainer";
import { useState } from "react";
import upload from "@/services/upload";
import { ImageURLs } from "@/domain/types";
import { useRouter } from "next/router";

export default function Home() {
  const [load, setLoad] = useState<boolean>(false);
  const [imageURLs, setImageURLs] = useState<ImageURLs | null>(null);
  const router = useRouter();

  async function uploadHandler(file: File) {
    setLoad(true);
    try {
      const imageURLs: ImageURLs = await upload(file);
      setLoad(false);
      setImageURLs(imageURLs);
    } catch (error) {
      router.push("/500");
    }
  }

  if (load) {
    return (
      <main className={styles["uploader-container"]}>
        <Loading />
      </main>
    );
  }

  if (imageURLs) {
    return (
      <main className={styles["uploader-container"]}>
        <DisplayImageContainer imageURLs={imageURLs} />
      </main>
    );
  }

  return (
    <main className={styles["uploader-container"]}>
      <ChooseImageContainer uploadHandler={uploadHandler} />
    </main>
  );
}
