import { NextRequest, NextResponse } from "next/server";
import net from "net";

// YOUR PRINTER IP – change this! (check self-test print or router DHCP list)
const PRINTER_IP = "192.168.1.87";  // Default for many Rongta Ethernet models
const PRINTER_PORT = 9100;

// ESC/POS buffers
const ESC = Buffer.from([0x1b]);
const GS = Buffer.from([0x1d]);

const INIT = Buffer.concat([ESC, Buffer.from("@")]);
const ALIGN_CENTER = Buffer.concat([ESC, Buffer.from("a"), Buffer.from([1])]);
const ALIGN_LEFT = Buffer.concat([ESC, Buffer.from("a"), Buffer.from([0])]);
const ALIGN_RIGHT = Buffer.concat([ESC, Buffer.from("a"), Buffer.from([2])]);
const BOLD_ON = Buffer.concat([ESC, Buffer.from("E"), Buffer.from([1])]);
const BOLD_OFF = Buffer.concat([ESC, Buffer.from("E"), Buffer.from([0])]);
const CUT_FULL = Buffer.concat([GS, Buffer.from("V"), Buffer.from([0])]); // Full cut
const FEED_LINES = (n: number) => Buffer.from("\n".repeat(n));

// Helper: Create aligned line (left + right padded to width)
function alignedLine(left: string, right: string = "", width = 42): string {
    const leftPadded = left.padEnd(width - right.length);
    return leftPadded + right + "\n";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildInvoiceReceipt(invoice: any) {  // Replace 'any' with your InvoiceData type
    const lines: Buffer[] = [INIT, ALIGN_CENTER];

    // Header
    lines.push(Buffer.from("Food Garden\n"));
    lines.push(Buffer.from("Jhuadanga, Satkhira Sadar\n"));
    lines.push(Buffer.from("Satkhira\n"));
    lines.push(Buffer.from("Mobile: 01974619293, 01713619293\n"));
    lines.push(Buffer.from("www.foodgardencafe.com\n"));
    lines.push(FEED_LINES(1));

    lines.push(ALIGN_LEFT);
    lines.push(Buffer.from(`Customer: ${invoice.customer?.name ?? "N/A"} (${invoice.customer?.phone ?? "N/A"})\n`));
    lines.push(Buffer.from(`Date: ${new Date(invoice.created_at).toLocaleDateString("en-BD")}\n`));
    lines.push(Buffer.from(`Time: ${new Date(invoice.created_at).toLocaleTimeString("en-BD")}\n`));
    lines.push(FEED_LINES(1));

    // Separator
    lines.push(Buffer.from("-".repeat(42) + "\n"));

    // Items Table Header
    lines.push(Buffer.from(alignedLine("Item", "Qty   Amount")));
    lines.push(Buffer.from("-".repeat(42) + "\n"));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invoice?.items?.forEach((item: any) => {
        const name = item.product?.name ?? "Unknown Item"; // English name
        const variation = item.variation?.variation ? `  ${item.variation.variation}` : "";

        const qtyRate = `${item.qty}×${Number(item.rate).toFixed(0)}`;
        const amount = `${Number(item.sub_total).toFixed(0)} Tk`;

        lines.push(Buffer.from(alignedLine(name.slice(0, 30), "", 42))); // Truncate long names
        if (variation) {
            lines.push(Buffer.from(alignedLine(variation.slice(0, 40), "", 42)));
        }
        lines.push(Buffer.from(alignedLine("", qtyRate.padStart(10) + amount.padStart(12), 42)));
    });

    lines.push(Buffer.from("-".repeat(42) + "\n"));

    // Summary
    const prevDue = invoice.customer_id === 1 ? 0 : Number(invoice.customer?.total_receivable ?? 0);
    const grandTotal = prevDue + Number(invoice.final_receivable ?? 0);
    const totalDue = prevDue + Number(invoice.final_receivable ?? 0);

    lines.push(Buffer.from(alignedLine("Subtotal", `${Number(invoice.receivable ?? 0).toFixed(0)} Tk`)));
    lines.push(Buffer.from(alignedLine("Discount", `(-) ${Number(invoice.discount ?? 0).toFixed(0)}`)));
    lines.push(Buffer.from(alignedLine("Delivery Charge", `(+) ${Number(invoice.delivery_charge ?? 0).toFixed(0)}`)));
    lines.push(Buffer.from(alignedLine("Previous Due", `(+) ${prevDue}`)));

    lines.push(BOLD_ON);
    lines.push(Buffer.from(alignedLine("Grand Total", `${grandTotal.toFixed(0)} Tk`)));
    lines.push(BOLD_OFF);

    lines.push(Buffer.from(alignedLine("Total Paid", "0 Tk")));
    lines.push(Buffer.from(alignedLine("Total Due", `${totalDue.toFixed(0)} Tk`)));

    lines.push(FEED_LINES(2));

    lines.push(ALIGN_CENTER);
    lines.push(Buffer.from("Payment Status: Due\n"));
    lines.push(FEED_LINES(1));

    lines.push(ALIGN_LEFT);
    lines.push(Buffer.from(`Billing By: ${invoice.billingBy ?? "N/A"}    Waiter: ${invoice.waiter?.fname ?? "N/A"}\n`));
    lines.push(Buffer.from(`Table No: ${invoice.table_id ?? "N/A"}    Order ID: ${invoice.id}\n`));

    lines.push(FEED_LINES(2));
    lines.push(ALIGN_CENTER);
    lines.push(Buffer.from("Make Bkash Payment\n"));
    lines.push(Buffer.from("Bkash (Payment): 01713-619293\n"));
    lines.push(Buffer.from("Nogod (Send Money): 01740-133050\n"));
    lines.push(FEED_LINES(4)); // Extra feed before cut

    lines.push(CUT_FULL);

    return Buffer.concat(lines);
}

// TCP send function
function sendToPrinter(buffer: Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();

        client.connect(PRINTER_PORT, PRINTER_IP, () => {
            client.write(buffer);
            client.end();
        });

        client.on("end", resolve);
        client.on("error", (err) => reject(err));

        setTimeout(() => {
            client.destroy();
            reject(new Error("Connection timeout"));
        }, 10000);
    });
}

export async function POST(req: NextRequest) {
    try {
        const invoiceData = await req.json();

        // Basic validation
        if (!invoiceData.id || !invoiceData.items || !invoiceData.created_at) {
            return NextResponse.json({ error: "Invalid invoice data" }, { status: 400 });
        }

        const receiptBuffer = buildInvoiceReceipt(invoiceData);

        await sendToPrinter(receiptBuffer);

        return NextResponse.json({ success: true, message: "Invoice printed" });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Printing error:", error);
        return NextResponse.json(
            { error: "Failed to print", details: error.message },
            { status: 500 }
        );
    }
}



