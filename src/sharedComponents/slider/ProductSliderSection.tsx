'use client';

import type React from 'react';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ProductSliderSectionProps {
  title: string;
  data: any[];
  children: (item: any, index: number) => React.ReactNode;
  slidesPerView?: number;
  rows?: 1 | 2;
  className?: string;
  variant?: 'default' | 'compact';
}

export function ProductSliderSection({
  title,
  data,
  children,
  slidesPerView = 4,
  rows = 1,
  className,
  variant = 'default',
}: ProductSliderSectionProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const isCompact = variant === 'compact';
  const mobileSlides = isCompact ? 2.5 : 1.5;
  const spaceBetween = isCompact ? 12 : 16;

  const config = {
    640: {
      slidesPerView: isCompact ? Math.min(slidesPerView, 4) : Math.min(slidesPerView, 2),
      slidesPerGroup: 1,
    },
    768: {
      slidesPerView: isCompact ? Math.min(slidesPerView, 5) : Math.min(slidesPerView, 3),
      slidesPerGroup: 1,
    },
    1024: {
      slidesPerView: isCompact ? Math.min(slidesPerView, 6) : Math.min(slidesPerView, 4),
      slidesPerGroup: 1,
    },
    1280: {
      slidesPerView: slidesPerView,
      slidesPerGroup: 1,
    },
  };

  return (
    <section className={cn('w-full', className)}>
      <div className='mb-6 flex items-center justify-between'>
        <h2>{title}</h2>

        {/* Navigation Controls */}
        <div className='flex gap-2'>
          <Button
            ref={prevButtonRef}
            variant='ghost'
            size='icon'
            onClick={() => swiperRef.current?.slidePrev()}
            className='h-10 w-10 rounded-full bg-transparent'
            aria-label='Previous slide'
          >
            <ChevronLeft className='h-5 w-5' />
          </Button>
          <Button
            ref={nextButtonRef}
            variant='ghost'
            size='icon'
            onClick={() => swiperRef.current?.slideNext()}
            className='h-10 w-10 rounded-full bg-transparent'
            aria-label='Next slide'
          >
            <ChevronRight className='h-5 w-5' />
          </Button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Grid]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={spaceBetween}
        slidesPerView={mobileSlides}
        slidesPerGroup={1}
        speed={600}
        loop={true}
        grid={{
          rows: rows,
          fill: 'row',
        }}
        breakpoints={config}
        className='w-full'
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className='h-auto'>
            {children(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
