import { TFoodItem } from "@/types/demoData";

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


export const foodItems: TFoodItem[] = [
    {
        titleEn: "Chicken Burger",
        titleBn: "চিকেন বার্গার",
        discountPrice: 180,
        price: 220,
        productImage: "/images/home/demo-small-search-img.png",
    },
    {
        titleEn: "Beef Burger",
        titleBn: "বিফ বার্গার",
        discountPrice: 250,
        price: 300,
        productImage: "/images/home/demo-small-search-img.png",
    },
    {
        titleEn: "Cheese Pizza",
        titleBn: "চিজ পিজা",
        discountPrice: 650,
        price: 750,
        productImage: "/images/home/demo-small-search-img.png",
    },
    {
        titleEn: "Chicken Fry",
        titleBn: "চিকেন ফ্রাই",
        discountPrice: 320,
        price: 380,
        productImage: "/images/home/demo-small-search-img.png",
    },
    {
        titleEn: "French Fries",
        titleBn: "ফ্রেঞ্চ ফ্রাই",
        discountPrice: 120,
        price: 150,
        productImage: "/images/home/demo-small-search-img.png",
    },
    {
        titleEn: "Chicken Shawarma",
        titleBn: "চিকেন শাওয়ারমা",
        discountPrice: 200,
        price: 240,
        productImage: "/images/home/demo-small-search-img.png",
    },
    {
        titleEn: "Grilled Chicken",
        titleBn: "গ্রিলড চিকেন",
        discountPrice: 450,
        price: 520,
        productImage: "/images/home/demo-small-search-img.png",
    },
    {
        titleEn: "Chicken Biryani",
        titleBn: "চিকেন বিরিয়ানি",
        discountPrice: 280,
        price: 330,
        productImage: "/images/home/demo-small-search-img.png",
    },
    {
        titleEn: "Vegetable Pasta",
        titleBn: "ভেজিটেবল পাস্তা",
        discountPrice: 300,
        price: 360,
        productImage: "/images/home/demo-small-search-img.png",
    },
    {
        titleEn: "Chocolate Milkshake",
        titleBn: "চকলেট মিল্কশেক",
        discountPrice: 180,
        price: 220,
        productImage: "/images/home/demo-small-search-img.png",
    },
];
