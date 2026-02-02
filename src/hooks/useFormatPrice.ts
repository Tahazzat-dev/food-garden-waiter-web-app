import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function useFormatPrice() {
    const { locale } = useSelector((state: RootState) => state.locale)
    const formatPrice = (amount: number = 0) => {
        // Use 'en-IN' or 'bn-BD' for the Indian Subcontinent numbering system (1,00,000)
        // Or 'en-US' for the standard Western system (100,000)
        const formatLocale = locale === "bn" ? "bn-BD" : "en-US";

        const formattedNumber = new Intl.NumberFormat(formatLocale).format(amount);
        return locale === "bn" ? `৳${formattedNumber}` : `${formattedNumber}TK`;
    };

    const translateNumber = (number: number = 0) => {
        const formatLocale = locale === "bn" ? "bn-BD" : "en-US";

        const formattedNumber = new Intl.NumberFormat(formatLocale, { useGrouping: false }).format(number);
        return formattedNumber;
    };
    // const formatPrice = (amount: number = 0) => locale !== "bn" ? `${amount}TK` : `৳${amount}`;
    return { formatPrice, translateNumber };
}
