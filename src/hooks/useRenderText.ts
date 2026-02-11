import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function useRenderText() {
    const { locale } = useSelector((state: RootState) => state.locale)
    const renderText = (en: string = "", bn: string = "") => locale === "bn" ? bn || en : en || bn;
    return { renderText };
}
