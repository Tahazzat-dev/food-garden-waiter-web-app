"use client"
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '../wrapper/Container'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { SET_EXPAND } from '@/redux/features/actions/actionSlice'
import { useTranslations } from 'next-intl'

export default function MobileBottomButtons() {
    const dispatch = useDispatch();
    const t = useTranslations('mobileBottomActions');
    const { cartProducts } = useSelector((state: RootState) => state.productSlice);
    return (
        <div className='w-full dark:border-t dark:border-slate-400 md:hidden bg-black fixed py-2 z-[9999] bottom-0 left-0'>
            <Container className='flex justify-between'>
                <Link className='flex flex-col gap-1 items-center justify-between' href="/" >
                    <Image src="/images/shared/home-icon.svg" width={22} height={40} alt="Home icon" />
                    <span className='text-white font-semibold text-sm sm:text-base'>{t("home")}</span>
                </Link>
                <button className='flex flex-col gap-1 items-center justify-between' >
                    <Image src="/images/shared/special.svg" width={25} height={40} alt="Offer icon" />
                    <span className='text-white font-semibold text-sm sm:text-base'>{t("offers")}</span>
                </button>
                <button onClick={() => dispatch(SET_EXPAND('CART_SHEET'))} className='relative flex flex-col gap-1 items-center justify-between' >
                    <div className='relative'>
                        <ShoppingCart fill='white' className='text-white h-6 w-6 cursor-pointer' />
                        {
                            cartProducts.length > 0 ?
                                <span className='flex items-center justify-center text-xs px-0.5 min-w-[18px] min-h-4  absolute -top-[40%] left-[80%] translate-x-[-50%] bg-secondary text-white rounded-full p-[1px]'>{cartProducts.length}</span> : <></>
                        }
                    </div>
                    <span className='text-white font-semibold text-sm sm:text-base'>{t("cart")}</span>
                </button>

                <Link href="/orders" onClick={() => dispatch(SET_EXPAND('CART_SHEET'))} className='relative flex flex-col gap-1 items-center justify-between' >
                    <Image src="/images/shared/my-order.svg" width={25} height={40} alt="Orders icon" />
                    <span className='text-white font-semibold text-sm sm:text-base'>{t("orders")}</span>
                </Link>

                <button className='flex flex-col gap-1 items-center justify-between' >
                    <Image src="/images/shared/whatsapp.svg" width={25} height={40} alt="Whatsapp icon" />
                    <span className='text-white font-semibold text-sm sm:text-base'>{t("message")}</span>
                </button>
            </Container>
        </div>
    )
}
