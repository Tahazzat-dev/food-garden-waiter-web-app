"use client";

import { getFromStorage } from "@/lib/storage";
import { RootState } from "@/redux/store";
import { OrderItem, TCustomerType, TUser } from "@/types/types";
import { forwardRef } from "react";
import { useSelector } from "react-redux";

interface Props {
    orderData: {
        id?: number;
        token?: string;
        orderType: TCustomerType;
        table_id: number | null;
        waiter: string;
        items: OrderItem[];
    }
}

export const KOTPrint = forwardRef<HTMLDivElement, Props>(
    ({ orderData }, ref) => {
        const { tables } = useSelector((state: RootState) => state.address);
        const user = getFromStorage('user') as TUser;
        const date = new Date();

        const selectedTable = tables.find(table => table.id === orderData.table_id);
        return (
            <div
                ref={ref}
                className="w-[320px] mt-10  mx-auto border-2 border-black p-2 text-black text-[13px] font-sans"
            >
                {/* TITLE */}
                <div className="text-center text-[18px] font-bold border-b-2 border-black py-1">
                    Kitchen Order Ticket (KOT)
                </div>

                {/* INFO */}
                <table className="w-full mt-2 font-bold">
                    <tbody>
                        <tr>
                            <td>
                                Type: <span>{orderData?.orderType}</span>
                            </td>
                            <td className="text-right">
                                Waiter: {user?.fname ?? "N/A"}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Table No: {selectedTable?.table_no}
                            </td>
                            <td className="text-right">
                                Token No: {orderData?.token}
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* ITEMS TABLE */}
                <table className="w-full mt-2 border-collapse">
                    <thead>
                        <tr className="text-[14px] border-b border-black">
                            <th className="text-left p-1">Item</th>
                            <th className="text-center p-1">Variant</th>
                            <th className="text-center p-1">Quantity</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orderData.items && orderData.items.map((item, index) => (
                            <tr key={item.id} className={orderData.items.length > (index + 1) ? 'border-b' : ""}>
                                <td className="p-1">
                                    <strong>{item.product_name}</strong>

                                    {/* {item.isDeleted && (
                                                       <span className="bg-red-600 text-white text-[12px] px-1 ml-1 rounded">
                                                           Delete Item
                                                       </span>
                                                   )} */}
                                </td>

                                <td className="text-center p-1">
                                    <strong>{item.variation.variation ?? "—"}</strong>
                                </td>

                                <td className="text-center p-1">
                                    <strong>{item.qty}</strong>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* NOTE */}
                {/* {order.note && (
                                   <div className="border border-black h-[35px] mt-8 p-1 font-bold">
                                       Order Note: <strong>{order.note}</strong>
                                   </div>
                               )} */}

                {/* BOTTOM */}
                <div className="mt-5 pt-2 border-t font-bold">
                    <div className="flex justify-between">
                        <div>Order ID: {orderData?.id}</div>
                        <div>Token: Update</div>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            Date: {date.toLocaleDateString("en-GB")}
                        </div>
                        <div>
                            Time:{" "}
                            {date.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

KOTPrint.displayName = "KOTPrint";
