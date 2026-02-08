"use client";

import { getTranslationReadyText } from "@/lib/utils";
import { InvoiceData } from "@/types/types";
import Image from "next/image";
import { forwardRef } from "react";

type Props = {
    invoiceData: InvoiceData
};

const InvoicePrint = forwardRef<HTMLDivElement, Props>(({ invoiceData }, ref) => {

    const previous_due = Number(invoiceData.customer.total_receivable);
    const final_receivable = previous_due + Number(invoiceData.final_receivable);
    const total_due = Number(previous_due) + Number(invoiceData.final_receivable);

    return (
        <div ref={ref} className="w-[320px] mt-5 mx-auto border-x border-black p-2 text-[13px] text-black">

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
                    {invoiceData.customer?.name ?? "N/A"} (
                    {invoiceData.customer?.phone ?? "N/A"})
                </div>
            </div>

            <div className="flex justify-between text-[12px]">
                <div>
                    <b>Date:</b>{" "}
                    {new Date(invoiceData.created_at).toLocaleDateString()}
                </div>
                <div>
                    <b>Time:</b>{" "}
                    {new Date(invoiceData.created_at).toLocaleTimeString()}
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
                    {invoiceData.items?.map((item, index) => {
                        const { en, bn } = getTranslationReadyText(item.product.name);
                        return <tr key={item.id} className={invoiceData.items.length > (index + 1) ? 'border-b' : ""}>
                            <td className="py-1">
                                {bn ?? en}
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
                    }
                    )}
                </tbody>
            </table>

            <div className="border-t border-black my-2" />

            {/* Summary */}
            <Row label="Subtotal" value={Number(invoiceData.receivable)} bold />
            <Row label="Discount" value={`(-) ${Number(invoiceData.discount).toFixed?.(0) ?? 0}`} />
            <Row label="Delivery Charge" value={`(+) ${Number(invoiceData.delivery_charge).toFixed?.(0) ?? 0}`} />
            <Row label="Previous Due" value={`(+) ${previous_due ?? 0}`} />

            <div className="flex justify-between font-bold text-[14px] border-t border-black pt-1">
                <span>Grand Total</span>
                <span>{final_receivable} Tk</span>
            </div>

            <Row label="Total Paid" value={0} />
            <Row label="Total Due" value={total_due} />

            <div className="border-t border-dashed border-black mt-8 mb-2" />

            <div className="flex justify-between text-[12px]">
                <div>Billing By : {invoiceData.billingBy ?? "N/A"}</div>
                <div>Waiter : {invoiceData.waiter?.fname ?? "N/A"}</div>
            </div>

            <div className="flex justify-between text-[12px]">
                <div>Table No : {invoiceData.table_id ?? "N/A"}</div>
                <div>Order ID : {invoiceData.id}</div>
            </div>

            <div className="border-t border-dashed border-black my-2" />

            <div className="text-center font-bold mb-2">
                Payment Status : Due
            </div>

            {/* QR */}
            <Image
                src="https://test.bdchefchoice.com/dashboard/images/qr.jpeg"
                className="mx-auto w-[80px]"
                width={80}
                height={80}
                alt="qr"
            />

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

// eslint-disable-next-line
function Row({ label, value, bold }: any) {
    return (
        <div className={`flex justify-between text-[12px] ${bold ? "font-bold text-[13px]" : ""}`}>
            <span>{label}</span>
            <span>{value} Tk</span>
        </div>
    );
}
