'use client'
import { useTranslations } from "next-intl";
import Banner from "./components/Banner";
import MobileSearch from "./components/MobileSearch";
// import Image from "next/image";

export default function HomePage() {
    const t = useTranslations('home');
    return (
        <>
            <Banner />
            <MobileSearch />
            <div className="w-full min-h-[200vh] ">

            </div>
        </>
    );
}
