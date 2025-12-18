import { foodItems } from "@/lib/demo-data";
import { cn } from "@/lib/utils"
export const VerticalDivider = ({ className = "" }: { className?: string; }) => {
    return (
        <div className={cn("w-[1px] fg_divider", className)}></div>
    )
}



// search utility
const isBangla = (query: string) => /[\u0980-\u09FF]/.test(query);

export const fakeSearch = (query: string) => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const bangla = isBangla(q);

    return foodItems.filter(item =>
        bangla
            ? item.titleBn.includes(q)
            : item.titleEn.toLowerCase().includes(q)
    );
};
