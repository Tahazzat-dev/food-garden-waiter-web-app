'use client'
import { useTranslations } from "next-intl";
import Banner from "./components/Banner";
// import Image from "next/image";

export default function HomePage() {
    const t = useTranslations('home');
    return (
        <>
            <Banner />
        </>
    );
}
