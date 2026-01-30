"use client"
import useFormatPrice from '@/hooks/useFormatPrice'
import useRenderText from '@/hooks/useRenderText'
import { getImage, getTranslationReadyText } from '@/lib/utils'
import { SET_EXPAND } from '@/redux/features/actions/actionSlice'
import { setModalProduct } from '@/redux/features/product/productSlice'
import RenderText from '@/sharedComponents/utils/RenderText'
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
        <button onClick={openDetailsModal} className='flex gap-5 bg-clr-card overflow-hidden shadow-lg border border-slate-300 dark:border-slate-700 rounded-md group z-0'>
            <div className="relative p-1 flex items-center justify-center">
                <div className="w-full h-full max-w-[100px] max-h-[90px] overflow-hidden rounded-md">
                    <Image src={product?.image ? getImage(product?.image) : "/images/shared/food-placeholder.jpg"} className='z-10 w-full duration-300 group-hover:scale-105 h-full' width={300} height={400} alt={en} />
                </div>
            </div>

            <div className="w-8/12 grow flex text-left flex-col items-start py-2.5 bg-clr-card relative ">
                {/* <span className='absolute top-0 text-[13px] right-0 px-2 bg-secondary text-white' >
                    10% <RenderText group='shared' variable='off' />
                </span> */}
                <h6 className='mb-1'> {renderText(en, bn)}</h6>
                <div className="w-full flex justify-end flex-col grow">
                    <p className='fg_fs-xs' ><RenderText group='shared' variable='productDetails' /></p>
                    <p className='fg_fs-xs font-semibold'><span className=''>{formatPrice(+product.price)}</span></p>
                </div>
            </div>
        </button>
    )
}
