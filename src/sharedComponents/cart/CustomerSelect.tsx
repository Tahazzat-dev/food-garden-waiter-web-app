import useRenderText from "@/hooks/useRenderText";
import { cn, getTranslationReadyText } from "@/lib/utils";
import { useGetAddressesQuery } from "@/redux/features/address/addressApiSlice";
import { TAddress } from "@/types/types";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import LoadingSpinner from "../loading/LoadingSpinner";
import RenderText from "../utils/RenderText";

export function CustomerSelect({
    register,
    setValue,
    watch,
    isOpen,
    setIsOpen,
}) {
    // hooks
    const { isLoading, data } = useGetAddressesQuery('');
    const [addresses, setAddresses] = useState<TAddress[]>([])
    const dropdownRef = useRef(null)
    const [search, setSearch] = useState("")
    const { renderText } = useRenderText()
    const t = useTranslations("checkout");
    const selected = watch("address")

    // Filtered addresses
    const filtered = useMemo(() => {
        return addresses?.filter(a =>
            a.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [addresses, search])

    useEffect(() => {
        if (data?.data && data.data?.length) {
            setAddresses(data?.data);
        }
    }, [data?.data])

    const handleSelect = (addr) => {
        setValue("address", addr, { shouldValidate: true })
        setIsOpen(false)
        setSearch("")
    }

    const selectedAddress = addresses?.find(a => a.id === selected.id)
    const { en, bn } = getTranslationReadyText(selectedAddress?.name || "");

    if (isLoading) return <div className="grow flex items-center justify-center">
        <LoadingSpinner />
    </div>

    return (
        <div className="prevent-body-trigger custom-select-el relative w-full" ref={dropdownRef}>
            <input type="hidden" {...register("address")} />
            <button
                type="button"
                onClick={() => setIsOpen(v => !v)}
                className="checkout-input w-full relative flex justify-between gap-4 items-center px-3 py-2 h-[38px] md:h-10 rounded border"
            >
                {!!selectedAddress &&
                    <span className="text-base">{renderText(bn, en)}</span>
                }
                <span
                    className={cn(
                        "pointer-events-none duration-200 m-0 p-0 absolute left-3 top-1/2 -translate-y-1/2",
                        "peer-focus:top-0 bg-clr-card peer-focus:text-[11px] peer-focus:px-1 peer-focus:left-1.5",
                        selectedAddress && "top-0 text-[11px] px-0.5 left-2"
                    )}
                >{t('deliveryAddress')}</span>
                <ChevronDown className='!w-5 !h-5' />
            </button>
            {/* Dropdown */}
            {isOpen && (
                <div className=" absolute z-[9999] top-0 w-full bg-clr-card rounded shadow-lg border">

                    {/* Search input */}
                    <div className="p-1 border-b">
                        <input
                            type="text"
                            placeholder={t("searchAddress")}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="checkout-input"
                        />
                    </div>

                    {/* Options */}
                    <div className="max-h-[160px] lg:max-h-[170px] overflow-y-auto">
                        {filtered.length > 0 ? (
                            filtered.map(addr => {
                                const { en: En, bn: Bn } = getTranslationReadyText(addr.name)
                                return <button
                                    key={addr.id}
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSelect(addr);
                                    }}
                                    className="prevent-body-trigger w-full px-3 py-1 md:py-1.5 hover:bg-gray-100 text-left"
                                >
                                    {renderText(Bn, En)}
                                </button>
                            })

                        ) : (
                            <div className="px-3 py-2 text-gray-400 dark:text-gray-200 text-sm">
                                <RenderText group='checkout' variable='noAddressFound' />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

