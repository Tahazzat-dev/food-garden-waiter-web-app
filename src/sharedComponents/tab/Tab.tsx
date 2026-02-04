import { cn } from "@/lib/utils";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import RenderText from "../utils/RenderText";

type TOrderTabProps = {
    activeTab: number,
    changeSlider: (index: number) => void;
}
export function OrdersTab({ activeTab, changeSlider }: TOrderTabProps) {

    const activeBorder = "border-green-600  text-primary dark:text-primary dark:border-primary";
    return (
        <div className="w-full sticky z-[999] top-[81px] pb-3 pt-3 bg-clr-bg-body left-0 flex justify-between">
            <div className="grow flex justify-between">
                <button onClick={() => changeSlider(0)} className={cn("flex items-center justify-center gap-2 w-full duration-200 border-b-2 border-slate-300 dark:border-slate-600 pb-1 text-slate-400 dark:text-slate-500", activeTab === 0 ? activeBorder : "")} >
                    <ArrowUpNarrowWide className="size-[18px]" />
                    <RenderText group="orders" variable="myOrders" />
                </button>
                <button onClick={() => changeSlider(1)} className={cn("flex items-center justify-center gap-2 w-full duration-200 border-b-2 border-slate-300 dark:border-slate-600 pb-1 text-slate-400 dark:text-slate-500", activeTab === 1 ? activeBorder : "")} >
                    <ArrowDownNarrowWide className="size-[18px]" />
                    <RenderText group="orders" variable="allOrders" />
                </button>
            </div>
        </div>
    )
}
