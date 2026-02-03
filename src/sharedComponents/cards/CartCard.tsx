'use client';
import { Button } from '@/components/ui/button';
import useFormatPrice from '@/hooks/useFormatPrice';
import useRenderText from '@/hooks/useRenderText';
import { calculateSubtotal, getDiscountPrice, getImage, getSellingPrice, getTranslationReadyText } from '@/lib/utils';
import { updateCartProduct } from '@/redux/features/product/productSlice';
import { TCartProduct } from '@/types/types';
import { Minus, Plus } from 'lucide-react';
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
    <div className='w-full flex gap-2 bg-clr-card  overflow-hidden rounded-md border-slate-300 dark:border-slate-600 border group mb-2'>
      <div className="relative p-1 flex items-center justify-center">
        <div className="w-full h-full max-w-[60px] max-h-[50px] overflow-hidden rounded-md">
          <Image src={item?.img ? getImage(item?.img) : "/images/shared/food-placeholder.jpg"} className='z-10 w-full duration-300 group-hover:scale-105 h-full' width={300} height={400} alt={en} />
        </div>
      </div>
      <div className='flex flex-col grow p-1 pr-2 bg-clr-card'>
        <h3 className='line-clamp-2 break-words fg_fs-xs text-primary leading-tight font-medium'>
          {renderText(en, bn)}</h3>
        <div className="w-full flex gap-2 items-center justify-between">
          <div className="flex flex-col">
            <p><span className='text-xs rounded-[6px] font-medium text-secondary'>{item?.name}</span></p>
            <p className='fg_fs-xxs  text-left grow dark:!text-black'>{item.discount < 1 ? formatPrice(item?.price) : getDiscountPrice(item?.price || 0, item?.discount || 0)}</p>
          </div>
          <div className='flex w-[60%] items-center gap-4 justify-between'>
            <div className='flex items-center gap-1 rounded-md py-0.5'>
              <Button
                variant='primary'
                size='icon'
                className='h-6 w-6 !rounded-full'
                onClick={() => handleQuantityChange(item.quantity - 1)}
              >
                <Minus className='' />
              </Button>
              <span className='rounded-[4px] text-[13px] px-2 font-semibold inline-block text-center text-xs'>{item.quantity}</span>
              <Button
                variant='primary'
                size='icon'
                className='h-6 w-6 !rounded-full'
                onClick={() => handleQuantityChange(item.quantity + 1)}
              >
                <Plus className='' />
              </Button>
            </div>
            <p className='text-[13px] text-primary font-semibold text-right grow dark:!text-black'>{formatPrice(calculateSubtotal(getSellingPrice(item?.price || 0, item?.discount || 0), item.quantity))}</p>
          </div>
        </div>


        {/* <div className="flex items-center gap-2 justify-between">
          <div className="flex flex-col items-start">


          </div>
          <Button
            variant='secondary'
            size='icon'
            className='prevent-body-trigger p-1 h-5.5 w-5.5 rounded-full shadow-sm'
            onClick={() => dispatch(removeCartProduct(item.id))}
          >
            <Trash2 className='text-white  h-3 w-3' />
          </Button>
        </div> */}

      </div>
    </div>
  );
}
