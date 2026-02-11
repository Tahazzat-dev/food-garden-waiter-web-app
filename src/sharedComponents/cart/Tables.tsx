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

    const { firstRow, secondRow } = useMemo(() => {
        const list: ITable[] = data?.data || [];

        if (!list.length) {
            return { firstRow: [], secondRow: [] };
        }

        // ⭐ remove first item
        const [firstItem, ...rest] = list;

        // ⭐ calculate split using remaining items
        const mid = Math.ceil(rest.length / 2);

        const firstRow = rest.slice(0, mid);

        // ⭐ put first item at the END of second row
        const secondRow = [...rest.slice(mid), firstItem];

        return { firstRow, secondRow };
    }, [data?.data]);




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


    return (
        <>
            <input type="hidden" {...register("table")} value={selectedTable?.table_id || ""} />

            <div className="w-full py-0.5 overflow-x-auto">
                <div className="inline-flex flex-col gap-1.5 min-w-max">

                    {/* ROW 1 */}
                    <div className="flex gap-1.5">
                        {firstRow.map((table: ITable) => {
                            const customer_type =
                                table.id === 1
                                    ? "Online"
                                    : isTable(table)
                                        ? "Dine-In"
                                        : "Take Way";

                            return (
                                <button
                                    key={"table_" + table.id}
                                    type="button"
                                    onClick={() => selectTable(customer_type, table.id, table.table_no)}
                                    className={cn(
                                        "duration-200 border border-slate-400 dark:border-slate-600 rounded-md px-1 pt-1 pb-0.5 min-w-[60px]",
                                        selectedTable?.table_id === table.id
                                            ? "bg-primary text-clr-text-body"
                                            : table.status !== "available"
                                                ? "bg-secondary text-white"
                                                : "bg-slate-100 dark:bg-slate-900 text-clr-text-body"
                                    )}
                                >
                                    <Icon
                                        className="w-[22px]"
                                        type={isTable(table) ? "table" : "percel"}
                                        active={isActive(table)}
                                    />
                                    <Label isSelected={isSelected(table)} text={table.table_no} />
                                </button>
                            );
                        })}
                    </div>

                    {/* ROW 2 */}
                    <div className="flex gap-1.5">
                        {secondRow.map((table: ITable) => {
                            const customer_type =
                                table.id === 1
                                    ? "Online"
                                    : isTable(table)
                                        ? "Dine-In"
                                        : "Take Way";

                            return (
                                <button
                                    key={"table_" + table.id}
                                    type="button"
                                    onClick={() => selectTable(customer_type, table.id, table.table_no)}
                                    className={cn(
                                        "duration-200 border border-slate-400 dark:border-slate-600 rounded-md px-1 pt-1 pb-0.5 min-w-[60px]",
                                        selectedTable?.table_id === table.id
                                            ? "bg-primary text-clr-text-body"
                                            : table.status !== "available"
                                                ? "bg-secondary text-white"
                                                : "bg-slate-100 dark:bg-slate-900 text-clr-text-body"
                                    )}
                                >
                                    <Icon
                                        className="w-[22px]"
                                        // type={isTable(table) ? "table" : table?.id === 1 ? "phone" : "percel"}
                                        type={isTable(table) ? "table" : "percel"}
                                        active={isActive(table)}
                                    />
                                    <Label isSelected={isSelected(table)} text={table?.id === 1 ? "Phone" : table.table_no} />
                                </button>
                            );
                        })}
                    </div>

                </div>
            </div>
        </>
    )
}


type IconProps = {
    type: "table" | "percel" | "phone";
    active: boolean;
    className?: string
}
const Icon = ({ active, type, className }: IconProps) => {


    // if (type === "phone") return <PhoneCall className={cn("size-4 mx-auto", active && "text-white")} />

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