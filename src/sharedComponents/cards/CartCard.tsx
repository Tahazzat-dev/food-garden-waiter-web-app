'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
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

export function CartCard({ item, variant = 'default', onQuantityChange, onRemove }: CartCardProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    onQuantityChange?.(item.id, newQuantity);
  };

  const subtotal = item.price * quantity;

  if (variant === 'compact') {
    return (
      <Card className='relative p-3 transition-shadow hover:shadow-md'>
        <Button
          variant='ghost'
          size='icon'
          className='bg-background hover:bg-destructive hover:text-destructive-foreground absolute -top-2 -right-2 h-6 w-6 rounded-full shadow-sm'
          onClick={() => onRemove?.(item.id)}
        >
          <X className='h-3 w-3' />
        </Button>

        <div className='flex gap-3'>
          <div className='bg-muted relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md'>
            <Image
              src={item.image || '/placeholder.svg'}
              alt={item.name}
              fill
              className='object-cover'
            />
          </div>

          <div className='flex flex-1 flex-col gap-1'>
            <h3 className='line-clamp-2 !text-sm leading-tight font-medium'>{item.name}</h3>
            <p className='text-muted-foreground !text-xs'>{item.vendor}</p>

            <div className='mt-auto flex items-center justify-between'>
              <div className='flex items-center gap-1 rounded-md border'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-6 w-6'
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  <Minus className='h-3 w-3' />
                </Button>
                <span className='w-6 text-center text-xs'>{quantity}</span>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-6 w-6'
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus className='h-3 w-3' />
                </Button>
              </div>

              <p className='text-sm font-semibold'>${subtotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className='relative grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 border-b py-4 md:gap-6 md:py-6'>
      {/* Remove button */}
      <Button
        variant='ghost'
        size='icon'
        className='bg-background hover:bg-destructive hover:text-destructive-foreground absolute -top-2 -left-2 h-6 w-6 rounded-full shadow-sm md:relative md:top-0 md:left-0'
        onClick={() => onRemove?.(item.id)}
      >
        <X className='h-4 w-4' />
      </Button>

      {/* Product info */}
      <div className='col-span-4 flex items-center gap-4 md:col-span-1'>
        <div className='bg-muted relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md'>
          <Image
            src={item.image || '/placeholder.svg'}
            alt={item.name}
            fill
            className='object-cover'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <h4 className='leading-tight font-medium'>{item.name}</h4>
          <p className='text-muted-foreground !text-sm'>
            <span className='font-medium'>Vendor:</span> {item.vendor}
          </p>
        </div>
      </div>

      {/* Price */}
      <div className='hidden md:block'>
        <p className='font-medium'>${item.price.toFixed(2)}</p>
      </div>

      {/* Quantity */}
      <div className='col-span-2 flex justify-center md:col-span-1'>
        <div className='flex items-center gap-2 rounded-md border'>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8'
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            <Minus className='h-4 w-4' />
          </Button>
          <span className='w-8 text-center'>{quantity}</span>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8'
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            <Plus className='h-4 w-4' />
          </Button>
        </div>
      </div>

      {/* Subtotal */}
      <div className='col-span-2 text-right md:col-span-1'>
        <p className='text-lg font-semibold'>${subtotal.toFixed(2)}</p>
      </div>
    </div>
  );
}
