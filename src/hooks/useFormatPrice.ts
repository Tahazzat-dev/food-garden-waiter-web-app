import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function useFormatPrice() {
    const { locale } = useSelector((state: RootState) => state.locale)
    const formatPrice = (amount: number = 0) => locale !== "bn" ? `${amount}TK` : `৳${amount}`;
    return { formatPrice };
}
