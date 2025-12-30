'use client';
import { ShoppingCart, X } from 'lucide-react';
import { CartCard } from '../cards/CartCard';
import { Drawer, DrawerClose, DrawerContent } from '@/components/ui/drawer';
import { DialogTitle } from '@radix-ui/react-dialog';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { SET_EXPAND } from '@/redux/features/actions/actionSlice';

export function CartSheet() {
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state: RootState) => state.productSlice);
  const { EXPAND } = useSelector((state: RootState) => state.actions);
  const openCart = EXPAND === "CART_SHEET";
  return (
    <>
      <button onClick={() => dispatch(SET_EXPAND('CART_SHEET'))} className='relative'>
        <ShoppingCart fill='white' className='text-white h-6 w-6 cursor-pointer' />
        {
          cartProducts.length > 0 ?
            <span className='flex items-center justify-center text-xs px-0.5 min-w-[18px] min-h-4  absolute -top-[40%] left-[80%] translate-x-[-50%] bg-secondary text-white rounded-full p-[1px]'>{cartProducts.length}</span> : <></>
        }
      </button>
      <Drawer open={openCart} direction="right" >
        <DrawerContent hideOverlay={true} className="prevent-body-trigger z-[9999] max-w-[500px] top-[5%] lg:top-[15%] dark:shadow-amber-50 right-0 max-h-[90%] lg:max-h-[70%] rounded-md lg:rounded-lg " >
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex items-center gap-5 py-5 px-4 bg-primary">
              <DialogTitle className="grow flex text-white">
                <span className='fg_fs-lg'>Add To Cart ({cartProducts.length})</span>
              </DialogTitle>

              <div className="w-full max-w-6">
                <button onClick={() => dispatch(SET_EXPAND(null))} className='bg-secondary p-1 rounded-full' >
                  <X className="text-white w-5 md:w-6 md:h-6 h-5" />
                </button>
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
    </>
  );
}
