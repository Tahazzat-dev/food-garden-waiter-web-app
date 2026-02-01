"use client";
import { SET_EXPAND } from "@/redux/features/actions/actionSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BodyEventListeners = () => {
    const { EXPAND, prev_action } = useSelector((state: RootState) => state.actions);
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

            dispatch(SET_EXPAND(prev_action ?? null));
        };
        document.body.addEventListener("click", handleListeners);
        return () => {
            document.body.removeEventListener("click", handleListeners);
        };
    });
    return <>
    </>;
};

export default BodyEventListeners;
