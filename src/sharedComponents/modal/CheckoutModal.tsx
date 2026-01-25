'use client';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown } from "lucide-react"
import { useRef } from "react"
import { Check, ShoppingCart, X } from "lucide-react"; // optional icon
import { Button } from "@/components/ui/button";
import { clearCartProducts } from "@/redux/features/product/productSlice";
import { useTranslations } from 'next-intl';
import { SET_EXPAND, updateFetchOrders } from '@/redux/features/actions/actionSlice';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, MouseEvent, SetStateAction, useEffect, useMemo, useState } from 'react';
import { calculateSubtotal, cn, getDiscountAmount, getTranslationReadyText } from '@/lib/utils';

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

        deliveryType: z.enum(deliveryTypes),
        paymentType: z.enum(paymentTypes).optional(),
    }).superRefine((data, ctx) => {
        if (data.deliveryType === "Home Delivery" && !data.paymentType) {
            ctx.addIssue({
                path: ["paymentType"],
                message: "Payment type is required for Home Delivery",
                code: "custom",
            });
        }
    })

export type OrderFormValues = z.infer<typeof orderSchema>;


import { createPortal } from "react-dom";
import useFormatPrice from '@/hooks/useFormatPrice';
import { CheckoutStatus, TAddress, TOrderResponse } from '@/types/types';
import RenderText from '../utils/RenderText';
import { useGetAddressesQuery } from '@/redux/features/address/addressApiSlice';
import LoadingSpinner from '../loading/LoadingSpinner';
import useRenderText from '@/hooks/useRenderText';
import { useConfirmOrderMutation, useLazyGetCustomerInfoQuery } from '@/redux/features/product/productApiSlice';
import { getFromStorage, setToStorage } from '@/lib/storage';
import { Input } from '../shared/FormEl';

export default function CheckoutModal() {
    // variables
    const KEY = "CHECKOUT_MODAL";

    // hooks
    const [mounted, setMounted] = useState(false);
    const dispatch = useDispatch();
    const t = useTranslations('checkout');
    const { EXPAND } = useSelector((state: RootState) => state.actions);
    const { cartProducts } = useSelector((state: RootState) => state.productSlice);
    const { formatPrice } = useFormatPrice()
    const [showCheckoutResult, setShowCheckoutResult] = useState(false)
    const [confirmOrder, { isLoading }] = useConfirmOrderMutation()
    const [orderResponse, setOrderResponse] = useState<TOrderResponse | null>(null);
    const [getCustomer, { isLoading: isCustomerInfoLoading }] = useLazyGetCustomerInfoQuery();
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
        defaultValues: {
            paymentType: "Payment",
        },
    });

    // conditional variables
    const openModal = EXPAND === KEY;
    // const paymentType = watch("paymentType");
    const deliveryType = watch("deliveryType");
    const deliveryAddress = watch("address");


    // handlers
    const onSubmit = async (data: OrderFormValues) => {
        const products = cartProducts.map(p => ({ product_id: p.productId, variant_id: p.id, quantity: p.quantity }));
        const bodyData = {
            name: data.name,
            phone: data.phone,
            address_id: data.address.id,
            address_note: data.addressNote,
            products,
            delivery_type: data.deliveryType
        }

        setToStorage('user_address', data);

        try {
            const res = await confirmOrder(bodyData).unwrap();
            if (res.success) {
                dispatch(clearCartProducts());
                setOrderResponse({
                    message: t("defaultOrderSuccessMessage"),
                    orderId: res.order_id,
                    status: "success",
                })
                setShowCheckoutResult(true);

                // save the order to localStorage
                dispatch(updateFetchOrders(true))
            }
        } catch (error) {
            console.error(error);
            setOrderResponse({
                message: t("defaultOrderFailedMessage"),
                orderId: '',
                status: "error",
            })
        }
    };

    const { cartTotal, discount, subTotal } = useMemo(() => {
        let total = 0;
        let totalDiscount = 0;

        cartProducts.forEach((item) => {
            total += calculateSubtotal(item.price, item.quantity);
            totalDiscount += getDiscountAmount(item.price, item.discount) * item.quantity;
        });

        const subtotal = total + (deliveryType === "Home Delivery" ? (+deliveryAddress?.delivery_charge || 0) : 0) - totalDiscount;

        return { cartTotal: Number(total.toFixed(2)), discount: Number(totalDiscount.toFixed(2)), subTotal: Number(subtotal.toFixed(2)) };
    }, [cartProducts, deliveryType, deliveryAddress]);

    const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {

        if (!isOpen) return;

        const targetElement = event.target as HTMLElement;
        if (targetElement.closest(".custom-select-el")) return;
        setIsOpen(false);
    }


    const handleCustomerSearch = async () => {
        try {
            const phone = watch('phone');
            const res = await getCustomer(phone).unwrap();
            if (res?.success && res?.data && res?.data?.phone) {
                const address: OrderFormValues = {
                    address: res.data.address,
                    addressNote: res.data.note,
                    name: res.data.name,
                    deliveryType: "Home Delivery",
                    phone: res.data.phone,
                    paymentType: "Cash On Delivery"
                }
                reset(address);
            } else {
                reset();
            }
        } catch (error) {
            // TODO: have to log error to the error file.
            console.error(error);
        }
    }

    //  ========== hidden overflow of body ========
    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        setIsOpen(false);
        // load user address from the localstorage
        const address = getFromStorage('user_address') as OrderFormValues;
        if (address && address?.name) {
            reset(address)
        }
    }, [EXPAND, reset])




    useEffect(() => {
        if (typeof window === "undefined") return;

        if (openModal) {
            setShowCheckoutResult(false);

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

        // Cleanup function to reset style when component unmounts
        return () => {
            document.body.style.pointerEvents = "auto";
        };
    }, [isLoading])


    if (!mounted) return <></>;

    return createPortal(
        <>
            {!!openModal && (
                <div
                    className={`fixed top-[81px] !border-none lg:top-[83.53px] inset-0 cart-overlay global-overlay z-[99999]`}
                />
            )}
            <div
                className={`fixed flex pb-1 md:pb-5 lg:pb-[5vh] bg-transparent justify-center items-end rounded-r-[10px] overflow-hidden cartsheet-drawer z-[99999] w-full right-0 bottom-[65px]  md:bottom-0 h-full rounded-md lg:!rounded-r-none duration-300 ${openModal ? "translate-y-0" : "translate-y-[120%]"}`}
            >
                {
                    !showCheckoutResult ?
                        <div onClick={handleModalClick} className={cn("prevent-body-trigger checkout-modal-inner w-full flex flex-col mx-auto max-h-[100%] h-auto !border-none !m-0 !p-0 max-w-[90vw] sm:max-w-[500px] md:max-w-[500px] !rounded-[6px] md:rounded-[8px] lg:!rounded-[10px] bg-body overflow-hidden", !!isCustomerInfoLoading && "pointer-events-none")} >
                            <div className="flex items-center justify-between bg-primary px-2.5 sm:px-4 py-3 mb-1">
                                <div></div>
                                <h3 className="fg_fs-lg text-white">
                                    {t('makeConfirmOrder')}
                                </h3>
                                <button onClick={() => dispatch(SET_EXPAND("CART_SHEET"))} className='prevent-body-trigger relative'>
                                    <ShoppingCart fill='white' className='text-white h-6 w-6 cursor-pointer' />
                                    {
                                        cartProducts.length > 0 ?
                                            <span className='flex items-center justify-center text-xs px-0.5 min-w-[18px] min-h-4  absolute -top-[40%] left-[80%] translate-x-[-50%] bg-secondary text-white rounded-full p-[1px]'>{cartProducts.length}</span> : <></>
                                    }
                                </button>
                            </div>
                            {
                                cartProducts.length === 0 ? <div className='p-4 grow flex items-center justify-center min-h-[400px]'>
                                    <p><RenderText group='shared' variable='emptyCart' /></p>
                                </div> :

                                    <form onSubmit={handleSubmit(onSubmit)} className="px-0.5 my-2.5 grow overflow-hidden flex flex-col">
                                        <div className="grow w-full flex flex-col px-2 md:-2.5 lg:px gap-5 overflow-y-auto">
                                            {/* Name and information */}
                                            <div className="w-full bg-clr-card flex flex-col p-3 gap-4 md:gap-5 rounded-md">
                                                <Input
                                                    showErrorBorder={false}
                                                    control={control}
                                                    label={t("yourName")}
                                                    name='name'
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
                                            </div>

                                            {/* delivery order type */}
                                            <div className='w-full flex flex-col gap-1'>
                                                <label key="Home Delivery" className={`flex gap-2 items-center py-1 lg:py-1.5 rounded-[4px] px-3 ${deliveryType === "Home Delivery" ? "bg-secondary text-white" : "bg-clr-card"}`}>
                                                    <input
                                                        type="radio"
                                                        value="Home Delivery"
                                                        {...register("deliveryType")}
                                                    />
                                                    <span className='flex items-center justify-between grow'>
                                                        <span className='grow'>{t("homeDelivery")}</span> <span>{formatPrice(+deliveryAddress?.delivery_charge || 0)}</span>
                                                    </span>
                                                </label>
                                                <label key="Self Pickup" className={`flex gap-2 items-center py-1 lg:py-1.5 rounded-[4px] px-3 ${deliveryType === "Self Pickup" ? "bg-secondary text-white" : "bg-clr-card"}`}>
                                                    <input
                                                        type="radio"
                                                        value="Self Pickup"
                                                        {...register("deliveryType")}
                                                    />
                                                    {t("selfPickup")}
                                                </label>
                                                <label key="Dine-In" className={`flex gap-2 items-center py-1 lg:py-1.5 rounded-[4px] px-3 ${deliveryType === "Dine-In" ? "bg-secondary text-white" : "bg-clr-card"}`}>
                                                    <input
                                                        type="radio"
                                                        value="Dine-In"
                                                        {...register("deliveryType")}
                                                    />
                                                    {t("dineIn")}
                                                </label>
                                                {errors.deliveryType && <p className="mt-1 text-sm text-red-500">{t("deliveryError")}</p>}
                                            </div>
                                            {/* payment type */}
                                            {/* {deliveryType === "Home Delivery" ?

                                            <div className='w-full flex flex-col items-start gap-1'>
                                                <label key="Cash On Delivery" className={`min-w-[170px] inline-flex gap-2 items-center py-1 lg:py-1.5 rounded-[4px] px-3 ${paymentType === "Cash On Delivery" ? "bg-secondary text-white" : "bg-slate-300/60"}`}>
                                                    <input
                                                        type="radio"
                                                        value="Cash On Delivery"
                                                        {...register("paymentType")}
                                                    />
                                                    {t("cashOnDelivery")}
                                                </label>
                                                <div className="w-full flex items-center">
                                                    <label key="Payment" className='flex flex-wrap items-center gap-2' >
                                                        <div className={`min-w-[170px] flex gap-2 items-center py-1 lg:py-1.5 rounded-[4px] px-3 ${paymentType === "Payment" ? "bg-secondary text-white" : "bg-slate-300/60"}`}>
                                                            <input
                                                                type="radio"
                                                                value="Payment"
                                                                {...register("paymentType")}
                                                            />
                                                            {t("payment")}
                                                        </div>

                                                        <p className='py-1 lg:py-1.5 bg-[#e2136e] text-white px-2 rounded-[4px]'>{t("bkash")}</p>
                                                        <p className='py-1 lg:py-1.5 bg-[#f37121] text-white px-2 rounded-[4px]'>{t("nagad")}</p>
                                                    </label>
                                                </div>
                                                {errors.paymentType && <p>{errors.paymentType.message}</p>}
                                            </div> : <></>} */}
                                        </div>

                                        <div className="w-full flex flex-col px-2 md:px-2.5">
                                            <div className="min-h-10 border-t-black w-full mt-3 pt-2.5 border-t border-dashed">
                                                <p className='flex items-center justify-between'><span className='grow'>{t("totalOrderAmount")}</span> <span>{formatPrice(cartTotal)}</span></p>
                                                {
                                                    deliveryType === "Home Delivery" && <p className='flex items-center justify-between'><span className='grow'>{t("deliveryCharge")}</span> <span>{formatPrice(+deliveryAddress?.delivery_charge || 0)}</span></p>
                                                }
                                                {
                                                    discount > 0 && <p className='flex items-center justify-between'><span className='grow'>{t("discountAmount")}</span> <span>-{formatPrice(discount)}</span></p>
                                                }
                                            </div>

                                            {
                                                isLoading ?
                                                    <div className="w-full flex items-center min-h-10 justify-center">
                                                        <LoadingSpinner />
                                                    </div>
                                                    :
                                                    <Button size="lg" className='text-white mt-3 font-semibold lg:text-[20px]' type="submit"><span>{t("confirmOrder")}</span> <span>{formatPrice(subTotal)}</span></Button>
                                            }
                                        </div>
                                    </form>}
                        </div>
                        :
                        <CheckoutResponse setShowCheckoutResult={setShowCheckoutResult} response={orderResponse} />
                }
            </div>
        </>,
        window.document.body
    );
}


type CheckoutResponseProps = {
    response: {
        status: CheckoutStatus;
        orderId?: string;
        message?: string;
    } | null,
    setShowCheckoutResult: Dispatch<SetStateAction<boolean>>;

};

const CheckoutResponse = ({ response, setShowCheckoutResult }: CheckoutResponseProps
) => {
    // hooks
    const dispatch = useDispatch()

    // handlers
    const closeModal = () => {
        dispatch(SET_EXPAND(null));
    }

    if (!response) return;
    const { status, message, orderId } = response;
    const isSuccess = status === "success";
    return <div className="w-full max-w-md px-2.5 h-full bg-transparent flex items-center justify-center">
        <div className="prevent-body-trigger w-full rounded-[6px] bg-white dark:bg-slate-700 shadow-lg p-3 md:p-4 text-center">
            {/* Icon */}
            <div
                className={`mx-auto mb-2 md:mb-3 flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full ${isSuccess ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
            >
                {isSuccess ? <Check /> : <X />}
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold">
                {isSuccess ?
                    <RenderText group='checkout' key="ORDER_MESSAGE_MODAL_SUCCESS_MSG" variable='orderSuccess' /> :
                    <RenderText group='checkout' key="ORDER_MESSAGE_MODAL_FAIL_MSG" variable='orderFail' />}
            </h2>

            {/* Message */}
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                {message ??
                    (isSuccess ?
                        <RenderText group='checkout' key="ORDER_MESSAGE_MODAL_FALLBACK_SUCCESS_MSG" variable='defaultOrderSuccessMessage' />
                        :
                        <RenderText group='checkout' key="ORDER_MESSAGE_MODAL_FALLBACK_ERROR_MSG" variable='defaultOrderFailedMessage' />
                    )}
            </p>

            {/* Order ID */}
            {orderId && (
                <div className="mt-4 rounded-[6px] bg-gray-50 p-3 text-sm">
                    <span className="text-gray-500"><RenderText group='checkout' key="ORDER_MESSAGE_ORDER_ID" variable='orderId' />: </span>
                    <span className="ml-2 font-medium text-gray-800">
                        {orderId}
                    </span>
                </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex justify-center gap-3">
                {!isSuccess && (
                    <button
                        onClick={() => { setShowCheckoutResult(false) }}
                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                        <RenderText group='shared' key="ORDER_MESSAGE_RETRY_BTN" variable='retry' />
                    </button>
                )}

                <Button
                    variant="secondary"
                    onClick={closeModal}
                    className='text-white'
                >
                    <RenderText group='shared' key="ORDER_MESSAGE_CLOSE_BTN" variable='close' />
                </Button>
            </div>
        </div>
    </div>
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
                className="checkout-input w-full flex justify-between gap-4 items-center px-3 py-2 h-[38px] md:h-10 rounded border"
            >
                {selectedAddress ? (

                    <span className='text-base'>{renderText(bn, en)}</span>
                ) : (
                    <span className="text-gray-400 dark:text-gray-300">{t('deliveryAddress')}</span>
                )}
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


