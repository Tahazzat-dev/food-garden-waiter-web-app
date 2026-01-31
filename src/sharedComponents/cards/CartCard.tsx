'use client';
import { Button } from '@/components/ui/button';
import useFormatPrice from '@/hooks/useFormatPrice';
import useRenderText from '@/hooks/useRenderText';
import { calculateSubtotal, getDiscountPrice, getImage, getSellingPrice, getTranslationReadyText } from '@/lib/utils';
import { removeCartProduct, updateCartProduct } from '@/redux/features/product/productSlice';
import { TCartProduct } from '@/types/types';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

export function CartCard({ item }: { item: TCartProduct }) {
  // hooks
  const { formatPrice } = useFormatPrice()
  const dispatch = useDispatch();
  const { renderText } = useRenderText()

  // handlers
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;

    // Update the quantity in the Redux store
    const updateProduct = { ...item, quantity: newQuantity };
    dispatch(updateCartProduct({ product: updateProduct, id: item.id }));
  };

  const { en, bn } = getTranslationReadyText(item.title)

  return (
    <div className='w-full flex gap-2 bg-clr-card overflow-hidden custom-shadow-md group mb-2'>
      <div className="relative p-1 flex items-center justify-center">
        <div className="w-full h-full max-w-[70px] max-h-[60px] overflow-hidden rounded-md">
          <Image src={item?.img ? getImage(item?.img) : "/images/shared/food-placeholder.jpg"} className='z-10 w-full duration-300 group-hover:scale-105 h-full' width={300} height={400} alt={en} />
        </div>
      </div>
      <div className='flex gap-1 flex-col grow p-1 pr-2 bg-clr-card'>
        <div className="flex items-center gap-2 justify-between">
          <div className="flex flex-col items-start">
            <h3 className='line-clamp-2 break-words fg_fs-sm text-primary leading-tight font-medium'>
              {renderText(en, bn)} - <span className='px-2 rounded-[6px] font-medium text-secondary'>{item?.name}</span></h3>
          </div>
          <Button
            variant='secondary'
            size='icon'
            className='prevent-body-trigger p-1 h-5.5 w-5.5 rounded-full shadow-sm'
            onClick={() => dispatch(removeCartProduct(item.id))}
          >
            <Trash2 className='text-white  h-3 w-3' />
          </Button>
        </div>
        <div className='mt-auto py-0.5 flex items-center justify-between bg-slate-200 px-2.5 rounded-[4px]'>
          <p className='fg_fs-xs font-semibold  text-left grow dark:!text-black'>{item.discount < 1 ? formatPrice(item?.price) : getDiscountPrice(item?.price || 0, item?.discount || 0)}</p>
          <div className='flex items-center   gap-3 rounded-md py-0.5'>
            <Button
              variant='primary'
              size='icon'
              className='h-5 w-5 !rounded-full'
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              <Minus className='' />
            </Button>
            <span className='rounded-[4px] fg_fs-xs py-0.5 bg-white dark:!text-black px-4 inline-block text-center text-xs'>{item.quantity}</span>
            <Button
              variant='primary'
              size='icon'
              className='h-5 w-5 !rounded-full'
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus className='' />
            </Button>
          </div>
          <p className='fg_fs-xs font-semibold text-right grow dark:!text-black'>{formatPrice(calculateSubtotal(getSellingPrice(item?.price || 0, item?.discount || 0), item.quantity))}</p>
        </div>
      </div>
    </div>
  );
}
