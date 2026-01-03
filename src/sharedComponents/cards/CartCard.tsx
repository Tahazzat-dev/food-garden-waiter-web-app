'use client';
import Image from 'next/image';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TCartProduct } from '@/types/types';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartProduct, updateCartProduct } from '@/redux/features/product/productSlice';
import { RootState } from '@/redux/store';
import useFormatPrice from '@/hooks/useFormatPrice';
import { calculateSubtotal, getDiscountPrice, getSellingPrice } from '@/lib/utils';

export function CartCard({ item }: { item: TCartProduct }) {
  // hooks
  const { formatPrice } = useFormatPrice()
  const dispatch = useDispatch();
  const { locale } = useSelector((state: RootState) => state.locale);

  // handlers
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;

    // Update the quantity in the Redux store
    const updateProduct = { ...item, quantity: newQuantity };
    dispatch(updateCartProduct({ product: updateProduct, id: item.id }));
  };

  return (
    <div className='flex gap-2.5 sm:gap-3 pb-3 border-b border-slate-300 dark:border-slate-600 border-dashed mb-5'>
      <div className='bg-muted relative h-16 w-16 md:min-w-16 md:min-h-16 flex-shrink-0 overflow-hidden rounded-md'>
        <Image
          src={item.img || '/images/placeholder/placeholder.jpg'}
          alt={locale === "bn" ? item?.name?.bn : item?.name?.en || 'Product Image'}
          width={72}
          height={72}
          className='object-cover w-full h-full'
        />
      </div>

      <div className='flex gap-1 flex-col flex-grow max-w-[300px]'>
        <div className="flex items-center gap-2 justify-between">
          <div className="flex flex-col items-start">
            <h3 className='line-clamp-2 fg_fs-xs text-primary leading-tight font-medium'>{locale === "bn" ? item?.title?.bn : item?.title?.en}
              {" - "}
              {locale === "bn" ? item?.name?.bn || "" : item?.name?.en || ""}</h3>
            <p className='text-muted-foreground px-2 my-1 rounded-[4px] fg_fs-xs font-medium bg-secondary text-white inline'>{locale === "bn" ? item.name.bn : item.name.en}</p>
          </div>
          <Button
            variant='secondary'
            size='icon'
            className='prevent-body-trigger p-1 h-6 w-6 rounded-full shadow-sm'
            onClick={() => dispatch(removeCartProduct(item.id))}
          >
            <Trash2 className='text-white  h-3 w-3' />
          </Button>
        </div>
        <div className='mt-auto flex items-center justify-between bg-slate-200 px-2 py-0.5 rounded-[4px]'>
          <p className='fg_fs-xs font-semibold text-center grow dark:!text-black'>{item.discount < 1 ? formatPrice(item?.price) : getDiscountPrice(item?.price || 0, item?.discount || 0)}/-</p>
          <div className='flex items-center gap-1 lg:gap-2 rounded-md py-0.5'>
            <Button
              variant='primary'
              size='icon'
              className='h-6 w-6 !rounded-full'
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              <Minus className='h-3 w-3' />
            </Button>
            <span className='rounded-[4px] fg_fs-xs py-0.5 bg-white dark:!text-black px-4 inline-block text-center text-xs'>{item.quantity}</span>
            <Button
              variant='primary'
              size='icon'
              className='h-6 w-6 !rounded-full'
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus className='h-3 w-3' />
            </Button>
          </div>
          <p className='fg_fs-sm font-semibold text-center grow dark:!text-black'>{calculateSubtotal(getSellingPrice(item?.price || 0, item?.discount || 0), item.quantity)}/-</p>
        </div>
      </div>
    </div>
  );
}
