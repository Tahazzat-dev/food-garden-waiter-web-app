'use client';
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface DrawerProps {
    open: boolean;
    children: ReactNode;
    direction?: "right" | "left";
    className?: string;
    overlayClassName?: string;
    hideOverlay?: boolean;
}

export function CustomDrawer({
    open,
    children,
    direction = "right",
    className = "",
    overlayClassName = "",
    hideOverlay = false,
}: DrawerProps) {
    const drawerRef = useRef<HTMLDivElement>(null);

    // prevent body scroll when drawer is open
    useEffect(() => {
        if (open) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "";
        }
        return () => {
            document.body.style.overflowY = "";
        };
    }, [open]);

    if (!open) return null;

    return createPortal(
        <>
            {!hideOverlay && (
                <div
                    className={`fixed inset-0 global-overlay z-[9999] ${overlayClassName}`}
                />
            )}
            <div
                ref={drawerRef}
                className={`fixed flex  flex-col rounded-r-[10px] overflow-hidden bg-background cartsheet-drawer prevent-body-trigger z-[9999] w-[90vw] max-w-[450px] top-[86px] sm:top-[84px] md:top-[81px] lg:top-[88px] dark:shadow-amber-50 rounded-md lg:!rounded-r-none ${className} ${direction === "right" ? "right-0" : "left-0"
                    }`}
            >
                {children}
            </div>
        </>,
        document.body
    );
}
