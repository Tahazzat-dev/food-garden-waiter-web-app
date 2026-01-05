"use client"

import { useTranslations } from "next-intl"

type Props = {
    variable: string;
    group: string;
}
export default function RenderText({ group, variable }: Props) {
    const t = useTranslations(group);
    return (
        <>{t(variable)}</>
    )
}
