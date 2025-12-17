/* Safe localStorage utilities */

export const isLocalStorageAvailable = (): boolean => {
    if (typeof window === "undefined") return false;

    try {
        const testKey = "__storage_test__";
        window.localStorage.setItem(testKey, testKey);
        window.localStorage.removeItem(testKey);
        return true;
    } catch {
        return false;
    }
};

export const getFromStorage = <T = string>(
    key: string
): T | null => {
    if (!isLocalStorageAvailable()) return null;

    try {
        return window.localStorage.getItem(key) as T | null;
    } catch (error) {
        console.error(`Failed to read "${key}" from localStorage`, error);
        return null;
    }
};

export const setToStorage = (
    key: string,
    value: string
): void => {
    if (!isLocalStorageAvailable()) return;

    try {
        window.localStorage.setItem(key, value);
    } catch (error) {
        console.error(`Failed to write "${key}" to localStorage`, error);
    }
};

export const removeFromStorage = (key: string): void => {
    if (!isLocalStorageAvailable()) return;

    try {
        window.localStorage.removeItem(key);
    } catch (error) {
        console.error(`Failed to remove "${key}" from localStorage`, error);
    }
};
