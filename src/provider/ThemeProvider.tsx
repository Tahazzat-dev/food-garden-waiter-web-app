"use client";

import { getFromStorage, setToStorage } from "@/utils/localStorage";
import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";


type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const THEME_CONTEXT = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "theme";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    // ✅ Lazy initialization (runs once)
    const [theme, setTheme] = useState<Theme>(() => {
        const storedTheme = getFromStorage<Theme>(STORAGE_KEY);
        return storedTheme === "dark" || storedTheme === "light"
            ? storedTheme
            : "light";
    });

    const toggleTheme = () => {
        const newTheme: Theme = theme === "light" ? "dark" : "light";

        setTheme(newTheme);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newTheme);
        setToStorage(STORAGE_KEY, newTheme);
    };

    return (
        <THEME_CONTEXT.Provider value={{ theme, toggleTheme }}>
            {children}
        </THEME_CONTEXT.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(THEME_CONTEXT);

    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return context;
};
