"use client"
import { categoryItems } from '@/lib/demo-data'
import Container from '@/sharedComponents/wrapper/Container'
import Image from 'next/image'
// import Link from 'next/link'
import CategoryName from './CategoryName'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCategories, setHomeActiveCategoryId } from '@/redux/features/category/categorySlice'
import { cn } from '@/lib/utils'

export default function CategorySection({ className }: { className?: string }) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setCategories(categoryItems))
        dispatch(setHomeActiveCategoryId(categoryItems[0].id))
    }, [dispatch])


    // handlers
    const handleSelectCategory = (categoryId: string) => {
        dispatch(setHomeActiveCategoryId(categoryId))
    }
    return (
        <section className={cn("bg-inherit", className)}>
            <div className="w-full pb-1 mb-1">
                <Container className='overflow-x-auto mt-4 lg:mt-1 lg:pt-3 pb-2'>
                    <div className="flex flex-nowrap gap-2">
                        {
                            categoryItems.map(item => <button
                                onClick={() => handleSelectCategory(item.id)}
                                // href={item.slug}
                                className='rounded-[6px] custom-shadow-card-sm min-w-[80px] lg:min-w-[120px] grow group group block overflow-hidden z-30 relative' key={item.id} >
                                <Image className='object-cover w-full duration-300 group-hover:scale-105 ' src={item.img} width={300} height={400} alt="Google add banner" />
                                <CategoryName category={item} />
                            </button>)
                        }
                    </div>
                </Container>
            </div>
        </section>
    )
}
