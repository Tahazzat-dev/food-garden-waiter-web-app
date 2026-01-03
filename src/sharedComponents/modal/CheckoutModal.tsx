'use client';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import * as Dialog from "@radix-ui/react-dialog";
import { ShoppingCart, Trash2, X } from "lucide-react"; // optional icon
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { addCartProduct, clearCartProducts, removeFavouriteProduct } from "@/redux/features/product/productSlice";
import { useLocale, useTranslations } from 'next-intl';
import { SET_EXPAND } from '@/redux/features/actions/actionSlice';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { calculateSubtotal, getDiscountAmount, getDiscountPrice } from '@/lib/utils';
import { toast } from 'react-toastify';



// schema/orderSchema.ts
export const deliveryTypes = ["Home Delivery", "Self Pickup", "Dine-In"] as const;
export const paymentTypes = ["Cash On Delivery", "Payment"] as const;

export const orderSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        phone: z
            .string()
            .min(11, "Phone number must be at least 11 digits"),
        address: z.string().min(1, "Address is required"),
        orderNote: z.string().optional(),

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


export function CheckoutModal() {
    // variables
    const KEY = "CHECKOUT_MODAL";
    const deliveryCost = { en: 150, bn: "১৫০" };
    // hooks
    const dispatch = useDispatch();
    const t = useTranslations('checkout');
    const sharedMsg = useTranslations("shared");
    const { locale } = useSelector((state: RootState) => state.locale)
    const { EXPAND } = useSelector((state: RootState) => state.actions);
    const { cartProducts } = useSelector((state: RootState) => state.productSlice);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<OrderFormValues>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            deliveryType: "Home Delivery",
            paymentType: "Payment",
        },
    });

    const openModal = EXPAND === KEY;
    const paymentType = watch("paymentType");
    const deliveryType = watch("deliveryType");

    const onSubmit = (data: OrderFormValues) => {
        console.log("Order Data:", data);
        toast.success(t("orderSuccess"));
        dispatch(clearCartProducts());
        dispatch(SET_EXPAND(null));
    };



    const formatPrice = (amount: number) => locale !== "bn" ? `${amount}TK` : `৳${amount}`;


    const { cartTotal, discount, subTotal } = useMemo(() => {
        let total = 0;
        let totalDiscount = 0;

        cartProducts.forEach((item) => {
            total += calculateSubtotal(item.price, item.quantity);
            totalDiscount += getDiscountAmount(item.price, item.discount) * item.quantity;
        });

        const subtotal = total + (deliveryType === "Home Delivery" ? deliveryCost.en : 0) - totalDiscount;

        return { cartTotal: total, discount: totalDiscount, subTotal: subtotal };
    }, [cartProducts, deliveryType, deliveryCost.en]);

    return (
        <Dialog.Root open={openModal} onOpenChange={() => dispatch(SET_EXPAND(null))}>
            <Dialog.Portal>
                <div className="fixed inset-0 global-overlay wishlist-overlay top-[81px] !border-none lg:top-[83.53px] z-[9999]" />
                <Dialog.Content className="checkout-modal fixed w-full flex flex-col items-center justify-center right-1/2 translate-x-1/2 top-[81px] lg:top-[83.53px] h-full !border-none !m-0 !p-0 overflow-hidden z-[99999]">
                    <div className="prevent-body-trigger checkout-modal-inner w-full flex flex-col h-auto !border-none !m-0 !p-0 max-w-[90vw] sm:max-w-[500px] md:max-w-[500px] !rounded-[6px] md:rounded-[8px] lg:!rounded-[10px] bg-body overflow-hidden">
                        <div className="flex items-center justify-between bg-primary px-2.5 sm:px-4 py-3">
                            <div></div>
                            <Dialog.Title className="fg_fs-lg text-white">
                                {t('makeConfirmOrder')}
                            </Dialog.Title>
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
                                <p>{sharedMsg("emptyCart")}</p>
                            </div> :

                                <form onSubmit={handleSubmit(onSubmit)} className="px-2.5 md:px-3 my-2.5 overflow-y-auto grow flex flex-col gap-5">
                                    {/* Name and information */}
                                    <div className="w-full bg-slate-300/60 flex flex-col p-3 gap-3 rounded-md">
                                        <div className="w-full">
                                            <div className="input-box">
                                                <label htmlFor="name" className="label">
                                                    <span>{t("yourName")}</span> <span>:</span>
                                                </label>
                                                <input
                                                    {...register("name")}
                                                    placeholder={t("yourNamePlaceholder")}
                                                    className="checkout-input"
                                                />
                                            </div>
                                            <div className="flex items-center grow gap-2 md:gap-4">
                                                <span className="label"></span>
                                                {errors.name && <p className="text-red-500 mt-0.5 lg:mt-1">{t("yourNameError")}</p>}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="input-box">
                                                <label htmlFor="phone" className="label">
                                                    <span>{t("phoneNo")}</span> <span>:</span>
                                                </label>
                                                <input
                                                    {...register("phone")}
                                                    placeholder={t("phoneNoPlaceholder")}
                                                    className="checkout-input"
                                                />
                                            </div>
                                            <div className="flex items-center grow gap-2 md:gap-4">
                                                <span className="label"></span>
                                                {errors.phone && <p className="text-red-500 mt-0.5 lg:mt-1">{t("phoneNoError")}</p>}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="input-box">
                                                <label htmlFor="address" className="label">
                                                    <span>{t("deliveryAddress")}</span> <span>:</span>
                                                </label>
                                                <input
                                                    {...register("address")}
                                                    placeholder={t("deliveryAddressPlaceholder")}
                                                    className="checkout-input"
                                                />
                                            </div>
                                            <div className="flex items-center grow gap-2 md:gap-4">
                                                <span className="label"></span>
                                                {errors.address && (
                                                    <p className="text-red-500 mt-0.5 lg:mt-1">{t("deliveryAddressError")}</p>
                                                )}

                                            </div>
                                        </div>
                                        <div className="input-box">
                                            <label htmlFor="orderNote" className="label">
                                                <span>{t("orderNote")}</span> <span>:</span>
                                            </label>
                                            <input
                                                {...register("orderNote")}
                                                placeholder={t("orderNotePlaceholder")}
                                                className="checkout-input"
                                            />
                                        </div>
                                    </div>

                                    {/* delivery order type */}
                                    <div className='w-full flex flex-col gap-1'>
                                        <label key="Home Delivery" className={`flex gap-2 items-center py-1 lg:py-1.5 rounded-[4px] px-3 ${deliveryType === "Home Delivery" ? "bg-secondary text-white" : "bg-slate-300/60"}`}>
                                            <input
                                                type="radio"
                                                value="Home Delivery"
                                                {...register("deliveryType")}
                                            />
                                            <span className='flex items-center justify-between grow'>
                                                <span className='grow'>{t("homeDelivery")}</span> <span>{locale !== 'bn' ? `${deliveryCost.en}TK` : `৳${deliveryCost.bn}`}</span>
                                            </span>
                                        </label>
                                        <label key="Self Pickup" className={`flex gap-2 items-center py-1 lg:py-1.5 rounded-[4px] px-3 ${deliveryType === "Self Pickup" ? "bg-secondary text-white" : "bg-slate-300/60"}`}>
                                            <input
                                                type="radio"
                                                value="Self Pickup"
                                                {...register("deliveryType")}
                                            />
                                            {t("selfPickup")}
                                        </label>
                                        <label key="Dine-In" className={`flex gap-2 items-center py-1 lg:py-1.5 rounded-[4px] px-3 ${deliveryType === "Dine-In" ? "bg-secondary text-white" : "bg-slate-300/60"}`}>
                                            <input
                                                type="radio"
                                                value="Dine-In"
                                                {...register("deliveryType")}
                                            />
                                            {t("dineIn")}
                                        </label>
                                        {errors.deliveryType && <p>{errors.deliveryType.message}</p>}
                                    </div>

                                    {/* payment type */}
                                    {deliveryType === "Home Delivery" ?

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
                                                <label key="Payment" className='flex items-center gap-2' >
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
                                        </div> : <></>}

                                    <div className="min-h-10 border-t-black w-full mt-3 pt-3 border-t border-dashed">
                                        <p className='flex items-center justify-between'><span className='grow'>{t("totalOrderAmount")}</span> <span>{formatPrice(cartTotal)}</span></p>
                                        {
                                            deliveryType === "Home Delivery" && <p className='flex items-center justify-between'><span className='grow'>{t("deliveryCharge")}</span> <span>{formatPrice(deliveryCost.en)}</span></p>
                                        }
                                        <p className='flex items-center justify-between'><span className='grow'>{t("discountAmount")}</span> <span>-{formatPrice(discount)}</span></p>
                                    </div>

                                    <Button className='text-white mt-5 font-semibold' type="submit"><span>{t("confirmOrder")}</span> <span>{formatPrice(subTotal)}</span></Button>
                                </form>}
                    </div>
                </Dialog.Content>
            </Dialog.Portal >
        </Dialog.Root >

    );
}
