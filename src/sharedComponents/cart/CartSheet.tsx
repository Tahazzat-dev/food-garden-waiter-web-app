'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ShoppingCart, X } from 'lucide-react';
import { CartCard } from '../cards/CartCard';
import { cartDemoData, CartItem } from '@/lib/demo-data';
import { useState } from 'react';
import Link from 'next/link';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import Image from 'next/image';

export function CartSheet() {
  const [cartItems, setCartItems] = useState<CartItem[]>(cartDemoData);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const handleRemove = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    // <Drawer direction="right" >
    //   <DrawerTrigger asChild>
    //     <Button className="!px-2 !h-auto !border-0" >
    //       <ShoppingCart fill='white' className='text-white h-6 w-6 cursor-pointer' />
    //     </Button>
    //   </DrawerTrigger>
    //   <DrawerContent className="z-[9999] max-h-[90%] lg:max-h-[70%] top-[50%] rounded-md lg:rounded-lg -translate-y-[50%] border le right-0" >
    //     <div className="w-full h-full p-5 pt-2">
    //       <div className="w-full flex items-center gap-5 mb-4">
    //         <div className="grow flex">
    //           {/* <SiteLogo /> */}
    //           <Image className='w-full fill-black text-black min-w-[140px] lg:min-w-[160px] max-w-[160px] h-auto' width={190} height={42} src="/images/shared/site-logo-black.svg" alt="Site logo" />
    //         </div>

    //         <div className="w-full max-w-6">
    //           <DrawerClose>
    //             <X className=" w-5 md:w-6 md:h-6 h-5" />
    //           </DrawerClose>
    //         </div>
    //       </div>
    //       <div className="w-full h-full">
    //         <div className='mt-4 space-y-4'>
    //           {cartItems.map((item) => (
    //             <CartCard
    //               key={item.id}
    //               item={item}
    //               variant='compact'
    //               onQuantityChange={handleQuantityChange}
    //               onRemove={handleRemove}
    //             />
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </DrawerContent>
    // </Drawer>
    <Sheet >
      <SheetTrigger className='relative' asChild>
        <div className='relative'>
          <ShoppingCart fill='white' className='text-white h-6 w-6 cursor-pointer' />
          <span className='flex items-center justify-center text-xs px-0.5 min-w-[18px] min-h-[18px]  absolute -top-[45%] left-[50%] translate-x-[-50%] bg-secondary text-white rounded-full p-[1px]'>2</span>
        </div>

        {/* <span>1</span> */}
      </SheetTrigger>
      <SheetContent hideOverlay className='z-[9999] max-h-[90%] lg:max-h-[70%] top-[50%] rounded-md lg:rounded-lg -translate-y-[50%] border'>
        <SheetHeader className='cd-border-primary border-b pb-2'>
          <SheetTitle className='!text-xl font-semibold'>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className='mt-4 space-y-4'>
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
        <SheetFooter className='cd-border-primary mt-4 grid grid-cols-2 gap-2 border-t pt-4'>
          <SheetClose asChild>
            <Link href={'/cart'} className='block'>
              <Button variant={'outline'} className='w-full'>
                View Cart
              </Button>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Button>Checkout</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
