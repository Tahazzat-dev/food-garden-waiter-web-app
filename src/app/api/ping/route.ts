// app/api/ping/route.ts
import { NextResponse } from "next/server";
import escpos from "escpos";
import "escpos-network"; // registers the Network transport

const PRINTER_IP = "192.168.1.87";   // ← change if needed
const PRINTER_PORT = 9100;

export async function GET() {
    try {
        const device = new escpos.Network(PRINTER_IP, PRINTER_PORT);
        const printer = new escpos.Printer(device);

        // Promise wrapper around the callback-based open
        await new Promise<void>((resolve, reject) => {
            device.open((err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        await new Promise<void>((resolve, reject) => {
            printer
                .font("a")
                .align("ct")
                .style("bu") // bold + underline
                .size(1, 1)
                .text("RESTAURANT TEST")
                .feed(1)
                .style("normal")
                .align("lt")
                .text("Item 1: Test Burger ....... ৳420")
                .text("Item 2: Test Soda ......... ৳50")
                .feed(3)
                .cut()
                .close(() => resolve())
                .catch(reject);
        });

        return NextResponse.json({
            success: true,
            message: "Test print sent successfully",
        });

        // eslint-disable-next-line
    } catch (error: any) {
        console.error("Printer error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Could not connect or print",
                error: error.message || "Unknown error",
            },
            { status: 500 }
        );
    }
}