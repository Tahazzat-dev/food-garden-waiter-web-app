import { TCategory, TFoodItem, TProduct } from "@/types/demoData";

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



export const categoryItems: TCategory[] = [
    {
        id: '1',
        name: "Pizza",
        slug: "pizza",
        img: "/images/home/pizza-category.png"
    },
    {
        id: '2',
        name: "Appitizer",
        slug: "appitizer",
        img: "/images/home/pizza-category.png"
    },
    {
        id: '3',
        name: "Chilers",
        slug: "chilers",
        img: "/images/home/pizza-category.png"
    },
    {
        id: '4',
        name: "Chawmin",
        slug: "chawmin",
        img: "/images/home/pizza-category.png"
    },
    {
        id: '5',
        name: "Chicken",
        slug: "chicken",
        img: "/images/home/pizza-category.png"
    },
    {
        id: '6',
        name: "Brianny",
        slug: "brianny",
        img: "/images/home/pizza-category.png"
    },
    {
        id: '7',
        name: "Sup",
        slug: "sup",
        img: "/images/home/pizza-category.png"
    },
    {
        id: '8',
        name: "Sea-food",
        slug: "sea-food",
        img: "/images/home/pizza-category.png"
    },
    {
        id: '9',
        name: "Coffee",
        slug: "coffee",
        img: "/images/home/pizza-category.png"
    },
    {
        id: '10',
        name: "Pasta",
        slug: "pasta",
        img: "/images/home/pizza-category.png"
    },
]



export const demoProducts: TProduct[] = [
    {
        "id": "p1",
        "categoryId": "1",
        "title": "Margherita Pizza",
        "des": "Classic pizza with mozzarella and basil",
        "price": 550,
        "discount": 10,
        "img": "/images/demo-food/pizza.jpg"
    },
    {
        "id": "p2",
        "categoryId": "1",
        "title": "Pepperoni Pizza",
        "des": "Spicy pepperoni with cheese",
        "price": 650,
        "discount": 5,
        "img": "/images/demo-food/pizza.jpg"
    },
    {
        "id": "p3",
        "categoryId": "1",
        "title": "BBQ Chicken Pizza",
        "des": "Grilled chicken with BBQ sauce",
        "price": 700,
        "discount": 8,
        "img": "/images/demo-food/pizza.jpg"
    },
    {
        "id": "p4",
        "categoryId": "1",
        "title": "Veggie Supreme Pizza",
        "des": "Loaded with fresh vegetables",
        "price": 600,
        "discount": 12,
        "img": "/images/demo-food/pizza.jpg"
    },
    {
        "id": "p5",
        "categoryId": "1",
        "title": "Four Cheese Pizza",
        "des": "Blend of four premium cheeses",
        "price": 720,
        "discount": 9,
        "img": "/images/demo-food/pizza.jpg"
    },

    {
        "id": "a1",
        "categoryId": "2",
        "title": "Chicken Wings",
        "des": "Crispy fried wings",
        "price": 350,
        "discount": 5,
        "img": "/images/demo-food/Chicken.jpg"
    },
    {
        "id": "a2",
        "categoryId": "2",
        "title": "French Fries",
        "des": "Golden crispy fries",
        "price": 200,
        "discount": 0,
        "img": "/images/demo-food/Chicken.jpg"
    },
    {
        "id": "a3",
        "categoryId": "2",
        "title": "Garlic Bread",
        "des": "Toasted garlic bread",
        "price": 180,
        "discount": 5,
        "img": "/images/demo-food/Chicken.jpg"
    },

    {
        "id": "c1",
        "categoryId": "3",
        "title": "Cold Coffee",
        "des": "Chilled creamy coffee",
        "price": 220,
        "discount": 5,
        "img": "/images/demo-food/Coffee.jpg"
    },
    {
        "id": "c2",
        "categoryId": "3",
        "title": "Chocolate Shake",
        "des": "Rich chocolate milkshake",
        "price": 250,
        "discount": 6,
        "img": "/images/demo-food/Coffee.jpg"
    },
    {
        "id": "c3",
        "categoryId": "3",
        "title": "Mint Lemonade",
        "des": "Refreshing mint drink",
        "price": 150,
        "discount": 0,
        "img": "/images/demo-food/Coffee.jpg"
    },

    {
        "id": "ch1",
        "categoryId": "4",
        "title": "Chicken Chow Mein",
        "des": "Stir fried noodles with chicken",
        "price": 320,
        "discount": 5,
        "img": "/images/demo-food/Chawmin.jpg"
    },
    {
        "id": "ch2",
        "categoryId": "4",
        "title": "Vegetable Chow Mein",
        "des": "Mixed veggie noodles",
        "price": 280,
        "discount": 6,
        "img": "/images/demo-food/Chawmin.jpg"
    },

    {
        "id": "ck1",
        "categoryId": "5",
        "title": "Grilled Chicken",
        "des": "Charcoal grilled chicken",
        "price": 450,
        "discount": 8,
        "img": "/images/demo-food/Chicken.jpg"
    },
    {
        "id": "ck2",
        "categoryId": "5",
        "title": "Fried Chicken",
        "des": "Crispy fried chicken",
        "price": 400,
        "discount": 5,
        "img": "/images/demo-food/Chicken.jpg"
    },

    {
        "id": "b1",
        "categoryId": "6",
        "title": "Chicken Biryani",
        "des": "Traditional spicy biryani",
        "price": 380,
        "discount": 6,
        "img": "/images/demo-food/biryani.jpg"
    },
    {
        "id": "b2",
        "categoryId": "6",
        "title": "Beef Biryani",
        "des": "Slow cooked beef biryani",
        "price": 420,
        "discount": 7,
        "img": "/images/demo-food/biryani.jpg"
    },

    {
        "id": "s1",
        "categoryId": "7",
        "title": "Chicken Corn Soup",
        "des": "Warm chicken corn soup",
        "price": 220,
        "discount": 5,
        "img": "/images/demo-food/Sup.jpg"
    },
    {
        "id": "s2",
        "categoryId": "7",
        "title": "Thai Soup",
        "des": "Spicy Thai style soup",
        "price": 260,
        "discount": 6,
        "img": "/images/demo-food/Sup.jpg"
    },

    {
        "id": "sf1",
        "categoryId": "8",
        "title": "Grilled Prawn",
        "des": "Charcoal grilled prawns",
        "price": 520,
        "discount": 8,
        "img": "/images/demo-food/Sup.jpg"
    },
    {
        "id": "sf2",
        "categoryId": "8",
        "title": "Fried Calamari",
        "des": "Crispy fried squid",
        "price": 480,
        "discount": 7,
        "img": "/images/demo-food/Sea-food.jpg"
    },
    {
        "id": "cf1",
        "categoryId": "9",
        "title": "Espresso",
        "des": "Strong hot espresso",
        "price": 180,
        "discount": 0,
        "img": "/images/demo-food/Sea-food.jpg"
    },
    {
        "id": "cf2",
        "categoryId": "9",
        "title": "Cappuccino",
        "des": "Milk coffee with foam",
        "price": 240,
        "discount": 5,
        "img": "/images/demo-food/Sea-food.jpg"
    },

    {
        "id": "ps1",
        "categoryId": "10",
        "title": "Chicken Alfredo Pasta",
        "des": "Creamy white sauce pasta",
        "price": 420,
        "discount": 7,
        "img": "/images/demo-food/Pasta.jpg"
    },
    {
        "id": "ps2",
        "categoryId": "10",
        "title": "Spaghetti Bolognese",
        "des": "Classic red sauce pasta",
        "price": 400,
        "discount": 6,
        "img": "/images/demo-food/Pasta.jpg"
    }
]
