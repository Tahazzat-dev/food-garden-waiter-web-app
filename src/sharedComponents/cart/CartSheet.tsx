'use client';
import { Button } from '@/components/ui/button';
import useFormatPrice from '@/hooks/useFormatPrice';
import { calculateSubtotal, cn, getSellingPrice } from '@/lib/utils';
import { SET_EXPAND, updatePrevAction } from '@/redux/features/actions/actionSlice';
import { RootState } from '@/redux/store';
import { ITable, TAddress } from '@/types/types';
import { Plus, ShoppingCart, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { MouseEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CartCard } from '../cards/CartCard';
import { CustomDrawer } from '../modal/CustomDrawer';
import RenderText from '../utils/RenderText';
import { CustomerSelect } from './CustomerSelect';
import Tables from './Tables';


export type CustomerFormValues = {
  address: TAddress;
  table: ITable;
}


export function CartSheet() {
  // variables
  const KEY = "CART_SHEET"

  // hooks
  const t = useTranslations('shared')
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state: RootState) => state.productSlice);
  const [selectedTable, setSelectedTable] = useState(0)
  const { EXPAND } = useSelector((state: RootState) => state.actions);
  const openCart = EXPAND === KEY;
  const { formatPrice } = useFormatPrice()
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CustomerFormValues>()

  // handlers
  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {

    if (!isOpen) return;

    const targetElement = event.target as HTMLElement;
    if (targetElement.closest(".custom-select-el")) return;
    setIsOpen(false);
  }


  const onSubmit = async (data: CustomerFormValues) => {
    console.log(data, ' data');
    dispatch(SET_EXPAND("OPEN_MAKE_SELL_CUSTOMER_MODAL"))
  }


  const handleOpenAddCustomerModal = () => {
    dispatch(updatePrevAction("CART_SHEET"))
    dispatch(SET_EXPAND("OPEN_ADD_CUSTOMER_MODAL"))
  }



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
        overlayClassName="!top-0"
        className='!top-0 !z-[9999999]'
        open={openCart}
      >
        <div onClick={handleModalClick} className="w-full h-full flex flex-col">
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
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="w-full flex gap-2 px-2 mb-2">
              <CustomerSelect isOpen={isOpen} setIsOpen={setIsOpen} setValue={setValue} register={register} watch={watch} />
              <Button type='button' onClick={handleOpenAddCustomerModal} className='!px-2 gap-0.5' ><Plus /> <RenderText group='shared' variable='addShortText' /> </Button>
            </div>
            {
              errors?.address?.message || errors?.table?.message ? <div className="w-full py-2">
                <p className='text-secondary px-2 text-sm'><RenderText group='checkout' variable={errors?.address ? 'addressError' : 'tableError'} /></p>
              </div> : <></>
            }
            <div className="w-full bg-slate-300 rounded-md border border-slate-400 dark:border-slate-600 dark:bg-slate-700 px-1.5">
              <Tables selectedTable={selectedTable} setSelectedTable={setSelectedTable} />
            </div>
            <button
              disabled={!cartProducts.length}
              type="submit"
              className={cn(
                "fg_fs-md rounded-0! py-2 !text-white font-semibold bg-primary w-full flex items-center gap-5 justify-center",
                !cartProducts.length && "pointer-events-none"
              )}
            >
              <span>{t("checkout")}</span> <span>{formatPrice(Number(totalPrice.toFixed(2)))}</span>
            </button>
          </form>
        </div>
      </CustomDrawer>
    </>
  );
}
