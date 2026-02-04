import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useController, type Control, type FieldValues, type Path } from "react-hook-form";
import LoadingSpinner from "../loading/LoadingSpinner";
import RenderText from "../utils/RenderText";

type FloatingInputProps<T extends FieldValues> = {
    name: Path<T>; // Ensures 'name' matches a key in your form data
    label: string;
    type?: string;
    showErrorBorder?: boolean;
    errorMessage?: string;
    showErrorMessage?: boolean;
    control: Control<T>;
    inputStyle?: string;
    labelStyle?: string;
    className?: string;
    children?: ReactNode;
};

export const Input = <T extends FieldValues>({
    name,
    label,
    control,
    showErrorBorder = true,
    errorMessage = '',
    showErrorMessage = false,
    type = "text",
    labelStyle = "",
    inputStyle = "",
    className,
    children = <></>
}: FloatingInputProps<T>) => {
    const {
        field,
        fieldState: { error },
    } = useController({ name, control });

    const hasValue = field.value !== undefined && field.value !== null && field.value !== "";
    return (
        <div className={cn("relative w-full", className)}>
            <div className={cn("relative w-full")}>
                <input
                    {...field}
                    type={type}
                    id={name}
                    className={cn(
                        "peer bg-clr-card border-[1.5px] transition-colors duration-200 py-1.5 px-2 md:p-2 lg:px-4 md:px-3 rounded-[5px] border-slate-400/70 dark:border-slate-600 focus:!border-slate-400 outline-0! focus:outline-none w-full md:h-10",
                        error && showErrorBorder && "border-secondary",
                        inputStyle
                        // hasValue && "border-2 border-ring"
                    )}
                />
                {
                    children
                }
                <label
                    htmlFor={name}
                    className={cn(
                        "pointer-events-none bg-clr-card duration-200 m-0 p-0 absolute left-3 top-1/2 -translate-y-1/2",
                        "peer-focus:top-0 peer-focus:text-[11px] peer-focus:px-1 peer-focus:left-1.5",
                        hasValue && "top-0 text-[11px] px-0.5 left-2",
                        labelStyle
                    )}
                >
                    {label}
                </label>
            </div>

            {error && showErrorMessage && errorMessage && (
                <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
            )}
        </div>
    );
}









export const SubmitBtn = ({ isSubmitting }: { isSubmitting: boolean }) => {
    if (isSubmitting) return <FormLoader />
    return <Button size="auth" className="mt-2  text-white font-semibold" type="submit">
        <RenderText group="authentication" variable="submit" />
    </Button>
}

export function ErrorEl({ message }: { message: string }) {
    return (
        <p className="text-red-500 mt-1.5">{message}</p>
    )
}



type TPasswordToggleProps = {
    dispatcher: Dispatch<SetStateAction<boolean>>;
    show: boolean;
}
export function PasswordToggler({ dispatcher, show }: TPasswordToggleProps) {
    // handler
    const toggleVisibility = () => {
        dispatcher(prev => !prev);
    }
    return <>
        <button className={`absolute top-1/2 right-3 -translate-y-1/2 ${!show && "opacity-0 pointer-events-none"}`} onClick={toggleVisibility} type="button" ><Eye /></button>
        <button className={`absolute top-1/2 right-3 -translate-y-1/2 ${!!show && "opacity-0 pointer-events-none"}`} onClick={toggleVisibility} type="button" ><EyeOff /></button>
    </>
}

export const FormLoader = () => {
    return <div className="w-full h-9 flex items-center justify-center">
        <LoadingSpinner />
    </div>
}

export const SuccessMessage = ({ message }: { message: string }) => {
    return <p>{message}</p>
}