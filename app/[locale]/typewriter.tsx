"use client";

import { useEffect, useState } from "react";

export default function Typeriter({ text }: { text: string }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState<string>("");
  const [lineIndex, setLineIndex] = useState(0);
  const lines = text.split("\n");

  useEffect(() => {
    if (lineIndex >= lines.length) return; // Stop when all lines are typed

    let charIndex = 0;
    const line = lines[lineIndex];
    setCurrentLine(""); // Reset current line when a new one starts

    const charInterval = setInterval(() => {
      if (charIndex < line.length) {
        setCurrentLine((prev) => prev + line.charAt(charIndex)); // Ensure characters are added correctly
        charIndex++;
      } else {
        clearInterval(charInterval);
        setVisibleLines((prev) => [...prev, line]); // Store completed line
        setCurrentLine(""); // Reset for next line
        setTimeout(() => setLineIndex((prev) => prev + 1), 300); // Small delay before next line
      }
    }, 20); // Adjust typing speed

    return () => clearInterval(charInterval);
  }, [lineIndex]); // Runs when lineIndex changes

  return (
    <div className="py-2 px-3" id="hero-description">
      {visibleLines.map((line, index) => (
        <p key={index} className="typewriter">{line}</p>
      ))}
      {currentLine && (
        <p className="typewriter">
          {currentLine}
          <span className="animate-caret">|</span> {/* Cursor moves with text */}
        </p>
      )}
    </div>
  );
}
