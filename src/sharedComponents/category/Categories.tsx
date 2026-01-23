"use client"

import { setHomeActiveCategoryId } from "@/redux/features/category/categorySlice"
import { RootState } from "@/redux/store"
import { TCategory } from "@/types/types"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useRenderText from "@/hooks/useRenderText"
import Image from "next/image"
import { cn, getImage, getTranslationReadyText } from "@/lib/utils"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react"

type Props = {
  isIndex: boolean;
  item: TCategory;
}

function Category({ isIndex, item }: Props) {
  // hooks
  const dispatch = useDispatch()
  const { renderText } = useRenderText()
  const { homeActiveCategoryId } = useSelector((state: RootState) => state.categorySlice)

  // handlers
  const handleSelectCategory = (categoryId: number) => {
    dispatch(setHomeActiveCategoryId(categoryId))
  }

  // initial setup
  useEffect(() => {
    if (isIndex) {
      dispatch(setHomeActiveCategoryId(item.id))
    }
  }, [dispatch, isIndex, item])

  // TODO: temp_
  const { en, bn } = getTranslationReadyText(item.name)
  return (
    <button
      className='rounded-[6px] custom-shadow-card-sm w-[80px] min-w-[80px] h-[80px] lg:w-[120px] lg:min-w-[120px] lg:h-[120px] grow group group block overflow-hidden z-30 relative'
      onClick={() => handleSelectCategory(item.id)}
    >
      {/* <Image className='object-cover w-full duration-300 group-hover:scale-105 ' src={item.img} width={300} height={400} alt={item.name.en} /> */}
      {/* TODO: temp_ */}
      <Image className='object-cover w-full h-full duration-300 group-hover:scale-105 ' src={item.id == 0 ? item.image.link : getImage(item?.image?.link)} width={300} height={400} alt={en} />
      <span className={clsx("text-[13px] md:text-[14px] lg:text-[15px] duration-300 text-center font-semibold absolute bg-slate-800/30 py-1 backdrop-blur-sm block w-full text-white z-30 left-0 bottom-0",
        homeActiveCategoryId === item.id ? '!bg-secondary' : 'group-hover:bg-secondary '
      )}>
        {/* {renderText(item.name.en, item.name.bn)} */}

        {/* TODO: temp_ */}
        {renderText(en, bn)}
      </span>
    </button>
  )
}


export default function Categories({ categories = [] }: { categories: TCategory[] }) {
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const allCategory: TCategory = {
    id: 0,
    image: { link: '/images/shared/all-category.png' },
    name: "সেরা / Top",
    slug: "all-categories"
  }

  return <div style={{ position: "relative", width: "100%" }}>
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={12}
      slidesPerView="auto"
      navigation={{
        nextEl: ".swiper-button-next-custom",
        prevEl: ".swiper-button-prev-custom",
      }}
      onSwiper={(swiper) => {
        setIsBeginning(swiper.isBeginning)
        setIsEnd(swiper.isEnd)
      }}
      onSlideChange={(swiper) => {
        setIsBeginning(swiper.isBeginning)
        setIsEnd(swiper.isEnd)
      }}
      autoplay={true}
      grabCursor={true}
    >
      <SwiperSlide
        key='00000'
        className="z-0 !w-[80px] !min-w-[80px] !h-[80px] lg:!w-[120px] lg:!min-w-[120px] lg:!h-[120px]"
      >
        <Category isIndex={true} item={allCategory} key="ALL_CATEGORY_DEFAULT" />
      </SwiperSlide>
      {categories.map((category) => (
        <SwiperSlide
          className="z-0 !w-[80px] !min-w-[80px] !h-[80px] lg:!w-[120px] lg:!min-w-[120px] lg:!h-[120px]"
          key={category.id}
        >
          <Category isIndex={false} item={category} key={category.id} />
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
}