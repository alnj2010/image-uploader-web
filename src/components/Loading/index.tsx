import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.text} data-testid="uploading-text">
        Uploading...
      </div>
      <progress data-testid="progress" className={styles.linearprogress} />
    </div>
  );
}
