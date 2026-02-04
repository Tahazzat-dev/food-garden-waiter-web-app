"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import useFormatPrice from "@/hooks/useFormatPrice"
import useRenderText from "@/hooks/useRenderText"
import { cn, getTranslationReadyText } from "@/lib/utils"
import { updateKitchenOrderItemStatus } from "@/redux/features/product/productSlice"
import { RootState } from "@/redux/store"
import Timer from "@/sharedComponents/shared/Timer"
import { OrdersTab } from "@/sharedComponents/tab/Tab"
import RenderText from "@/sharedComponents/utils/RenderText"
import { KitchenOrder, TKitchenOrderItem } from "@/types/types"
import { ClipboardList } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { Swiper as SwiperType } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper.css"

export default function PreparingFoods() {
    const [activeTab, setActiveTab] = useState(0)
    const ordersSwiperRef = useRef<SwiperType | null>(null);
    const { kitchenOrders } = useSelector((state: RootState) => state.productSlice)

    const changeSlider = (index: number) => {
        setActiveTab(index);
        ordersSwiperRef.current?.slideTo(index);
    }
    return (
        <>
            <OrdersTab activeTab={activeTab} changeSlider={changeSlider} />
            <Swiper
                autoHeight={true}
                speed={450}
                spaceBetween={20}
                watchSlidesProgress={true}
                onSwiper={(swiper) => (ordersSwiperRef.current = swiper)}
                onSlideChange={(swiper) => {
                    setActiveTab(swiper.activeIndex);
                }}
            >
                {/* <NoDataMsg group='shared' variable='noFoodFound' className='min-h-20 lg:min-h-40 xl:min-h-56' />  */}

                <SwiperSlide >
                    <div className="w-full flex py-3 flex-col gap-4 sm:gap-5">
                        {
                            kitchenOrders.map(order => <Table key={order.id} order={order} />)
                        }
                    </div>
                </SwiperSlide>
                <SwiperSlide >
                    <div className="w-full flex py-3 flex-col gap-4 sm:gap-5">
                        {
                            kitchenOrders.map(order => <Table key={order.id} order={order} />)
                        }
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}


const Table = ({ order }: { order: KitchenOrder }) => {
    const { translateNumber } = useFormatPrice();
    const isAllFinished = order.items.every(item => item.status === "success");
    return <div key={order.id} className={cn("w-full bg-white dark:bg-black custom-shadow-card-sm border border-slate-400 dark:border-slate-600  rounded-[4px] overflow-hidden")}>
        <div className={cn("flex py-2 items-center justify-between text-white px-2.5", isAllFinished ? "bg-primary" : "bg-secondary")} >
            <h6 className="fg_fs-md"><RenderText group="shared" variable="table" /> - {translateNumber(1)}</h6>
            <p className="flex text-[13px] items-center gap-0.5">
                {/* <RenderText group="checkout" variable="orderId" /> */}
                <ClipboardList className="w-5" />
                <span>:</span>
                <span className="">{translateNumber(34235)}</span>
            </p>
            <p className="flex items-center gap-0.5" >
                <span className="w-5 text-sm flex items-center gap-1.5 rounded-full" >
                    <Image src={"/images/shared/waiter-icon.png"} className='z-10 w-full h-auto' width={300} height={400} alt="Delivery Icon" />
                </span> <span>:</span> <span className="text-xs font-semibold" >Akash</span></p>
        </div>
        {
            order.items.map(item => <TableItem orderId={order.id} key={item.id} item={item} />)
        }
        <div className="w-full flex items-center justify-end px-2.5 py-1">
            <Timer date={new Date(new Date().getTime() + (4 * 60 * 60 * 1000) + (10 * 60 * 1000))} />
        </div>
    </div >
}


const TableItem = ({ item, orderId }: { item: TKitchenOrderItem, orderId: number }) => {
    // hook
    const dispatch = useDispatch()
    const { renderText } = useRenderText()
    const [isOpen, setIsOpen] = useState(false);
    const { en, bn } = getTranslationReadyText(item.title)

    // handlers
    const handleConfirm = () => {
        dispatch(updateKitchenOrderItemStatus({ id: orderId, itemId: item.id }))
    }

    return <div key={item.id} className={cn("flex py-1.5 items-center border-b border-slate-400/60 dark:border-slate-700 px-2.5 ", item.status === "success" && "bg-green-400 text-white")} >
        <p className="text-sm grow" >{renderText(en, bn)}</p>
        <p className="text-sm min-w-24" >{item.variation}</p>
        <p className="text-sm min-w-16" >{item.quantity} <RenderText group="shared" variable="piece" /></p>
        <p className="flex items-center" ><input checked={item.status === "success"} onChange={() => setIsOpen(true)} className="w-5 h-5" type="checkbox" /></p>
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="" >
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {renderText("Update Status?", "স্ট্যাটাস আপডেট করবেন?")}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {renderText(
                            "Are you sure you want to update this item status?",
                            "আপনি কি নিশ্চিত যে আপনি এই আইটেমের স্ট্যাটাস আপডেট করতে চান?"
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <div className="w-full flex gap-2 justify-end">
                        <AlertDialogCancel className="w-full bg-secondary text-white !border-0" onClick={() => setIsOpen(false)}>
                            {renderText("No", "না")}
                        </AlertDialogCancel>
                        <AlertDialogAction className="w-full !border-0 bg-primary text-white" onClick={handleConfirm}>
                            {renderText("Yes", "হ্যাঁ")}
                        </AlertDialogAction>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
}