
const isBrowser = () => typeof window !== "undefined";

/* ---------- Set Item ---------- */
export const setToStorage = <T>(
    key: string,
    value: T
): void => {
    if (!isBrowser()) return;

    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("localStorage set error:", error);
    }
};

/* ---------- Get Item ---------- */
export const getFromStorage = <T>(
    key: string,
    defaultValue: T | null = null
): T | null => {
    if (!isBrowser()) return defaultValue;

    try {
        const item = localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (error) {
        console.error("localStorage get error:", error);
        return defaultValue;
    }
};

/* ---------- Remove Item ---------- */
export const removeStorage = (key: string): void => {
    if (!isBrowser()) return;

    localStorage.removeItem(key);
};

/* ---------- Clear Storage ---------- */
export const clearStorage = (): void => {
    if (!isBrowser()) return;

    localStorage.clear();
};
