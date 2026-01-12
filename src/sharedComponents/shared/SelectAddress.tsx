"use client"
import useFormatPrice from "@/hooks/useFormatPrice"
import useRenderText from "@/hooks/useRenderText"
import { getTranslationReadyText } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

export default function SelectAddress({
    addresses,
    register,
    setValue,
    watch,
    isOpen,
    setIsOpen,
    // formatPrice,
    placeholder = "Select delivery address",
    searchPlaceholder = "Search"
}) {
    // hooks
    const { formatPrice } = useFormatPrice()
    const dropdownRef = useRef(null)
    const selected = watch("address")
    const [search, setSearch] = useState("")
    const selectedAddress = addresses?.find(a => a.name === selected)
    const { renderText } = useRenderText()

    // Filtered addresses
    const filtered = useMemo(() => {
        return addresses?.filter(a =>
            a.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [addresses, search])

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            // if (!dropdownRef.current?.contains(e.target)) {
            //     setIsOpen(false)
            // }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    const handleSelect = (addr) => {
        setValue("address", addr, { shouldValidate: true })
        setIsOpen(false)
        setSearch("")
    }

    const { en, bn } = getTranslationReadyText(addresses?.name || "");

    return (
        <div className="custom-select-el relative w-full" ref={dropdownRef}>
            {/* RHF hidden input */}
            <input type="hidden" {...register("address")} />
            <button
                type="button"
                onClick={() => setIsOpen(v => !v)}
                className="checkout-input bg-white w-full flex justify-between gap-4 items-center px-3 py-2 rounded border"
            >
                {selectedAddress ? (
                    <span className="flex justify-between items-center grow">
                        <span>{renderText(bn, en)}</span>
                        <span>{formatPrice(+selectedAddress.delivery_charge)}</span>
                    </span>
                ) : (
                    <span className="text-gray-400 ">{placeholder}</span>
                )}
                <ChevronDown />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-[9999] top-0 w-full bg-white rounded shadow-lg border">

                    {/* Search input */}
                    <div className="p-2 border-b">
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="checkout-input"
                        />
                    </div>

                    {/* Options */}
                    <div className="max-h-[220px] overflow-y-auto">
                        {filtered.length > 0 ? (
                            filtered.map(addr => (
                                <button
                                    key={addr.id}
                                    type="button"
                                    onClick={() => handleSelect(addr)}
                                    className="w-full px-3 py-2 flex justify-between hover:bg-gray-100 text-left"
                                >
                                    <span>{addr.name}</span>
                                    <span>{formatPrice(+addr.delivery_charge)}</span>
                                </button>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-gray-400 text-sm">
                                No address found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
