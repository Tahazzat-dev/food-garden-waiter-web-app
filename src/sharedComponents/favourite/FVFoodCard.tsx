import { Button } from '@/components/ui/button'
import useFormatPrice from '@/hooks/useFormatPrice'
import { SET_EXPAND } from '@/redux/features/actions/actionSlice'
import { removeFavouriteProduct, setModalProduct } from '@/redux/features/product/productSlice'
import { RootState } from '@/redux/store'
import { TFoodVariant, TProduct } from '@/types/types'
import { ShoppingCart, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function FVFoodCard({ item }: { item: TProduct }) {
    // hooks
    const t = useTranslations('shared');
    const dispatch = useDispatch()
    const { locale } = useSelector((state: RootState) => state.locale)
    const { cartProducts } = useSelector((state: RootState) => state.productSlice);
    const [addedVariants, setAddedVariants] = useState(0);

    // handlers

    const openFoodDetailsModal = () => {
        dispatch(setModalProduct(item));
        dispatch(SET_EXPAND("OPEN_PRODUCT_DETAILS_MODAL"))
    }

    useEffect(() => {
        const count = item.variants.filter(variant =>
            cartProducts.some(cartItem => cartItem.id === variant.id)
        ).length;

        setAddedVariants(count);
    }, [cartProducts, item.variants]);


    console.log(addedVariants, ' added variants', item.variants.length)
    return (
        <div className='flex gap-3 pb-3 border-b border-slate-300 dark:border-slate-600 border-dashed'>
            <div className='bg-muted relative w-14 h-14 lg:w-16 lg:h-16 xl:w-[72px] xl:h-[72px] rounded-md overflow-hidden'>
                <Image
                    src={item.img || '/images/placeholder/placeholder.jpg'}
                    alt={locale === "bn" ? item.title.bn : item.title.en || 'Product Image'}
                    width={72}
                    height={72}
                    className='object-cover w-full h-full'
                />
            </div>

            <div className='flex gap-1 justify-between flex-grow'>
                {/* <div className="flex items-center flex-grow gap-2 justify-between">
                    <div className="flex flex-col gap-1">
                        <div className="w-full grow">
                            <h6 className='line-clamp-2 text-primary leading-tight font-medium'>{locale === "bn" ? item?.title?.bn : item?.title?.en}</h6>
                        </div>
                        <p className='fg_fs-sm'>{food.discount < 1 ? <span className=''>{food?.price}TK</span> : <span className='flex items-center gap-3'> <span className='line-through fg_fs-xs'>{food?.price}TK</span> <span className='text-primary'>{discountedPrice}TK</span></span>}</p>
                    </div>
                </div> */}
                <h6 className='line-clamp-2 text-primary leading-tight font-medium'>{locale === "bn" ? item?.title?.bn : item?.title?.en}</h6>

                <div className='flex flex-col justify-between items-end'>
                    <Button
                        variant='secondary'
                        size='icon'
                        className='p-1 h-6 w-6 rounded-full shadow-sm'
                        onClick={() => dispatch(removeFavouriteProduct(item.id))}
                    >
                        <Trash2 className='text-white  h-3 w-3' />
                    </Button>

                    <Button onClick={openFoodDetailsModal} className={`mt-2 fg_fs-xxs text-white font-semibold  ${addedVariants === item.variants.length ? ' bg-secondary hover:bg-secondary' : 'custom-shadow-md  bg-primary hover:bg-primary-500'}`} ><ShoppingCart /> <span>{t('addToCart')}</span></Button>
                </div>
            </div>
        </div>
    )
}
