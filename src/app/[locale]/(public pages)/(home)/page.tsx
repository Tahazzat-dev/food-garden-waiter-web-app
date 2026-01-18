import Banner from "./components/Banner";
import MobileSearch from "./components/MobileSearch";
// import AddsSection from "./components/AddsSection";
import FilterFood from "./components/FilterFood";
import CategorySection from "@/sharedComponents/category/CategoryContainer";

export const revalidate = 300  // revalidate in every 5 minutes

export default function HomePage() {
    return (
        <>
            <Banner />
            <MobileSearch />
            {/* <AddsSection /> */}
            <CategorySection className="sticky top-[133px] lg:top-[83.53px] left-0 z-[9998]" />
            <FilterFood />
            <div className="w-full pb-[75px] md:pb-5"></div>
        </>
    );
}
