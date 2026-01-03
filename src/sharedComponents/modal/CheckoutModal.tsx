'use client';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import * as Dialog from "@radix-ui/react-dialog";
import { ShoppingCart, Trash2, X } from "lucide-react"; // optional icon
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { addCartProduct, removeFavouriteProduct } from "@/redux/features/product/productSlice";
import { useTranslations } from 'next-intl';
import { SET_EXPAND } from '@/redux/features/actions/actionSlice';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


// schema/orderSchema.ts
export const deliveryTypes = ["Home", "Self Pickup", "Dine-In"] as const;
export const paymentTypes = ["Cash On Delivery", "Payment"] as const;
export const paymentMethods = ["Bkash", "Nagad"] as const;

export const orderSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        phone: z
            .string()
            .min(11, "Phone number must be at least 11 digits"),
        address: z.string().min(1, "Address is required"),
        orderNote: z.string().optional(),

        deliveryType: z.enum(deliveryTypes),
        paymentType: z.enum(paymentTypes),

        paymentMethod: z.enum(paymentMethods).optional(),
    })
    .superRefine((data, ctx) => {
        if (data.paymentType === "Payment" && !data.paymentMethod) {
            ctx.addIssue({
                path: ["paymentMethod"],
                message: "Select a payment method",
                code: "custom",
            });
        }
    });

export type OrderFormValues = z.infer<typeof orderSchema>;

export function CheckoutModal() {
    // variables
    const KEY = "CHECKOUT_MODAL"
    // hooks
    const dispatch = useDispatch();
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
            deliveryType: "Home",
            paymentType: "Payment",
            paymentMethod: "Bkash",
        },
    });

    const paymentType = watch("paymentType");

    const onSubmit = (data: OrderFormValues) => {
        console.log("Order Data:", data);
    };

    const t = useTranslations('checkout');
    const { locale } = useSelector((state: RootState) => state.locale)
    const openModal = EXPAND === KEY;

    return (

        <Dialog.Root open={!openModal} onOpenChange={() => dispatch(SET_EXPAND(null))}>
            <Dialog.Portal>
                <div className="fixed inset-0 global-overlay wishlist-overlay top-[81px] !border-none lg:top-[83.53px] z-[9999]" />
                <Dialog.Content className="checkout-modal fixed w-full h-full flex flex-col right-1/2 translate-x-1/2 bottom-[85px] md:bottom-5 !border-none !m-0 !p-0 max-w-[90vw] sm:max-w-[500px] md:max-w-[500px] !rounded-[6px] md:rounded-[8px] lg:!rounded-[10px] overflow-hidden bg-body z-[99999]">
                    <div className="flex items-center justify-between bg-primary px-2.5 sm:px-4 py-3">
                        <div></div>
                        <Dialog.Title className="fg_fs-lg text-white">
                            {t('makeConfirmOrder')}
                        </Dialog.Title>
                        <button onClick={() => dispatch(SET_EXPAND(EXPAND === KEY ? null : KEY))} className='prevent-body-trigger relative'>
                            <ShoppingCart fill='white' className='text-white h-6 w-6 cursor-pointer' />
                            {
                                cartProducts.length > 0 ?
                                    <span className='flex items-center justify-center text-xs px-0.5 min-w-[18px] min-h-4  absolute -top-[40%] left-[80%] translate-x-[-50%] bg-secondary text-white rounded-full p-[1px]'>{cartProducts.length}</span> : <></>
                            }
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="px-2.5 md:px-3 my-2.5 overflow-y-auto grow flex flex-col gap-5">
                        {/* Name and information */}
                        <div className="w-full bg-slate-300/60 flex flex-col p-3 gap-3 rounded-md">
                            {/* Name */}
                            <div className="input-box">
                                <label htmlFor="name" className="label">
                                    <span>{t("yourName")}</span> <span>:</span>
                                </label>
                                <input
                                    {...register("name")}
                                    placeholder={t("yourNamePlaceholder")}
                                    className="checkout-input"
                                />
                                {errors.name && <p className="text-red-500">{t("yourNameError")}</p>}
                            </div>

                            {/* Phone */}
                            <div className="input-box">
                                <label htmlFor="phone" className="label">
                                    <span>{t("phoneNo")}</span> <span>:</span>
                                </label>
                                <input
                                    {...register("phone")}
                                    placeholder={t("phoneNoPlaceholder")}
                                    className="checkout-input"
                                />
                                {errors.phone && <p className="text-red-500">{t("phoneNoError")}</p>}
                            </div>

                            {/* Address */}
                            <div className="input-box">
                                <label htmlFor="address" className="label">
                                    <span>{t("deliveryAddress")}</span> <span>:</span>
                                </label>
                                <input
                                    {...register("address")}
                                    placeholder={t("deliveryAddressPlaceholder")}
                                    className="checkout-input"
                                />
                                {errors.address && (
                                    <p className="text-red-500">{t("deliveryAddressError")}</p>
                                )}
                            </div>

                            {/* Order Note */}
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


                        <div>
                            <p>Delivery Type</p>

                            {deliveryTypes.map((type) => (
                                <label key={type} className="flex gap-2 items-center">
                                    <input
                                        type="radio"
                                        value={type}
                                        {...register("deliveryType")}
                                    />
                                    {type}
                                </label>
                            ))}

                            {errors.deliveryType && <p>{errors.deliveryType.message}</p>}
                        </div>

                        {paymentType === "Payment" && (
                            <div>
                                <p>Payment Method</p>

                                {paymentMethods.map((method) => (
                                    <label key={method} className="flex gap-2 items-center">
                                        <input
                                            type="radio"
                                            value={method}
                                            {...register("paymentMethod")}
                                        />
                                        {method}
                                    </label>
                                ))}

                                {errors.paymentMethod && (
                                    <p>{errors.paymentMethod.message}</p>
                                )}
                            </div>
                        )}
                        <button type="submit">Place Order</button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal >
        </Dialog.Root >

    );
}
