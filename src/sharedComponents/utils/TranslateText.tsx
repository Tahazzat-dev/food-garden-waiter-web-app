"use client"

import useRenderText from "@/hooks/useRenderText";
import { TLocal } from "@/types/types";

export default function TranslateText({ text }: { text: TLocal }) {
    const { renderText } = useRenderText();
    return (
        <>{renderText(text.en, text.bn)}</>
    )
}
