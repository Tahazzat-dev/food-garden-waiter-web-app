'use client';
import Image from 'next/image';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TCartProduct } from '@/types/types';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartProduct, updateCartProduct } from '@/redux/features/product/productSlice';
import { RootState } from '@/redux/store';

export function CartCard({ item }: { item: TCartProduct }) {
  const dispatch = useDispatch();
  const { locale } = useSelector((state: RootState) => state.locale);
  // handlers
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    // Update the quantity in the Redux store
    const updateProduct = { ...item, quantity: newQuantity };
    dispatch(updateCartProduct({ product: updateProduct, id: item.id }));
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className='flex gap-3 pb-3 border-b border-dashed mb-3'>
      <div className='bg-muted relative min-h-14 min-w-14 md:min-w-16 md:min-h-16 flex-shrink-0 overflow-hidden rounded-md'>
        <Image
          src={item.img || '/images/placeholder/placeholder.jpg'}
          alt={locale === "bn" ? item.title.bn : item.title.en || 'Product Image'}
          width={72}
          height={72}
          className='object-cover w-full h-full'
        />
      </div>

      <div className='flex gap-1 flex-col flex-grow max-w-[300px]'>
        <div className="flex items-center gap-2 justify-between">
          <div className="flex flex-col">
            <h3 className='line-clamp-2 fg_fs-xs text-primary leading-tight font-medium'>{locale === "bn" ? item.title.bn : item.title.en}</h3>
            <p className='text-muted-foreground fg_fs-xs text-primary font-medium'>{locale === "bn" ? item.title.bn : item.title.en}</p>
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
          <p className='fg_fs-xs font-semibold text-center grow dark:!text-black'>{item.price.toFixed(2)}/-</p>
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
          <p className='fg_fs-sm font-semibold text-center grow dark:!text-black'>{subtotal.toFixed(2)}/-</p>
        </div>
      </div>
    </div>
  );
}
