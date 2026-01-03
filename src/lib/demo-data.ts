import { TCategory, TProduct } from "@/types/types";

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
        img: "/images/demo-food/pizza.jpg",
        variants: [
            { id: "p1-6-inch", name: { en: '6" Inch', bn: '৬" ইঞ্চি' }, price: 550, discount: 10 },
            { id: "p1-12-inch", name: { en: '12" Inch', bn: '১২" ইঞ্চি' }, price: 950, discount: 12 },
        ],
    },
    {
        id: "p2",
        categoryId: "1",
        title: { en: "Pepperoni Pizza", bn: "পেপারোনি পিজ্জা" },
        des: { en: "Spicy pepperoni with cheese", bn: "ঝাল পেপারোনি ও চিজের মিশ্রণ" },
        img: "/images/demo-food/pizza.jpg",
        variants: [
            { id: "p2-6-inch", name: { en: '6" Inch', bn: '৬" ইঞ্চি' }, price: 650, discount: 5 },
            { id: "p2-12-inch", name: { en: '12" Inch', bn: '১২" ইঞ্চি' }, price: 1050, discount: 8 },
        ],
    },
    {
        id: "p3",
        categoryId: "1",
        title: { en: "BBQ Chicken Pizza", bn: "বিবিকিউ চিকেন পিজ্জা" },
        des: { en: "Grilled chicken with BBQ sauce", bn: "বিবিকিউ সসের সাথে গ্রিল করা চিকেন" },
        img: "/images/demo-food/pizza.jpg",
        variants: [
            { id: "p3-6-inch", name: { en: '6" Inch', bn: '৬" ইঞ্চি' }, price: 700, discount: 8 },
            { id: "p3-12-inch", name: { en: '12" Inch', bn: '১২" ইঞ্চি' }, price: 1150, discount: 10 },
        ],
    },
    {
        id: "p4",
        categoryId: "1",
        title: { en: "Veggie Supreme Pizza", bn: "ভেজি সুপ্রিম পিজ্জা" },
        des: { en: "Loaded with fresh vegetables", bn: "তাজা সবজিতে ভরপুর পিজ্জা" },
        img: "/images/demo-food/pizza.jpg",
        variants: [
            { id: "p4-6-inch", name: { en: '6" Inch', bn: '৬" ইঞ্চি' }, price: 600, discount: 12 },
            { id: "p4-12-inch", name: { en: '12" Inch', bn: '১২" ইঞ্চি' }, price: 980, discount: 15 },
        ],
    },
    {
        id: "p5",
        categoryId: "1",
        title: { en: "Four Cheese Pizza", bn: "ফোর চিজ পিজ্জা" },
        des: { en: "Blend of four premium cheeses", bn: "চার ধরনের প্রিমিয়াম চিজের মিশ্রণ" },
        img: "/images/demo-food/pizza.jpg",
        variants: [
            { id: "p5-6-inch", name: { en: '6" Inch', bn: '৬" ইঞ্চি' }, price: 720, discount: 9 },
            { id: "p5-12-inch", name: { en: '12" Inch', bn: '১২" ইঞ্চি' }, price: 1180, discount: 12 },
        ],
    },

    // 🍗 Appetizers
    {
        id: "a1",
        categoryId: "2",
        title: { en: "Chicken Wings", bn: "চিকেন উইংস" },
        des: { en: "Crispy fried wings", bn: "মচমচে ভাজা চিকেন উইংস" },
        img: "/images/demo-food/Chicken.jpg",
        variants: [
            { id: "a1-6-pcs", name: { en: "6 Pieces", bn: "৬ পিস" }, price: 350, discount: 5 },
            { id: "a1-12-pcs", name: { en: "12 Pieces", bn: "১২ পিস" }, price: 620, discount: 8 },
        ],
    },
    {
        id: "a2",
        categoryId: "2",
        title: { en: "French Fries", bn: "ফ্রেঞ্চ ফ্রাই" },
        des: { en: "Golden crispy fries", bn: "সোনালি ও মচমচে ফ্রাই" },
        img: "/images/demo-food/Chicken.jpg",
        variants: [
            { id: "a2-small", name: { en: "Small", bn: "ছোট" }, price: 200, discount: 0 },
            { id: "a2-large", name: { en: "Large", bn: "বড়" }, price: 280, discount: 5 },
        ],
    },
    {
        id: "a3",
        categoryId: "2",
        title: { en: "Garlic Bread", bn: "গার্লিক ব্রেড" },
        des: { en: "Toasted garlic bread", bn: "টোস্ট করা রসুনের ব্রেড" },
        img: "/images/demo-food/Chicken.jpg",
        variants: [
            { id: "a3-2-pcs", name: { en: "2 Pieces", bn: "২ পিস" }, price: 180, discount: 5 },
            { id: "a3-4-pcs", name: { en: "4 Pieces", bn: "৪ পিস" }, price: 320, discount: 8 },
        ],
    },

    // ☕ Drinks
    {
        id: "c1",
        categoryId: "3",
        title: { en: "Cold Coffee", bn: "ঠান্ডা কফি" },
        des: { en: "Chilled creamy coffee", bn: "ঠান্ডা ও ক্রিমি কফি" },
        img: "/images/demo-food/Coffee.jpg",
        variants: [
            { id: "c1-regular", name: { en: "Regular", bn: "রেগুলার" }, price: 220, discount: 5 },
            { id: "c1-large", name: { en: "Large", bn: "বড়" }, price: 280, discount: 8 },
        ],
    },
    {
        id: "c2",
        categoryId: "3",
        title: { en: "Chocolate Shake", bn: "চকলেট শেক" },
        des: { en: "Rich chocolate milkshake", bn: "ঘন চকলেট মিল্কশেক" },
        img: "/images/demo-food/Coffee.jpg",
        variants: [
            { id: "c2-regular", name: { en: "Regular", bn: "রেগুলার" }, price: 250, discount: 6 },
            { id: "c2-large", name: { en: "Large", bn: "বড়" }, price: 320, discount: 8 },
        ],
    },
    {
        id: "c3",
        categoryId: "3",
        title: { en: "Mint Lemonade", bn: "মিন্ট লেমনেড" },
        des: { en: "Refreshing mint drink", bn: "তাজা মিন্টের পানীয়" },
        img: "/images/demo-food/Coffee.jpg",
        variants: [
            { id: "c3-regular", name: { en: "Regular", bn: "রেগুলার" }, price: 150, discount: 0 },
            { id: "c3-large", name: { en: "Large", bn: "বড়" }, price: 190, discount: 5 },
        ],
    },

    // 🍜 Chow Mein
    {
        id: "ch1",
        categoryId: "4",
        title: { en: "Chicken Chow Mein", bn: "চিকেন চাউমিন" },
        des: { en: "Stir fried noodles with chicken", bn: "চিকেন দিয়ে স্টার ফ্রাই করা নুডলস" },
        img: "/images/demo-food/Chawmin.jpg",
        variants: [
            { id: "ch1-half", name: { en: "Half Plate", bn: "হাফ প্লেট" }, price: 320, discount: 5 },
            { id: "ch1-full", name: { en: "Full Plate", bn: "ফুল প্লেট" }, price: 480, discount: 8 },
        ],
    },
    {
        id: "ch2",
        categoryId: "4",
        title: { en: "Vegetable Chow Mein", bn: "ভেজিটেবল চাউমিন" },
        des: { en: "Mixed veggie noodles", bn: "মিশ্র সবজি দিয়ে তৈরি নুডলস" },
        img: "/images/demo-food/Chawmin.jpg",
        variants: [
            { id: "ch2-half", name: { en: "Half Plate", bn: "হাফ প্লেট" }, price: 280, discount: 6 },
            { id: "ch2-full", name: { en: "Full Plate", bn: "ফুল প্লেট" }, price: 420, discount: 8 },
        ],
    },

    // 🍗 Chicken
    {
        id: "ck1",
        categoryId: "5",
        title: { en: "Grilled Chicken", bn: "গ্রিলড চিকেন" },
        des: { en: "Charcoal grilled chicken", bn: "কয়লার আগুনে গ্রিল করা চিকেন" },
        img: "/images/demo-food/Chicken.jpg",
        variants: [
            { id: "ck1-quarter", name: { en: "Quarter", bn: "কোয়ার্টার" }, price: 280, discount: 6 },
            { id: "ck1-half", name: { en: "Half", bn: "হাফ" }, price: 450, discount: 8 },
        ],
    },
    {
        id: "ck2",
        categoryId: "5",
        title: { en: "Fried Chicken", bn: "ফ্রাইড চিকেন" },
        des: { en: "Crispy fried chicken", bn: "মচমচে ভাজা চিকেন" },
        img: "/images/demo-food/Chicken.jpg",
        variants: [
            { id: "ck2-2-pcs", name: { en: "2 Pieces", bn: "২ পিস" }, price: 400, discount: 5 },
            { id: "ck2-4-pcs", name: { en: "4 Pieces", bn: "৪ পিস" }, price: 720, discount: 8 },
        ],
    },

    // 🍚 Biryani
    {
        id: "b1",
        categoryId: "6",
        title: { en: "Chicken Biryani", bn: "চিকেন বিরিয়ানি" },
        des: { en: "Traditional spicy biryani", bn: "ঐতিহ্যবাহী ঝাল বিরিয়ানি" },
        img: "/images/demo-food/biryani.jpg",
        variants: [
            { id: "b1-half", name: { en: "Half Plate", bn: "হাফ প্লেট" }, price: 380, discount: 6 },
            { id: "b1-full", name: { en: "Full Plate", bn: "ফুল প্লেট" }, price: 550, discount: 8 },
        ],
    },
    {
        id: "b2",
        categoryId: "6",
        title: { en: "Beef Biryani", bn: "বিফ বিরিয়ানি" },
        des: { en: "Slow cooked beef biryani", bn: "ধীরে রান্না করা বিফ বিরিয়ানি" },
        img: "/images/demo-food/biryani.jpg",
        variants: [
            { id: "b2-half", name: { en: "Half Plate", bn: "হাফ প্লেট" }, price: 420, discount: 7 },
            { id: "b2-full", name: { en: "Full Plate", bn: "ফুল প্লেট" }, price: 600, discount: 9 },
        ],
    },

    // 🍲 Soup
    {
        id: "s1",
        categoryId: "7",
        title: { en: "Chicken Corn Soup", bn: "চিকেন কর্ন স্যুপ" },
        des: { en: "Warm chicken corn soup", bn: "গরম চিকেন কর্ন স্যুপ" },
        img: "/images/demo-food/Sup.jpg",
        variants: [
            { id: "s1-single", name: { en: "Single Bowl", bn: "এক বাটি" }, price: 220, discount: 5 },
            { id: "s1-family", name: { en: "Family Bowl", bn: "ফ্যামিলি বাটি" }, price: 380, discount: 8 },
        ],
    },
    {
        id: "s2",
        categoryId: "7",
        title: { en: "Thai Soup", bn: "থাই স্যুপ" },
        des: { en: "Spicy Thai style soup", bn: "ঝাল থাই স্টাইল স্যুপ" },
        img: "/images/demo-food/Sup.jpg",
        variants: [
            { id: "s2-single", name: { en: "Single Bowl", bn: "এক বাটি" }, price: 260, discount: 6 },
            { id: "s2-family", name: { en: "Family Bowl", bn: "ফ্যামিলি বাটি" }, price: 420, discount: 8 },
        ],
    },

    // 🦐 Sea Food
    {
        id: "sf1",
        categoryId: "8",
        title: { en: "Grilled Prawn", bn: "গ্রিলড চিংড়ি" },
        des: { en: "Charcoal grilled prawns", bn: "কয়লার আগুনে গ্রিল করা চিংড়ি" },
        img: "/images/demo-food/Sup.jpg",
        variants: [
            { id: "sf1-200g", name: { en: "200g", bn: "২০০ গ্রাম" }, price: 520, discount: 8 },
            { id: "sf1-400g", name: { en: "400g", bn: "৪০০ গ্রাম" }, price: 880, discount: 10 },
        ],
    },
    {
        id: "sf2",
        categoryId: "8",
        title: { en: "Fried Calamari", bn: "ফ্রাইড ক্যালামারি" },
        des: { en: "Crispy fried squid", bn: "মচমচে ভাজা স্কুইড" },
        img: "/images/demo-food/Sea-food.jpg",
        variants: [
            { id: "sf2-regular", name: { en: "Regular", bn: "রেগুলার" }, price: 480, discount: 7 },
            { id: "sf2-large", name: { en: "Large", bn: "বড়" }, price: 720, discount: 10 },
        ],
    },

    // ☕ Coffee
    {
        id: "cf1",
        categoryId: "9",
        title: { en: "Espresso", bn: "এসপ্রেসো" },
        des: { en: "Strong hot espresso", bn: "গাঢ় গরম কফি" },
        img: "/images/demo-food/Sea-food.jpg",
        variants: [
            { id: "cf1-single", name: { en: "Single Shot", bn: "সিঙ্গেল শট" }, price: 180, discount: 0 },
            { id: "cf1-double", name: { en: "Double Shot", bn: "ডাবল শট" }, price: 260, discount: 5 },
        ],
    },
    {
        id: "cf2",
        categoryId: "9",
        title: { en: "Cappuccino", bn: "ক্যাপুচিনো" },
        des: { en: "Milk coffee with foam", bn: "ফেনাযুক্ত দুধ কফি" },
        img: "/images/demo-food/Sea-food.jpg",
        variants: [
            { id: "cf2-regular", name: { en: "Regular", bn: "রেগুলার" }, price: 240, discount: 5 },
            { id: "cf2-large", name: { en: "Large", bn: "বড়" }, price: 300, discount: 8 },
        ],
    },

    // 🍝 Pasta
    {
        id: "ps1",
        categoryId: "10",
        title: { en: "Chicken Alfredo Pasta", bn: "চিকেন আলফ্রেডো পাস্তা" },
        des: { en: "Creamy white sauce pasta", bn: "ক্রিমি হোয়াইট সস পাস্তা" },
        img: "/images/demo-food/Pasta.jpg",
        variants: [
            { id: "ps1-regular", name: { en: "Regular", bn: "রেগুলার" }, price: 420, discount: 7 },
            { id: "ps1-large", name: { en: "Large", bn: "বড়" }, price: 580, discount: 10 },
        ],
    },
    {
        id: "ps2",
        categoryId: "10",
        title: { en: "Spaghetti Bolognese", bn: "স্প্যাগেটি বোলোনেজ" },
        des: { en: "Classic red sauce pasta", bn: "ক্লাসিক রেড সস পাস্তা" },
        img: "/images/demo-food/Pasta.jpg",
        variants: [
            { id: "ps2-regular", name: { en: "Regular", bn: "রেগুলার" }, price: 400, discount: 6 },
            { id: "ps2-large", name: { en: "Large", bn: "বড়" }, price: 560, discount: 9 },
        ],
    },
];
