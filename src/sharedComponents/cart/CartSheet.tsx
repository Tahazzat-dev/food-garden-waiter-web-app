'use client';
import { ShoppingCart, X } from 'lucide-react';
import { CartCard } from '../cards/CartCard';
import { cartDemoData, CartItem } from '@/lib/demo-data';
import { useState } from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { DialogTitle } from '@radix-ui/react-dialog';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export function CartSheet() {
  const { cartProducts } = useSelector((state: RootState) => state.productSlice);

  // const handleQuantityChange = (id: number, quantity: number) => {
  //   setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity } : item)));
  // };

  // const handleRemove = (id: number) => {
  //   setCartItems((items) => items.filter((item) => item.id !== id));
  // };



  return (
    <Drawer direction="right" >
      <DrawerTrigger asChild>
        <div className='relative'>
          <ShoppingCart fill='white' className='text-white h-6 w-6 cursor-pointer' />
          {
            cartProducts.length > 0 ?
              <span className='flex items-center justify-center text-xs px-0.5 min-w-4 min-h-4  absolute -top-[40%] left-[80%] translate-x-[-50%] bg-secondary text-white rounded-full p-[1px]'>{cartProducts.length}</span> : <></>
          }
        </div>
      </DrawerTrigger>
      <DrawerContent hideOverlay={true} className="z-[9999] max-w-[500px] top-[5%] lg:top-[15%] dark:shadow-amber-50 right-0 max-h-[90%] lg:max-h-[70%] rounded-md lg:rounded-lg " >
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex items-center gap-5 py-5 px-4 bg-primary">
            <DialogTitle className="grow flex text-white">
              <span className='fg_fs-lg'>Add To Cart ({cartProducts.length})</span>
            </DialogTitle>

            <div className="w-full max-w-6">
              <DrawerClose className='bg-secondary p-1 rounded-full' >
                <X className="text-white w-5 md:w-6 md:h-6 h-5" />
              </DrawerClose>
            </div>
          </div>
          <div className="w-full h-full grow px-4 overflow-y-auto py-4 dark:border-l dark:border-slate-700">
            {cartProducts.map((item) => (
              <CartCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
          <div className="w-full">
            <div className="w-full flex justify-between gap-4 flex-wrap px-4 bg-black dark:bg-white clr-opposite py-2 ">
              <p>Total Bill</p>
              <p className='font-semibold'>{cartProducts.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}/-</p>
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
