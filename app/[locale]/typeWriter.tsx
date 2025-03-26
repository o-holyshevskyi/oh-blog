"use client";

import { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  textArray: string[];
  delay?: number;
}

function Typewriter({ textArray, delay = 50 }: TypewriterProps): JSX.Element {
  const [displayedText, setDisplayedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const charIndex = useRef(0);

  useEffect(() => {
    if (currentTextIndex < textArray.length) {
      if (charIndex.current < textArray[currentTextIndex].length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + textArray[currentTextIndex][charIndex.current]);
          charIndex.current += 1;
        }, delay);
        return () => clearTimeout(timeout);
      } else {
        // Move to the next text segment
        setCurrentTextIndex((prev) => prev + 1);
        charIndex.current = 0;
        setDisplayedText((prev) => prev + '\n'); // Add a newline between segments.
      }
    }
  }, [displayedText, currentTextIndex, textArray, delay]);

  return <pre>{displayedText}</pre>; // Use <pre> to preserve newlines
}

export default Typewriter;