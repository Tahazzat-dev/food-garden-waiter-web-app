'use client';
import { ShoppingCart, X } from 'lucide-react';
import { CartCard } from '../cards/CartCard';
import { cartDemoData, CartItem } from '@/lib/demo-data';
import { useState } from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { DialogTitle } from '@radix-ui/react-dialog';

export function CartSheet() {
  const [cartItems, setCartItems] = useState<CartItem[]>(cartDemoData);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const handleRemove = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <Drawer direction="right" >
      <DrawerTrigger asChild>
        <div className='relative'>
          <ShoppingCart fill='white' className='text-white h-6 w-6 cursor-pointer' />
          <span className='flex items-center justify-center text-xs px-0.5 min-w-4.5 min-h-4.5  absolute -top-[40%] left-[80%] translate-x-[-50%] bg-secondary text-white rounded-full p-[1px]'>2</span>
        </div>

      </DrawerTrigger>
      <DrawerContent hideOverlay={true} className="z-9999 shadow-2xl dark:shadow-amber-50 right-0 max-h-[90%] lg:max-h-[70%] top-[50%] rounded-md lg:rounded-lg -translate-y-[50%]" >
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex items-center gap-5 py-5 px-4 bg-primary">
            <DialogTitle className="grow flex text-white">
              <span className='fg_fs-lg'>Add To Cart (3)</span>
            </DialogTitle>

            <div className="w-full max-w-6">
              <DrawerClose className='bg-secondary p-1 rounded-full' >
                <X className="text-white w-5 md:w-6 md:h-6 h-5" />
              </DrawerClose>
            </div>
          </div>
          <div className="w-full h-full grow px-4 overflow-y-auto py-4 dark:border-l dark:border-slate-700">
            {cartItems.map((item) => (
              <CartCard
                key={item.id}
                item={item}
                variant='compact'
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
            ))}
          </div>
          <div className="w-full">
            <div className="w-full flex justify-between gap-4 flex-wrap px-4 bg-black text-white dark:bg-white clr-opposite py-2 ">
              <p>Total Bill</p>
              <p className='font-semibold'>1,600/-</p>
            </div>
            <button className="bg-primary fg_fs-md py-3 !text-white font-semibold !rounded-0 w-full">
              Checkout
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
