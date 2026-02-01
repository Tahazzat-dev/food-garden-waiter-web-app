"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'

const bannerData = [
    { id: 1, imageUrl: '/images/home/crub-banner-0.png', altText: 'Banner 1' },
    { id: 2, imageUrl: '/images/home/banner-1.jpg', altText: 'Banner 2' },
    { id: 3, imageUrl: '/images/home/banner-2.avif', altText: 'Banner 3' },
    { id: 4, imageUrl: '/images/home/banner-3.jpg', altText: 'Banner 4' },
    { id: 5, imageUrl: '/images/home/banner-4.avif', altText: 'Banner 5' },
    { id: 6, imageUrl: '/images/home/banner-5.avif', altText: 'Banner 6' },
    { id: 7, imageUrl: '/images/home/banner-6.jpg', altText: 'Banner 7' },
    { id: 8, imageUrl: '/images/home/banner-7.jpg', altText: 'Banner 8' },
]

export default function Banner() {
    return (
        <section className='w-full pt-[70px]'>
            <div className="w-full">
                <Swiper
                    autoplay={true}
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    className="
        home-banner-swiper
        w-full
        aspect-[16/9]              /* base ratio */
        sm:aspect-[16/8]
        lg:aspect-[16/6]
        xl:aspect-[16/5]

        min-h-[220px]
        sm:min-h-[260px]
        md:min-h-[320px]
        lg:min-h-[380px]
        xl:min-h-[420px]

        max-h-[280px]
        sm:max-h-[360px]
        md:max-h-[440px]
        lg:max-h-[520px]
        xl:max-h-[600px]
        text-white dark:text-black
        overflow-hidden
      "
                >
                    {bannerData.map((item) => (
                        <SwiperSlide
                            key={item.id}
                            className="flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-3xl font-semibold"
                        >
                            <Image className='object-cover w-full h-full' src={item.imageUrl} width={1905} height={595} alt={item.altText} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}
