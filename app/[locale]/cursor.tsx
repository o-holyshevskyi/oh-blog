'use client';

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const Cursor: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".cursor-pointer, button, label, a, [role='button']")) {
        setHovered(true);
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".cursor-pointer, button, a, [role='button']")) {
        setHovered(false);
      }
    };
    
    // Override all interactive elements
    document.documentElement.style.cursor = "none";
    document.querySelectorAll(".cursor-pointer, button, a, [role='button']").forEach((el) => {
      (el as HTMLElement).style.setProperty("cursor", "none", "important");
    });
    
    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    
    return () => {
      document.documentElement.style.cursor = "";
      document.querySelectorAll(".cursor-pointer, button, a, [role='button']").forEach((el) => {
        (el as HTMLElement).style.setProperty("cursor", "", "important");
      });
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [x, y]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none mix-blend-difference z-[9999] bg-default-500"
      style={{
        width: hovered ? "28px" : "20px",
        height: hovered ? "28px" : "20px",
        borderRadius: "50%",
        translateX: useTransform(x, (v) => v - (hovered ? 20 : 12)),
        translateY: useTransform(y, (v) => v - (hovered ? 20 : 12)),
      }}
    />
  );
};

export default Cursor;
