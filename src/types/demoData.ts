// TODO: have to make this DB product type later
export type TFoodItem = {
    titleEn: string;
    titleBn: string;
    discountPrice: number;
    price: number;
    productImage: string;
}


export type TCategory = {
    id: string;
    name: string;
    img: string;
    slug: string;
}

// TODO: have to add necessary properties
export type TProduct = {
    id: string;
    categoryId: string;
    title: string;
    des: string;
    price: number;
    discount: number;
    img: string;
}