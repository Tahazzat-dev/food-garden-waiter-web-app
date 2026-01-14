"use client"

import useRenderText from "@/hooks/useRenderText";
import { getTranslationReadyText } from "@/lib/utils";
import { TLocal } from "@/types/types";

export default function TranslateText({ text }: { text: TLocal }) {
    const { renderText } = useRenderText();
    return (
        <>{renderText(text.en, text.bn)}</>
    )
}


// TODO: have to delete this in real production
export const CreateTrnslateText = ({ text }: { text: string }) => {
    const { en, bn } = getTranslationReadyText(text);
    return <TranslateText text={{ en, bn }} />
}