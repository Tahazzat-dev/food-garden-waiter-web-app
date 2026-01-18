import Banner from "./components/Banner";
import MobileSearch from "./components/MobileSearch";
// import AddsSection from "./components/AddsSection";
import FilterFood from "./components/FilterFood";
import CategorySection from "@/sharedComponents/category/CategoryContainer";
import { Metadata } from "next";

export const revalidate = 600  // revalidate in every 5 minutes

// app/[locale]/layout.tsx
export const metadata: Metadata = {
    metadataBase: new URL('https://foodgardencafe.com'),
    title: {
        default: 'Food Garden – Fresh & Delicious',
        template: '%s | Food Garden'
    },
    description: 'An online food delivery platform bringing fresh and delicious meals to your doorstep.',
    alternates: {
        canonical: 'https://foodgardencafe.com',
    },
    openGraph: {
        type: 'website',
        siteName: 'Food Garden',
        locale: 'bn_BD',
        images: ['/og-layout.png']
    },
    twitter: {
        card: 'summary_large_image'
    }
};


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
