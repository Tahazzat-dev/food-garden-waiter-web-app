'use client';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { SET_EXPAND } from '@/redux/features/actions/actionSlice';
import { RootState } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, X } from "lucide-react";
import { useTranslations } from 'next-intl';
import { MouseEvent, useEffect, useRef, useState } from "react";
import { Resolver, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import z from 'zod';

// schema/orderSchema.ts
export const paymentTypes = ["cash", "bkash", "bank"] as const;

export const orderSchema = z
    .object({
        discount: z.coerce.number().optional(),
        deliveryCharge: z.coerce.number().optional(),
        paymentMethod: z.enum(paymentTypes).optional(),
        payAmount: z.coerce.number().optional(),
    }).superRefine((data, ctx) => {
        if (!data.paymentMethod) {
            ctx.addIssue({
                path: ["paymentMethod"],
                message: "selectPaymentMethodError",
                code: "custom"
            })
        }
    })

export type OrderFormValues = z.infer<typeof orderSchema>;

import useFormatPrice from "@/hooks/useFormatPrice";
import useRenderText from '@/hooks/useRenderText';
import { paymentMethods } from "@/lib/demo-data";
import { useAddCustomerMutation } from "@/redux/features/customer/customerApiSlice";
import LoadingSpinner from "@/sharedComponents/loading/LoadingSpinner";
import { Input } from "@/sharedComponents/shared/FormEl";
import RenderText from "@/sharedComponents/utils/RenderText";
import { TPaymentType } from "@/types/types";
import { createPortal } from "react-dom";



export default function MakeSellModal() {
    // variables
    const KEY = "OPEN_MAKE_SELL_CUSTOMER_MODAL";

    // hooks
    const [mounted, setMounted] = useState(false);
    const dispatch = useDispatch();
    const t = useTranslations('checkout');
    const { EXPAND } = useSelector((state: RootState) => state.actions);
    const { cartProducts, cartTotal } = useSelector((state: RootState) => state.productSlice);

    const [addCustomer, { isLoading }] = useAddCustomerMutation()
    const [isOpen, setIsOpen] = useState(false);
    const { translateNumber, formatPrice } = useFormatPrice()

    // hook form
    const {
        register,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm<OrderFormValues>({
        resolver: zodResolver(orderSchema) as Resolver<OrderFormValues>,
        defaultValues: {
            discount: 50,
            deliveryCharge: 100
        }
    });

    // conditional variables
    const openModal = EXPAND === KEY;

    // handlers
    const onSubmit = async (data: OrderFormValues) => {
        const bodyData = {
            name: data.discount,
            phone: data.deliveryCharge,
            address_id: data.paymentMethod,
            address_note: data.payAmount,
        }
        alert("Api integration in progress");
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
        dispatch(SET_EXPAND("CART_SHEET"));
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


    const discount = watch("discount") ?? 0;
    const deliveryCharge = watch("deliveryCharge") ?? 0;
    const payAmount = watch("payAmount") ?? 0;

    const grandTotal = cartTotal + deliveryCharge - discount;
    const dewAmount = grandTotal - payAmount;


    useEffect(() => {
        if (discount > cartTotal) {
            setError("discount", {
                type: "manual",
                message: t("discountExceedError"),
            });
        } else {
            clearErrors("discount");
        }
    }, [discount, cartTotal, setError, clearErrors, t]);

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
                            <h3 className="fg_fs-lg text-white gap-2 flex">
                                <span><RenderText group="checkout" variable="makeSell" /></span>
                                <span className="text-base" >(<RenderText group="checkout" variable="orderId" /> : {translateNumber(34235)})</span>
                            </h3>
                            <Button onClick={closeModal} className="rounded-full !px-2.5" variant="secondary"> <X className="!text-white w-5 md:w-6 md:h-6 h-5 lg:w-8 lg:h-8" /></Button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-3 md:p-3 grow overflow-hidden flex flex-col">
                            <div className="w-full mt-3 flex gap-2 mb-3 pb-4 border-b border-dashed border-slate-400 dark:border-slate-600">
                                <Input
                                    showErrorBorder={true}
                                    control={control}
                                    label={t("discountAmount")}
                                    name='discount'
                                    inputStyle="text-center !py-1"
                                    type="number"
                                    showErrorMessage={true}
                                    errorMessage={errors.discount?.message}
                                    className="bg-clr-card"
                                    labelStyle='bg-clr-card'
                                />
                                <Input
                                    showErrorBorder={false}
                                    control={control}
                                    label={t("enterDeliveryCharge")}
                                    name='deliveryCharge'
                                    type="number"
                                    inputStyle="text-center !py-1"
                                    labelStyle='bg-clr-card'
                                />
                            </div>
                            <div className="w-full flex flex-col mb-1 gap-0.5 px-2.5">
                                <p className="flex items-center justify-between" ><span>{t("totalOrderAmount")} </span> <span>{formatPrice(cartTotal)}</span></p>
                                <p className="flex items-center justify-between" ><span>{t("discountAmount")} </span><span className="flex items-center justify-between min-w-[70px]" ><span className="mr-1 text-secondary text-sm">(-)</span><span>{formatPrice(discount)}</span></span></p>
                                <p className="flex items-center justify-between" ><span>{t("deliveryCharge")} </span><span className="flex items-center justify-between min-w-[70px]" ><span className="mr-1 text-secondary text-sm">(+)</span><span>{formatPrice(deliveryCharge)}</span></span></p>
                            </div>
                            <div className="w-full mb-3 clr-opposite px-2.5 rounded-md py-0.5">
                                <p className="flex min-h-[30] items-center justify-between" ><span>{t("grandTotal")} </span> <span>{formatPrice(grandTotal)}</span></p>
                            </div>
                            <div className="flex w-full mt-3 gap-2">
                                <div className="w-full prevent-body-trigger">
                                    <SelectPaymentMethod
                                        isOpen={isOpen}
                                        watch={watch}
                                        setIsOpen={setIsOpen}
                                        register={register}
                                        setValue={setValue}
                                    />
                                    {errors.paymentMethod && (
                                        <p className="mt-1 text-sm text-red-500">{t("deliveryAddressError")}</p>
                                    )}
                                </div>
                                <Input
                                    showErrorBorder={true}
                                    control={control}
                                    label={t("payAmount")}
                                    name='payAmount'
                                    inputStyle="text-center !py-1"
                                    type="number"
                                    className="bg-clr-card"
                                    labelStyle='bg-clr-card'
                                    errorMessage={t("payAmountError")}
                                    showErrorMessage={true}
                                />
                            </div>
                            {
                                dewAmount > 0 &&
                                <div className="w-full mb-3 mt-4 px-2.5 rounded-md py-0.5 border">
                                    <p className="flex min-h-[32] items-center justify-between" ><span>{t("dewAmount")} </span> <span className="text-secondary">{formatPrice(dewAmount)}</span></p>
                                </div>
                            }


                            {
                                isLoading ?
                                    <div className="w-full flex items-center min-h-10 justify-center">
                                        <LoadingSpinner />
                                    </div>
                                    :
                                    <div className="w-full flex items-center mt-3 gap-3">
                                        <Button onClick={closeModal} size="sm" variant="secondary" className='min-h-[32] w-full text-white font-semibold' type="button"><span><RenderText group="shared" variable="cancel" /></span></Button>
                                        <Button size="sm" className='min-h-[32] w-full text-white font-semibold' type="submit"><span><RenderText group="checkout" variable="sale" /></span></Button>
                                    </div>
                            }
                        </form>

                    </div>
                }
            </div>
        </>,
        window.document.body
    );
}

export function SelectPaymentMethod({
    register,
    setValue,
    watch,
    isOpen,
    setIsOpen,
}) {
    const dropdownRef = useRef(null)
    const { renderText } = useRenderText()
    const t = useTranslations("checkout");
    const selected = watch("paymentMethod")
    const handleSelect = (provider: TPaymentType) => {
        setValue("paymentMethod", provider.provider, { shouldValidate: true })
        setIsOpen(false)
    }

    const selectedProvider = paymentMethods?.find(p => p.provider === selected)

    return (
        <div className="prevent-body-trigger custom-select-el relative w-full" ref={dropdownRef}>
            {/* RHF hidden input */}
            <input type="hidden" {...register("paymentMethod")} />
            <button
                type="button"
                onClick={() => setIsOpen(v => !v)}
                className="checkout-input w-full relative flex justify-between gap-4 items-center px-3 py-1 rounded border"
            >
                {!!selected && selectedProvider &&
                    <span className="text-sm">{renderText(selectedProvider.name.bn, selectedProvider.name.en)}</span>
                }
                <span
                    className={cn(
                        "pointer-events-none duration-200 m-0 p-0 absolute left-3 top-1/2 -translate-y-1/2",
                        "peer-focus:top-0 bg-clr-card peer-focus:text-[11px] peer-focus:px-1 peer-focus:left-1.5",
                        selected && "top-0 text-[11px] px-0.5 left-2"
                    )}
                >{t('selectPaymentMethod')}</span>
                <ChevronDown className='!w-5 !h-5' />
            </button>
            {/* Dropdown */}
            {isOpen && (
                <div className=" absolute z-[9999] top-0 w-full bg-clr-card rounded shadow-lg border">
                    {/* Options */}
                    <div className="max-h-[110px] overflow-y-auto">
                        {
                            paymentMethods.map(method => <button
                                key={method.id}
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSelect(method);
                                }}
                                className={cn("text-sm prevent-body-trigger w-full px-3 py-1 md:py-1.5 hover:bg-gray-100 text-left", method.provider === selected ? "bg-slate-200 dark:bg-slate-700" : "")}
                            >
                                {renderText(method.name.en, method.name.bn)}
                            </button>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    )
}



