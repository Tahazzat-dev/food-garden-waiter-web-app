"use client"
import Container from '@/sharedComponents/wrapper/Container'
import FoodCart from './FoodCart'
import { demoProducts } from '@/lib/demo-data'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { cn } from '@/lib/utils'

export default function FilterFood({ className = '' }: { className?: string }) {
    const { homeActiveCategoryId } = useSelector((state: RootState) => state.categorySlice)
    const filteredFoods = demoProducts.filter(product => product.categoryId === homeActiveCategoryId)
    return (
        <section className={cn("mb-4", className)}>
            <Container className="grid gap-2.5 sm:gap-4 grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                {
                    filteredFoods.map(product => <FoodCart product={product} key={product?.id} />)
                }
            </Container>
        </section>
    )
}
