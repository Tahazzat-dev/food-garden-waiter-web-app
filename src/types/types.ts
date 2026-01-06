// types/lang.ts
export type TCategory = {
    id: string;
    name: {
        en: string;
        bn: string;
    };
    img: string;
    slug: string;
}


export type Lang = "en" | "bn";


export type TAuthFormType = "login" | "register" | "phone" | "otp" | "reset";


export type TLocal = {
    en: string;
    bn: string;
}


// TODO: have to add necessary properties

export type TFoodVariant = {
    id: string;
    name: TLocal;
    price: number;
    discount: number;
};

export interface TProduct {
    id: string;
    categoryId: string;
    title: TLocal;
    des: TLocal;
    img: string;
    variants: TFoodVariant[];
}
export interface TCartProduct {
    id: string;
    productId: string;
    title: TLocal,
    categoryId: string;
    img: string;
    name: TLocal;
    price: number;
    discount: number;
    quantity: number;
}


export type TOrderStatus =
    | "pending"
    | "confirmed"
    | "preparing"
    | "outForDelivery"
    | "delivered"
    | "cancelled";

export type TPaymentStatus =
    | "unpaid"
    | "paid"
    | "failed"
    | "refunded";

export type TPaymentMethod =
    | "cashOnDelivery"
    | "bkash"
    | "nagad"


export interface TOrderPriceSummary {
    subtotal: number;
    discountTotal: number;
    deliveryFee: number;
    total: number;
}


export interface TOrder {
    id: string;
    userId: string;

    items: TCartProduct[];

    priceSummary: TOrderPriceSummary;

    status: TOrderStatus;
    paymentStatus: TPaymentStatus;
    paymentMethod: TPaymentMethod;

    note?: string;

    createdAt: string; // ISO date
    updatedAt: string;
}


export type CheckoutStatus = "success" | "error";

export type TOrderResponse = {
    orderId: string;
    message: string;
    status: CheckoutStatus;
}