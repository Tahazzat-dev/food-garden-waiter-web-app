"use client"

import { setHomeActiveCategoryId } from "@/redux/features/category/categorySlice"
import { RootState } from "@/redux/store"
import { TCategory } from "@/types/types"
import clsx from "clsx"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import useRenderText from "@/hooks/useRenderText"
import Image from "next/image"
import { getImage, getTranslationReadyText } from "@/lib/utils"

type Props = {
  isIndex: boolean;
  item: TCategory;
}

export default function Category({ isIndex, item }: Props) {
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