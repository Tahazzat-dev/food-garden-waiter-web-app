// types/lang.ts
// export type TCategory = {
//     id: string;
//     name: {
//         en: string;
//         bn: string;
//     };
//     img: string;
//     slug: string;
// }

// TODO: temp_
export type TCategory = {
    id: number;
    name: string;
    image: {
        link: string;
    };
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
    id: number;
    product_id: number;
    variation: string;       // e.g. "1:03" (Main:Sub ratio)
    cost: string;            // coming as string from API ("0.00")
    price: string;           // "500.00"
    image: string | null;
    stock: number;
    main_unit_stock: number;
    sub_unit_stock: number;
    total_sold: number;
    created_at: string | null;
    updated_at: string | null;

};

// export interface TProduct {
//     id: string;
//     categoryId: string;
//     title: TLocal;
//     des: TLocal;
//     img: string;
//     variants: TFoodVariant[];
// }


export interface TProduct {
    id: number;

    name: string;
    code: string;

    description: string | null;
    details: string | null;
    image: string | null;

    brand_id: number;
    category_id: number;

    main_unit_id: number;
    sub_unit_id: number | null;

    price: string;          // comes as string from backend
    cost: string;
    damage_price: string;

    price_editable: 0 | 1;

    stock: number;
    stock_count: number;
    total_sold: number;

    main_unit_stock: number;
    sub_unit_stock: number;

    stock_visible: 0 | 1;
    stock_visible_ecom: 0 | 1;

    pos_visible: 0 | 1;
    ecom_visible: 0 | 1;

    status: 0 | 1;

    variations: TFoodVariant[];

    created_at: string | null;
    updated_at: string | null;
}



export interface TCartProduct {
    id: number;
    productId: number;
    title: string,
    categoryId: number;
    img: string;
    name: string;
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


export type TAddress = {
    id: number;
    name: string;
    delivery_charge: string;
    created_at: string | null;
    updated_at: string | null;
}