import { NextRequest, NextResponse } from "next/server";
import net from "net";

// IMPORTANT: Replace with your actual printer IP
// Print self-test (hold feed button + power on) to see current IP
// Default for many Rongta Ethernet models: 192.168.1.87
const PRINTER_IP = "192.168.1.87"; // ← CHANGE THIS!
const PRINTER_PORT = 9100;

// ESC/POS command helpers
const ESC = Buffer.from([0x1b]);
const GS = Buffer.from([0x1d]);

const INIT = Buffer.concat([ESC, Buffer.from("@")]);                // Initialize printer
const ALIGN_CENTER = Buffer.concat([ESC, Buffer.from("a"), Buffer.from([1])]);
const ALIGN_LEFT = Buffer.concat([ESC, Buffer.from("a"), Buffer.from([0])]);
const ALIGN_RIGHT = Buffer.concat([ESC, Buffer.from("a"), Buffer.from([2])]);
const BOLD_ON = Buffer.concat([ESC, Buffer.from("E"), Buffer.from([1])]);
const BOLD_OFF = Buffer.concat([ESC, Buffer.from("E"), Buffer.from([0])]);
const DOUBLE_ON = Buffer.concat([ESC, Buffer.from("!"), Buffer.from([0x08])]); // Double height example
const CUT_FULL = Buffer.concat([GS, Buffer.from("V"), Buffer.from([0])]);      // Full cut

const FEED_LINES = (n: number) => Buffer.from("\n".repeat(n));
const LINE = "-".repeat(42) + "\n";

// Helper: Create aligned line (left content + right content, total width 42)
function line(left: string, right: string = "", width = 42): string {
    left = left.slice(0, width - right.length); // prevent overflow
    return left.padEnd(width - right.length) + right + "\n";
}

function buildKOTReceipt(data: {
    id?: number;
    token?: string;
    orderType: "Online" | "Dine-In" | "Take Way";
    table_id: number | null;
    waiter: string;
    items: Array<{
        id: number;
        product_name: string;           // English name (as you confirmed no Bangla needed)
        variation?: { variation: string };
        qty: number;
    }>;
}) {
    const lines: Buffer[] = [INIT, ALIGN_CENTER, BOLD_ON];

    // Header
    lines.push(Buffer.from("Kitchen Order Ticket (KOT)\n"));
    lines.push(BOLD_OFF);
    lines.push(FEED_LINES(1));

    lines.push(ALIGN_LEFT);
    lines.push(Buffer.from(line(`Type: ${data.orderType}`, `Waiter: ${data.waiter || "N/A"}`)));
    lines.push(Buffer.from(line(`Table No: ${data.table_id ? data.table_id : "—"}`, `Token No: ${data.token || "—"}`)));
    lines.push(FEED_LINES(1));

    lines.push(Buffer.from(LINE));

    // Items header
    lines.push(BOLD_ON);
    lines.push(Buffer.from(line("Item", "Variant   Qty", 42)));
    lines.push(BOLD_OFF);
    lines.push(Buffer.from(LINE));

    data.items.forEach((item) => {
        const name = item.product_name || "Unknown";
        const variant = item.variation?.variation || "—";
        const qty = `${item.qty}`;

        lines.push(Buffer.from(line(name.slice(0, 24), "", 42))); // truncate long names
        lines.push(Buffer.from(line(`  ${variant.slice(0, 30)}`, qty.padStart(10), 42)));
        lines.push(Buffer.from(" ".repeat(42) + "\n")); // small spacing between items
    });

    lines.push(Buffer.from(LINE));
    lines.push(FEED_LINES(2));

    // Bottom info
    lines.push(ALIGN_LEFT);
    lines.push(Buffer.from(line(`Order ID: ${data.id ?? "—"}`, `Token: ${data.token ?? "Update"}`)));

    const now = new Date();
    lines.push(Buffer.from(line(
        `Date: ${now.toLocaleDateString("en-GB")}`,
        `Time: ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    )));

    lines.push(FEED_LINES(4)); // extra space before cut
    lines.push(CUT_FULL);

    return Buffer.concat(lines);
}

// Send raw data to printer
function sendToPrinter(buffer: Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();

        client.connect(PRINTER_PORT, PRINTER_IP, () => {
            client.write(buffer);
            client.end();
        });

        client.on("end", resolve);
        client.on("error", (err) => reject(err));

        // Timeout safety
        setTimeout(() => {
            client.destroy();
            reject(new Error("Printer connection timeout"));
        }, 10000);
    });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Minimal validation
        if (!body.orderType || !Array.isArray(body.items)) {
            return NextResponse.json({ error: "Missing required fields: orderType or items" }, { status: 400 });
        }

        // return NextResponse.json(
        //     { success: true, data: { ...body } },
        //     { status: 500 }
        // );

        const receiptBuffer = buildKOTReceipt(body);

        await sendToPrinter(receiptBuffer);

        return NextResponse.json({
            success: true,
            message: "KOT sent to printer",
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.error("KOT print error:", err);
        return NextResponse.json(
            { error: "Failed to print KOT", details: err.message },
            { status: 500 }
        );
    }
}