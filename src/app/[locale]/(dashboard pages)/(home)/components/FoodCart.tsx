"use client"
import useFormatPrice from '@/hooks/useFormatPrice'
import useRenderText from '@/hooks/useRenderText'
import { getImage, getTranslationReadyText } from '@/lib/utils'
import { SET_EXPAND } from '@/redux/features/actions/actionSlice'
import { setModalProduct } from '@/redux/features/product/productSlice'
import { TProduct } from '@/types/types'
import Image from 'next/image'
import { MouseEvent } from 'react'
import { useDispatch } from 'react-redux'

export default function FoodCart({ product }: { product: TProduct }) {
    // hooks
    const dispatch = useDispatch()
    const { formatPrice } = useFormatPrice();
    const { renderText } = useRenderText()

    // handlers
    const openDetailsModal = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        dispatch(setModalProduct(product));
        dispatch(SET_EXPAND("OPEN_PRODUCT_DETAILS_MODAL"))
    }
    const { en, bn } = getTranslationReadyText(product.name)
    return (
        <button onClick={openDetailsModal} className='w-full flex gap-5 bg-clr-card overflow-hidden rounded-md border-slate-300 dark:border-slate-600 border  group z-0'>
            <div className="relative p-1 flex items-center justify-center">
                <div className="w-full h-full max-w-[70px] max-h-[60px] overflow-hidden rounded-md">
                    <Image src={product?.image ? getImage(product?.image) : "/images/shared/food-placeholder.jpg"} className='z-10 w-full duration-300 group-hover:scale-105 h-full' width={300} height={400} alt={en} />
                </div>
            </div>

            <div className="grow flex text-left flex-col items-start py-1.5 bg-clr-card relative ">
                {/* <span className='absolute top-0 text-[13px] right-0 px-2 bg-secondary text-white' >
                    10% <RenderText group='shared' variable='off' />
                </span> */}
                <h6 className='text-sm mb-1'> {renderText(en, bn)}</h6>
                <div className="w-full flex justify-end flex-col grow">
                    {/* <p className='fg_fs-xs' ><RenderText group='shared' variable='productDetails' /></p> */}
                    <p className='fg_fs-xxs font-semibold'><span className=''>{formatPrice(+product.price)}</span></p>
                </div>
            </div>
        </button>
    )
}
