import { cn } from "@/lib/utils";
import { type Control, useController, type FieldValues, type Path } from "react-hook-form";

type FloatingInputProps<T extends FieldValues> = {
    name: Path<T>; // Ensures 'name' matches a key in your form data
    label: string;
    type?: string;
    showErrorBorder?: boolean;
    errorMessage?: string;
    showErrorMessage?: boolean;
    control: Control<T>;
    labelStyle?: string;
    className?: string;
};

export const Input = <T extends FieldValues>({
    name,
    label,
    control,
    showErrorBorder = true,
    errorMessage = '',
    type = "text",
    labelStyle = "",
    className,
}: FloatingInputProps<T>) => {
    const {
        field,
        fieldState: { error },
    } = useController({ name, control });

    const hasValue = field.value?.length > 0;
    return (
        <div className={cn("relative w-full", className)}>
            <div className={cn("relative w-full")}>
                <input
                    {...field}
                    type={type}
                    id={name}
                    className={cn(
                        "peer border-[1.5px] transition-colors duration-200 py-1.5 px-2 md:p-2 lg:px-4 md:px-3 rounded-[5px] border-slate-400/70 focus:border-slate-800 outline-0! focus:outline-none w-full md:h-10",
                        error && showErrorBorder && "border-secondary",
                        // hasValue && "border-2 border-ring"
                    )}
                />

                <label
                    htmlFor={name}
                    className={cn(
                        "pointer-events-none duration-200 m-0 p-0 absolute left-3 top-1/2 -translate-y-1/2",
                        "peer-focus:top-0 peer-focus:text-[11px] peer-focus:px-1 peer-focus:left-1.5",
                        hasValue && "top-0 text-[11px] px-0.5 left-2",
                        labelStyle
                    )}
                >
                    {label}
                </label>
            </div>

            {error && errorMessage && (
                <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
            )}
        </div>
    );
}
