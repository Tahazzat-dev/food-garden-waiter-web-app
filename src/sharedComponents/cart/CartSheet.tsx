'use client';
import useFormatPrice from '@/hooks/useFormatPrice';
import { calculateSubtotal, cn, getSellingPrice } from '@/lib/utils';
import { SET_EXPAND } from '@/redux/features/actions/actionSlice';
import { RootState } from '@/redux/store';
import { ShoppingCart, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { CartCard } from '../cards/CartCard';
import { CustomDrawer } from '../modal/CustomDrawer';
import RenderText from '../utils/RenderText';

export function CartSheet() {
  // variables
  const KEY = "CART_SHEET"

  // hooks
  const t = useTranslations('shared')
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state: RootState) => state.productSlice);
  const { EXPAND } = useSelector((state: RootState) => state.actions);
  const openCart = EXPAND === KEY;
  const { formatPrice } = useFormatPrice()


  // calculated cart total 
  const totalPrice = cartProducts.reduce((total, item) => total + (calculateSubtotal(getSellingPrice(item.price, item.discount), item.quantity)), 0)
  return (
    <>
      <button onClick={() => dispatch(SET_EXPAND(EXPAND === KEY ? null : KEY))} className='prevent-body-trigger relative'>
        <ShoppingCart fill='white' className='text-white h-6 w-6 cursor-pointer' />
        {
          cartProducts.length > 0 ?
            <span className='flex items-center justify-center text-xs px-0.5 min-w-[18px] min-h-4  absolute -top-[40%] left-[80%] translate-x-[-50%] bg-secondary text-white rounded-full p-[1px]'>{cartProducts.length}</span> : <></>
        }
      </button>

      <CustomDrawer
        className='h-[81%]'
        open={openCart}
      >
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex items-center gap-5 py-3 px-4 bg-primary">
            <h3 className="grow flex items-end gap-2 text-white">
              <span className='fg_fs-lg'><RenderText group='shared' variable='itemList' /> ({cartProducts.length})</span>
              <span className='text-sm text-[#5BFFFF]'>( Table - 5 )</span>
            </h3>

            <div className="w-full max-w-6">
              <button onClick={() => dispatch(SET_EXPAND(null))} className='bg-secondary p-1 rounded-full' >
                <X className="text-white w-5 md:w-6 md:h-6 h-5" />
              </button>
            </div>
          </div>
          <div className="w-full h-full grow px-2.5 sm:px-4 overflow-y-auto py-3 dark:border-l dark:border-slate-700">
            {cartProducts.map((item) => (
              <CartCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
          <div className="w-full">
            <button onClick={() => dispatch(SET_EXPAND("CHECKOUT_MODAL"))}
              className={cn(
                "fg_fs-md rounded-0! py-3 !text-white font-semibold bg-primary w-full flex items-center gap-5 justify-center"
              )}
            >
              <span>{t("checkout")}</span> <span>{formatPrice(Number(totalPrice.toFixed(2)))}</span>
            </button>
          </div>
        </div>
      </CustomDrawer>
    </>
  );
}
