"use client";

import { forwardRef } from "react";

type Props = {
    order: any; // you can replace with your Order ypet
};

const InvoicePrint = forwardRef<HTMLDivElement, Props>(({ order }, ref) => {

    const previous_due =
        order.customer_id === 1
            ? 0
            : (order.customer?.due ?? 0) - (order.due ?? 0);

    const final_receivable = previous_due + Number(order.final_receivable);
    const total_due = previous_due + Number(order.due);

    return (
        <div ref={ref} className="w-[320px] mx-auto border border-black p-2 text-[13px] text-black">

            {/* Header */}
            <div className="text-center">
                <div className="text-[22px] font-bold">Food Garden</div>
                <div className="text-[12px] leading-4">
                    Jhuadanga, Satkhira Sadar Satkhira <br />
                    <span className="text-[15px]">
                        Mobile : 01974619293, 01713619293
                    </span>
                    <br />
                    Website: www.foodgardencafe.com
                </div>
            </div>

            <div className="border-t border-dashed border-black my-2" />

            {/* Customer Info */}
            <div className="flex justify-between text-[12px]">
                <div>
                    <b>Customer:</b>{" "}
                    {order.customer?.name ?? "N/A"} (
                    {order.customer?.phone ?? "N/A"})
                </div>
            </div>

            <div className="flex justify-between text-[12px]">
                <div>
                    <b>Date:</b>{" "}
                    {new Date(order.created_at).toLocaleDateString()}
                </div>
                <div>
                    <b>Time:</b>{" "}
                    {new Date(order.created_at).toLocaleTimeString()}
                </div>
            </div>

            <div className="border-t border-dashed border-black my-2" />

            {/* Items Table */}
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-black text-white text-[12px]">
                        <th className="p-1 text-left">Item</th>
                        <th className="p-1">Qty</th>
                        <th className="p-1 text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items?.map((item: any) => (
                        <tr key={item.id} className="font-bold border-b border-dashed">
                            <td className="py-1">
                                {item.product?.name}
                                <br />
                                <span className="text-[14px]">
                                    {item.variation?.variation}
                                </span>
                            </td>

                            <td className="text-center">
                                {item.qty}×{Number(item.rate).toFixed(0)}
                            </td>

                            <td className="text-right">
                                {Number(item.sub_total).toFixed(0)} Tk
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="border-t border-black my-2" />

            {/* Summary */}
            <Row label="Subtotal" value={order.receivable} bold />
            <Row label="Discount" value={`(-) ${order.discount}`} />
            <Row label="Delivery Charge" value={`(+) ${order.delivery_charge}`} />
            <Row label="Previous Due" value={`(+) ${previous_due}`} />

            <div className="flex justify-between font-bold text-[14px] border-t border-black pt-1">
                <span>Grand Total</span>
                <span>{final_receivable} Tk</span>
            </div>

            <Row label="Total Paid" value={order.paid} />
            <Row label="Total Due" value={total_due} />

            <div className="border-t border-dashed border-black mt-8 mb-2" />

            <div className="flex justify-between text-[12px]">
                <div>Billing By : {order.sales_man?.fname ?? "N/A"}</div>
                <div>Waiter : {order.waiter?.fname ?? "N/A"}</div>
            </div>

            <div className="flex justify-between text-[12px]">
                <div>Table No : {order.table?.table_no ?? "N/A"}</div>
                <div>Order ID : {order.id}</div>
            </div>

            <div className="border-t border-dashed border-black my-2" />

            <div className="text-center font-bold mb-2">
                Payment Status : {order.due > 0 ? "Due" : "Paid"}
            </div>

            {/* QR */}
            {/* <Image
        src="/qr.jpeg"
        className="mx-auto w-[80px]"
        alt="qr"
      /> */}

            <div className="text-center text-[11px] mt-2">
                <div>Make Bkash Payment (Scan QR Code)</div>
                <div className="text-[13px] font-semibold">
                    Bkash (Payment): 01713-619293 <br />
                    Nogod (Send Money) : 01740-133050
                </div>
            </div>
        </div>
    );
});

export default InvoicePrint;
InvoicePrint.displayName = "InvoicePrint"

function Row({ label, value, bold }: any) {
    return (
        <div className={`flex justify-between text-[12px] ${bold ? "font-bold text-[13px]" : ""}`}>
            <span>{label}</span>
            <span>{Number(value).toFixed?.(0) ?? value} Tk</span>
        </div>
    );
}
