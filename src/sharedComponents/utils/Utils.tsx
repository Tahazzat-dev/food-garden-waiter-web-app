
import { demoProducts } from "@/lib/demo-data";
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

export const fakeSearch = async (query: string) => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    // ⏳ fake loading delay (1 second)
    await delay(100);

    const bangla = isBangla(q);

    return demoProducts.filter(item =>
        bangla
            ? item.title.bn.includes(q)
            : item.title.en.toLowerCase().includes(q)
    );
};