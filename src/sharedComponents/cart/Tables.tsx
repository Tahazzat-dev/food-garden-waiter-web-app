"use client"
import { cn, isTable } from "@/lib/utils";
import { setTables } from "@/redux/features/address/addressSlice";
import { useGetTablesQuery } from "@/redux/features/product/productApiSlice";
import { RootState } from "@/redux/store";
import { ITable, TSelectedTable } from "@/types/types";
import Image from "next/image";
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../loading/LoadingSpinner";
import NoDataMsg from "../shared/NoDataMsg";

type Props = {
    setSelectedTable: Dispatch<SetStateAction<TSelectedTable | null>>;
    selectedTable: TSelectedTable | null;
    register
}

export default function Tables({ register, selectedTable, setSelectedTable }: Props) {
    const dispatch = useDispatch()
    const { cartFormSavedData } = useSelector((state: RootState) => state.productSlice);
    const { tables: tableData } = useSelector((state: RootState) => state.address);


    const { data, isLoading } = useGetTablesQuery('', {
        pollingInterval: 10000,
        refetchOnReconnect: true,
    });
    useEffect(() => {
        if (tableData.length || !data || !data?.data) return;
        dispatch(setTables(data?.data as ITable[]));
    }, [data, dispatch, tableData]);

    /**
     * Auto select table from saved cart data
     */
    useEffect(() => {
        if (!cartFormSavedData || !tableData.length) return;

        const filteredTable = tableData.find(
            table => table.id === cartFormSavedData.tableId
        );
        if (!filteredTable) return;

        let customer_type: "Dine-In" | "Online" | "Take Way" = "Dine-In";

        if (!isTable(filteredTable)) {
            if (filteredTable.table_no?.toLowerCase() === "online") {
                customer_type = "Online";
            } else {
                customer_type = "Take Way";
            }
        }

        setSelectedTable({
            customer_type,
            table_id: filteredTable.id,
            label: filteredTable.table_no,
        });
    }, [cartFormSavedData, tableData, setSelectedTable]);


    const selectTable = useCallback(
        (customer_type, table_id, label) => {
            setSelectedTable({ customer_type, table_id, label });
        },
        [setSelectedTable]
    );


    const { tables, parcels } = useMemo(() => {
        return {
            tables: data?.data?.filter(isTable),
            parcels: data?.data?.filter(item => !isTable(item))
        }
    }, [data?.data])


    const isSelected = (table: ITable) => selectedTable?.table_id === table.id;
    const isBooked = (table: ITable) => table.status !== "available";
    const isActive = (table: ITable) => isBooked(table) || isSelected(table);


    if (isLoading) {
        return (
            <div className="table-container w-full flex items-center justify-center max-w-full overflow-x-auto gap-2.5 py-1.5">
                <LoadingSpinner />
            </div>
        );
    }

    if (!tableData || !tableData.length) {
        return <NoDataMsg group="shared" variable="noDataFound" />
    }

    if (!parcels.length) return null;
    return (
        <>
            <input type="hidden" {...register("table")} value={selectedTable?.table_id || ""} />

            {/* Dine-In Tables */}
            <div className="table-container w-full flex max-w-full overflow-x-auto gap-2.5 py-1.5">
                {tables?.map((table: ITable) => (
                    <button
                        type="button"
                        onClick={() => selectTable("Dine-In", table.id, table.table_no)}
                        className={cn(
                            "duration-200 border border-slate-400 dark:border-slate-600 rounded-md px-2 pt-2 pb-0.5 min-w-[80px]",
                            selectedTable?.table_id === table.id
                                ? "bg-primary text-clr-text-body"
                                : table.status !== "available"
                                    ? "bg-secondary text-white"
                                    : "bg-slate-100 dark:bg-slate-900 text-clr-text-body"
                        )}
                        key={"table_" + table.id}
                    >
                        <Icon className="w-[30px]" type="table" active={isActive(table)} />
                        <Label isSelected={isSelected(table)} text={table?.table_no} />
                    </button>
                ))}
            </div>

            {/* Parcels / Online / Takeaway */}
            <div className="table-container w-full flex max-w-full overflow-x-auto gap-2.5 py-1.5">
                <button
                    type="button"
                    onClick={() => selectTable("Online", 1, parcels[0].table_no)}
                    className={cn(
                        "duration-200 border border-slate-400 dark:border-slate-600 rounded-md px-2 pt-2 pb-0.5 min-w-[80px]",
                        selectedTable?.table_id === 1
                            ? "bg-primary text-clr-text-body"
                            : parcels[0].status !== "available"
                                ? "bg-secondary text-white"
                                : "bg-slate-100 dark:bg-slate-900 text-clr-text-body"
                    )}
                    key={"table_" + parcels[0].id}
                >
                    <Icon className="w-[18px]" type="percel" active={isActive(parcels[0])} />
                    <Label isSelected={isSelected(parcels[0])} text="Online" />
                </button>

                {parcels?.slice(1, -1).map((table: ITable) => (
                    <button
                        type="button"
                        onClick={() => selectTable("Take Way", table.id, table.table_no)}
                        className={cn(
                            "duration-200 border border-slate-400 dark:border-slate-600 rounded-md px-2 pt-2 pb-0.5 min-w-[80px]",
                            selectedTable?.table_id === table.id
                                ? "bg-primary text-clr-text-body"
                                : table.status !== "available"
                                    ? "bg-secondary text-white"
                                    : "bg-slate-100 dark:bg-slate-900 text-clr-text-body"
                        )}
                        key={"table_" + table.id}
                    >
                        <Icon className="w-[18px]" type="percel" active={isActive(table)} />
                        <Label isSelected={isSelected(table)} text={table.table_no} />
                    </button>
                ))}
            </div>
        </>
    )
}


type IconProps = {
    type: "table" | "percel";
    active: boolean;
    className?: string
}
const Icon = ({ active, type, className }: IconProps) => {
    const whiteIcon = active
        ? type === "table" ? "/images/shared/table-white.svg" : "/images/shared/percel-white.png"
        : type === "table" ? "/images/shared/table-black.svg" : "/images/shared/percel-black.png";

    const blackIcon = type === "table"
        ? "/images/shared/table-white.svg"
        : "/images/shared/percel-white.png";

    return <>
        <Image src={whiteIcon} className={cn("dark:hidden mx-auto h-[18px]", className)} width={100} height={60} alt="Table icon" />
        <Image src={blackIcon} className={cn("hidden dark:block mx-auto h-[18px]", className)} width={100} height={60} alt="Table icon" />
    </>
};


type LabelProps = {
    text: string;
    isSelected: boolean;
}
const Label = ({ text, isSelected }: LabelProps) => {
    return <p className={cn("duration-200 font-semibold w-full justify-center flex flex-nowrap mt-1 text-[11px]", isSelected && "text-white")} >
        <span>{text}</span></p>
}