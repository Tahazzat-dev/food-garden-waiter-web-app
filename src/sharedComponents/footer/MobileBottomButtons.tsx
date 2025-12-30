"use client"
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '../wrapper/Container'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function MobileBottomButtons() {
    const { cartProducts } = useSelector((state: RootState) => state.productSlice);
    return (
        <div className='w-full bg-black fixed py-2.5 z-[9999] bottom-20 left-0'>
            <Container className='flex justify-between'>
                <Link className='flex flex-col gap-1 items-center' href="/" >
                    <Image src="/images/shared/home-icon.svg" width={30} height={40} alt="Home icon" />
                    <span className='text-white font-semibold'>Home</span>
                </Link>
                <button className='flex flex-col gap-1 items-center justify-between' >
                    <Image src="/images/shared/special.svg" width={35} height={40} alt="Offer icon" />
                    <span className='text-white font-semibold'>Offer</span>
                </button>
                <button className='relative flex flex-col gap-1 items-center justify-between' >
                    <div className='relative'>
                        <ShoppingCart fill='white' className='text-white h-8 w-8 cursor-pointer' />
                        {
                            cartProducts.length > 0 ?
                                <span className='flex items-center justify-center text-xs px-0.5 min-w-[18px] min-h-4  absolute -top-[40%] left-[80%] translate-x-[-50%] bg-secondary text-white rounded-full p-[1px]'>{cartProducts.length}</span> : <></>
                        }
                    </div>
                    <span className='text-white font-semibold'>Cart</span>
                </button>
                <button className='flex flex-col gap-1 items-center justify-between' >
                    <Image src="/images/shared/whatsapp.svg" width={35} height={40} alt="Whatsapp icon" />
                    <span className='text-white font-semibold'>Message</span>
                </button>
            </Container>
        </div>
    )
}
