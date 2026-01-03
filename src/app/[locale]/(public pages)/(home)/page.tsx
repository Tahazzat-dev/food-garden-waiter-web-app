import Banner from "./components/Banner";
import MobileSearch from "./components/MobileSearch";
import AddsSection from "./components/AddsSection";
import CategorySection from "./components/CategorySection";
import FilterFood from "./components/FilterFood";
import AuthModal from "./components/AuthModal";
import ProductDetailsModal from "./components/ProductDetailsModal";
// import Image from "next/image";

export default function HomePage() {
    // const t = useTranslations('home');
    return (
        <>
            <Banner />
            <MobileSearch />
            <AddsSection />
            {/* <CategorySection className="sticky top-[133px] lg:top-[83.53px] left-0 z-[9998]" /> */}
            {/* <FilterFood /> */}
            <div className="w-full min-h-screen">
            </div>


            {/* ==== modal to show product details ====== */}
            {/* <ProductDetailsModal /> */}
        </>
    );
}
