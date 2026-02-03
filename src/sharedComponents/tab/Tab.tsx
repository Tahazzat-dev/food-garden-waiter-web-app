import { cn } from "@/lib/utils";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import RenderText from "../utils/RenderText";

export type TOrderTabs = "myOrders" | "allOrders";
type TOrderTabProps = {
    activeTab: TOrderTabs,
    setActiveTab: Dispatch<SetStateAction<TOrderTabs>>;
}
export function OrdersTab({ activeTab, setActiveTab }: TOrderTabProps) {

    const activeBorder = "border-green-600  text-primary dark:text-primary dark:border-primary";
    return (
        <div className="w-full sticky z-[999] top-[81px] pb-3 pt-3 bg-clr-bg-body left-0 flex justify-between">
            <div className="grow flex justify-between">
                <button onClick={() => setActiveTab("myOrders")} className={cn("flex items-center justify-center gap-2 w-full duration-200 border-b-2 border-slate-300 dark:border-slate-600 pb-1 text-slate-400 dark:text-slate-500", activeTab === "myOrders" ? activeBorder : "")} >
                    <ArrowUpNarrowWide className="size-[18px]" />
                    <RenderText group="orders" variable="myOrders" />
                </button>
                <button onClick={() => setActiveTab("allOrders")} className={cn("flex items-center justify-center gap-2 w-full duration-200 border-b-2 border-slate-300 dark:border-slate-600 pb-1 text-slate-400 dark:text-slate-500", activeTab === "allOrders" ? activeBorder : "")} >
                    <ArrowDownNarrowWide className="size-[18px]" />
                    <RenderText group="orders" variable="allOrders" />
                </button>
            </div>
        </div>
    )
}
