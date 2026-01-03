'use client';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { X, Heart } from "lucide-react"; // optional icon
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { getResponsiveRightStyle } from '@/lib/utils';
import { SET_EXPAND } from '@/redux/features/actions/actionSlice';
import FVFoodCard from './FVFoodCard';

export function FavouriteFoods() {
    // variables
    const KEY = "OPEN_FAVOURITE_FOOD_MODAL"
    // hooks
    const dispatch = useDispatch();
    const { favouriteProducts } = useSelector((state: RootState) => state.productSlice);
    const { EXPAND } = useSelector((state: RootState) => state.actions);
    const t = useTranslations('shared');
    const cartRef = useRef<HTMLButtonElement | null>(null)
    const [style, setStyle] = useState<CSSProperties>({})

    // handlers 
    const openModal = () => {
        if (!cartRef.current || typeof window === "undefined") return;
        const elStyle = getResponsiveRightStyle(cartRef)
        setStyle(elStyle)
        dispatch(SET_EXPAND(KEY));
    }

    const closeModal = () => {
        dispatch(SET_EXPAND(null));
    }


    useEffect(() => {
        const elStyle = getResponsiveRightStyle(cartRef)
        setStyle(elStyle)
    }, [cartRef])


    return (
        <>
            <button ref={cartRef} onClick={openModal} className='relative'>
                <Heart fill='white' className='text-white h-6 w-6 cursor-pointer' />
                {
                    favouriteProducts.length > 0 ?
                        <span className='flex items-center justify-center text-xs px-0.5 min-w-4 min-h-4  absolute -top-[40%] left-[80%] translate-x-[-50%] bg-secondary text-white rounded-full p-[1px]'>{favouriteProducts.length}</span> : <></>
                }
                {EXPAND === KEY && <span className='w-5 h-5 rotate-45 bg-primary absolute pointer-events-none top-[190%] left-1/2 -translate-x-1/2'></span>}
            </button>


            <Dialog.Root open={EXPAND === KEY} onOpenChange={closeModal}>
                <Dialog.Portal>
                    <div className="fixed inset-0 global-overlay wishlist-overlay top-[81px] !border-none lg:top-[83.53px] z-[9999]" />
                    <Dialog.Content style={style} className="prevent-body-trigger wishlist-modal fixed w-full flex flex-col top-[81px] !border-none !m-0 !p-0 lg:top-[83.53px] max-w-[90vw] sm:max-w-[600px] md:max-w-[600px] !rounded-[6px] md:rounded-[8px] lg:!rounded-[10px] overflow-hidden bg-body z-[99999]">
                        <div className="flex items-center justify-between bg-primary px-2.5 sm:px-4 py-2">
                            <Dialog.Title className="fg_fs-md text-white">
                                {t('favouriteFoods')}
                            </Dialog.Title>
                            <Button onClick={closeModal} className="rounded-full !px-2 max-h-8" variant="secondary"> <X className="!text-white w-5 md:w-6 md:h-6 h-5 lg:w-8 lg:h-8" /></Button>
                        </div>
                        <div className="px-2.5 md:px-4 my-2.5 md:my-4 overflow-y-auto grow flex flex-col gap-5">
                            {
                                favouriteProducts.length > 0 ?
                                    favouriteProducts.map((food) => <FVFoodCard key={food.id} item={food} />)

                                    : <p className="text-center text-muted-foreground py-4">{t('noFavouriteFoods')}</p>
                            }
                        </div>
                    </Dialog.Content>
                </Dialog.Portal >
            </Dialog.Root >
        </>
    );
}
