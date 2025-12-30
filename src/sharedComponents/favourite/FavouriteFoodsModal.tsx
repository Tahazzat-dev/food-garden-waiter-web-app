"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ShoppingCart, Trash2, X } from "lucide-react"; // optional icon
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { addCartProduct, removeFavouriteProduct } from "@/redux/features/product/productSlice";
import { demoProducts } from "@/lib/demo-data";

interface Props {
    open: boolean;
    onOpenChange: () => void;
}

export function FavouriteFoodsModal({ open, onOpenChange }: Props) {
    const t = useTranslations('shared');
    const dispatch = useDispatch();
    const { favouriteProducts, cartProducts } = useSelector((state: RootState) => state.productSlice);
    const { locale } = useSelector((state: RootState) => state.locale)

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
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]" />
                <Dialog.Content className="fixed flex flex-col top-1/2 left-1/2 max-h-[80vh]  max-w-[93vw] md:max-w-[700px] !rounded-[10px] lg:!rounded-[12px] overflow-hidden w-full -translate-x-1/2 -translate-y-1/2 bg-body rounded-lg shadow-lg dark:shadow-slate-800 z-[99999]">
                    <div className="flex items-center justify-between bg-primary px-4 py-2">
                        <Dialog.Title className="fg_fs-md text-white">
                            {t('favouriteFoods')}
                        </Dialog.Title>
                        <Button onClick={onOpenChange} className="rounded-full !px-2.5" variant="secondary"> <X className="!text-white w-5 md:w-6 md:h-6 h-5 lg:w-8 lg:h-8" /></Button>
                    </div>
                    <div className="px-2.5 md:px-4 my-2.5 md:my-4 overflow-y-auto grow">
                        {
                            favouriteProducts.length > 1 ?
                                favouriteProducts.map((food) => {
                                    const discountedPrice = food.price - (food.price * food.discount) / 100;
                                    const isAddedToCart = cartProducts.some(item => item.id === food.id);
                                    return <div key={food.id} className='flex gap-3 pb-3 border-b border-dashed mb-3'>
                                        <div className='bg-muted relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-[72px] xl:h-[72px] rounded-md overflow-hidden'>
                                            <Image
                                                src={food.img || '/images/placeholder/placeholder.jpg'}
                                                alt={locale === "bn" ? food.title.bn : food.title.en || 'Product Image'}
                                                width={72}
                                                height={72}
                                                className='object-cover w-full h-full'
                                            />
                                        </div>

                                        <div className='flex gap-1 justify-between flex-grow'>
                                            <div className="flex items-center flex-grow gap-2 justify-between">
                                                <div className="flex flex-col gap-1 justify-between">
                                                    <div className="w-full grow">
                                                        <h6 className='line-clamp-2 text-primary leading-tight font-medium'>{locale === "bn" ? food.title.bn : food.title.en}</h6>
                                                        <p className='text-muted-foreground fg_fs-xs text-primary font-medium'>{locale === "bn" ? food.title.bn : food.title.en}</p>
                                                    </div>
                                                    <p className='fg_fs-sm'>{food.discount < 1 ? <span className=''>{food?.price}TK</span> : <span className='flex items-center gap-3'> <span className='line-through fg_fs-xs'>{food?.price}TK</span> <span className='text-primary'>{discountedPrice}TK</span></span>}</p>
                                                </div>

                                            </div>

                                            <div className='flex flex-col justify-between items-end'>
                                                <Button
                                                    variant='secondary'
                                                    size='icon'
                                                    className='p-1 h-6 w-6 rounded-full shadow-sm'
                                                    onClick={() => dispatch(removeFavouriteProduct(food.id))}
                                                >
                                                    <Trash2 className='text-white  h-3 w-3' />
                                                </Button>
                                                <Button onClick={() => { dispatch(addCartProduct({ ...food, quantity: 1 })) }} className={`mt-2 fg_fs-xxs text-white font-semibold  ${isAddedToCart ? ' bg-secondary hover:bg-secondary !cursor-not-allowed' : 'custom-shadow-md  bg-primary hover:bg-primary-500'}`} ><ShoppingCart /> <span>{t('addToCart')}</span></Button>
                                            </div>
                                        </div>
                                    </div>

                                })

                                : <p className="text-center text-muted-foreground py-4">{t('noFavouriteFoods')}</p>
                        }
                    </div>
                </Dialog.Content>
            </Dialog.Portal >
        </Dialog.Root >
    );
}
