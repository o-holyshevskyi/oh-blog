'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface CountUpProps {
  target: number | string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({
  target,
  suffix = '',
  prefix = '',
  duration = 2000,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState('0');

  const isNumeric = typeof target === 'number';

  useEffect(() => {
    if (!isInView) return;

    if (!isNumeric || shouldReduceMotion) {
      setDisplay(String(target));
      return;
    }

    const numTarget = target as number;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numTarget);
      setDisplay(String(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, duration, shouldReduceMotion, isNumeric]);

  return (
    <span ref={ref} className={className}>
      {prefix}{isInView ? display : '0'}{suffix}
    </span>
  );
}
