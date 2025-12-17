
//  cart demo data
export interface CartItem {
    id: number;
    productId: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    vendor: string;
    inStock: boolean;
}

export const cartDemoData: CartItem[] = [
    {
        id: 1,
        productId: 1,
        name: 'Adidas NMD R1 Heel',
        image: '/lenovo-laptop-silver.jpg',
        price: 59.0,
        quantity: 1,
        vendor: 'wolmart29 vendor5',
        inStock: true,
    },
    {
        id: 2,
        productId: 14,
        name: 'Wireless Mouse',
        image: '/wireless-mouse.png',
        price: 19.99,
        quantity: 2,
        vendor: 'TechStore Official',
        inStock: true,
    },
    {
        id: 3,
        productId: 29,
        name: 'Canon EOS R5',
        image: '/dslr-camera-black.jpg',
        price: 3899.0,
        quantity: 1,
        vendor: 'Camera World Pro',
        inStock: true,
    },
];
