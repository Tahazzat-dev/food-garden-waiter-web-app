import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Container from '../wrapper/Container'

export default function MobileBottomButtons() {
    return (
        <div className='w-full bg-black fixed py-2.5 z-[9999] bottom-20 left-0'>
            <Container className='flex justify-between'>
                <Link className='border border-red-500 flex flex-col gap-1 items-center' href="/" >
                    <Image src="/images/shared/home-icon.svg" width={30} height={40} alt="Home icon" />
                    <span className='text-white font-semibold'>Home</span>
                </Link>
                <button className='border border-red-500 flex flex-col gap-1 items-center justify-between' >
                    <Image src="/images/shared/special.svg" width={35} height={40} alt="Offer icon" />
                    <span className='text-white font-semibold'>Offer</span>
                </button>
                <button className='border border-red-500 flex flex-col gap-1 items-center justify-between' >
                    <ShoppingCart fill='white' className='text-white h-6 w-6 cursor-pointer' />
                    <span className='text-white font-semibold'>Cart</span>
                </button>
                <button className='border border-red-500 flex flex-col gap-1 items-center justify-between' >
                    <ShoppingCart fill='white' className='text-white h-6 w-6 cursor-pointer' />
                    <span className='text-white font-semibold'>Message</span>
                </button>
            </Container>
        </div>
    )
}
