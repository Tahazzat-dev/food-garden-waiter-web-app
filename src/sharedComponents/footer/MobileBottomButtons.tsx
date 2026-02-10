"use client"
import useFormatPrice from "@/hooks/useFormatPrice";
import { Link, usePathname } from "@/i18n/navigation";
import { cn, hasVisitedOffersToday } from '@/lib/utils';
import { SET_EXPAND, toggleRunExpandAnimation, updateCartIconPosition } from '@/redux/features/actions/actionSlice';
import { useCountOnlineOrdersQuery } from "@/redux/features/product/productApiSlice";
import { setShowOfferedMark } from '@/redux/features/product/productSlice';
import { RootState } from '@/redux/store';
import { Globe, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RenderText from '../utils/RenderText';
import Container from '../wrapper/Container';

export default function MobileBottomButtons() {
    // variables
    const KEY = "CART_SHEET"

    // hooks
    const dispatch = useDispatch();
    const { data } = useCountOnlineOrdersQuery(``, {
        pollingInterval: 5000, // auto pooling after 5s.
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    });
    const t = useTranslations('mobileBottomActions');
    const cartRef = useRef<SVGSVGElement | null>(null);
    const pathname = usePathname()
    const { translateNumber } = useFormatPrice()

    const { cartProducts, hasOfferedProducts } = useSelector((state: RootState) => state.productSlice);
    const [onlineOrdersCount, setOnlineOrdersCount] = useState(0)

    const { runExpandAnimation, EXPAND } = useSelector((state: RootState) => state.actions);

    const isActive = (path: string) => pathname === path;

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

    useEffect(() => {

        if (!!data?.success) {
            setOnlineOrdersCount(data?.count);
        }
    }, [data, setOnlineOrdersCount])

    const cartOpen = EXPAND === "CART_SHEET"
    return (
        <div className='w-full dark:border-t dark:border-slate-400 bg-black fixed py-2 z-[999999] bottom-0 left-0'>
            <Container className='flex justify-between'>
                <Link className='flex flex-col gap-1 items-center justify-between min-w-[70px]' href="/" >
                    <Image src="/images/shared/menu-white.png" className={isActive('/') ? "hidden" : "block"} width={22} height={40} alt="Menu icon" />
                    <Image src="/images/shared/menu-active.png" className={isActive('/') ? "block" : "hidden"} width={22} height={40} alt="Menu icon" />
                    <span className={cn('font-semibold text-sm sm:text-base', isActive('/') ? "text-[#00f9ff]" : "text-white")}><RenderText group="mobileBottomActions" variable="menu" /></span>
                </Link>
                <Link href="/orders" className='mr-3 flex flex-col gap-1 items-center justify-between min-w-[70px]' >
                    <Image src="/images/shared/order-white.png" className={isActive('/orders') ? "hidden" : "block"} width={25} height={40} alt="Orders icon" />
                    <Image src="/images/shared/order-active.png" className={isActive('/orders') ? "block" : "hidden"} width={25} height={40} alt="Orders icon" />
                    <span className={cn('font-semibold text-sm sm:text-base', isActive('/orders') ? "text-[#00f9ff]" : "text-white")}><RenderText group="mobileBottomActions" variable="orders" /></span>
                </Link>
                <button onClick={() => dispatch(SET_EXPAND(EXPAND === KEY ? null : KEY))} className='relative w-[60px] h-[52px]' >
                    <div className={cn("w-[70px] h-[70px] duration-200 absolute left-1/2 -translate-x-1/2 overflow-hidden rounded-full p-[3px]", cartOpen ? "top-0 -translate-y-[12.5%]" : "top-[25%] -translate-y-1/2")}>
                        <div className="w-full bg-black h-full z-10 rounded-full prevent-body-trigger relative flex flex-col items-center justify-center">
                            <div className={cn('relative mx-2', runExpandAnimation && "cart-pop")}>
                                <ShoppingCart ref={cartRef} fill='white' className='text-white h-6 w-6 cursor-pointer' />
                                {
                                    cartProducts.length > 0 ?
                                        <span className='flex items-center justify-center text-xs px-0.5 min-w-[18px] min-h-4  absolute -top-[40%] left-[80%] translate-x-[-50%] bg-secondary text-white rounded-full p-[1px]'>{translateNumber(cartProducts.length)}</span> : <></>
                                }
                            </div>

                            <span className='text-white font-semibold text-sm sm:text-base'>{t("cart")}</span>
                        </div>
                        <div
                            className="gradient-border-overlay absolute -top-1/2 -left-1/2 w-[200%] h-[200%] z-0"
                        />
                    </div>
                </button>

                <Link href="/kitchen" className='ml-3 relative flex flex-col gap-1 items-center justify-between min-w-[70px]' >
                    <Image src="/images/shared/cooking-white.png" className={isActive('/kitchen') ? "hidden" : "block"} width={25} height={40} alt="Kitchen Icon" />
                    <Image src="/images/shared/cooking-active.png" className={isActive('/kitchen') ? "block" : "hidden"} width={25} height={40} alt="Kitchen Icon" />
                    <span className={cn('font-semibold text-sm sm:text-base', isActive('/kitchen') ? "text-[#00f9ff]" : "text-white")}><RenderText group="mobileBottomActions" variable="kitchen" /></span>
                </Link>

                <Link href="/online-orders" className='flex flex-col gap-1 items-center justify-between min-w-[70px] relative ' >
                    <Globe className={cn("h-6 w-6 cursor-pointer", isActive("/online-orders") ? "text-[#00f9ff]" : "text-white ")} />
                    <span className={cn('font-semibold text-sm sm:text-base', isActive('/online-orders') ? "text-[#00f9ff]" : "text-white")}><RenderText group="mobileBottomActions" variable="online" /></span>
                    {
                        !!onlineOrdersCount && <span className='absolute top-0 left-[70%] h-4 py-0.5 text-xs min-w-4 rounded-full flex items-center justify-center overflow-hidden -translate-y-1/2 translate-x-[-35%] bg-secondary text-white'>{translateNumber(onlineOrdersCount)}</span>
                    }
                </Link>
            </Container>
        </div>
    )
}
