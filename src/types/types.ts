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
