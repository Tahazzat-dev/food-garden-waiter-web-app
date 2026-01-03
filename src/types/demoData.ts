type TLocal = {
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
// export type TFoodItem = {
//     id: string;
//     titleEn: string;
//     titleBn: string;
//     productImage: string;
//     variants: TFoodVariant[];
// };
