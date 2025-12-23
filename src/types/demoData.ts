// TODO: have to make this DB product type later
export type TFoodItem = {
    titleEn: string;
    titleBn: string;
    discountPrice: number;
    price: number;
    productImage: string;
}

type TLocal = {
    en: string;
    bn: string;
}


// TODO: have to add necessary properties
export interface TProduct {
    id: string;
    categoryId: string;
    title: TLocal;
    des: TLocal;
    price: number;
    discount: number;
    img: string;
}