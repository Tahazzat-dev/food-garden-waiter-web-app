export const OFFERS_VISIT_KEY = "offers_last_visited";

export const getToday = () =>
    new Date().toISOString().split("T")[0];

export const markOffersVisited = () => {
    if (typeof window === "undefined") return;
    localStorage.setItem(OFFERS_VISIT_KEY, getToday());
};

export const hasVisitedOffersToday = (): boolean => {
    if (typeof window === "undefined") return true;

    const lastVisit = localStorage.getItem(OFFERS_VISIT_KEY);
    return lastVisit === getToday();
};
