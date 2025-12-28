"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Minus, Plus, ShoppingCart, X } from "lucide-react"; // optional icon
import { Button } from "@/components/ui/button";
import { TProduct } from "@/types/demoData";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { addCartProduct } from "@/redux/features/product/productSlice";

interface FoodModalProps {
    food: TProduct | null;
    open: boolean;
    onOpenChange: () => void;
}

export function FoodModal({ food, open, onOpenChange }: FoodModalProps) {
    const t = useTranslations('shared');
    const dispatch = useDispatch();
    const [variant, setVariant] = useState<string>("1");
    const [quantity, setQuantity] = useState(1);
    const { cartProducts } = useSelector((state: RootState) => state.productSlice);
    const { locale } = useSelector((state: RootState) => state.locale)

    // handlers
    const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        if (!food) return;
        dispatch(addCartProduct({ ...food, quantity }));
        onOpenChange();

    }


    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity < 1) return;
        if (!food?.id) return;
        setQuantity(newQuantity);
    }

    const subtotal = food?.price ? food.price * quantity : 0;

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);


    useEffect(() => {
        setQuantity(1);
        return () => {
            console.log("FoodModal unmounted");
        }
    }, [])


    if (!food) return null;
    const isAddedToCart = cartProducts.some(item => item.id === food.id);
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]" />
                <Dialog.Content className="fixed top-1/2 left-1/2 max-w-[700px] !rounded-[10px] lg:!rounded-[12px] overflow-hidden w-full -translate-x-1/2 -translate-y-1/2 bg-body rounded-lg shadow-lg dark:shadow-slate-800 z-[99999]">
                    <div className="flex items-center justify-between bg-primary px-4 py-2">
                        <Dialog.Title className="fg_fs-md text-white">
                            {t('foodDetails')}
                        </Dialog.Title>
                        <Button onClick={onOpenChange} className="rounded-full !px-2.5" variant="secondary"> <X className="!text-white w-5 md:w-6 md:h-6 h-5 lg:w-8 lg:h-8" /></Button>
                    </div>
                    <div className="p-4">
                        <h5 className="font-semibold text-lg text-primary">{locale === "bn" ? food.title.bn : food.title.en}</h5>
                        <div className="flex gap-4 mt-4">
                            <Image className="max-w-[250px] max-h-[250px] rounded-[8px]" src={food.img} width={300} height={400} alt="Food Image" />
                            <div className="grow flex justify-between flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <Button onClick={() => setVariant('1')} variant={variant === "1" ? "secondary" : "primary"} className="text-white custom-shadow-md !py-0.5">{locale === "bn" ? "বিকল্প 1" : "Variants 1"}</Button>
                                    <Button onClick={() => setVariant('2')} variant={variant === "2" ? "secondary" : "primary"} className="text-white custom-shadow-md !py-0.5">{locale === "bn" ? "বিকল্প 2" : "Variants 2"}</Button>
                                    <Button onClick={() => setVariant('3')} variant={variant === "3" ? "secondary" : "primary"} className="text-white custom-shadow-md !py-0.5">{locale === "bn" ? "বিকল্প 3" : "Variants 3"}</Button>
                                </div>

                                <div className="w-full">
                                    <p className="mb-3">{locale === "bn" ? "পণ্য নোটস:" : "Product Notes:"}</p>
                                    <div className='mt-auto flex items-center justify-between bg-slate-300/60 px-2 py-1 rounded-[4px]'>
                                        <p className='fg_fs-xs font-semibold text-center grow dark:!text-black'>{food.price.toFixed(2)}/-</p>
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

                                        <p className='fg_fs-sm font-semibold text-center grow dark:!text-black'>{subtotal.toFixed(2)}/-</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-end p-4">
                        <Dialog.Close className="" asChild >
                            <Button onClick={handleAddToCart} className={`text-white mt-2 font-semibold  ${isAddedToCart ? ' bg-secondary hover:bg-secondary !cursor-not-allowed' : 'custom-shadow-md  bg-primary hover:bg-primary-500'}`} ><ShoppingCart /> <span>{t('addToCart')}</span></Button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
