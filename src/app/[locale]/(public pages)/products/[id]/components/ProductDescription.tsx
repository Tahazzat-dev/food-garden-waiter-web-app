"use client"
import useRenderText from "@/hooks/useRenderText";
import { TLocal } from "@/types/types";
import { useTranslations } from "next-intl";

export default function ProductDescription({ des }: { des: TLocal }) {
    const t = useTranslations('shared');
    const { renderText } = useRenderText()
    return (
        <div className="w-full mt-5 md:mt-6 lg:mt-7 xl:mt-10">
            <div className="w-full border-slate-400 dark:border-slate-600 border-b">
                <p className="inline-block px-2.5 md:px-3.5 lg:px-4 xl:px-8 py-1.5 border-slate-400 dark:border-slate-600 border border-b-0">{t('description')}</p>
            </div>
            <div className="w-full mt-2 lg:mt-3">
                <p>{renderText(des.en, des.bn)}</p>
            </div>
        </div>
    )
}
