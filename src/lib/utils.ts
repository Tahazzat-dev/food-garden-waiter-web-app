import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import type { CSSProperties, RefObject } from "react";
import { Lang } from "@/types/types";

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


export const getDiscountPrice = (price: number, discount: number): number => {
  const discountAmount = (price * discount) / 100;
  const discountPrice = price - discountAmount
  return Number(discountPrice.toFixed(2));
}

export const getDiscountAmount = (price: number, discount: number): number => {
  const result = (price * discount) / 100;
  return Number(result.toFixed(2));
}



export const formatPrice = (locale: Lang = "bn", amount: number = 0) => locale !== "bn" ? `${amount}TK` : `৳${amount}`;


export const calculateSubtotal = (price: number = 0, quantity: number = 1): number => {
  const total = price * quantity;
  return Number(total.toFixed(2))
}

export const getSellingPrice = (price: number, discount: number): number => {
  if (discount < 1) return price;
  return getDiscountPrice(price, discount);
}