'use client'
import { useTranslations } from "next-intl";
import Banner from "./components/Banner";
import MobileSearch from "./components/MobileSearch";
import AddsSection from "./components/AddsSection";
import CategorySection from "./components/CategorySection";
import FoodCart from "./components/FoodCart";
import Container from "@/sharedComponents/wrapper/Container";
// import Image from "next/image";

export default function HomePage() {
    // const t = useTranslations('home');
    return (
        <>
            <Banner />
            <MobileSearch />
            <AddsSection />
            <CategorySection />
            <div className="w-full min-h-[200vh] ">
                <Container>
                    <FoodCart />
                </Container>
            </div>
        </>
    );
}
