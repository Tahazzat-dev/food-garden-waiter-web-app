"use client"
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { Link } from "@/i18n/navigation";
import Container from '../wrapper/Container'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { SET_EXPAND, toggleRunExpandAnimation, updateCartIconPosition } from '@/redux/features/actions/actionSlice'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'
import { cn, hasVisitedOffersToday } from '@/lib/utils'
import { setShowOfferedMark } from '@/redux/features/product/productSlice'
import RenderText from '../utils/RenderText'

export default function MobileBottomButtons() {
    // variables
    const KEY = "CART_SHEET"

    // hooks
    const dispatch = useDispatch();
    const t = useTranslations('mobileBottomActions');
    const cartRef = useRef<SVGSVGElement | null>(null);
    const { cartProducts, showOfferedMark, hasOfferedProducts, pendingOrders } = useSelector((state: RootState) => state.productSlice);

    const { runExpandAnimation, EXPAND } = useSelector((state: RootState) => state.actions);

    useEffect(() => {
        if (!hasOfferedProducts) return;

        const visited = hasVisitedOffersToday();

        if (!visited) {
            dispatch(setShowOfferedMark(true));
        }

    }, [dispatch, hasOfferedProducts]);



    useEffect(() => {
        if (!cartRef || !cartRef.current) return;

        const rect = cartRef.current.getBoundingClientRect();

        const position = {
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            left: rect.left,
            width: rect.width,
            height: rect.height,
        };

        dispatch(updateCartIconPosition(position));
    }, [cartRef, dispatch])


    useEffect(() => {
        if (!runExpandAnimation) return;
        const timerId = setTimeout(() => {
            dispatch(toggleRunExpandAnimation(false));
        }, 2000)
        return () => clearTimeout(timerId);
    }, [runExpandAnimation, dispatch])


    return (
        <div className='w-full dark:border-t dark:border-slate-400 md:hidden bg-black fixed py-2 z-[999999] bottom-0 left-0'>
            <Container className='flex justify-between'>
                <Link className='flex flex-col gap-1 items-center justify-between min-w-[70px]' href="/" >
                    <Image src="/images/shared/home-icon.svg" width={22} height={40} alt="Home icon" />
                    <span className='text-white font-semibold text-sm sm:text-base'><RenderText group="mobileBottomActions" variable="home" /></span>
                </Link>
                <Link href="/offers" className='flex flex-col gap-1 items-center justify-between min-w-[70px]' >
                    <div className='relative'>
                        <Image src="/images/shared/special.svg" width={25} height={40} alt="Offer icon" />
                        {
                            !!showOfferedMark &&
                            <span className='flex items-center justify-center text-xs px-0.5 min-w-[18px] min-h-4  absolute -top-[40%] left-[80%] translate-x-[-50%] bg-secondary text-white rounded-full p-[1px]'>!</span>
                        }
                    </div>
                    <span className='text-white font-semibold text-sm sm:text-base'><RenderText group="mobileBottomActions" variable="offers" /></span>
                </Link>
                <button onClick={() => dispatch(SET_EXPAND(EXPAND === KEY ? null : KEY))} className='min-w-[70px] prevent-body-trigger relative flex flex-col gap-1 items-center justify-between' >
                    <div className={cn('relative', runExpandAnimation && "cart-pop")}>
                        <ShoppingCart ref={cartRef} fill='white' className='text-white h-6 w-6 cursor-pointer' />
                        {
                            cartProducts.length > 0 ?
                                <span className='flex items-center justify-center text-xs px-0.5 min-w-[18px] min-h-4  absolute -top-[40%] left-[80%] translate-x-[-50%] bg-secondary text-white rounded-full p-[1px]'>{cartProducts.length}</span> : <></>
                        }
                    </div>
                    <span className='text-white font-semibold text-sm sm:text-base'>{t("cart")}</span>
                </button>

                <Link href="/orders" className='relative flex flex-col gap-1 items-center justify-between min-w-[70px]' >
                    <div className='relative'>
                        <Image src="/images/shared/my-order.svg" width={25} height={40} alt="Orders icon" />
                        {
                            pendingOrders.length > 0 &&
                            <span className='flex items-center justify-center text-xs px-0.5 min-w-[18px] min-h-4  absolute -top-[40%] left-[80%] translate-x-[-50%] bg-secondary text-white rounded-full p-[1px]'>{pendingOrders.length}</span>
                        }
                    </div>
                    <span className='text-white font-semibold text-sm sm:text-base'><RenderText group="mobileBottomActions" variable="orders" /></span>
                </Link>

                <Link target='_blank' href="https://wa.me/8801713619293" className='flex flex-col gap-1 items-center justify-between min-w-[70px]' >
                    <Image src="/images/shared/whatsapp.svg" width={25} height={40} alt="Whatsapp icon" />
                    <span className='text-white font-semibold text-sm sm:text-base'><RenderText group="shared" variable="whatsapp" /></span>
                </Link>
            </Container>
        </div>
    )
}
