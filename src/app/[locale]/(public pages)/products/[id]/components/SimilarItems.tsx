import Container from '@/sharedComponents/wrapper/Container'
import FoodCart from '../../../(home)/components/FoodCart'
import { TProduct } from '@/types/types'
import { useTranslations } from 'next-intl'
export default function SimilarItems({ items }: { items: TProduct[] }) {
    const t = useTranslations('shared')
    return (
        <div className='mt-12 md:mt-14 lg:mt-16 xl:mt-20'>
            <Container className="w-full">
                <h5 className='mb-4 md:mb-5'>{t("similarItems")}</h5>
                <div className="w-full grid gap-2.5 sm:gap-4 grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                    {
                        items.map(product => <FoodCart product={product} key={product?.id} />)
                    }
                </div>
            </Container>
        </div>
    )
}
