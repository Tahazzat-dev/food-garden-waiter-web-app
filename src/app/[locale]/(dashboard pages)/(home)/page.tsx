import { getData } from "@/lib/utils";
import CategoryAndProductSlider from "@/sharedComponents/category/CategoryAndProductSlider";
import { TCategory } from "@/types/types";
import MobileSearch from "./components/MobileSearch";

export const revalidate = 300  // revalidate in every 5 minutes

export default async function HomePage() {
    const result = await getData('/categories');
    const categories = result?.data || [] as TCategory[];
    return (
        <>
            <MobileSearch />
            <CategoryAndProductSlider categories={categories} className="sticky top-[133px] lg:top-[83.53px] left-0 z-[9998]" />
            <div className="w-full pb-[75px] md:pb-5"></div>
        </>
    );
}