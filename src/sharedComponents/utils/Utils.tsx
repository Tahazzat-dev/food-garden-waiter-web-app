
import { cn } from "@/lib/utils"
export const VerticalDivider = ({ className = "" }: { className?: string; }) => {
    return (
        <div className={cn("w-[1px] fg_divider", className)}></div>
    )
}



// search utility
const isBangla = (query: string) => /[\u0980-\u09FF]/.test(query);

const delay = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

