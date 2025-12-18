import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'

const bannerData = [
    { id: 1, imageUrl: '/images/home/banner-1.jpg', altText: 'Banner 1' },
    { id: 2, imageUrl: '/images/home/banner-2.avif', altText: 'Banner 2' },
    { id: 3, imageUrl: '/images/home/banner-3.jpg', altText: 'Banner 3' },
    { id: 4, imageUrl: '/images/home/banner-4.avif', altText: 'Banner 4' },
    { id: 5, imageUrl: '/images/home/banner-5.avif', altText: 'Banner 5' },
    { id: 6, imageUrl: '/images/home/banner-6.jpg', altText: 'Banner 6' },
    { id: 7, imageUrl: '/images/home/banner-7.jpg', altText: 'Banner 7' },
]

export default function Banner() {
    return (
        <section className='w-full pt-[70px]'>
            <div className="w-full h-full ">
                <Swiper
                    modules={[Pagination]}
                    pagination={{
                        clickable: true,
                        type: "bullets",
                    }}
                    className="home-banner-swiper h-[50vh] min-h-[300px] md:min-h-[400px] max-h-[700px] overflow-hidden"
                >
                    {bannerData.map((item) => (
                        <SwiperSlide
                            key={item.id}
                            className="flex items-center justify-center h-[300px] md:h-[420px] bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-3xl font-semibold"
                        >
                            <Image className='object-cover w-full h-full' src={item.imageUrl} width={300} height={400} alt={item.altText} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}
