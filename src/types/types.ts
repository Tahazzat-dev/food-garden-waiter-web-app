import { TProduct } from "./demoData";

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


export interface TCartProduct extends TProduct {
    quantity: number;
}


export type TAuthFormType = "login" | "register";