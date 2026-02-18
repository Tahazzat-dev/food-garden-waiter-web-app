'use client';
import { Button } from '@/components/ui/button';
import useFormatPrice from '@/hooks/useFormatPrice';
import { removeStorage } from '@/lib/storage';
import { calculateSubtotal, cn, getSellingPrice, getTranslationReadyText, isTable } from '@/lib/utils';
import { SET_EXPAND, udpateOrderAction, updatePrevAction } from '@/redux/features/actions/actionSlice';
import { useConfirmOrderMutation, useUpdateOrderMutation } from '@/redux/features/product/productApiSlice';
import { setCartProducts, updateCartFormSavedData } from '@/redux/features/product/productSlice';
import { RootState } from '@/redux/store';
import { OrderItem, TCustomer, TCustomerType, TSelectedTable } from '@/types/types';
import * as Dialog from "@radix-ui/react-dialog";
import { Plus, Undo2, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CartCard } from '../cards/CartCard';
import LoadingSpinner from '../loading/LoadingSpinner';
import { CustomDrawer } from '../modal/CustomDrawer';
import { KOTPrint } from '../shared/KotPrint';
import RenderText from '../utils/RenderText';
import { CustomerSelect } from './CustomerSelect';
import Tables from './Tables';

export type CustomerFormValues = {
  customer: TCustomer
  table: TSelectedTable;
}


type TOrderResponse = {
  success: boolean;
  message: string;
  id?: number;
  token?: string;
  orderType?: TCustomerType;
  table_id: number | null;
  waiter: string;
  items: OrderItem[]
}

export function CartSheet() {
  // variables
  const KEY = "CART_SHEET"

  // hooks
  const t = useTranslations('shared')
  const printRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [confirmOrder, { isLoading }] = useConfirmOrderMutation()
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation()
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { cartProducts, detailsOrder } = useSelector((state: RootState) => state.productSlice);
  const [selectedTable, setSelectedTable] = useState<TSelectedTable | null>(null)
  const [orderResponse, setOrderResponse] = useState<TOrderResponse | null>(null)
  const { EXPAND, orderAction } = useSelector((state: RootState) => state.actions);
  const openCart = EXPAND === KEY;
  const { formatPrice, translateNumber } = useFormatPrice()
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, setValue, watch, formState, setError, formState: { errors } } = useForm<CustomerFormValues>()

  // TODO: we will change this later
  const [isPrinting, setIsPrinting] = useState(false);
  const [printingMsg, setPrintingMsg] = useState("");

  const selectedCustomer = watch("customer")

  // handlers
  const onSubmit = async (data: CustomerFormValues) => {
    if (!data.customer) {
      setError("customer", { type: "manual", message: 'Select Customer' })
      return;
    }
    if (!selectedTable) {
      setError("table", { type: "manual", message: 'Select table' })
      return;
    }

    try {
      const choosedProducts = cartProducts.map(item => ({ product_id: item.productId, variant_id: item.id, quantity: item.quantity }))

      if (orderAction === 'edit') {

        if (!detailsOrder) return;

        const updateTotal = cartProducts.reduce((total, item) => total + (calculateSubtotal(getSellingPrice(item.price, item.discount), item.quantity)), 0);
        const updateItems = cartProducts.map((item) => ({
          product_id: item.productId,
          product_name: item.title,
          rate: item.price,
          main_qty: item.quantity,
          sub_qty: 0,
          sub_total: item.quantity * item.price,
          total_purchase_cost: 0,
          has_sub_unit: null
        }))

        const editData = {
          brand_filter: "1",
          customer_id: selectedCustomer.id,
          customer_type: selectedTable.customer_type,
          waiter_id: detailsOrder.waiter_id,
          table_id: selectedTable.table_id,
          delivery_date: detailsOrder.delivery_date,
          sale_date: new Date(detailsOrder.created_at).toISOString().split('T')[0],
          sale_by: detailsOrder.waiter_id,
          total: updateTotal,
          discount: detailsOrder.discount,
          actual_discount: detailsOrder.actual_discount,
          delivery_charge: detailsOrder.delivery_charge,
          receivable: updateTotal,
          paid: "0",
          due: updateTotal,
          note: detailsOrder.note,
          items: updateItems,
          payment_method: null,
          dew_by: null,
          dew_commit_date: null,
          is_quick_sale: "0",
          customer: selectedCustomer.id,
          customer_type_select: selectedTable.customer_type,
          delivery_date_input: detailsOrder.delivery_date,
          name: updateItems.map(item => item.product_name), // you had array:2 but values hidden
          product_id: updateItems.map(item => item.product_id),
          variation_id: cartProducts.map(item => item.id),
          rate: cartProducts.map(item => item.price),
          brand_id: "undefined",
          main_qty: cartProducts.map(item => item.quantity),
          sub_total: cartProducts.map(item => (item.price * item.quantity)),
          discount_input: "0",
          delivery_charge_input: "0.00",
        };

        const res = await updateOrder({ id: detailsOrder.id, data: editData }).unwrap();

        const addedItems = cartProducts.map(item => (
          {
            product_name: item.title,
            variation: {
              variation: item.name,
            },
            qty: item.quantity,

          }
        ))

        if (res.success) {
          setOrderResponse({
            message: "orderUpdated",
            success: true,
            id: res.id,
            token: res.token,
            table_id: selectedTable.table_id,
            orderType: selectedTable.customer_type,
            items: addedItems as OrderItem[],
            waiter: authUser?.fname || ''
          })

          setSelectedTable(null)
        }
      } else {
        const res = await confirmOrder({
          customer_id: selectedCustomer.id,
          customer_type: selectedTable.customer_type,
          table_id: selectedTable.table_id,
          discount: 0,
          products: choosedProducts
        }).unwrap();

        const addedItems = cartProducts.map(item => (
          {
            product_name: item.title,
            variation: {
              variation: item.name,
            },
            qty: item.quantity,
          }
        ))


        if (res.success) {
          setOrderResponse({
            message: "orderSuccess",
            success: true,
            id: res.id,
            token: res.token,
            table_id: selectedTable.table_id,
            orderType: selectedTable.customer_type,
            items: addedItems as OrderItem[],
            waiter: authUser?.fname || ''
          })

          setSelectedTable(null)
        }
      }

      dispatch(setCartProducts(null));
      removeStorage("cart_items");
      dispatch(udpateOrderAction("new"));
      dispatch(updateCartFormSavedData(null));
    } catch (error) {
      console.log(error);
      setOrderResponse({
        message: "orderFail",
        success: false,
        id: 0,
        table_id: null,
        waiter: "",
        items: []
      })
    } finally {
      dispatch(SET_EXPAND(null));
    }
  }

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!isOpen || isLoading || isUpdating) return;

    const targetElement = event.target as HTMLElement;
    if (targetElement.closest(".custom-select-el")) return;
    setIsOpen(false);
  }

  // const handlePrint = useReactToPrint({
  //   contentRef: printRef,
  // });
  const handlePrint = async () => {
    setIsPrinting(true);
    setPrintingMsg('');
    const slicedOrder = orderResponse?.items.map(item => {
      const { en } = getTranslationReadyText(item?.product_name);
      return {
        ...item,
        product_name: en
      }
    });

    try {
      const response = await fetch("http://192.168.1.181:3001/print-kot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: orderResponse?.id,
          orderType: orderResponse?.orderType ?? "Online",
          token: orderResponse?.token,
          table_id: orderResponse?.table_id || null,
          items: slicedOrder || [],
          waiter: orderResponse?.waiter || ""
        })
      });

      if (!response.ok) {
        throw new Error(`Print failed (${response.status})`);
      }

      const data = await response.text();
      setPrintingMsg(data); // "Print job sent successfully!"
    } catch (error) {
      console.error("Print error:", error);
      setPrintingMsg("❌ Printer not reachable. Check network.");
    } finally {
      setIsPrinting(false);
    }
  }


  const handleOpenAddCustomerModal = () => {
    dispatch(updatePrevAction("CART_SHEET"))
    dispatch(SET_EXPAND("OPEN_ADD_CUSTOMER_MODAL"))
  }

  const closeModal = () => {
    setOrderResponse(null);
    dispatch(setCartProducts(null));
  }

  const handleDiscard = () => {
    dispatch(setCartProducts(null));
    removeStorage("cart_items");
    dispatch(udpateOrderAction("new"));
    dispatch(updateCartFormSavedData(null));
    dispatch(SET_EXPAND(null));
  }
  useEffect(() => {
    setPrintingMsg("")
  }, [detailsOrder])

  // calculated cart total 
  const totalPrice = cartProducts.reduce((total, item) => total + (calculateSubtotal(getSellingPrice(item.price, item.discount), item.quantity)), 0)
  return (
    <>
      <CustomDrawer
        overlayClassName="!top-0"
        className={`!top-0 !z-[9999999] ${isLoading || isUpdating && "pointer-events-none"}`}
        open={openCart}
      >
        <div onClick={handleModalClick} className="w-full h-full flex flex-col">
          <div className="w-full flex items-center gap-5 py-3 px-4 bg-primary">
            <CartHeading />
            <div className="w-full max-w-6">
              <button onClick={() => dispatch(SET_EXPAND(null))} className='bg-secondary p-1 rounded-full' >
                <X className="text-white w-5 md:w-6 md:h-6 h-5" />
              </button>
            </div>
          </div>
          <div className="w-full h-full grow bg-body px-2.5 sm:px-4 overflow-y-auto py-3 dark:border-l dark:border-slate-700">
            {cartProducts.map((item) => (
              <CartCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-body w-full">
            <div className="w-full bg-body flex gap-2 px-2 mb-2">
              <CustomerSelect formState={formState} isOpen={isOpen} setIsOpen={setIsOpen} setValue={setValue} register={register} watch={watch} />
              <Button type='button' onClick={handleOpenAddCustomerModal} className='!px-2 gap-0.5' ><Plus /> <RenderText group='shared' variable='addShortText' /> </Button>
            </div>
            {
              errors?.customer?.message && !selectedCustomer || errors?.table?.message && !selectedTable ? <div className="w-full pb-2">
                <p className='text-secondary px-2 text-sm'><RenderText group='checkout' variable={errors?.customer ? 'customerError' : 'tableError'} /></p>
              </div> : <></>
            }
            <div className="w-full bg-slate-300 rounded-md border border-slate-400 dark:border-slate-600 dark:bg-slate-700 px-1.5">
              <Tables register={register} selectedTable={selectedTable} setSelectedTable={setSelectedTable} />
            </div>
            {
              isLoading || isUpdating ? <div className="w-full min-h-[51px] flex items-center justify-center">
                <LoadingSpinner />
              </div> :

                orderAction === "new" ?
                  <button
                    disabled={!cartProducts.length}
                    type="submit"
                    className={cn(
                      "fg_fs-md rounded-0! py-3 !text-white font-semibold bg-primary w-full flex items-center gap-5 justify-center",
                      // !cartProducts.length && "pointer-events-none"
                    )}
                  >
                    <span>{t("checkout")}</span> <span>{formatPrice(Number(totalPrice.toFixed(2)))}</span>
                  </button>
                  :
                  <div className="w-full bg-primary flex items-center gap-1">
                    <button onClick={handleDiscard} className='bg-secondary p-1 mx-3 rounded-full'   ><Undo2 className='text-white dark:text-white size-5' /></button>
                    <button
                      disabled={!cartProducts.length}
                      type="submit"
                      className={cn(
                        "fg_fs-md grow rounded-0! pr-[52px] py-3 !text-white font-semibold bg-primary w-full flex items-center justify-center gap-5",
                        // !cartProducts.length && "pointer-events-none"
                      )}
                    >
                      <span><RenderText group='orders' variable='updateOrder' /></span> <span>{formatPrice(Number(totalPrice.toFixed(2)))}</span>
                    </button>
                  </div>
            }
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
              {orderResponse?.id && <p className='text-center flex gap-2 justify-center' ><span><RenderText group='checkout' variable='orderId' /> :</span><span>{translateNumber(orderResponse.id)}</span></p>}
              {
                !!orderResponse?.success && <>
                  <p className='text-center flex gap-2 justify-center' ><RenderText group='checkout' variable='wantToPrintKot' /></p>
                  <div className={cn("flex justify-center gap-5 mt-2", isPrinting && "pointer-events-none")}>
                    {
                      isPrinting ? <LoadingSpinner /> :
                        <>
                          <Button onClick={closeModal} variant="secondary" className='text-white' ><RenderText group='shared' variable='no' /></Button>
                          <Button onClick={() => {
                            handlePrint()
                            closeModal()
                          }} variant="primary" className='text-white' ><RenderText group='shared' variable='yes' /></Button>
                        </>
                    }
                  </div>
                  {
                    !!printingMsg && <p className='mt-1'>{printingMsg}</p>
                  }
                </>
              }

            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div className="w-full hidden print:block">
        <KOTPrint
          orderData={
            {
              id: orderResponse?.id,
              orderType: orderResponse?.orderType ?? "Online",
              token: orderResponse?.token,
              table_id: orderResponse?.table_id || null,
              items: orderResponse?.items || [],
              waiter: orderResponse?.waiter || ""
            }
          }
          ref={printRef}
        />
      </div>
    </>
  );
}

const CartHeading = () => {
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { detailsOrder } = useSelector((state: RootState) => state.productSlice);
  const { orderAction } = useSelector((state: RootState) => state.actions);
  return <h3 className="grow flex text-base gap-7 text-white">
    <span className="flex items-center gap-1" >
      <Image src={"/images/shared/waiter-icon.png"} className='mr-1 w-6 h-auto' width={300} height={400} alt="Delivery Icon" />
      {
        orderAction === "edit" ?
          detailsOrder?.waiter?.fname : authUser?.fname
      }
    </span>
    <TableInfo />
  </h3>
}

const TableInfo = () => {
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { detailsOrder } = useSelector((state: RootState) => state.productSlice);
  const { orderAction } = useSelector((state: RootState) => state.actions);

  if (orderAction !== "edit" || !detailsOrder || !authUser) return;

  if (!detailsOrder.table) return <span className="flex items-center gap-1">
    <Image src={"/images/shared/percel-white.png"} className='w-4 h-auto' width={300} height={400} alt="Table icon" />
    Parcel
  </span>

  if (detailsOrder.table_id !== 1 && isTable(detailsOrder.table)) return <span className='flex items-center gap-1' >
    <Image src={"/images/shared/table-white.svg"} className='w-7 h-auto' width={300} height={400} alt="Table icon" />
    {detailsOrder?.table?.table_no}
  </span>

  return <span className="flex items-center gap-1">
    <Image src={"/images/shared/percel-white.png"} className='w-4 h-auto' width={300} height={400} alt="Table icon" />
    {detailsOrder.table_id == 1 ? "Parcel" : detailsOrder?.table?.table_no}
  </span>
}