'use client';
import { ShoppingCart, X } from 'lucide-react';
import { CartCard } from '../cards/CartCard';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { SET_EXPAND } from '@/redux/features/actions/actionSlice';
import { CustomDrawer } from '../modal/CustomDrawer';
import { useTranslations } from 'next-intl';
import { calculateSubtotal, cn, getSellingPrice } from '@/lib/utils';
import useFormatPrice from '@/hooks/useFormatPrice';
import MovingBorder from '../shared/MovingBorder';

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
        open={openCart}
      >
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex items-center gap-5 py-3 px-4 bg-primary">
            <h3 className="grow flex text-white">
              <span className='fg_fs-lg'>{t('addToCart')} ({cartProducts.length})</span>
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
              <p>{t('totalBill')}</p>
              <p className='font-semibold'>{formatPrice(Number(totalPrice.toFixed(2)))}</p>
            </div>


            <MovingBorder>
              <button onClick={() => dispatch(SET_EXPAND("CHECKOUT_MODAL"))}
                className={cn(
                  "fg_fs-md rounded-md py-3 !text-white font-semibold !rounded-0 w-full"
                )}
              >
                {t("checkout")}
              </button>
            </MovingBorder>
          </div>
        </div>
      </CustomDrawer>
    </>
  );
}
