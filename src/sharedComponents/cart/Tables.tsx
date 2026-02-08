"use client"
import { cn, isTable } from "@/lib/utils";
import { setTables } from "@/redux/features/address/addressSlice";
import { useLazyGetTablesQuery } from "@/redux/features/product/productApiSlice";
import { ITable, TSelectedTable } from "@/types/types";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoadingSpinner from "../loading/LoadingSpinner";
import NoDataMsg from "../shared/NoDataMsg";


type Props = {
    setSelectedTable: Dispatch<SetStateAction<TSelectedTable | null>>;
    selectedTable: TSelectedTable | null;
}
export default function Tables({ selectedTable, setSelectedTable }: Props) {
    const dispatch = useDispatch()
    const [loadTables, { isLoading }] = useLazyGetTablesQuery();
    const [tableData, setTableData] = useState<ITable[]>([]);


    useEffect(() => {
        const loadData = async () => {
            const res = await loadTables('').unwrap()
            if (res.success) {
                dispatch(setTables(res.data as ITable[]));
                setTableData(res.data);
            }
        }
        loadData()
    }, [loadTables, dispatch])

    if (isLoading) return <div className="table-container w-full flex items-center justify-center max-w-full overflow-x-auto gap-2.5 py-1.5">
        <LoadingSpinner />
    </div>

    if (!tableData || !tableData?.length) return <NoDataMsg group="shared" variable="noDataFound" />

    const tables = tableData?.filter(item => isTable(item)) || [];
    const parcels = tableData?.filter(item => !isTable(item)) || [];
    return (

        <>
            <div className="table-container w-full flex max-w-full overflow-x-auto gap-2.5 py-1.5">
                {
                    tables && tables?.map((table: ITable) => <button type="button" onClick={() => setSelectedTable({ customer_type: "Dine-In", table_id: table.id, label: table.table_no })} className={cn(" duration-200 border border-slate-400 dark:border-slate-600 rounded-md px-2 pt-2 pb-0.5 min-w-[80px]", selectedTable?.table_id === table.id ? "bg-primary text-clr-text-body" : table.status !== "available" ? "bg-secondary text-white" : "bg-slate-100 text-clr-text-body")} key={"table_" + table.id}>
                        <Image src={`/images/shared/${table.status !== "available" || selectedTable?.table_id === table.id ? "table-white.svg" : "table.svg"}`} className="w-[30px] mx-auto h-auto" width={100} height={60} alt="Table icon" />
                        <p className={cn("duration-200  font-semibold w-full justify-center flex flex-nowrap mt-1 text-[11px]", selectedTable?.table_id === table.id && "text-white")} >
                            {/* <span><RenderText group="shared" variable="table" /></span> -  */}
                            <span>{table.table_no}</span></p>
                    </button>)
                }
            </div>
            <div className="table-container w-full flex max-w-full overflow-x-auto gap-2.5 py-1.5">

                <button type="button" onClick={() => setSelectedTable({ customer_type: "Online", table_id: 1, label: parcels[0].table_no })} className={cn(" duration-200 border border-slate-400 dark:border-slate-600 rounded-md px-2 pt-2 pb-0.5 min-w-[80px]", selectedTable?.table_id === 1 ? "bg-primary text-clr-text-body" : parcels[0].status !== "available" ? "bg-secondary text-white" : "bg-slate-100 text-clr-text-body")} key={"table_" + parcels[0].id}>
                    <Image src={`/images/shared/${parcels[0].status !== "available" || selectedTable?.table_id === parcels[0].id ? "percel-icon-white.png" : "percel-icon-black.png"}`} className="w-[18px] mx-auto h-[18px]" width={100} height={60} alt="Table icon" />
                    <p className={cn("duration-200 font-semibold w-full justify-center flex flex-nowrap mt-1 text-[11px]", selectedTable?.table_id === parcels[0].id && "text-white")} >
                        {/* <span><RenderText group="shared" variable="table" /></span> -  */}
                        <span>Online</span></p>
                </button>
                {
                    parcels && parcels?.slice(1, -1).map((table: ITable) => <button type="button" onClick={() => setSelectedTable({ customer_type: "Take Way", table_id: table.id, label: table.table_no })} className={cn(" duration-200 border border-slate-400 dark:border-slate-600 rounded-md px-2 pt-2 pb-0.5 min-w-[80px]", selectedTable?.table_id === table.id ? "bg-primary text-clr-text-body" : table.status !== "available" ? "bg-secondary text-white" : "bg-slate-100 text-clr-text-body")} key={"table_" + table.id}>
                        <Image src={`/images/shared/${table.status !== "available" || selectedTable?.table_id === table.id ? "percel-icon-white.png" : "percel-icon-black.png"}`} className="w-[18px] mx-auto h-[18px]" width={100} height={60} alt="Table icon" />
                        <p className={cn("duration-200 font-semibold w-full justify-center flex flex-nowrap mt-1 text-[11px]", selectedTable?.table_id === table.id && "text-white")} >
                            {/* <span><RenderText group="shared" variable="table" /></span> -  */}
                            <span>{table.table_no}</span></p>
                    </button>)
                }
            </div>
        </>
    )
}
