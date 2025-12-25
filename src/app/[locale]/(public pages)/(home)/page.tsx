import { useTranslations } from "next-intl";
import Banner from "./components/Banner";
import MobileSearch from "./components/MobileSearch";
import AddsSection from "./components/AddsSection";
import CategorySection from "./components/CategorySection";
import FoodCart from "./components/FoodCart";
import Container from "@/sharedComponents/wrapper/Container";
import FilterFood from "./components/FilterFood";
// import Image from "next/image";

export default function HomePage() {
    // const t = useTranslations('home');
    return (
        <>
            <Banner />
            <MobileSearch />
            <AddsSection />
            <CategorySection className="sticky top-[136px] lg:top-[80px] left-0 z-[9998]" />
            <FilterFood />
            <div className="w-full min-h-screen">

            </div>
            {/* <FilterFood /> */}
        </>
    );
}
