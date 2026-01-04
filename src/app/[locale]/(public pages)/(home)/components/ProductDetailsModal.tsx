"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Minus, Plus, ShoppingCart, X } from "lucide-react"; // optional icon
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { addCartProduct, updateCartProduct } from "@/redux/features/product/productSlice";
import { SET_EXPAND } from "@/redux/features/actions/actionSlice";
import useFormatPrice from "@/hooks/useFormatPrice";
import { calculateSubtotal, getDiscountPrice, getSellingPrice } from "@/lib/utils";
import { TCartProduct, TFoodVariant } from "@/types/types";
import { toast } from "react-toastify";
import useRenderText from "@/hooks/useRenderText";

export default function ProductDetailsModal() {
    // variables
    const KEY = "OPEN_PRODUCT_DETAILS_MODAL";

    // hooks
    const t = useTranslations('shared');
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const { EXPAND } = useSelector((state: RootState) => state.actions);
    const { cartProducts, modalProduct } = useSelector((state: RootState) => state.productSlice);
    const [variant, setVariant] = useState<TFoodVariant | null>(null);
    const { locale } = useSelector((state: RootState) => state.locale)
    const { formatPrice } = useFormatPrice()
    const { renderText } = useRenderText()

    const addedItem = cartProducts.find(item => item?.id === variant?.id);

    // handlers
    const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        if (!modalProduct || !variant) return;

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
            productId: modalProduct.id,
            categoryId: modalProduct.categoryId,
            img: modalProduct.img,
            title: modalProduct.title
        }
        dispatch(addCartProduct(cartItem));
        toast.success(t('addedToCart'));
        dispatch(SET_EXPAND(null));
    }

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity < 1) return;
        if (!modalProduct?.id) return;
        setQuantity(newQuantity);
    }
    useEffect(() => {
        if (KEY === EXPAND) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [EXPAND]);


    useEffect(() => {
        if (!modalProduct) return;
        setQuantity(1);
        setVariant(modalProduct?.variants[0]);
    }, [modalProduct])

    if (!modalProduct) return null;
    return (
        <Dialog.Root open={KEY === EXPAND} onOpenChange={() => dispatch(SET_EXPAND(null))}>
            <Dialog.Portal>
                <div className="fixed inset-0 global-overlay z-[9999]" />
                <Dialog.Content className="prevent-body-trigger fixed top-1/2 left-1/2  max-w-[93vw] md:max-w-[700px] !rounded-[10px] lg:!rounded-[12px] overflow-hidden w-full -translate-x-1/2 -translate-y-1/2 bg-body rounded-lg shadow-lg dark:shadow-slate-800 z-[99999]">
                    <div className="flex items-center justify-between bg-primary px-4 py-2">
                        <Dialog.Title className="fg_fs-md text-white">
                            {t('foodDetails')}
                        </Dialog.Title>
                        <Button onClick={() => dispatch(SET_EXPAND(null))} className="rounded-full !px-2.5" variant="secondary"> <X className="!text-white w-5 md:w-6 md:h-6 h-5 lg:w-8 lg:h-8" /></Button>
                    </div>
                    <div className="p-4">
                        <h5 className="font-semibold text-lg text-primary">{renderText(modalProduct?.title?.en, modalProduct?.title?.bn)}
                            {variant ? " - " : ""}
                            {variant ? renderText(variant.name.en, variant.name.en) : ""}</h5>
                        <div className="flex gap-3 lg:gap-4 mt-4">
                            <Image className="max-w-[120px] md:max-w-[180px] lg:max-w-[250px] max-h-[120px] md:max-h-[180px] lg:max-h-[250px] rounded-[8px]" src={modalProduct.img} width={300} height={400} alt="Food Image" />
                            <div className="grow flex justify-between flex-col gap-2">
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-wrap items-center gap-2">
                                        {
                                            modalProduct.variants.map(item => <Button key={item.id} onClick={() => setVariant(item)} variant={item.id === variant?.id ? "secondary" : "primary"} className="text-white custom-shadow-md !py-0.5">{renderText(item?.name?.en, item?.name?.bn)}</Button>)
                                        }
                                    </div>
                                    <p className='fg_fs-sm flex gap-2'>{t('price')} : {variant?.discount && variant?.discount < 1 ? <span className=''>{formatPrice(variant?.price)}</span> : <span className='flex items-center gap-3'> <span className='line-through fg_fs-xs'>{formatPrice(variant?.price)}</span> <span className='text-primary'>{formatPrice(getDiscountPrice(variant?.price || 0, variant?.discount || 0))}</span></span>}</p>
                                </div>

                                <div className="w-full hidden md:block">
                                    <p className="mb-3">{locale === "bn" ? "পণ্য নোটস:" : "Product Notes:"}</p>
                                    <div className='mt-auto flex items-center justify-between bg-slate-300/60 px-2 py-1 rounded-[4px]'>
                                        <p className='fg_fs-xs font-semibold text-center grow dark:!text-black'>{!!variant && variant.discount < 1 ? formatPrice(variant?.price) : getDiscountPrice(variant?.price || 0, variant?.discount || 0)}/-</p>
                                        <div className='flex items-center gap-1 lg:gap-2 rounded-md py-0.5'>
                                            <Button
                                                variant='primary'
                                                size='icon'
                                                className='h-6 w-6 !rounded-full'
                                                onClick={() => handleQuantityChange(quantity - 1)}
                                            >
                                                <Minus className='h-3 w-3' />
                                            </Button>
                                            <span className='rounded-[4px] fg_fs-xs py-0.5 bg-white dark:!text-black px-4 inline-block text-center text-xs'>{quantity}</span>
                                            <Button
                                                variant='primary'
                                                size='icon'
                                                className='h-6 w-6 !rounded-full'
                                                onClick={() => handleQuantityChange(quantity + 1)}
                                            >
                                                <Plus className='h-3 w-3' />
                                            </Button>
                                        </div>

                                        <p className='fg_fs-sm font-semibold text-center grow dark:!text-black'>{calculateSubtotal(getSellingPrice(variant?.price || 0, variant?.discount || 0), quantity)}/-</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full block md:hidden mt-5">
                            <p className="mb-2">{locale === "bn" ? "পণ্য নোটস:" : "Product Notes:"}</p>
                            <div className='mt-auto bg-slate-300/60 flex items-center justify-between px-2 py-1 rounded-[4px]'>
                                <p className='fg_fs-xs font-semibold text-center grow dark:!text-black'>{!!variant && variant.discount < 1 ? formatPrice(variant?.price) : getDiscountPrice(variant?.price || 0, variant?.discount || 0)}/-</p>
                                <div className='flex items-center gap-3 lg:gap-2 rounded-md py-0.5'>
                                    <Button
                                        variant='primary'
                                        size='icon'
                                        className='h-6 w-6 !rounded-full'
                                        onClick={() => handleQuantityChange(quantity - 1)}
                                    >
                                        <Minus className='h-3 w-3' />
                                    </Button>
                                    <span className='rounded-[4px] fg_fs-xs py-0.5 bg-white dark:!text-black px-4 inline-block text-center text-xs'>{quantity}</span>
                                    <Button
                                        variant='primary'
                                        size='icon'
                                        className='h-6 w-6 !rounded-full'
                                        onClick={() => handleQuantityChange(quantity + 1)}
                                    >
                                        <Plus className='h-3 w-3' />
                                    </Button>
                                </div>

                                <p className='fg_fs-sm font-semibold text-center grow dark:!text-black'>{calculateSubtotal(getSellingPrice(variant?.price || 0, variant?.discount || 0), quantity)}/-</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-end p-4">
                        <Dialog.Close className="" asChild >
                            <Button onClick={handleAddToCart} className={`text-white mt-2 font-semibold  ${addedItem && addedItem.quantity === quantity ? ' bg-secondary hover:bg-secondary' : 'custom-shadow-md  bg-primary hover:bg-primary-500'}`} ><ShoppingCart /> <span>{t('addToCart')}</span></Button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
