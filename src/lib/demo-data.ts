import { ITable } from "@/types/types";

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



export const tableData: ITable[] = [
    { id: 1, isBooked: true, tableNumber: 1 },
    { id: 2, isBooked: false, tableNumber: 2 },
    { id: 3, isBooked: false, tableNumber: 3 },
    { id: 4, isBooked: true, tableNumber: 4 },
    { id: 5, isBooked: false, tableNumber: 5 },
    { id: 6, isBooked: false, tableNumber: 6 },
    { id: 7, isBooked: true, tableNumber: 7 },
    { id: 8, isBooked: true, tableNumber: 8 },
    { id: 9, isBooked: false, tableNumber: 9 },
] 