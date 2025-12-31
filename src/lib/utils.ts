import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getResponsivePX = (cartElWidth: number): number => {
  if (typeof window === "undefined") return 0;

  const width = window.innerWidth;

  // mobile (default)
  if (width > 1279) {
    return cartElWidth + 12
  }
  return 0;
};