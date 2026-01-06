'use client';
import { Button } from '@/components/ui/button';
import RenderText from '@/sharedComponents/utils/RenderText';
import Container from '@/sharedComponents/wrapper/Container';

import { Check, ShoppingCart, Trash2, X } from "lucide-react"; // optional icon
import { useTranslations } from 'next-intl';
import { useState } from 'react';

// schema/orderSchema.ts
export const deliveryTypes = ["Home Delivery", "Self Pickup", "Dine-In"] as const;
export const paymentTypes = ["Cash On Delivery", "Payment"] as const;
export default function TestPage() {
    const t = useTranslations('checkout')
    const isSuccess = true;
    const orderId = "ORD-98342"
    const message = null;
    const closeModal = () => {

    }

    // return <></>
    return (
        <Container className=''
        >
            <div className="fixed inset-0 global-overlay wishlist-overlay top-[81px] !border-none lg:top-[83.53px] z-[9999]" />
            <div className="checkout-modal fixed w-full flex flex-col items-center justify-center right-1/2 translate-x-1/2 top-[81px] lg:top-[83.53px] h-full !border-none !m-0 !p-0 overflow-hidden z-[99999]">
                <div className="w-full max-w-md rounded-[6px] bg-white dark:bg-slate-700 shadow-lg p-3 md:p-4 text-center">
                    {/* Icon */}
                    <div
                        className={`mx-auto mb-2 md:mb-3 flex h-14 w-14 items-center justify-center rounded-full ${!isSuccess ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                            }`}
                    >
                        {isSuccess ? <Check /> : <X />}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold">
                        {isSuccess ? t("orderSuccess") : t("orderFail")}
                    </h2>

                    {/* Message */}
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                        {message ??
                            (isSuccess
                                ? t("defaultOrderSuccessMessage") : t("defaultOrderFailedMessage"))}
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
                                onClick={() => { }}
                                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                            >
                                <RenderText group='shared' key="ORDER_MESSAGE_RETRY_BTN" variable='retry' />
                            </button>
                        )}

                        <Button
                            variant="secondary"
                            onClick={closeModal}
                        >
                            <RenderText group='shared' key="ORDER_MESSAGE_CLOSE_BTN" variable='close' />
                        </Button>
                    </div>
                </div>
            </div>
        </Container >

    );
}
