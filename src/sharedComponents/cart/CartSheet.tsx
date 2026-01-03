'use client';
import { ShoppingCart, X } from 'lucide-react';
import { CartCard } from '../cards/CartCard';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { SET_EXPAND } from '@/redux/features/actions/actionSlice';
import { CustomDrawer } from '../modal/CustomDrawer';

export function CartSheet() {
  // variables
  const KEY = "CART_SHEET"

  // hooks
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state: RootState) => state.productSlice);
  const { EXPAND } = useSelector((state: RootState) => state.actions);
  const openCart = EXPAND === KEY;
  return (
    <>
      <button onClick={() => dispatch(SET_EXPAND(EXPAND === KEY ? null : KEY))} className='prevent-body-trigger relative'>
        <ShoppingCart fill='white' className='text-white h-6 w-6 cursor-pointer' />
        {
          cartProducts.length > 0 ?
            <span className='flex items-center justify-center text-xs px-0.5 min-w-[18px] min-h-4  absolute -top-[40%] left-[80%] translate-x-[-50%] bg-secondary text-white rounded-full p-[1px]'>{cartProducts.length}</span> : <></>
        }
      </button>

      {/* <CustomDrawer
        open={openCart}
      >
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex items-center gap-5 py-3 px-4 bg-primary">
            <h3 className="grow flex text-white">
              <span className='fg_fs-lg'>Add To Cart ({cartProducts.length})</span>
            </h3>

            <div className="w-full max-w-6">
              <button onClick={() => dispatch(SET_EXPAND(null))} className='bg-secondary p-1 rounded-full' >
                <X className="text-white w-5 md:w-6 md:h-6 h-5" />
              </button>
            </div>
          </div>
          <div className="w-full h-full grow px-2.5 sm:px-4 overflow-y-auto py-4 dark:border-l dark:border-slate-700">
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
            <button onClick={() => dispatch(SET_EXPAND("CHECKOUT_MODAL"))} className="bg-primary fg_fs-md py-3 !text-white font-semibold !rounded-0 w-full">
              Checkout
            </button>
          </div>
        </div>
      </CustomDrawer> */}
    </>
  );
}
