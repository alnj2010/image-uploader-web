import Image from "next/image";

export default function SuccessMessage() {
  return (
    <div className="success-message">
      <div className="success-message__icon"> 
      <Image
        src="/correct.png"
        alt="correct icon"
        width={42}
        height={42}
      /></div>
      <div className="success-message__text">Uploaded Successfully!</div>
    </div>
  );
}
