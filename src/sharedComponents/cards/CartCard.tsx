'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  vendor: string;
  inStock: boolean;
}

interface CartCardProps {
  item: CartItem;
  variant?: 'default' | 'compact';
  onQuantityChange?: (id: number, quantity: number) => void;
  onRemove?: (id: number) => void;
}

export function CartCard({ item, onQuantityChange, onRemove }: CartCardProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    onQuantityChange?.(item.id, newQuantity);
  };

  const subtotal = item.price * quantity;

  return (
    <div className='flex gap-3 pb-3 border-b border-dashed mb-3'>
      <div className='bg-muted relative h-18 w-18 flex-shrink-0 overflow-hidden rounded-md'>
        <Image
          src={item.image || '/placeholder.svg'}
          alt={item.name}
          fill
          className='object-cover'
        />
      </div>

      <div className='flex gap-1 flex-col flex-grow'>
        <div className="flex items-center gap-2 justify-between">
          <div className="flex flex-col">
            <h3 className='line-clamp-2 fg_fs-xs text-primary leading-tight font-medium'>{item.name}</h3>
            <p className='text-muted-foreground fg_fs-xs text-primary font-medium'>{item.vendor}</p>
          </div>
          <Button
            variant='secondary'
            size='icon'
            className='p-1 h-6 w-6 rounded-full shadow-sm'
            onClick={() => onRemove?.(item.id)}
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
              onClick={() => handleQuantityChange(quantity - 1)}
            >
              <Minus className='h-3 w-3' />
            </Button>
            <span className='rounded-[4px] fg_fs-xs py-0.5 bg-white dark:!text-black px-4 inline-block text-center text-xs'>{quantity}</span>
            <Button
              variant='primary'
              size='icon'
              className='h-6 w-6 !rounded-full'
              onClick={() => handleQuantityChange(quantity + 1)}
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
