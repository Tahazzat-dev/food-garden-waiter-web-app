import Banner from "./components/Banner";
import MobileSearch from "./components/MobileSearch";
import AddsSection from "./components/AddsSection";
import FilterFood from "./components/FilterFood";
import CategorySection from "@/sharedComponents/category/CategoryContainer";

export default function HomePage() {
    return (
        <>
            <Banner />
            <MobileSearch />
            <AddsSection />
            <CategorySection className="sticky top-[133px] lg:top-[83.53px] left-0 z-[9998]" />
            <FilterFood />
            <div className="w-full pb-[75px] md:pb-5"></div>

            {/* TODO: have to remove */}
            <div className="w-full min-h-[200vh]">

            </div>

            {/* ==== modal to show product details ====== */}
        </>
    );
}
