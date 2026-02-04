"use client"
import FoodCart from '@/app/[locale]/(dashboard pages)/(home)/components/FoodCart';
import { cn, getImage } from '@/lib/utils';
import { setCategories } from '@/redux/features/category/categorySlice';
import { RootState } from '@/redux/store';
import LoadingSpinner from '@/sharedComponents/loading/LoadingSpinner';
import BoxSpace from '@/sharedComponents/shared/BoxSpace';
import Container from '@/sharedComponents/wrapper/Container';
import { TCategory, TProduct } from '@/types/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper.css";
import NoDataMsg from '../shared/NoDataMsg';
import { CreateTrnslateText } from '../utils/TranslateText';


type Props = {
    categories: TCategory[];
    className?: string;
}
export default function CategoryAndProductSlider({ className = "", categories = [] }: Props) {
    // hooks
    const dispatch = useDispatch()
    const categorySwiperRef = useRef<SwiperType | null>(null);
    const foodsSwiperRef = useRef<SwiperType | null>(null);
    const { allProducts } = useSelector((state: RootState) => state.productSlice)
    const [productsArr, setProductsArr] = useState<TProduct[][]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);


    // swiper end and start position
    const [isBeginning, setIsBeginning] = useState(true)
    const [isEnd, setIsEnd] = useState(false)
    const [mounted, setMounted] = useState(false)


    // handlers
    const handleSelectCategory = (index: number) => {
        setActiveIndex(index);
        foodsSwiperRef.current?.slideTo(index);
    }

    // set all categories
    useEffect(() => {
        dispatch(setCategories(categories));
    }, [categories, dispatch])


    // load all product data
    useEffect(() => {
        if (!categories.length || !allProducts.length) return;
        setIsLoading(false);

        const productData = categories.map((c) => allProducts.filter((p) => p.category_id === c.id));
        setProductsArr(productData);
    }, [allProducts, categories])

    // mount the component
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null;


    if (isLoading) {
        return <BoxSpace className='min-h-20 lg:min-h-40 xl:min-h-56'>
            <LoadingSpinner />
        </BoxSpace>
    }

    return (
        <>
            <section className={cn("bg-inherit ", className)}>
                <div className="w-full pb-1 mb-1">
                    <Container className=''>
                        <div className="w-full category-container overflow-x-auto mt-2 lg:mt-1 lg:pt-3 pb-2">
                            <div style={{ position: "relative", width: "100%" }}>
                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={12}
                                    slidesPerView="auto"
                                    navigation={{
                                        nextEl: ".swiper-button-next-custom",
                                        prevEl: ".swiper-button-prev-custom",
                                    }}

                                    onSwiper={(swiper) => {
                                        categorySwiperRef.current = swiper
                                        setIsBeginning(swiper.isBeginning)
                                        setIsEnd(swiper.isEnd)
                                    }}
                                    onSlideChange={(swiper) => {
                                        // foodsSwiperRef.current?.slideTo(swiper.activeIndex);
                                        setIsBeginning(swiper.isBeginning)
                                        setIsEnd(swiper.isEnd)
                                    }}
                                    speed={450}
                                    grabCursor={true}
                                >
                                    {categories.map((item, index) => (
                                        <SwiperSlide
                                            className="z-0 !w-[80px] !min-w-[80px] !h-[80px] lg:!w-[120px] lg:!min-w-[120px] lg:!h-[120px]"
                                            key={item.id}
                                        >
                                            <button
                                                className='rounded-[6px] custom-shadow-card-sm w-[80px] min-w-[80px] h-[80px] lg:w-[120px] lg:min-w-[120px] lg:h-[120px] grow group group block overflow-hidden z-30 relative'
                                                onClick={() => handleSelectCategory(index)}
                                            >
                                                {/* <Image className='object-cover w-full duration-300 group-hover:scale-105 ' src={item.img} width={300} height={400} alt={item.name.en} /> */}
                                                {/* TODO: temp_ */}
                                                <Image className='object-cover w-full h-full duration-300 group-hover:scale-105 ' src={item.id == 0 ? item.image.link : getImage(item?.image?.link)} width={300} height={400} alt="category image" />
                                                <span className={cn("text-[13px] md:text-[14px] lg:text-[15px] duration-300 text-center font-semibold absolute bg-slate-800/30 py-1 backdrop-blur-sm block w-full text-white z-30 left-0 bottom-0",
                                                    activeIndex === index ? '!bg-secondary' : 'group-hover:bg-secondary '
                                                )}>
                                                    <CreateTrnslateText text={item.name} />
                                                </span>
                                            </button>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* Custom Navigation Buttons */}
                                <button disabled={isBeginning} className={cn("absolute top-1/2 text-secondary left-0 z-[10] -translate-y-1/2 bg-primary rounded-full p-0.5 lg:p-1 !text-white swiper-button-prev-custom nav-btn", isBeginning && "opacity-30")}>
                                    <ChevronLeft className="size-5 lg:size-[22px]" />
                                </button>
                                <button disabled={isEnd} className={cn("absolute top-1/2 right-0 z-[10] -translate-y-1/2 rounded-full p-0.5 lg:p-1 bg-primary !text-white swiper-button-next-custom nav-btn", isEnd && "opacity-30")}>
                                    <ChevronRight className="size-5 lg:size-[22px]" />
                                </button>
                            </div>
                        </div>
                    </Container>
                </div>

            </section>
            <section className={cn("mb-4 z-10 mt-[75px]")}>
                <Container>
                    <Swiper
                        autoHeight={true}
                        speed={450}
                        spaceBetween={20}
                        watchSlidesProgress={true}
                        onSwiper={(swiper) => (foodsSwiperRef.current = swiper)}
                        onSlideChange={(swiper) => {
                            setActiveIndex(swiper.activeIndex);
                            categorySwiperRef.current?.slideTo(swiper.activeIndex);
                        }}
                    >
                        {
                            productsArr.map((products, index) => <SwiperSlide key={index} >
                                {
                                    !products.length ?
                                        <NoDataMsg group='shared' variable='noFoodFound' className='min-h-20 lg:min-h-40 xl:min-h-56' /> :
                                        <div className="flex flex-col gap-2">
                                            {
                                                products.map(product => <FoodCart product={product} key={product?.id} />)
                                            }
                                        </div>
                                }
                                {/* <div className="min-h-40 w-full mx-10 bg-slate-500 flex items-center justify-center">
                                    <h2>{index}</h2>
                                </div> */}
                            </SwiperSlide>)
                        }
                    </Swiper>
                </Container>
            </section>

        </>
    )
}
