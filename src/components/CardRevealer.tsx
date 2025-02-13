import { useState } from "react";

interface CardRevealerProps {
  img_back: string;
  img_front: string;
  width?: string;
  message?: string;
  onFlip?: () => void;
}

export const CardRevealer = ({
  img_back,
  img_front,
  width = "w-1/2",
  message = "",
  onFlip,
}: CardRevealerProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  if (width == "w-1/2") {
  }
  const handleClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      onFlip?.();
    }
  };

  return (
    <div className={`max-w-[300px] flex flex-col items-center gap-4`}>
      <div
        className={`relative max-w-[500px] transition-transform duration-700 cursor-pointer preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={handleClick}
      >
        <img
          src={img_back}
          alt="card back"
          className="backface-hidden w-full rounded-2xl"
        />
        <img
          src={img_front}
          alt="card front"
          className="backface-hidden w-full absolute top-0 left-0 rotate-y-180 rounded-2xl"
        />
      </div>
      <div className="max-w-[500px]">
        {!isFlipped ? (
          <div className="text-center p-4 border-2 border-dashed rounded-lg w-[340px] h-[130px] content-center font-black text-xl bg-primary text-primary-content">
            Please click on the card
          </div>
        ) : (
          <p className="text-center text-lg animate-fade-in border-2 border-dashed border-gray-300 rounded-lg w-[340px] h-[130px] bg-primary text-primary-content p-2 content-center">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
