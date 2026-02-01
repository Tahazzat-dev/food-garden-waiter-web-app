"use client"
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import RenderText from "@/sharedComponents/utils/RenderText";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";

export type TTabs = "myOrders" | "allOrders";

export default function Orders() {
    const [activeTab, setActiveTab] = useState<TTabs>("myOrders")
    return (
        <>
            <OrdersTab activeTab={activeTab} setActiveTab={setActiveTab} />
            <OrdersTabContent activeTab={activeTab} />
        </>
    )
}


type TabProps = {
    activeTab: TTabs,
    setActiveTab: Dispatch<SetStateAction<TTabs>>;
}
function OrdersTab({ activeTab, setActiveTab }: TabProps) {

    const defaultBorder = "border border-slate-400 dark:border-slate-600";
    return (
        <div className="w-full sticky top-[81px] py-2 bg-clr-bg-body left-0 flex justify-between">
            <div className="grow flex gap-2">
                <Button onClick={() => setActiveTab("myOrders")} variant={activeTab === "myOrders" ? "primary" : "ghost"} className={activeTab !== "myOrders" ? defaultBorder : ""} >
                    <RenderText group="orders" variable="myOrders" />
                </Button>
                <Button onClick={() => setActiveTab("allOrders")} variant={activeTab === "allOrders" ? "primary" : "ghost"} className={activeTab !== "allOrders" ? defaultBorder : ""} >
                    <RenderText group="orders" variable="allOrders" />
                </Button>
            </div>
            <Button className="!px-2 gap-1" >
                <Plus />
                <RenderText group="orders" variable="addOrder" />
            </Button>
        </div>
    )
}



type OrdersTabContentProps = {
    activeTab: TTabs,
}
function OrdersTabContent({ activeTab }: OrdersTabContentProps) {
    // const [orders, setOrders] = useState<TOrder[]>([]);
    const { orders } = useSelector((state: RootState) => state.productSlice);


    // handlers
    const handleEditOrder = (order) => {
        console.log(order, ' ')
    }
    return (
        <>
            {
                !!orders?.length && <div className="flex flex-col gap-2">
                    {
                        orders.map(order => <button key={order.id} onClick={() => handleEditOrder(order)} className='w-full flex gap-5 bg-clr-card overflow-hidden custom-shadow-md group z-0'>
                            <div className="relative p-1 flex items-center justify-center">
                                {order.customer_type === "Online" ?
                                    <div className="w-full h-full max-w-[70px] max-h-[70px] overflow-hidden rounded-md">
                                        <div className="bg-clr-bg-body p-2 w-full h-full" >
                                            <Image src={"/images/shared/Delivery-icon-white.png"} className='hidden dark:block z-10 w-full duration-300 group-hover:scale-105 h-full' width={300} height={400} alt="Delivery Icon" />
                                            <Image src={"/images/shared/Delivery-icon-black.png"} className='block dark:hidden z-10 w-full duration-300 group-hover:scale-105 h-full' width={300} height={400} alt="Delivery Icon" />
                                        </div>
                                    </div>
                                    :
                                    order.customer_type === "Self Pickup" ?
                                        <div className="w-full h-full max-w-[70px] max-h-[70px] overflow-hidden rounded-md">
                                            <div className="bg-clr-bg-body p-2 w-full h-full" >
                                                <Image src={"/images/shared/percel-icon-white.png"} className='hidden dark:block z-10 w-auto duration-300 group-hover:scale-105 h-full' width={300} height={400} alt="Table icon" />
                                                <Image src={"/images/shared/percel-icon-black.png"} className='block dark:hidden z-10 w-auto duration-300 group-hover:scale-105 h-full' width={300} height={400} alt="Table icon" />
                                            </div>
                                        </div>
                                        :
                                        <div className="w-full p-2 gap-1 pb-0 bg-clr-bg-body  flex flex-col h-full max-w-[70px] max-h-[70px] overflow-hidden rounded-md">
                                            <div className="w-full grow" >
                                                <Image src={"/images/shared/table-white.svg"} className='hidden dark:block z-10 w-full duration-300 group-hover:scale-105 h-full' width={300} height={400} alt="Table icon" />
                                                <Image src={"/images/shared/table.svg"} className='block dark:hidden z-10 w-full duration-300 group-hover:scale-105 h-full' width={300} height={400} alt="Table icon" />
                                            </div>
                                            <p>Table-5</p>
                                        </div>
                                }
                            </div>

                            <div className="grow flex text-left flex-col items-start py-1.5 bg-clr-card relative ">
                                {/* <span className='absolute top-0 text-[13px] right-0 px-2 bg-secondary text-white' >
                                10% <RenderText group='shared' variable='off' />
                            </span> */}
                                {/* <h6 className='mb-1'> {renderText(en, bn)}</h6> */}
                                <div className="w-full flex justify-end flex-col grow">
                                    {/* <p className='fg_fs-xs' ><RenderText group='shared' variable='productDetails' /></p> */}
                                    {/* <p className='fg_fs-xs font-semibold'><span className=''>{formatPrice(+product.price)}</span></p> */}
                                </div>
                            </div>
                        </button>)
                    }
                </div>
            }
        </>
    )
}

