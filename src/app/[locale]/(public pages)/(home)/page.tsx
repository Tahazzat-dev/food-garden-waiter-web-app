'use client'
import { useTranslations } from "next-intl";
// import Image from "next/image";

export default function HomePage() {
    const t = useTranslations('home');
    return (
        <div className="flex min-h-screen items-center justify-center">
            <h1 className="">{
                t('title')

            }</h1>
            <p>Paragraph</p>
        </div>
    );
}
