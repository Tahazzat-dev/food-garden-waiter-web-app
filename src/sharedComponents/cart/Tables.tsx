import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import RenderText from "../utils/RenderText";


type Props = {
    setSelectedTable: Dispatch<SetStateAction<number>>;
    selectedTable: number;
}
export default function Tables({ selectedTable, setSelectedTable }: Props) {
    const { cartProducts, tables } = useSelector((state: RootState) => state.productSlice);
    return (
        <div className="table-container w-full flex max-w-full overflow-x-auto gap-2.5 py-1.5">
            {
                tables.map(table => <button onClick={() => setSelectedTable(table.id)} className={cn("duration-200 rounded-md px-2 pt-1 pb-0.5", selectedTable === table.id ? "bg-primary text-clr-text-body" : table.isBooked ? "bg-secondary text-white" : "bg-slate-100 text-clr-text-body")} key={"table_" + table.id}>
                    <Image src={`/images/shared/${table.isBooked || selectedTable === table.id ? "table-white.svg" : "table.svg"}`} className="w-[80%] mx-auto h-auto" width={100} height={60} alt="Table icon" />
                    <p className={cn("duration-200 font-semibold w-full flex flex-nowrap mt-1 text-sm", selectedTable === table.id && "text-white")} ><span><RenderText group="shared" variable="table" /></span> - <span>{table.tableNumber}</span></p>
                </button>)
            }
        </div>
    )
}
