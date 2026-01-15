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

// static variables
const TOP_PROUDUCT_IDS: number[] = [41, 107, 138, 37, 36, 64, 67, 79, 96, 1, 19, 43, 44, 45, 75, 77];

export default function FilterFood({ className = '' }: { className?: string }) {
    // hooks
    const { homeActiveCategoryId } = useSelector((state: RootState) => state.categorySlice)
    const { allProducts } = useSelector((state: RootState) => state.productSlice)
    const [topProducts, setTopProducts] = useState<TProduct[]>([]);
    const [products, setProducts] = useState<TProduct[]>([])
    const [loadProducts, { isLoading }] = useLazyGetCategoryProductsQuery()

    useEffect(() => {
        const loadData = async () => {
            if (!allProducts.length) {
                setProducts([]);
                return;
            }
            if (homeActiveCategoryId == 0) {
                setProducts(topProducts);
            } else {
                const filteredData = allProducts.filter(item => item.category_id === homeActiveCategoryId)
                if (filteredData?.length) {
                    setProducts(filteredData);
                } else {
                    setProducts([]);
                }
            }
        }
        loadData()
    }, [homeActiveCategoryId, loadProducts, allProducts, topProducts])

    useEffect(() => {
        if (!allProducts?.length) return;

        const indexMap = new Map<number, number>(
            TOP_PROUDUCT_IDS.map((id, index) => [id, index])
        );

        const products = new Array(TOP_PROUDUCT_IDS.length);

        allProducts.forEach((p) => {
            const idx = indexMap.get(p.id);
            if (idx !== undefined) {
                products[idx] = p;
            }
        });

        // remove empty slots
        setTopProducts(products.filter(Boolean));
    }, [allProducts]);

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
