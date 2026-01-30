import CategorySection from "@/sharedComponents/category/CategoryContainer";
import FilterFood from "./components/FilterFood";
import MobileSearch from "./components/MobileSearch";

export const revalidate = 300  // revalidate in every 5 minutes

export default function HomePage() {
    return (
        <>
            <MobileSearch />
            <CategorySection className="sticky top-[133px] lg:top-[83.53px] left-0 z-[9998]" />
            <FilterFood />
            <div className="w-full pb-[75px] md:pb-5"></div>
        </>
    );
}