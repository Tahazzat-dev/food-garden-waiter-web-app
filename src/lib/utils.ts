import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import type { CSSProperties, RefObject } from "react";

export const getResponsiveRightStyle = (
  ref: RefObject<HTMLButtonElement | null>
): CSSProperties => {
  if (typeof window === "undefined" || !ref.current) {
    return {};
  }

  const rect = ref.current.getBoundingClientRect();
  const rightPX = window.innerWidth - rect.right - window.scrollX;
  const width = window.innerWidth;

  // mobile
  if (width < 768) {
    return {
      right: "50%",
      transform: "translateX(50%)",
    };
  }

  // md → lg
  if (width >= 768 && width <= 1279) {
    return {
      right: "4%",
      transform: "translateX(0)",
    };
  }

  // xl
  if (width >= 1280 && width <= 1535) {
    return {
      right: "8%",
      transform: "translateX(0)",
    };
  }

  // 2xl
  return {
    right: `${rightPX + 12}px`,
    transform: "translateX(50%)",
  };

};
