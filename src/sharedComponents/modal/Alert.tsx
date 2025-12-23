'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

type AlertType = "success" | "warning" | "error" | "info";

interface CustomAlertProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    type?: AlertType;
    title: string;
    description?: string;

    confirmText?: string;
    cancelText?: string;

    onConfirm?: () => void;
    showCancel?: boolean;
}

const iconMap = {
    success: <CheckCircle className="h-6 w-6 text-green-500" />,
    warning: <AlertTriangle className="h-6 w-6 text-yellow-500" />,
    error: <XCircle className="h-6 w-6 text-red-500" />,
    info: <Info className="h-6 w-6 text-blue-500" />,
};

const borderMap = {
    success: "border-green-500",
    warning: "border-yellow-500",
    error: "border-red-500",
    info: "border-blue-500",
};

export function CustomAlert({
    open,
    onOpenChange,
    type = "info",
    title,
    description,
    confirmText = "OK",
    cancelText = "Cancel",
    onConfirm,
    showCancel = false,
}: CustomAlertProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent
                className={cn("border-l-4", borderMap[type])}
            >
                <AlertDialogHeader className="flex flex-row gap-3 items-center">
                    {iconMap[type]}
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                </AlertDialogHeader>

                {description && (
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                )}

                <AlertDialogFooter>
                    {showCancel && (
                        <AlertDialogCancel>
                            {cancelText}
                        </AlertDialogCancel>
                    )}

                    <AlertDialogAction
                        onClick={() => {
                            onConfirm?.();
                            onOpenChange(false);
                        }}
                    >
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
