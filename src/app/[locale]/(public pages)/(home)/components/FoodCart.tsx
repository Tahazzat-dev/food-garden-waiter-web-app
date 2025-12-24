import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TProduct } from '@/types/demoData'
import { HeartIcon, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { MouseEvent, useState } from 'react'
import { FoodModal } from './FoodModal'
import { useDispatch, useSelector } from 'react-redux'
import { addCartProduct } from '@/redux/features/product/productSlice'
import { RootState } from '@/redux/store'

export default function FoodCart({ product }: { product: TProduct }) {
    const dispatch = useDispatch()
    const discountedPrice = product.price - (product.price * product.discount) / 100;
    const [openModal, setOpenModal] = useState(false);
    const { cartProducts } = useSelector((state: RootState) => state.productSlice)
    const { locale } = useSelector((state: RootState) => state.locale)

    // handlers
    const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        // Add your add to cart logic here
        dispatch(addCartProduct({ ...product, quantity: 1 }));

    }

    const handleFavourite = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
    }

    const isAddedToCart = cartProducts.some(item => item.id === product.id);

    return (
        <>
            <Card onClick={() => setOpenModal(true)} className='custom-shadow-card overflow-hidden shadow-2xl !border-none group z-0'>
                <div className="w-full relative h-[220px] sm:h-[200px]">
                    <button onClick={handleFavourite} className='hover:scale-105 absolute top-2 left-2 z-20'>
                        <HeartIcon fill='white' className='w-8 h-8 text-secondary' />
                    </button>
                    <div className="w-full h-full overflow-hidden">
                        <Image src={product?.img} className='z-10 w-full duration-300 group-hover:scale-105 h-full' width={300} height={400} alt={locale === "bn" ? product?.title.bn : product?.title.en || 'Product Image'} />
                    </div>
                    {
                        !!product?.discount && <span className='absolute fg_fs-xxs  top-2 right-2 bg-secondary text-white px-2 py-1 rounded-md'>
                            {product?.discount}% Off
                        </span>
                    }

                </div>

                <div className="w-full p-4 bg-slate-100 dark:bg-slate-700">
                    {/* <h6 className='mb-1'>{locale === "bn" ? product?.title.bn : product?.title.en}</h6> */}
                    <h6 className='mb-1'>{product?.title.bn}</h6>
                    <p className='fg_fs-sm'>{product.discount < 1 ? <span className=''>{product?.price}TK</span> : <span className='flex items-center gap-3'> <span className='line-through fg_fs-xs'>{product?.price}TK</span> <span className='text-primary'>{discountedPrice}TK</span></span>}</p>
                    <Button disabled={isAddedToCart} onClick={handleAddToCart} className='custom-shadow-md text-white w-full mt-2 font-semibold hover:bg-secondary' ><ShoppingCart /> <span>Add To Cart</span></Button>
                </div>
            </Card>

            <FoodModal onOpenChange={() => { setOpenModal(false) }} food={product} open={openModal} />
        </>
    )
}
