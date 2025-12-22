
"use client"

import { RootState } from "@/redux/store";
import { TCategory } from "@/types/types";
import clsx from "clsx";
import { useSelector } from "react-redux";

export default function CategoryName({ category }: { category: TCategory }) {
    const { locale } = useSelector((state: RootState) => state.locale)
    const { homeActiveCategoryId } = useSelector((state: RootState) => state.categorySlice)
    return (
        <span className={clsx("duration-300 text-center font-semibold absolute bg-slate-800/20 py-1 backdrop-blur-xs block w-full text-white z-30 left-0 bottom-0",
            homeActiveCategoryId === category.id ? '!bg-secondary' : 'group-hover:bg-secondary '
        )}>
            {locale == 'bn' ? category.name.bn : category.name.en}
        </span>
    )
}
