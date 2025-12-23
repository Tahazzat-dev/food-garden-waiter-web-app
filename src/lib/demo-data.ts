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
        id: "1",
        name: {
            en: "Pizza",
            bn: "পিজ্জা",
        },
        slug: "pizza",
        img: "/images/home/pizza-category.png",
    },
    {
        id: "2",
        name: {
            en: "Appetizer",
            bn: "অ্যাপেটাইজার",
        },
        slug: "appetizer",
        img: "/images/home/pizza-category.png",
    },
    {
        id: "3",
        name: {
            en: "Chillers",
            bn: "চিলারস",
        },
        slug: "chillers",
        img: "/images/home/pizza-category.png",
    },
    {
        id: "4",
        name: {
            en: "Chowmein",
            bn: "চাউমিন",
        },
        slug: "chowmein",
        img: "/images/home/pizza-category.png",
    },
    {
        id: "5",
        name: {
            en: "Chicken",
            bn: "চিকেন",
        },
        slug: "chicken",
        img: "/images/home/pizza-category.png",
    },
    {
        id: "6",
        name: {
            en: "Biryani",
            bn: "বিরিয়ানি",
        },
        slug: "biryani",
        img: "/images/home/pizza-category.png",
    },
    {
        id: "7",
        name: {
            en: "Soup",
            bn: "সুপ",
        },
        slug: "soup",
        img: "/images/home/pizza-category.png",
    },
    {
        id: "8",
        name: {
            en: "Sea Food",
            bn: "সি ফুড",
        },
        slug: "sea-food",
        img: "/images/home/pizza-category.png",
    },
    {
        id: "9",
        name: {
            en: "Coffee",
            bn: "কফি",
        },
        slug: "coffee",
        img: "/images/home/pizza-category.png",
    },
    {
        id: "10",
        name: {
            en: "Pasta",
            bn: "পাস্তা",
        },
        slug: "pasta",
        img: "/images/home/pizza-category.png",
    },
];



export const demoProducts: TProduct[] = [
    // 🍕 Pizza
    {
        id: "p1",
        categoryId: "1",
        title: { en: "Margherita Pizza", bn: "মার্গারিটা পিজ্জা" },
        des: { en: "Classic pizza with mozzarella and basil", bn: "মোজারেলা চিজ ও তুলসি পাতা দিয়ে তৈরি ক্লাসিক পিজ্জা" },
        price: 550,
        discount: 10,
        img: "/images/demo-food/pizza.jpg",
    },
    {
        id: "p2",
        categoryId: "1",
        title: { en: "Pepperoni Pizza", bn: "পেপারোনি পিজ্জা" },
        des: { en: "Spicy pepperoni with cheese", bn: "ঝাল পেপারোনি ও চিজের মিশ্রণ" },
        price: 650,
        discount: 5,
        img: "/images/demo-food/pizza.jpg",
    },
    {
        id: "p3",
        categoryId: "1",
        title: { en: "BBQ Chicken Pizza", bn: "বিবিকিউ চিকেন পিজ্জা" },
        des: { en: "Grilled chicken with BBQ sauce", bn: "বিবিকিউ সসের সাথে গ্রিল করা চিকেন" },
        price: 700,
        discount: 8,
        img: "/images/demo-food/pizza.jpg",
    },
    {
        id: "p4",
        categoryId: "1",
        title: { en: "Veggie Supreme Pizza", bn: "ভেজি সুপ্রিম পিজ্জা" },
        des: { en: "Loaded with fresh vegetables", bn: "তাজা সবজিতে ভরপুর পিজ্জা" },
        price: 600,
        discount: 12,
        img: "/images/demo-food/pizza.jpg",
    },
    {
        id: "p5",
        categoryId: "1",
        title: { en: "Four Cheese Pizza", bn: "ফোর চিজ পিজ্জা" },
        des: { en: "Blend of four premium cheeses", bn: "চার ধরনের প্রিমিয়াম চিজের মিশ্রণ" },
        price: 720,
        discount: 9,
        img: "/images/demo-food/pizza.jpg",
    },

    // 🍗 Appetizers
    {
        id: "a1",
        categoryId: "2",
        title: { en: "Chicken Wings", bn: "চিকেন উইংস" },
        des: { en: "Crispy fried wings", bn: "মচমচে ভাজা চিকেন উইংস" },
        price: 350,
        discount: 5,
        img: "/images/demo-food/Chicken.jpg",
    },
    {
        id: "a2",
        categoryId: "2",
        title: { en: "French Fries", bn: "ফ্রেঞ্চ ফ্রাই" },
        des: { en: "Golden crispy fries", bn: "সোনালি ও মচমচে ফ্রাই" },
        price: 200,
        discount: 0,
        img: "/images/demo-food/Chicken.jpg",
    },
    {
        id: "a3",
        categoryId: "2",
        title: { en: "Garlic Bread", bn: "গার্লিক ব্রেড" },
        des: { en: "Toasted garlic bread", bn: "টোস্ট করা রসুনের ব্রেড" },
        price: 180,
        discount: 5,
        img: "/images/demo-food/Chicken.jpg",
    },

    // ☕ Drinks
    {
        id: "c1",
        categoryId: "3",
        title: { en: "Cold Coffee", bn: "ঠান্ডা কফি" },
        des: { en: "Chilled creamy coffee", bn: "ঠান্ডা ও ক্রিমি কফি" },
        price: 220,
        discount: 5,
        img: "/images/demo-food/Coffee.jpg",
    },
    {
        id: "c2",
        categoryId: "3",
        title: { en: "Chocolate Shake", bn: "চকলেট শেক" },
        des: { en: "Rich chocolate milkshake", bn: "ঘন চকলেট মিল্কশেক" },
        price: 250,
        discount: 6,
        img: "/images/demo-food/Coffee.jpg",
    },
    {
        id: "c3",
        categoryId: "3",
        title: { en: "Mint Lemonade", bn: "মিন্ট লেমনেড" },
        des: { en: "Refreshing mint drink", bn: "তাজা মিন্টের পানীয়" },
        price: 150,
        discount: 0,
        img: "/images/demo-food/Coffee.jpg",
    },

    // 🍜 Chow Mein
    {
        id: "ch1",
        categoryId: "4",
        title: { en: "Chicken Chow Mein", bn: "চিকেন চাউমিন" },
        des: { en: "Stir fried noodles with chicken", bn: "চিকেন দিয়ে স্টার ফ্রাই করা নুডলস" },
        price: 320,
        discount: 5,
        img: "/images/demo-food/Chawmin.jpg",
    },
    {
        id: "ch2",
        categoryId: "4",
        title: { en: "Vegetable Chow Mein", bn: "ভেজিটেবল চাউমিন" },
        des: { en: "Mixed veggie noodles", bn: "মিশ্র সবজি দিয়ে তৈরি নুডলস" },
        price: 280,
        discount: 6,
        img: "/images/demo-food/Chawmin.jpg",
    },

    // 🍗 Chicken
    {
        id: "ck1",
        categoryId: "5",
        title: { en: "Grilled Chicken", bn: "গ্রিলড চিকেন" },
        des: { en: "Charcoal grilled chicken", bn: "কয়লার আগুনে গ্রিল করা চিকেন" },
        price: 450,
        discount: 8,
        img: "/images/demo-food/Chicken.jpg",
    },
    {
        id: "ck2",
        categoryId: "5",
        title: { en: "Fried Chicken", bn: "ফ্রাইড চিকেন" },
        des: { en: "Crispy fried chicken", bn: "মচমচে ভাজা চিকেন" },
        price: 400,
        discount: 5,
        img: "/images/demo-food/Chicken.jpg",
    },

    // 🍚 Biryani
    {
        id: "b1",
        categoryId: "6",
        title: { en: "Chicken Biryani", bn: "চিকেন বিরিয়ানি" },
        des: { en: "Traditional spicy biryani", bn: "ঐতিহ্যবাহী ঝাল বিরিয়ানি" },
        price: 380,
        discount: 6,
        img: "/images/demo-food/biryani.jpg",
    },
    {
        id: "b2",
        categoryId: "6",
        title: { en: "Beef Biryani", bn: "বিফ বিরিয়ানি" },
        des: { en: "Slow cooked beef biryani", bn: "ধীরে রান্না করা বিফ বিরিয়ানি" },
        price: 420,
        discount: 7,
        img: "/images/demo-food/biryani.jpg",
    },

    // 🍲 Soup
    {
        id: "s1",
        categoryId: "7",
        title: { en: "Chicken Corn Soup", bn: "চিকেন কর্ন স্যুপ" },
        des: { en: "Warm chicken corn soup", bn: "গরম চিকেন কর্ন স্যুপ" },
        price: 220,
        discount: 5,
        img: "/images/demo-food/Sup.jpg",
    },
    {
        id: "s2",
        categoryId: "7",
        title: { en: "Thai Soup", bn: "থাই স্যুপ" },
        des: { en: "Spicy Thai style soup", bn: "ঝাল থাই স্টাইল স্যুপ" },
        price: 260,
        discount: 6,
        img: "/images/demo-food/Sup.jpg",
    },

    // 🦐 Sea Food
    {
        id: "sf1",
        categoryId: "8",
        title: { en: "Grilled Prawn", bn: "গ্রিলড চিংড়ি" },
        des: { en: "Charcoal grilled prawns", bn: "কয়লার আগুনে গ্রিল করা চিংড়ি" },
        price: 520,
        discount: 8,
        img: "/images/demo-food/Sup.jpg",
    },
    {
        id: "sf2",
        categoryId: "8",
        title: { en: "Fried Calamari", bn: "ফ্রাইড ক্যালামারি" },
        des: { en: "Crispy fried squid", bn: "মচমচে ভাজা স্কুইড" },
        price: 480,
        discount: 7,
        img: "/images/demo-food/Sea-food.jpg",
    },

    // ☕ Coffee
    {
        id: "cf1",
        categoryId: "9",
        title: { en: "Espresso", bn: "এসপ্রেসো" },
        des: { en: "Strong hot espresso", bn: "গাঢ় গরম কফি" },
        price: 180,
        discount: 0,
        img: "/images/demo-food/Sea-food.jpg",
    },
    {
        id: "cf2",
        categoryId: "9",
        title: { en: "Cappuccino", bn: "ক্যাপুচিনো" },
        des: { en: "Milk coffee with foam", bn: "ফেনাযুক্ত দুধ কফি" },
        price: 240,
        discount: 5,
        img: "/images/demo-food/Sea-food.jpg",
    },

    // 🍝 Pasta
    {
        id: "ps1",
        categoryId: "10",
        title: { en: "Chicken Alfredo Pasta", bn: "চিকেন আলফ্রেডো পাস্তা" },
        des: { en: "Creamy white sauce pasta", bn: "ক্রিমি হোয়াইট সস পাস্তা" },
        price: 420,
        discount: 7,
        img: "/images/demo-food/Pasta.jpg",
    },
    {
        id: "ps2",
        categoryId: "10",
        title: { en: "Spaghetti Bolognese", bn: "স্প্যাগেটি বোলোনেজ" },
        des: { en: "Classic red sauce pasta", bn: "ক্লাসিক রেড সস পাস্তা" },
        price: 400,
        discount: 6,
        img: "/images/demo-food/Pasta.jpg",
    },
];
