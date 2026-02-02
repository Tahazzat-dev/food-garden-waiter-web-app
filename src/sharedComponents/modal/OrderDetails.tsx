"use client";

import { Button } from "@/components/ui/button";
import useFormatPrice from "@/hooks/useFormatPrice";
import useRenderText from "@/hooks/useRenderText";
import { getImage, getTranslationReadyText } from "@/lib/utils";
import { SET_EXPAND } from "@/redux/features/actions/actionSlice";
import { RootState } from "@/redux/store";
import { OrderItem } from "@/types/types";
import * as Dialog from "@radix-ui/react-dialog";
import { House, MapPin, X } from "lucide-react"; // optional icon
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RenderText from "../utils/RenderText";



export default function OrderDetailsModal() {
    const t = useTranslations('orders');
    const dispatch = useDispatch();
    const { renderText } = useRenderText()
    const { EXPAND } = useSelector((state: RootState) => state.actions);
    const { detailsOrder } = useSelector((state: RootState) => state.productSlice);
    const { address } = useSelector((state: RootState) => state.address);
    const KEY = "ORDER_DETAILS_MODAL";



    // handlers
    const closeModal = () => {
        dispatch(SET_EXPAND(null));
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
    return (
        <Dialog.Root open={KEY === EXPAND} onOpenChange={closeModal}>
            <Dialog.Portal>
                <div className=" fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]" />
                <Dialog.Content className="prevent-body-trigger fixed top-1/2 left-1/2  max-w-[94vw] md:max-w-[500px] !rounded-[10px] lg:!rounded-[12px] overflow-hidden w-full -translate-x-1/2 -translate-y-1/2 bg-body shadow-lg dark:shadow-slate-800 z-[99999]">
                    <Dialog.Title className="flex items-center justify-between px-4 py-2 fg_fs-md bg-primary text-white text-center">
                        <RenderText group="orders" variable="orderDetails" />
                        <Button onClick={closeModal} className="rounded-full !px-2.5" variant="secondary"> <X className="!text-white w-5 md:w-6 md:h-6 h-5 lg:w-8 lg:h-8" /></Button>
                    </Dialog.Title>
                    <div className="p-3">
                        <h6 className="text-base mt-1 gap-2 flex flex-wrap items-center leading-[130%]" >
                            <span className="mr-1">
                                <Image src={"/images/shared/customer-white-icon.png"} className='hidden dark:block z-10 w-6 h-auto' width={200} height={200} alt="Customer Icon" />
                                <Image src={"/images/shared/customer-black-icon.png"} className='dark:hidden z-10 w-6 h-auto' width={200} height={200} alt="Customer Icon" />
                            </span>
                            <span>{detailsOrder.customer.name}</span>
                        </h6>
                        {/* <div className="w-full flex items-center gap-3 flex-wrap"> */}
                        <p className="mt-1 text-sm flex items-center gap-4"><MapPin className="w-5" />{renderText(addressEn, addressBn)}</p>
                        <p className="text-sm flex items-center gap-4"><House className="w-[19px]" />{detailsOrder.customer.note}</p>
                        {/* </div> */}

                    </div>
                    <div className="p-3">
                        <p className="mb-1"><RenderText group="shared" variable="itemList" /></p>
                        <div className="max-h-[35vh] overflow-y-auto rounded-md">
                            {
                                detailsOrder.items.map(item => <DetailsItemCard key={item.id} item={item} />)
                            }
                            {
                                detailsOrder.items.map(item => <DetailsItemCard key={item.id} item={item} />)
                            }
                            {
                                detailsOrder.items.map(item => <DetailsItemCard key={item.id} item={item} />)
                            }
                            {
                                detailsOrder.items.map(item => <DetailsItemCard key={item.id} item={item} />)
                            }
                            {
                                detailsOrder.items.map(item => <DetailsItemCard key={item.id} item={item} />)
                            }
                            {
                                detailsOrder.items.map(item => <DetailsItemCard key={item.id} item={item} />)
                            }
                            {
                                detailsOrder.items.map(item => <DetailsItemCard key={item.id} item={item} />)
                            }
                            {
                                detailsOrder.items.map(item => <DetailsItemCard key={item.id} item={item} />)
                            }
                            {
                                detailsOrder.items.map(item => <DetailsItemCard key={item.id} item={item} />)
                            }
                            {
                                detailsOrder.items.map(item => <DetailsItemCard key={item.id} item={item} />)
                            }
                            {
                                detailsOrder.items.map(item => <DetailsItemCard key={item.id} item={item} />)
                            }
                            {
                                detailsOrder.items.map(item => <DetailsItemCard key={item.id} item={item} />)
                            }
                        </div>
                    </div>
                    <div className="p-3 flex justify-between flex-wrap">
                        <Button size="sm" className="bg-[#58C354] text-white" >
                            <RenderText group="shared" variable="invPrint" />
                        </Button>
                        <Button size="sm" className="bg-[#F66FFF] text-white" variant="outline" >
                            <RenderText group="shared" variable="kot" />
                        </Button>
                        <Button size="sm" className="text-white" variant="secondary" >
                            <RenderText group="shared" variable="edit" />
                        </Button>
                        <Button size="sm" >
                            <RenderText group="shared" variable="sale" />
                        </Button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}




const DetailsItemCard = ({ item }: { item: OrderItem }) => {
    // hooks
    const dispatch = useDispatch()
    const { renderText } = useRenderText()
    const { formatPrice, translateNumber } = useFormatPrice();
    const { en, bn } = getTranslationReadyText(item.product_name)
    return <div className='w-full rounded-md  bg-clr-card flex gap-1 overflow-hidden group mb-2'>
        <div className="relative p-1 flex items-center justify-center">
            <div className="w-full h-full max-w-[60px] max-h-[50px] overflow-hidden rounded-md">
                <Image src={item?.variation?.image ? getImage(item?.variation?.image) : "/images/shared/food-placeholder.jpg"} className='z-10 w-full duration-300 group-hover:scale-105 h-full' width={300} height={400} alt="Food image" />
            </div>
        </div>
        <div className='flex gap-1 flex-col grow p-1 pr-2 bg-clr-card'>
            <div className="flex flex-col items-start">
                <h3 className='line-clamp-2 break-words fg_fs-sm text-primary leading-tight font-medium'>
                    {renderText(en, bn)} - <span className='px-2 rounded-[6px] text-xs font-medium text-secondary'>
                        {item?.variation?.variation}
                    </span></h3>
            </div>
            <div className='mt-0.5 flex items-center justify-between rounded-[4px]'>
                <p className='fg_fs-xs font-semibold  text-left grow'>{formatPrice(Number(item.variation.price))} x {translateNumber(item.qty)} = {formatPrice(Number(item.variation.price) * item.qty)}</p>
                {/* <div className='flex items-center   gap-3 rounded-md py-0.5'>
                                            <Button
                                                variant='primary'
                                                size='icon'
                                                className='h-5 w-5 !rounded-full'
                                                onClick={() => handleQuantityChange(item.quantity - 1)}
                                            >
                                                <Minus className='' />
                                            </Button>
                                            <span className='rounded-[4px] fg_fs-xs py-0.5 bg-white dark:!text-black px-4 inline-block text-center text-xs'>{item.quantity}</span>
                                            <Button
                                                variant='primary'
                                                size='icon'
                                                className='h-5 w-5 !rounded-full'
                                                onClick={() => handleQuantityChange(item.quantity + 1)}
                                            >
                                                <Plus className='' />
                                            </Button>
                                        </div>
                                        <p className='fg_fs-xs font-semibold text-right grow dark:!text-black'>{formatPrice(calculateSubtotal(getSellingPrice(item?.price || 0, item?.discount || 0), item.quantity))}</p> */}
            </div>
        </div>
    </div>
}
