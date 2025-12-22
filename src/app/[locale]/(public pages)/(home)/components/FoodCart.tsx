import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TProduct } from '@/types/demoData'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CartButton from './CartButton'

export default function FoodCart({ product }: { product: TProduct }) {
    const discountedPrice = product.price - (product.price * product.discount) / 100;
    return (
        <>
            <Card className='overflow-hidden shadow-2xl !border-slate-300 dark:!border-slate-600 group z-0'>
                <div className="w-full relative h-[200px] ">
                    <CartButton productId={product.id} />
                    <div className="w-full h-full overflow-hidden">
                        <Image src={product?.img} className='z-10 w-full duration-300 group-hover:scale-105 h-full' width={300} height={400} alt="" />
                    </div>
                    {
                        !!product?.discount && <span className='absolute fg_fs-xxs  top-2 right-2 bg-secondary text-white px-2 py-1 rounded-md'>
                            {product?.discount}% Off
                        </span>
                    }

                </div>

                <div className="w-full p-4">
                    <h6 className='mb-1'>{product?.title}</h6>
                    <p className='fg_fs-sm'>{product.discount < 1 ? <span className=''>{product?.price}TK</span> : <span className='flex items-center gap-3'> <span className='line-through fg_fs-xs'>{product?.price}TK</span> <span className='text-primary'>{discountedPrice}TK</span></span>}</p>
                    <Button className='w-full mt-2 font-semibold hover:bg-secondary' ><ShoppingCart /> <span>Add To Cart</span></Button>
                </div>
            </Card>
        </>
    )
}
