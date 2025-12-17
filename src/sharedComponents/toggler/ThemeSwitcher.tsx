"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/provider/ThemeProvider"; // adjust path if needed
import clsx from "clsx";

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();

    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={clsx(
                "relative flex items-center w-12 h-7 rounded-full p-1 transition-colors duration-300",
                isDark ? "bg-neutral-600" : "bg-neutral-300"
            )}
        >
            {/* Toggle Circle */}
            <span
                className={clsx(
                    "flex items-center justify-center w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300",
                    isDark ? "translate-x-0" : "translate-x-0"
                )}
            >
                {isDark ? (
                    <Moon className="w-4 h-4 text-neutral-800" />
                ) : (
                    <Sun className="w-4 h-4 text-yellow-500" />
                )}
            </span>
        </button>
    );
}
