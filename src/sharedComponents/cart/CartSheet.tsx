'use client';
import { Button } from '@/components/ui/button';
import useFormatPrice from '@/hooks/useFormatPrice';
import { calculateSubtotal, cn, getSellingPrice } from '@/lib/utils';
import { SET_EXPAND, updatePrevAction } from '@/redux/features/actions/actionSlice';
import { RootState } from '@/redux/store';
import { ITable, TAddress, TCustomerType } from '@/types/types';
import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X } from 'lucide-react';
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


type TOrderType = "table" | "percel" | 'online';

type TOrderResponse = {
  success: boolean;
  message: string;
  orderId?: number;
  totalCost?: number;
  customerType?: TCustomerType;
  status?: number;
  orderIdentity?: number;
  orderType: TOrderType;
}


export function CartSheet() {
  // variables
  const KEY = "CART_SHEET"

  // hooks
  const t = useTranslations('shared')
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state: RootState) => state.productSlice);
  const [selectedTable, setSelectedTable] = useState(0)
  const [orderResponse, setOrderResponse] = useState<TOrderResponse | null>(null)
  const { EXPAND } = useSelector((state: RootState) => state.actions);
  const openCart = EXPAND === KEY;
  const { formatPrice, translateNumber } = useFormatPrice()
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
    dispatch(SET_EXPAND(null));
    setOrderResponse({
      message: "orderSuccess",
      success: true,
      orderId: 233,
      status: 200,
      orderType: "online",
      orderIdentity: 1,
      customerType: 'Dine-In',
      totalCost: 2000
    })
  }


  const handleOpenAddCustomerModal = () => {
    dispatch(updatePrevAction("CART_SHEET"))
    dispatch(SET_EXPAND("OPEN_ADD_CUSTOMER_MODAL"))
  }

  const closeModal = () => {
    setOrderResponse(null)
  }



  // calculated cart total 
  const totalPrice = cartProducts.reduce((total, item) => total + (calculateSubtotal(getSellingPrice(item.price, item.discount), item.quantity)), 0)
  return (
    <>
      <CustomDrawer
        overlayClassName="!top-0"
        className='!top-0 !z-[9999999]'
        open={openCart}
      >
        <div onClick={handleModalClick} className="w-full h-full flex flex-col">
          <div className="w-full flex items-center gap-5 py-3 px-4 bg-primary">
            <h3 className="grow flex items-end gap-2 text-white">
              <span className='fg_fs-lg'><RenderText group='shared' variable='item' /> ({cartProducts.length})</span>
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
                "fg_fs-md rounded-0! py-3 !text-white font-semibold bg-primary w-full flex items-center gap-5 justify-center",
                !cartProducts.length && "pointer-events-none"
              )}
            >
              <span>{t("checkout")}</span> <span>{formatPrice(Number(totalPrice.toFixed(2)))}</span>
            </button>
          </form>
        </div>
      </CustomDrawer>

      <Dialog.Root open={orderResponse !== null} onOpenChange={closeModal}>
        <Dialog.Portal>
          <div className="fixed inset-0 global-overlay z-[999999]" />
          <Dialog.Content className="prevent-body-trigger border border-slate-300 dark:border-slate-700 fixed top-1/2 left-1/2  max-w-[93vw] md:max-w-[700px] lg:!rounded-[12px] overflow-hidden w-full -translate-x-1/2 -translate-y-1/2 bg-body rounded-lg shadow-lg dark:shadow-slate-800 z-[9999999]">
            <div className="flex items-center justify-between bg-primary px-4 py-2">
              <Dialog.Title className="fg_fs-md text-white">
                <RenderText group='orders' variable={orderResponse?.message || 'success'} />
              </Dialog.Title>
              <Button onClick={closeModal} className="rounded-full !px-2.5" variant="secondary"> <X className="!text-white w-5 md:w-6 md:h-6 h-5 lg:w-8 lg:h-8" /></Button>
            </div>
            <div className="p-4">
              {orderResponse?.orderId && <p className='text-center flex gap-2 justify-center' ><span><RenderText group='checkout' variable='orderId' /> :</span><span>{translateNumber(orderResponse.orderId)}</span></p>}
              {orderResponse?.orderType && <p className='text-center flex gap-2 justify-center' ><span><RenderText group='orders' variable='orderDetails' /> :</span> <span><RenderText group='shared' variable={orderResponse.orderType} /></span>{orderResponse.orderType !== "online" && !!orderResponse.orderIdentity && translateNumber(orderResponse.orderIdentity)}</p>}
              {orderResponse?.totalCost && <p className='text-center flex gap-2 justify-center' ><span><RenderText group='shared' variable='total' /> :</span> <span>{formatPrice(orderResponse.totalCost)}</span></p>}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
