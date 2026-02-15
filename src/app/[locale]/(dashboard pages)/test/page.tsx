"use client";

import { useEffect, useState } from "react";

export default function TestPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const testData = {
        id: 345,
        token: "some test token",
        table_id: 5,
        waiter: "Alamin",
        orderType: "Online",
        items: [
            { id: "23", product_name: "Set Mill-1", variation: "1:1", qty: 3 },
            { id: "27", product_name: "Set Mill-2", variation: "1:1", qty: 2 },
            { id: "43", product_name: "Set Mill-3", variation: "1:1", qty: 5 },
        ],
    };

    const printKOT = async () => {
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const response = await fetch("/api/print-kot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(testData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to send KOT to printer");
            }

            setMessage("KOT sent to printer successfully!");
            //   eslint-disable-next-line
        } catch (err: any) {
            console.error("Print error:", err);
            setError(err.message || "Something went wrong while printing");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-20 px-4">
            <div className="max-w-md w-full text-center space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">KOT Printer Test</h1>

                {/* Status Messages */}
                {loading && (
                    <div className="p-4 bg-blue-100 text-blue-800 rounded-lg">
                        Sending KOT to printer... Please wait.
                    </div>
                )}

                {message && (
                    <div className="p-4 bg-green-100 text-green-800 rounded-lg font-medium">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-red-100 text-red-800 rounded-lg">
                        <strong>Error:</strong> {error}
                        <br />
                        <small className="text-red-600">
                            Make sure printer IP is correct and Next.js server is on same network.
                        </small>
                    </div>
                )}

                {/* Test Data Preview */}
                <div className="bg-gray-50 p-4 rounded-lg text-left text-sm">
                    <pre className="whitespace-pre-wrap overflow-auto max-h-60">
                        {JSON.stringify(testData, null, 2)}
                    </pre>
                </div>

                {/* Print Button */}
                <button
                    onClick={printKOT}
                    disabled={loading}
                    className={`
            px-8 py-4 rounded-lg font-semibold text-white text-lg transition
            ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                        }
          `}
                >
                    {loading ? "Printing..." : "Print KOT Now"}
                </button>

                <p className="text-sm text-gray-500 mt-4">
                    This will send the test data to <code>/api/print-kot</code>
                </p>
            </div>
        </div>
    );
}