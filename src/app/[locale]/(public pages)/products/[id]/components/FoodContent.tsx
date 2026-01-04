"use client"
import useFormatPrice from "@/hooks/useFormatPrice"
import { getDiscountAmount } from "@/lib/utils"
import { addCartProduct, updateCartProduct } from "@/redux/features/product/productSlice"
import { RootState } from "@/redux/store"
import { TCartProduct, TFoodVariant, TProduct } from "@/types/types"
import { useTranslations } from "next-intl"
import { MouseEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

export default function FoodContent({ item }: { item: TProduct }) {
    const t = useTranslations('shared');
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const { cartProducts } = useSelector((state: RootState) => state.productSlice);
    const [variant, setVariant] = useState<TFoodVariant | null>(null);
    const { locale } = useSelector((state: RootState) => state.locale)
    const { formatPrice } = useFormatPrice()

    const addedItem = cartProducts.find(item => item?.id === variant?.id);

    // handlers
    const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        if (!item || !variant) return;

        if (addedItem) {
            if (addedItem.quantity === quantity) {
                toast.error(t("alreadyExist"));
                return;
            }

            // update the quantity
            dispatch(updateCartProduct({ product: { ...addedItem, quantity }, id: addedItem.id }))
            toast.success(t("quantityUpdated"));
            return;
        }
        const cartItem: TCartProduct = {
            quantity,
            ...variant,
            productId: item.id,
            categoryId: item.categoryId,
            img: item.img,
            title: item.title
        }
        dispatch(addCartProduct(cartItem));
        toast.success(t('addedToCart'));
    }

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity < 1) return;
        if (!item?.id) return;
        setQuantity(newQuantity);
    }

    useEffect(() => {
        if (!item) return;
        setQuantity(1);
        setVariant(item?.variants[0]);
    }, [item])

    return (
        <div className=" w-full lg:w-7/12 p-2.5 md:p-3.5 lg:p-4">
            <h1>{locale === "bn" ? item?.title?.bn : item?.title?.en}
                {variant ? " - " : ""}
                {variant ? locale === "bn" ? variant?.name?.bn || "" : variant?.name?.en || "" : ""}</h1>
            <h4>{t("specialDiscount")} : {variant?.discount}% ({formatPrice(getDiscountAmount(variant?.price || 0, variant?.discount || 0))})</h4>
        </div>
    )
}
