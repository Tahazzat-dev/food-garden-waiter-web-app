"use client";
import { SET_EXPAND } from "@/redux/features/actions/actionSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BodyEventListeners = () => {
    const EXPAND = useSelector((state: RootState) => state.actions.EXPAND);
    const dispatch = useDispatch();
    useEffect(() => {
        const handleListeners = (event: MouseEvent) => {
            if (!EXPAND) return;

            const targetElement = event.target as HTMLElement;
            if (
                targetElement.closest(".prevent-body-trigger") ||
                targetElement.closest("[data-prevent-body-trigger]") !== null
            ) {
                return;
            }

            dispatch(SET_EXPAND(null));
        };
        document.body.addEventListener("click", handleListeners);

        // show message for back or quit 
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = ""; // REQUIRED
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        // mobile device
        window.history.pushState(null, "", window.location.href);
        const handleBackButton = () => {
            const confirmExit = window.confirm(
                "Are you sure you want to leave this page?"
            );

            if (confirmExit) {
                window.history.back(); // allow exit
            } else {
                window.history.pushState(null, "", window.location.href); // stay
            }
        };

        window.addEventListener("popstate", handleBackButton);

        return () => {
            document.body.removeEventListener("click", handleListeners);
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handleBackButton);
        };
    });
    return <>
    </>;
};

export default BodyEventListeners;
