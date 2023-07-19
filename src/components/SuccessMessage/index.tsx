import Image from "next/image";
import styles from "./success-message.module.css";


export default function SuccessMessage() {
  return (
    <div className={styles["success-message"]}>
      <div className={styles.icon}> 
      <Image
      data-testid="success-image" 
        src="/correct.png"
        alt="correct icon"
        width={42}
        height={42}
      /></div>
      <div data-testid="success-text" className={styles.text}>Uploaded Successfully!</div>
    </div>
  );
}
