import { TPaymentType } from "@/types/types";

//  cart demo data
export type TCartItem = {
    productId: string;
    variantId: string;
    titleEn: string;
    titleBn: string;
    variantNameEn: string;
    variantNameBn: string;
    price: number;
    quantity: number;
    productImage: string;
};

export const paymentMethods: TPaymentType[] = [
    { id: 1, provider: "cash", name: { en: "Cash", bn: "ক্যাশ" } },
    { id: 2, provider: "bkash", name: { en: "Bkash", bn: "বিকাশ" } },
    { id: 3, provider: "bank", name: { en: "Bank", bn: "ব্যাংক" } },
]

