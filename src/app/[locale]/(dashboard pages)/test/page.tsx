"use client"

import { KOTPrint } from "@/sharedComponents/shared/KotPrint";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

type TOrderData = {
    id?: number;
    token?: string;
    orderType?: string;
    table?: string;
}


export default function TestPage() {

    const orderData: TOrderData = {
        id: 334,
        token: "2",
        orderType: "Online",
        table: "Table - 2"
    }
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
    });


    return (

        <div className="min-h-screen bg-white items-start pt-40 flex bg-inherit justify-center">
            <button onClick={handlePrint} >
                Print KOT
            </button>
            <div className="w-full hidden print:block">
                <KOTPrint
                    orderData={orderData}
                    ref={printRef}
                />
            </div>
        </div>

    )
}


