import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TProduct } from '@/types/demoData'
import { Eye, HeartIcon, Info, ShoppingCart, View } from 'lucide-react'
import Image from 'next/image'
import { MouseEvent, useState } from 'react'
import { FoodModal } from './FoodModal'
import { useDispatch, useSelector } from 'react-redux'
import { addCartProduct } from '@/redux/features/product/productSlice'
import { RootState } from '@/redux/store'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { EyeIcon } from '@/sharedComponents/icons/Icons'

export default function FoodCart({ product }: { product: TProduct }) {
    const dispatch = useDispatch()
    const t = useTranslations('shared');
    const discountedPrice = product.price - (product.price * product.discount) / 100;
    const [openModal, setOpenModal] = useState(false);
    const { cartProducts } = useSelector((state: RootState) => state.productSlice)
    const { locale } = useSelector((state: RootState) => state.locale)

    const isAddedToCart = cartProducts.some(item => item.id === product.id);
    // handlers
    const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        // Add your add to cart logic here
        dispatch(addCartProduct({ ...product, quantity: 1 }));

    }

    // handlers
    const openDetailsModal = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        if (isAddedToCart) return;
        setOpenModal(true)
    }

    const handleFavourite = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
    }


    return (
        <>
            <div className='custom-shadow-card overflow-hidden shadow-2xl !border-none group z-0'>
                <div className="w-full relative h-[150px] sm:h-[200px]">
                    <button onClick={handleFavourite} className='hover:scale-105 absolute top-1 md:top-2 left-1 md:left-2 z-20'>
                        <HeartIcon fill='white' className='w-8 h-8 text-secondary' />
                    </button>
                    <div className="w-full h-full overflow-hidden">
                        <Image src={product?.img} className='z-10 w-full duration-300 group-hover:scale-105 h-full' width={300} height={400} alt={locale === "bn" ? product?.title.bn : product?.title.en || 'Product Image'} />
                    </div>
                    <Link className='font-semibold !rounded-full custom-shadow-md bg-primary hover:bg-primary-500 text-white absolute bottom-1 md:bottom-2 right-1 md:right-2 z-20' href={`/products/${product.id}`}>
                        {/* <Info /> */}
                        <Eye />
                    </Link>
                    {
                        !!product?.discount && <span className='absolute fg_fs-xxs  top-2 right-2 bg-secondary text-white px-2 py-1 rounded-md'>
                            {product?.discount}% Off
                        </span>
                    }
                </div>

                <div className="w-full p-3 md:p-4 bg-slate-100 dark:bg-slate-700">
                    <h6 className='mb-1'>{locale === "bn" ? product?.title.bn : product?.title.en}</h6>
                    <p className='fg_fs-sm'>{product.discount < 1 ? <span className=''>{product?.price}TK</span> : <span className='flex items-center gap-3'> <span className='line-through fg_fs-xs'>{product?.price}TK</span> <span className='text-primary'>{discountedPrice}TK</span></span>}</p>

                    <div className="w-full flex gap-3 lg:gap-5 mt-2">
                        {/* <Link href={`/products/${product.id}`} className="text-primary hover:underline">
                            <Button variant="primary" className='md:min-w-10 custom-shadow-md' >
                                <span className='fg_fs-lg'>i</span>
                            </Button>
                        </Link> */}
                        <Button onClick={openDetailsModal} className={`text-white w-full font-semibold  ${isAddedToCart ? ' bg-secondary hover:bg-secondary !cursor-not-allowed' : 'custom-shadow-md  bg-primary hover:bg-primary-500'}`} ><ShoppingCart /> <span>{t('addToCart')}</span></Button>
                    </div>
                </div>
            </div>

            <FoodModal onOpenChange={() => { setOpenModal(false) }} food={product} open={openModal} />
        </>
    )
}
