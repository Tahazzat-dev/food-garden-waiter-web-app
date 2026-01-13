"use client"
import Container from '@/sharedComponents/wrapper/Container'
import FoodCart from './FoodCart'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useLazyGetCategoryProductsQuery } from '@/redux/features/product/productApiSlice'
import { TProduct } from '@/types/types'
import NoDataMsg from '@/sharedComponents/shared/NoDataMsg'
import LoadingSpinner from '@/sharedComponents/loading/LoadingSpinner'
import BoxSpace from '@/sharedComponents/shared/BoxSpace'

export default function FilterFood({ className = '' }: { className?: string }) {
    // hooks
    const { homeActiveCategoryId } = useSelector((state: RootState) => state.categorySlice)
    const { allProducts } = useSelector((state: RootState) => state.productSlice)
    const [products, setProducts] = useState<TProduct[]>([])
    const [loadProducts, { isLoading }] = useLazyGetCategoryProductsQuery()

    useEffect(() => {
        const loadData = async () => {
            if (!allProducts.length) {
                setProducts([]);
                return;
            }
            const filteredData = homeActiveCategoryId == 0 ? allProducts.slice(0, 15) : allProducts.filter(item => item.category_id === homeActiveCategoryId)
            if (filteredData?.length) {
                setProducts(filteredData);
            } else {
                setProducts([]);
            }
        }
        loadData()
    }, [homeActiveCategoryId, loadProducts, allProducts])


    console.log(homeActiveCategoryId, "homeActiveCategoryId")
    return (
        <section className={cn("mb-4", className)}>
            <Container>
                {
                    isLoading ?
                        <BoxSpace className='min-h-20 lg:min-h-40 xl:min-h-56'>
                            <LoadingSpinner />
                        </BoxSpace>
                        :
                        !products.length ?
                            <NoDataMsg group='shared' variable='noFoodFound' className='min-h-20 lg:min-h-40 xl:min-h-56' />
                            :
                            <div className="grid gap-2.5 sm:gap-4 grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                                {
                                    products.map(product => <FoodCart product={product} key={product?.id} />)
                                }
                            </div>
                }
            </Container>
        </section>
    )
}
