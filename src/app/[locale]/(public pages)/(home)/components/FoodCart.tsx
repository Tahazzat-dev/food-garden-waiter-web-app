"use client"
import { Button } from '@/components/ui/button'
import { Eye, HeartIcon, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFavouriteProduct, setModalProduct } from '@/redux/features/product/productSlice'
import { RootState } from '@/redux/store'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { SET_EXPAND } from '@/redux/features/actions/actionSlice'
import { getTranslationReadyText } from '@/lib/utils'
import useFormatPrice from '@/hooks/useFormatPrice'
import { TProduct } from '@/types/types'
import useRenderText from '@/hooks/useRenderText'
import { setToStorage } from '@/lib/storage'

export default function FoodCart({ product }: { product: TProduct }) {
    // hooks
    const dispatch = useDispatch()
    const t = useTranslations('shared');
    const { favouriteProducts } = useSelector((state: RootState) => state.productSlice)
    const { formatPrice } = useFormatPrice();
    const { renderText } = useRenderText()

    // conditional variables
    // const isAddedToCart = cartProducts.some(item => item.id === product.id);
    const isAddedToCart = false;
    const isFvourite = favouriteProducts.some(item => item.id === product.id);


    // handlers
    const openDetailsModal = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        dispatch(setModalProduct(product));
        dispatch(SET_EXPAND("OPEN_PRODUCT_DETAILS_MODAL"))
    }

    const handleFavourite = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        const isAlreadyFavourite = favouriteProducts.some(item => item.id === product.id);
        if (isAlreadyFavourite) return;
        dispatch(addFavouriteProduct(product));
    }

    // const firstVariant = product.variants[0];
    const { en, bn } = getTranslationReadyText(product.name)

    return (
        <Link href={`/products/${product.id}`} className='custom-shadow-card flex flex-col overflow-hidden shadow-2xl !border-none group z-0'>
            <div className="w-full relative h-[150px] sm:h-[200px]">
                <button onClick={handleFavourite} className='hover:scale-105 absolute top-[1px] left-0.5 z-20'>
                    <HeartIcon fill={isFvourite ? "red" : 'white'} className={`w-8 h-8 ${isFvourite ? 'text-white' : 'text-secondary'}`} />
                </button>
                <div className="w-full h-full overflow-hidden">
                    <Image src={product?.image || "/images/shared/food-placeholder.jpg"} className='z-10 w-full duration-300 group-hover:scale-105 h-full' width={300} height={400} alt={en} />
                </div>
                <span className='font-semibold p-1 px-[5.5px] rounded-md hover:bg-white bg-slate-100 text-black absolute bottom-1 right-1 z-20'>
                    <Eye className='w-5 h-5' />
                </span>
                {
                    //  <span className='absolute fg_fs-xxs  top-0 right-0 bg-secondary text-white px-2 py-1 rounded-md'>
                    //     5% Off
                    // </span>
                }
            </div>

            <div className="w-full grow flex flex-col p-3 md:p-4 bg-slate-100 dark:bg-slate-700">
                <div className="w-full flex flex-col grow">
                    <h6 className='mb-1'> {renderText(en, bn)}</h6>
                    {/* <p className='fg_fs-sm'>{firstVariant.discount < 1 ? <span className=''>{formatPrice(firstVariant?.price)}</span> : <span className='flex items-center gap-3'> <span className='line-through fg_fs-xs'>{formatPrice(firstVariant?.price)}</span> <span className='text-primary'>{formatPrice(getDiscountPrice(firstVariant.price, firstVariant.discount))}</span></span>}</p> */}
                    <p className='fg_fs-sm'><span className=''>{formatPrice(+product.price)}</span></p>
                </div>
                <Button onClick={openDetailsModal} className={`mt-2 text-white w-full font-semibold  ${isAddedToCart ? ' bg-secondary hover:bg-secondary' : 'custom-shadow-md  bg-primary hover:bg-primary-500'}`} ><ShoppingCart /> <span>{t('addToCart')}</span></Button>
            </div>
        </Link>
    )
}
