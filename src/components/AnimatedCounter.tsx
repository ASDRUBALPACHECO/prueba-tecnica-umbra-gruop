import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

interface AnimatedCounterProps {
  valueStr: string;
  duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  valueStr,
  duration = 1.6,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<string>(shouldReduceMotion ? valueStr : '0');

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(valueStr);
      return;
    }

    if (!isInView) return;

    // Parse the numeric part and prefix/suffix
    const match = valueStr.match(/^([^\d.]*)([\d.]+)(.*)$/);
    if (!match) {
      setDisplayValue(valueStr);
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const targetNum = parseFloat(numStr);
    const isFloat = numStr.includes('.');
    const decimals = isFloat ? (numStr.split('.')[1] || '').length : 0;

    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = targetNum * easeProgress;

      const formattedNum = isFloat
        ? current.toFixed(decimals)
        : Math.round(current).toString();

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(valueStr);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, valueStr, duration, shouldReduceMotion]);

  return <span ref={ref}>{displayValue}</span>;
};
