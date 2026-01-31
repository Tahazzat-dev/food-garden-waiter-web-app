'use client';
import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface DrawerProps {
    open: boolean;
    children: ReactNode;
    className?: string;
    overlayClassName?: string;
    hideOverlay?: boolean;
}

export function CustomDrawer({
    open,
    children,
    className = "",
    overlayClassName = "",
    hideOverlay = false,
}: DrawerProps) {
    // hooks
    const drawerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    //  ========== hidden overflow of body ========
    useEffect(() => {
        if (mounted) return;
        setMounted(true)
    }, [mounted])

    useEffect(() => {
        if (typeof window === "undefined") return;

        if (open) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    if (!mounted) return <></>;
    return createPortal(
        <>
            {!hideOverlay && !!open && (
                <div
                    className={`fixed top-[81px] !border-none lg:top-[83.53px] inset-0 cart-overlay global-overlay z-[99999] ${overlayClassName}`}
                />
            )}
            <div
                ref={drawerRef}
                className={`fixed flex  flex-col rounded-r-[10px] overflow-hidden bg-background cartsheet-drawer prevent-body-trigger z-[99999] w-[90vw] max-w-[450px] right-0 top-[86px] sm:top-[84px] md:top-[81px] lg:top-[88px] dark:shadow-amber-50 h-full rounded-md lg:!rounded-r-none duration-200 ${open ? "translate-x-0" : "translate-x-full"} ${className}`}
            >
                {children}
            </div>
        </>,
        window.document.body
    );
}
