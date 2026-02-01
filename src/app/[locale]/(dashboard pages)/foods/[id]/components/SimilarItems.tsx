"use client"
import Container from '@/sharedComponents/wrapper/Container'
import FoodCart from '../../../(home)/components/FoodCart'
import { TProduct } from '@/types/types'
import RenderText from '@/sharedComponents/utils/RenderText'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

type Props = {
    productId: number;
    productCategoryId: number;
}
export default function SimilarItems({ productCategoryId, productId }: Props) {
    // hooks
    const { allProducts } = useSelector((state: RootState) => state.productSlice);
    const items: TProduct[] = allProducts.filter(product => product.category_id === productCategoryId && product.id !== productId);
    return (
        <div className='mt-12 md:mt-14 lg:mt-16 '>
            <Container className="w-full">
                <h5 className='mb-4 fg_fs-lg font-semibold'><RenderText group='shared' key="similar_product_section_title" variable='similarItems' /></h5>
                <div className="w-full grid gap-2.5 sm:gap-4 grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                    {
                        items.map(product => <FoodCart product={product} key={product?.id} />)
                    }
                </div>
            </Container>
        </div>
    )
}
