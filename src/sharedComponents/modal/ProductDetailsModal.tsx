"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Key, Minus, Plus, ShoppingCart, X } from "lucide-react"; // optional icon
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { Dispatch, MouseEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { addCartProduct, updateCartProduct } from "@/redux/features/product/productSlice";
import { SET_EXPAND } from "@/redux/features/actions/actionSlice";
import useFormatPrice from "@/hooks/useFormatPrice";
import { calculateSubtotal, cn, getImage, getTranslationReadyText } from "@/lib/utils";
import { TCartIconposition, TCartProduct, TFoodVariant } from "@/types/types";
import { toast } from "react-toastify";
import useRenderText from "@/hooks/useRenderText";
import RenderText from "../utils/RenderText";

export default function ProductDetailsModal() {
    // variables
    const KEY = "OPEN_PRODUCT_DETAILS_MODAL";
    const FAV_FOOD_POPUP_KEY = "OPEN_FAVOURITE_FOOD_MODAL"

    // hooks
    const t = useTranslations('shared');
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const { EXPAND, prev_action } = useSelector((state: RootState) => state.actions);
    const { cartProducts, modalProduct } = useSelector((state: RootState) => state.productSlice);
    const [variant, setVariant] = useState<TFoodVariant | null>(null);
    const [position, setPosition] = useState<TCartIconposition | null>(null);
    const [beginAnimation, setBeginAnimation] = useState(false);
    const [showAnimationModal, setShowAnimationModal] = useState(false);
    const [showVariantWarning, setShowVariantWarning] = useState(false);
    const { formatPrice } = useFormatPrice()
    const { renderText } = useRenderText()
    const imageRef = useRef<HTMLDivElement | null>(null);

    const addedItem = cartProducts.find(item => item?.id === variant?.id);

    // handlers
    const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        if (!modalProduct) return;

        if (!variant) {
            setShowVariantWarning(true);
            return;
        }

        if (addedItem) {
            if (addedItem.quantity === quantity) {
                toast.error(t("alreadyExist"));
                toggleModal()
                return;
            }

            // update the quantity
            dispatch(updateCartProduct({ product: { ...addedItem, quantity }, id: addedItem.id }))
            toast.success(t("quantityUpdated"));
            setBeginAnimation(true);
            toggleModal()
            return;
        }
        const cartItem: TCartProduct = {
            quantity,
            productId: modalProduct.id,
            categoryId: modalProduct.category_id,
            img: modalProduct.image || "",
            title: modalProduct.name,
            discount: 0,
            id: variant.id,
            name: variant.variation,
            price: +variant.price,
        }
        toast.success(t('addedToCart'));
        setBeginAnimation(true);
        toggleModal(cartItem)
    }

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity < 1) return;
        if (!modalProduct?.id) return;
        setQuantity(newQuantity);
    }

    const toggleModal = (cartItem?: TCartProduct) => {
        const timeOutId = setTimeout(() => {
            if (cartItem) {
                dispatch(addCartProduct(cartItem));
            }
            dispatch(SET_EXPAND(prev_action === FAV_FOOD_POPUP_KEY ? FAV_FOOD_POPUP_KEY : null));
            clearTimeout(timeOutId);
        }, 650)
    }

    const closeModal = () => {
        setShowAnimationModal(false);
        dispatch(SET_EXPAND(prev_action === FAV_FOOD_POPUP_KEY ? FAV_FOOD_POPUP_KEY : null));
    }

    useEffect(() => {
        setShowVariantWarning(false);
        setVariant(null);
        if (KEY === EXPAND) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        // position setting condition
        const timeOutId = setTimeout(() => {
            if (!imageRef.current) {
                clearTimeout(timeOutId);
                return;
            }

            const rect = imageRef.current.getBoundingClientRect();
            const containerPosition = {
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            };
            setPosition(containerPosition);
            setShowAnimationModal(true);
            clearTimeout(timeOutId);
        }, 300)


        return () => {
            document.body.style.overflow = "";
            setShowVariantWarning(false);
        };
    }, [EXPAND, modalProduct]);

    if (!modalProduct) return null;

    const { en, bn } = getTranslationReadyText(modalProduct.name)
    return (
        <>
            <Dialog.Root open={KEY === EXPAND} onOpenChange={closeModal}>
                <Dialog.Portal>
                    <div className="fixed inset-0 global-overlay z-[9999]" />
                    <Dialog.Content className="prevent-body-trigger fixed top-1/2 left-1/2  max-w-[93vw] md:max-w-[700px] !rounded-[10px] lg:!rounded-[12px] overflow-hidden w-full -translate-x-1/2 -translate-y-1/2 bg-body rounded-lg shadow-lg dark:shadow-slate-800 z-[99999]">
                        <div className="flex items-center justify-between bg-primary px-4 py-2">
                            <Dialog.Title className="fg_fs-md text-white">
                                {t('foodDetails')}
                            </Dialog.Title>
                            <Button onClick={closeModal} className="rounded-full !px-2.5" variant="secondary"> <X className="!text-white w-5 md:w-6 md:h-6 h-5 lg:w-8 lg:h-8" /></Button>
                        </div>
                        <div className="p-4">
                            <h5 className="font-semibold text-lg text-primary">{renderText(en, bn)}
                                {variant ? " - " : ""}
                                {variant ? variant.variation : ""}</h5>
                            <div className="flex gap-3 lg:gap-4 mt-4">
                                <div ref={imageRef} className="max-w-[120px] md:max-w-[180px] lg:max-w-[250px] max-h-[120px] md:max-h-[180px] lg:max-h-[250px] rounded-[8px] overflow-hidden">
                                    <Image className="w-full h-full" src={modalProduct?.image ? getImage(modalProduct?.image) : "/images/shared/food-placeholder.jpg"} width={300} height={400} alt="Food Image" />
                                </div>
                                <div className="grow flex justify-between flex-col gap-2">
                                    <div className="flex flex-col gap-5">
                                        <div className="flex flex-wrap items-center gap-2">
                                            {
                                                !!modalProduct?.variations && modalProduct?.variations?.map(item => <Button key={item.id}
                                                    onClick={() => {
                                                        setVariant(item);
                                                        setShowVariantWarning(false);
                                                    }}
                                                    variant={item.id === variant?.id ? "secondary" : "primary"} className="text-white custom-shadow-md !py-0.5">{item.variation}</Button>)
                                            }
                                        </div>
                                        {
                                            variant?.price ? <p className='fg_fs-sm flex gap-2'>{t('price')} : {formatPrice(+variant.price)}</p> :
                                                <p className={cn('fg_fs-sm flex gap-2', showVariantWarning && "text-red-500")}>{t('selectVariants')}</p>
                                        }
                                    </div>

                                    <div className="w-full hidden md:block">
                                        <p className="mb-3"><RenderText key={`PRODUCT_NOTE_FOR_${variant?.id}`} group="shared" variable="productNote" /></p>
                                        <div className='mt-auto flex items-center justify-between bg-slate-300/60 px-2 py-1 rounded-[4px]'>
                                            <p className='fg_fs-xs font-semibold text-center grow '>{formatPrice(variant?.price ? +variant.price : 0)}/-</p>
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
                                            <p className='fg_fs-sm font-semibold text-center grow '>{formatPrice(calculateSubtotal(variant?.price ? +variant.price : 0, quantity))}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full block md:hidden mt-5">
                                <p className="mb-2"><RenderText key={`PRODUCT_NOTE_FOR_${variant?.id}_2`} group="shared" variable="productNote" /></p>
                                <div className='mt-auto bg-slate-300/60 flex items-center justify-between px-2 py-1 rounded-[4px]'>
                                    <p className='fg_fs-xs font-semibold text-center grow '>{formatPrice(variant?.price ? +variant.price : 0)}/-</p>
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

                                    <p className='fg_fs-sm font-semibold text-center grow'>{formatPrice(calculateSubtotal(variant?.price ? +variant.price : 0, quantity))}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-end p-4">
                            <Dialog.Close className="" asChild >
                                <Button disabled={showVariantWarning} onClick={handleAddToCart} className={`text-white mt-2 font-semibold  ${addedItem && addedItem.quantity === quantity ? ' bg-secondary hover:bg-secondary' : 'custom-shadow-md  bg-primary hover:bg-primary-500'}`} ><ShoppingCart /> <span>{t('addToCart')}</span></Button>
                            </Dialog.Close>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            {
                <ImageTransitionModal
                    beginAnimation={beginAnimation}
                    showAnimationModal={showAnimationModal}
                    setBeginAnimation={setBeginAnimation}
                    position={position}
                    setShowAnimationModal={setShowAnimationModal}
                />
            }

        </>
    )
}



type ImageTransitionProps = {
    position: TCartIconposition | null;
    setBeginAnimation: Dispatch<SetStateAction<boolean>>;
    setShowAnimationModal: Dispatch<SetStateAction<boolean>>;
    beginAnimation: boolean;
    showAnimationModal: boolean;
}


const ImageTransitionModal = ({ showAnimationModal, setShowAnimationModal, position, setBeginAnimation, beginAnimation }: ImageTransitionProps) => {
    // hooks
    const { cartIconPosition } = useSelector((state: RootState) => state.actions);
    const { modalProduct } = useSelector((state: RootState) => state.productSlice);

    const [style, setStyle] = useState<React.CSSProperties | null>(null);


    useEffect(() => {
        if (!position || !cartIconPosition || !beginAnimation) return;

        // Move to cart icon (next frame)
        requestAnimationFrame(() => {
            setStyle({
                position: "fixed",
                top: cartIconPosition.top,
                left: (cartIconPosition.left + cartIconPosition.width / 2),
                width: (cartIconPosition.width / 2),
                height: (cartIconPosition.height / 2),
                transition: "all 700ms ease-in-out",
                zIndex: 9999999,
            });
        });

        // Cleanup
        const timer = setTimeout(() => {
            setStyle(null)
            setShowAnimationModal(false);
            setBeginAnimation(false);
            setBeginAnimation(false);
        }, 680);

        return () => clearTimeout(timer);
    }, [position, cartIconPosition, setBeginAnimation, beginAnimation, setShowAnimationModal]);

    useEffect(() => {
        if (!position) return;
        setStyle({
            position: "fixed",
            top: position.top,
            left: position.left,
            width: position.width,
            height: position.height,
            zIndex: 9999999,
        });
    }, [position])
    if (!showAnimationModal) return null;


    return (
        <Image
            width={603}
            height={238}
            src={modalProduct?.image ? getImage(modalProduct?.image) : "/images/shared/food-placeholder.jpg"}
            alt="transition"
            style={style ?? undefined}
            className="rounded-[8px] z-[9999999]"
        />
    );
};