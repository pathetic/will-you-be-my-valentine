import { useState, useEffect } from "react";

interface UnityPageProps {
  onBack: () => void;
}

const UnityPage = ({ onBack }: UnityPageProps) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const finalMessage = "Endless love is not just spoken—it is felt, forever.";

  const messages = [
    { text: "Love is trust", x: -140, y: -100 },
    { text: "Love is laughter", x: 20, y: -80 },
    { text: "Love is patience", x: -160, y: -20 },
    { text: "Love is understanding", x: 0, y: 40 },
    { text: "Love is comfort", x: -120, y: 80 },
    { text: "Love is growth", x: 30, y: -40 },
    { text: "Love is adventure", x: -100, y: -60 },
    { text: "Love is home", x: -20, y: 100 },
    { text: "Love is forever", x: -60, y: 20 },
  ];

  useEffect(() => {
    if (showFinalMessage) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= finalMessage.length) {
          setTypedMessage(finalMessage.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => setShowBackButton(true), 500);
        }
      }, 50); // Adjust speed here (lower number = faster)

      return () => clearInterval(typingInterval);
    }
  }, [showFinalMessage]);

  const handleScreenClick = () => {
    if (messageIndex < messages.length) {
      setMessageIndex((prev) => prev + 1);
    } else if (!showFinalMessage) {
      setShowFinalMessage(true);
      setTimeout(() => setShowBackButton(true), 2000);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full p-4 cursor-pointer"
      onClick={handleScreenClick}
    >
      <h1 className="text-3xl text-primary font-bold mb-8">
        A Love That Grows
      </h1>

      <div className="relative w-full max-w-md h-[300px] flex items-center justify-center overflow-hidden">
        {messages.slice(0, messageIndex).map((message, index) => (
          <div
            key={index}
            className="absolute text-primary text-base sm:text-lg whitespace-nowrap animate-fade-in"
            style={{
              transform: `translate(${message.x}px, ${message.y}px)`,
              left: "50%",
              top: "50%",
            }}
          >
            {message.text}
          </div>
        ))}
      </div>

      {showFinalMessage && (
        <div className="text-xl sm:text-2xl text-primary font-bold text-center mt-8 px-4">
          "{typedMessage}"
        </div>
      )}

      {showBackButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBack();
          }}
          className="btn btn-primary mt-8 animate-fade-in"
        >
          Back to Charms
        </button>
      )}

      {!showFinalMessage && messageIndex < messages.length && (
        <div className="text-sm text-gray-500 mt-8 animate-pulse">
          Tap anywhere to continue
        </div>
      )}
    </div>
  );
};

export default UnityPage;
