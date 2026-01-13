
import { cn, getTranslationReadyText } from "@/lib/utils"
import { TProduct } from "@/types/types";
export const VerticalDivider = ({ className = "" }: { className?: string; }) => {
    return (
        <div className={cn("w-[1px] fg_divider", className)}></div>
    )
}



// search utility
const isBangla = (query: string) => /[\u0980-\u09FF]/.test(query);

const delay = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

export const fakeSearch = async (query: string, selectedCat: number | null, products: TProduct[]) => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    // ⏳ fake loading delay (1 second)
    await delay(100);

    const bangla = isBangla(q);

    return products.filter(item => {
        const { en, bn } = getTranslationReadyText(item.name);
        if (selectedCat && selectedCat !== item.category_id) return false;
        return bangla
            ? bn.includes(q)
            : en.toLowerCase().includes(q)
    }
    );
};


