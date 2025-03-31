"use client";

import { useEffect, useState } from "react";
import { Typewriter } from 'react-simple-typewriter'

export default function Typeriter({ text }: { text: string }) {
  const [isTyping, setIsTyping] = useState(true);

  const handleDone = () => {
    setIsTyping(false);
  }

  return (
    <div className="py-2 px-3 text-left" id="hero-description">
      <div className="text-left">
        <Typewriter
          words={text.split("\n")}
          cursor={isTyping}
          cursorStyle='_'
          typeSpeed={30}
          onLoopDone={handleDone}
        />
      </div>
    </div>
  );
}
