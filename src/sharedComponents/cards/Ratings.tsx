import React from "react";
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils"; // if you use it in your project

type RatingsProps = {
  rating: number; // ex: 3.5
  max?: number;   // default = 5
  size?: number;  // optional: customize icon size
};

export default function Ratings({ rating, max = 5, size = 16 }: RatingsProps) {
  return (
    <div className="flex items-center">
      {[...Array(max)].map((_, i) => {
        const starValue = i + 1;
        const isFull = rating >= starValue;
        const isHalf = !isFull && rating >= starValue - 0.5;

        return (
          <span key={i}>
            {isFull ? (
              <Star
                className={cn("text-yellow-400 fill-yellow-400")}
                size={size}
              />
            ) : isHalf ? (
              <StarHalf
                className={cn("text-yellow-400 fill-yellow-400")}
                size={size}
              />
            ) : (
              <Star
                className={cn("text-gray-300 fill-gray-300")}
                size={size}
              />
            )}
          </span>
        );
      })}
    </div>
  );
}
