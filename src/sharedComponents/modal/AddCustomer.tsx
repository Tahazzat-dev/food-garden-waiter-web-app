'use client';
import { Button } from "@/components/ui/button";
import { cn, getTranslationReadyText } from '@/lib/utils';
import { SET_EXPAND } from '@/redux/features/actions/actionSlice';
import { RootState } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, X } from "lucide-react";
import { useTranslations } from 'next-intl';
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import z from 'zod';

// schema/orderSchema.ts
export const deliveryTypes = ["Home Delivery", "Self Pickup", "Dine-In"] as const;
export const paymentTypes = ["Cash On Delivery", "Payment"] as const;

export const AddressSchema = z.object({
    id: z.number(),
    name: z.string(),
    delivery_charge: z.string(),
    created_at: z.string().nullable(),
    updated_at: z.string().nullable(),
})

export const orderSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        phone: z
            .string()
            .min(11, "Phone number must be at least 11 digits"),
        address: AddressSchema.refine(v => v.id > 0, {
            message: "Address is required"
        }),
        addressNote: z.string().min(3, "Details address is required"),
    })

export type OrderFormValues = z.infer<typeof orderSchema>;


import useRenderText from '@/hooks/useRenderText';
import { useGetAddressesQuery } from '@/redux/features/address/addressApiSlice';
import { useAddCustomerMutation } from "@/redux/features/customer/customerApiSlice";
import LoadingSpinner from "@/sharedComponents/loading/LoadingSpinner";
import { Input } from "@/sharedComponents/shared/FormEl";
import RenderText from "@/sharedComponents/utils/RenderText";
import { TAddress } from '@/types/types';
import { createPortal } from "react-dom";

export default function AddCustomerModal() {
    // variables
    const KEY = "OPEN_ADD_CUSTOMER_MODAL";

    // hooks
    const [mounted, setMounted] = useState(false);
    const dispatch = useDispatch();
    const t = useTranslations('checkout');
    const { EXPAND } = useSelector((state: RootState) => state.actions);
    const [addCustomer, { isLoading }] = useAddCustomerMutation()
    const [isOpen, setIsOpen] = useState(false);

    // hook form
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm<OrderFormValues>({
        resolver: zodResolver(orderSchema),
    });

    // conditional variables
    const openModal = EXPAND === KEY;

    // handlers
    const onSubmit = async (data: OrderFormValues) => {
        const bodyData = {
            name: data.name,
            phone: data.phone,
            address_id: data.address.id,
            address_note: data.addressNote,
        }

        console.log(bodyData);

        // try {
        //     const res = await confirmOrder(bodyData).unwrap();
        //     if (res.success) {
        //         dispatch(clearCartProducts());
        //         // save the order to localStorage
        //         dispatch(updateFetchOrders(true))
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
    }

    const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {

        if (!isOpen) return;

        const targetElement = event.target as HTMLElement;
        if (targetElement.closest(".custom-select-el")) return;
        setIsOpen(false);
    }

    const closeModal = () => {
        dispatch(SET_EXPAND(null));
    }

    //  ========== hidden overflow of body ========
    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (typeof window === "undefined") return;

        if (openModal) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [openModal]);


    useEffect(() => {
        if (isLoading) {
            document.body.style.pointerEvents = "none";
        } else {
            document.body.style.pointerEvents = "auto";
        }

        return () => {
            document.body.style.pointerEvents = "auto";
        };
    }, [isLoading])


    if (!mounted) return <></>;

    return createPortal(
        <>
            {openModal && (
                <div
                    className={`fixed top-[81px] !border-none lg:top-[83.53px] inset-0 cart-overlay global-overlay z-[99999]`}
                />
            )}
            <div
                className={`fixed flex pb-1 md:pb-5 lg:pb-[5vh] bg-transparent justify-center items-center rounded-r-[10px] overflow-hidden cartsheet-drawer z-[99999] w-full right-0 bottom-[65px]  md:bottom-0 h-full rounded-md lg:!rounded-r-none duration-300 ${openModal ? "translate-y-0" : "translate-y-[120%]"}`}
            >
                {
                    // !showCheckoutResult ?
                    <div onClick={handleModalClick} className={cn("prevent-body-trigger bg-clr-card checkout-modal-inner w-full flex flex-col mx-auto max-h-[100%] h-auto !border-none !m-0 !p-0 max-w-[90vw] sm:max-w-[500px] md:max-w-[500px] !rounded-[6px] md:rounded-[8px] lg:!rounded-[10px] overflow-hidden", !true && "pointer-events-none")} >
                        <div className="flex items-center justify-between bg-primary px-2.5 sm:px-4 py-3 mb-1">
                            <h3 className="fg_fs-lg text-white">
                                <RenderText group="shared" variable="addCustomer" />
                            </h3>
                            <Button onClick={closeModal} className="rounded-full !px-2.5" variant="secondary"> <X className="!text-white w-5 md:w-6 md:h-6 h-5 lg:w-8 lg:h-8" /></Button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-3 md:p-3 grow overflow-hidden flex flex-col gap-3">
                            <Input
                                showErrorBorder={false}
                                control={control}
                                label={t("yourName")}
                                name='name'
                                className="bg-clr-card"
                                labelStyle='bg-clr-card'
                                showErrorMessage={true}
                                errorMessage={t("yourNameError")}
                            />
                            <Input
                                showErrorBorder={false}
                                control={control}
                                label={t("phoneNo")}
                                name='phone'
                                labelStyle='bg-clr-card'
                                showErrorMessage={true}
                                errorMessage={t("phoneNoError")}
                            />
                            <div className="w-full prevent-body-trigger">
                                <SelectAddress
                                    isOpen={isOpen}
                                    watch={watch}
                                    setIsOpen={setIsOpen}
                                    register={register}
                                    setValue={setValue}
                                />
                                {errors.address && (
                                    <p className="mt-1 text-sm text-red-500">{t("deliveryAddressError")}</p>
                                )}
                            </div>

                            <Input
                                showErrorBorder={false}
                                control={control}
                                label={t("addressNotePlaceholder")}
                                name='addressNote'
                                labelStyle='bg-clr-card'
                                showErrorMessage={true}
                                errorMessage={t("addressNoteError")}
                            />
                            {
                                isLoading ?
                                    <div className="w-full flex items-center min-h-10 justify-center">
                                        <LoadingSpinner />
                                    </div>
                                    :
                                    <Button size="lg" className='text-white mt-3 font-semibold' type="submit"><span><RenderText group="shared" variable="add" /></span></Button>
                            }
                        </form>

                    </div>
                }
            </div>
        </>,
        window.document.body
    );
}

export function SelectAddress({
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
            {/* RHF hidden input */}
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
                    <div className="max-h-[110px] overflow-y-auto">
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


