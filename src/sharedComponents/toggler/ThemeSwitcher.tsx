"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/provider/ThemeProvider"; // adjust path if needed
import clsx from "clsx";
import { MoonIcon, SunIcon } from "../icons/Icons";

type Props = {
    className?: string;
    type?: 'ghost' | 'default';
}
export default function ThemeSwitcher({ className = "", type = "default" }: Props) {
    const { theme, toggleTheme } = useTheme();

    const isDark = theme === "dark";

    if (type === "ghost") {
        return <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={clsx(
                "relative flex items-center h-7 rounded-full p-1 transition-colors duration-300",
                className
            )}
        >
            {/* Toggle Circle */}
            <span className="rounded-full relative h-6 w-6 overflow-hidden  transition-transform duration-300">
                <span
                    className={clsx(
                        "flex items-center justify-center w-12 h-6 rounded-full  transition-transform duration-300", isDark ? "transform -translate-x-[50%]" : "transform translate-x-0"
                    )}
                >
                    <MoonIcon className="w-6 h-6 text-white" />
                    <SunIcon className="w-6 h-6 text-yellow-500" />
                </span>
            </span>
        </button>
    }
    return <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={clsx(
            "relative flex items-center w-14 h-8 rounded-full p-1 transition-colors duration-300",
            isDark ? "bg-neutral-800" : "bg-neutral-300"
        )}
    >
        {/* Toggle Circle */}
        <span
            className={clsx(
                "flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300",
                isDark ? "translate-x-6" : "translate-x-0"
            )}
        >
            {isDark ? (
                <Moon className="w-4 h-4 text-neutral-800" />
            ) : (
                <Sun className="w-4 h-4 text-yellow-500" />
            )}
        </span>
    </button>


}

