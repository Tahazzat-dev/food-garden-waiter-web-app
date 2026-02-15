"use client";

import { Button } from "@/components/ui/button";
import useFormatPrice from "@/hooks/useFormatPrice";
import useRenderText from "@/hooks/useRenderText";
import { useRouter } from "@/i18n/navigation";
import { cn, getImage, getTranslationReadyText } from "@/lib/utils";
import { SET_EXPAND, udpateOrderAction } from "@/redux/features/actions/actionSlice";
import { useUpdateOnlineOrdersMutation } from "@/redux/features/product/productApiSlice";
import { setCartProducts, updateCartFormSavedData } from "@/redux/features/product/productSlice";
import { RootState } from "@/redux/store";
import { OrderItem, TCartProduct } from "@/types/types";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, House, MapPin, Phone, X } from "lucide-react"; // optional icon
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import LoadingSpinner from "../loading/LoadingSpinner";
import InvoicePrint from "../shared/InvoicePrint";
import { KOTPrint } from "../shared/KotPrint";
import RenderText from "../utils/RenderText";



export default function OrderDetailsModal() {
    // hooks
    const kotPrintRef = useRef<HTMLDivElement>(null);
    const router = useRouter()
    const invoicePrintRef = useRef<HTMLDivElement>(null);
    const [showFullDeails, setShowFullDetials] = useState(false)
    // const [updateStatus, {isLoading:isDuePrintUpdating}] = useUpdateIsDuePrintMutation()
    const [updateOnlineOrder, { isLoading: isOnlineOrderUpdating }] = useUpdateOnlineOrdersMutation();
    const dispatch = useDispatch();
    const { formatPrice } = useFormatPrice();
    const { renderText } = useRenderText()
    const { EXPAND, activeOrderDetailsModal } = useSelector((state: RootState) => state.actions);
    const { authUser } = useSelector((state: RootState) => state.auth);
    const { detailsOrder } = useSelector((state: RootState) => state.productSlice);
    const { address } = useSelector((state: RootState) => state.address);
    const KEY = "ORDER_DETAILS_MODAL";

    // TODO: we will change this later
    const [isPrinting, setIsPrinting] = useState(false);
    const [printingMsg, setPrintingMsg] = useState("");


    // handlers
    const closeModal = () => {
        dispatch(SET_EXPAND(null));
    }

    // const handleKotPrint = useReactToPrint({
    //     contentRef: kotPrintRef,
    // });

    const handlePrint = async () => {
        if (!detailsOrder) return;
        setIsPrinting(true);
        setPrintingMsg('');
        try {
            const response = await fetch("http://192.168.1.50:3001/ping", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: detailsOrder.id,
                    orderType: detailsOrder.customer_type,
                    token: detailsOrder.token_no,
                    table_id: detailsOrder.table_id,
                    items: detailsOrder.items,
                    waiter: detailsOrder.waiter.fname
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



    const handleDueInvoicePrint = useReactToPrint({
        contentRef: invoicePrintRef,
    });

    const handleEditOrder = () => {
        if (!detailsOrder) return;

        dispatch(udpateOrderAction("edit"));
        const cartProducts: TCartProduct[] = detailsOrder.items.map(item => ({
            id: item.variation_id,
            productId: item.product_id,
            title: item.product_name,
            categoryId: 1,
            img: item?.variation?.image || "",
            name: item?.variation?.variation,
            price: Number(item?.variation?.price || '0'),
            discount: 0,
            quantity: item.qty
        }))
        dispatch(setCartProducts(cartProducts))
        dispatch(updateCartFormSavedData({ customerId: detailsOrder.customer_id, tableId: detailsOrder.table_id || 1 }));
        dispatch(SET_EXPAND(null));

        // navigate to home page
        router.push("/");
    }

    const udpateOnlineOrderStatus = async (id: number, status: number) => {
        try {
            await updateOnlineOrder({ id, status }).unwrap()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (KEY === EXPAND) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [EXPAND]);

    if (!detailsOrder) return;

    const customerAdress = address.find(addr => addr.id === detailsOrder.customer.address_id);
    const { en: addressEn, bn: addressBn } = getTranslationReadyText(customerAdress?.name || "");
    const totalAmount = detailsOrder.items.reduce((acc, item) => { return (acc + (Number(item?.variation?.price || '0') * item.qty)) }, 0)

    return (
        <>
            <Dialog.Root open={KEY === EXPAND} onOpenChange={closeModal}>
                <Dialog.Portal>
                    <div className=" fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]" />
                    <Dialog.Content className="prevent-body-trigger fixed top-1/2 left-1/2  max-w-[94vw] md:max-w-[500px] !rounded-[10px] lg:!rounded-[12px] overflow-hidden w-full -translate-x-1/2 -translate-y-1/2 bg-body shadow-lg dark:shadow-slate-800 z-[99999]">
                        <Dialog.Title className="flex items-center justify-between px-4 py-2 fg_fs-md bg-primary text-white text-center">
                            <RenderText group="orders" variable="orderDetails" />
                            <Button onClick={closeModal} className="rounded-full !px-2.5" variant="secondary"> <X className="!text-white w-5 md:w-6 md:h-6 h-5 lg:w-8 lg:h-8" /></Button>
                        </Dialog.Title>
                        <div className="p-1 px-2 m-2 border border-slate-400 rounded-md">
                            <h6 onClick={() => setShowFullDetials(prev => !prev)} className="text-base mt-1 gap-2 flex items-center justify-between leading-[130%]" >
                                <span className="flex flex-wrap items-center" >
                                    <span className="mr-1">
                                        <Image src={"/images/shared/customer-white-icon.png"} className='hidden dark:block z-10 w-5 h-auto' width={200} height={200} alt="Customer Icon" />
                                        <Image src={"/images/shared/customer-black-icon.png"} className='dark:hidden z-10 w-5 h-auto' width={200} height={200} alt="Customer Icon" />
                                    </span>
                                    <span>{detailsOrder.customer.name}</span>
                                </span>
                                <ChevronDown className={cn("duration-200 w-5", showFullDeails && "rotate-180")} />
                            </h6>
                            {
                                showFullDeails && <div className="w-full">
                                    <p className="mt-1 text-sm flex items-center gap-4"><Phone className="w-4" />{detailsOrder?.customer?.phone || ""}</p>
                                    <p className="mt-1 text-sm flex items-center gap-4"><MapPin className="w-4" />{renderText(addressEn, addressBn)}</p>
                                    <p className="text-sm flex items-center gap-4"><House className="w-[15px]" />{detailsOrder.customer.note}</p>
                                </div>
                            }

                        </div>
                        <div className="p-3">
                            <p className="mb-1 fg_fs-xs "><RenderText group="shared" variable="orderItems" /></p>
                            <div className="max-h-[45vh] overflow-y-auto rounded-md">
                                {
                                    detailsOrder.items.map(item => <DetailsItemCard key={item.id} item={item} />)
                                }
                            </div>
                            <div className="mt-2 w-full bg-clr-card py-1 rounded-md px-2 ">
                                <p className="flex font-semibold w-full items-center justify-between" ><span><RenderText group="shared" variable="total" /></span><span>{formatPrice(totalAmount)}</span></p>
                            </div>
                        </div>
                        {


                            activeOrderDetailsModal === "web" && <div className="p-3 pt-0 gap-1 flex justify-between flex-wrap">

                                {
                                    isPrinting ? <div className="w-full min-h-[51px] flex items-center justify-center">
                                        <LoadingSpinner />
                                    </div> :

                                        <>
                                            <Button onClick={handleDueInvoicePrint} size="sm" className=" !rounded-[3px] !px-2 bg-[#58C354] text-white" >
                                                <RenderText group="shared" variable="invPrint" />
                                            </Button>
                                            <Button onClick={handlePrint} size="sm" className=" !rounded-[3px] grow bg-[#F66FFF] text-white" variant="outline" >
                                                <RenderText group="shared" variable="kot" />
                                            </Button>
                                            <Button onClick={handleEditOrder} size="sm" className=" !rounded-[3px] grow text-white" variant="secondary" >
                                                <RenderText group="shared" variable="edit" />
                                            </Button>
                                            <Button onClick={() => dispatch(SET_EXPAND("OPEN_MAKE_SELL_CUSTOMER_MODAL"))} size="sm" className=" !rounded-[3px] grow" >
                                                <RenderText group="shared" variable="sale" />
                                            </Button></>
                                }

                            </div>
                        }

                        {
                            !!printingMsg && <p className='mt-1'>{printingMsg}</p>
                        }

                        {
                            activeOrderDetailsModal === "online" && <div className="prevent-body-trigger p-3 pt-0 gap-1 flex justify-between flex-wrap">
                                {
                                    isOnlineOrderUpdating ? <div className="h-[32px] w-full flex items-center justify-center overflow-hidden">
                                        <LoadingSpinner />
                                    </div> :
                                        <>
                                            <Button onClick={() => udpateOnlineOrderStatus(detailsOrder.id, 2)} disabled={isOnlineOrderUpdating} size="sm" className=" !rounded-[3px] grow text-white" variant="secondary" >
                                                <RenderText group="shared" variable="reject" />
                                            </Button>
                                            <Button onClick={() => udpateOnlineOrderStatus(detailsOrder.id, 1)} disabled={isOnlineOrderUpdating} size="sm" className=" !rounded-[3px] grow" >
                                                <RenderText group="shared" variable="accept" />
                                            </Button>
                                        </>
                                }
                            </div>
                        }
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            <div className="w-full hidden print:block">
                <KOTPrint
                    orderData={
                        {
                            id: detailsOrder.id,
                            orderType: detailsOrder.customer_type,
                            token: detailsOrder.token_no,
                            table_id: detailsOrder.table_id,
                            items: detailsOrder.items,
                            waiter: detailsOrder.waiter.fname
                        }
                    }
                    ref={kotPrintRef}
                />
            </div>

            <div className="w-full hidden print:block">
                <InvoicePrint
                    invoiceData={
                        {
                            ...detailsOrder,
                            billingBy: authUser?.fname || ''
                        }
                    }
                    ref={invoicePrintRef}
                />
            </div>
        </>
    );
}




const DetailsItemCard = ({ item }: { item: OrderItem }) => {
    // hooks
    const { renderText } = useRenderText()
    const { formatPrice, translateNumber } = useFormatPrice();
    const { en, bn } = getTranslationReadyText(item.product.name)
    return <div className='w-full rounded-md  bg-clr-card flex gap-1 mb-2 overflow-hidden group'>
        <div className="relative p-1 flex items-center justify-center">
            <div className="w-full h-full max-w-[50px] max-h-[40px] overflow-hidden rounded-md">
                <Image src={item?.product?.image ? getImage(item?.product?.image) : "/images/shared/food-placeholder.jpg"} className='z-10 w-full duration-300 group-hover:scale-105 h-full' width={300} height={400} alt="Food image" />
            </div>
        </div>
        <div className='flex items-center justify-between grow p-1 pr-2 bg-clr-card'>
            <div className="flex flex-col items-start">
                <h3 className='line-clamp-2 break-words fg_fs-xs text-primary leading-tight font-medium'>{renderText(en, bn)}</h3>
                <p><span className='rounded-[6px] text-xs font-medium text-secondary'>{item?.variation?.variation}</span></p>
            </div>
            <p className='text-[15px] font-semibold grow max-w-[50%] flex items-center justify-between text-left'><span>{translateNumber(item.qty)}</span> <span >{formatPrice(Number(item?.variation?.price || '0') * item.qty)}</span></p>
        </div>
    </div>
}
