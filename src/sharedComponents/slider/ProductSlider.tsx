'use client';
import React from 'react'
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Props {
    title: string;
    data: any[];
    children: (item: any, index: number) => React.ReactNode;
    slidesPerView?: number;
    rows?: 1 | 2;
    className?: string;
}

export function ProductSlider({
    title,
    data,
    children,
    slidesPerView = 4,
    rows = 1,
    className,
}: Props) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'center',
        slidesToScroll: 1,
        duration: 100,
        loop: true,
        skipSnaps: true,
        containScroll: 'trimSnaps',
    });

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    const slides: any[][] = [];
    const itemsPerSlide = slidesPerView * rows;

    for (let i = 0; i < data.length; i += itemsPerSlide) {
        slides.push(data.slice(i, i + itemsPerSlide));
    }

    return (
        <section className={cn('w-full', className)}>
            <div className='mb-6 flex items-center justify-between'>
                <h2>{title}</h2>

                <div className='flex gap-2'>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={scrollPrev}
                        disabled={!canScrollPrev}
                        className='h-10 w-10 rounded-full bg-transparent disabled:opacity-30'
                        aria-label='Previous slide'
                    >
                        <ChevronLeft className='h-5 w-5' />
                    </Button>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={scrollNext}
                        disabled={!canScrollNext}
                        className='h-10 w-10 rounded-full bg-transparent disabled:opacity-30'
                        aria-label='Next slide'
                    >
                        <ChevronRight className='h-5 w-5' />
                    </Button>
                </div>
            </div>

            {/* Carousel Container */}
            <div className='overflow-hidden' ref={emblaRef}>
                <div className='flex'>
                    {slides.map((slideItems, slideIndex) => (
                        <div key={slideIndex} className='min-w-0 flex-[0_0_100%]'>
                            <div className={cn('grid gap-4', rows === 2 ? 'grid-rows-2' : 'grid-rows-1')}>
                                {Array.from({ length: rows }).map((_, rowIndex) => (
                                    <div
                                        key={rowIndex}
                                        className='grid gap-4'
                                        style={{ gridTemplateColumns: `repeat(${slidesPerView}, 1fr)` }}
                                    >
                                        {slideItems
                                            .slice(rowIndex * slidesPerView, (rowIndex + 1) * slidesPerView)
                                            .map((item, itemIndex) => {
                                                const originalIndex =
                                                    slideIndex * itemsPerSlide + rowIndex * slidesPerView + itemIndex;
                                                return <div key={originalIndex}>{children(item, originalIndex)}</div>;
                                            })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
