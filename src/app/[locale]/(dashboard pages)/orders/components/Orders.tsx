"use client"
import { Button } from "@/components/ui/button";
import { orders as fakeOrders } from "@/lib/demo-data";
import Timer from "@/sharedComponents/shared/Timer";
import RenderFormatedPrice from "@/sharedComponents/utils/RenderFormatedPrice";
import RenderText from "@/sharedComponents/utils/RenderText";
import { TOrder } from "@/types/types";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

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
        <div className="w-full sticky z-[999] top-[81px] py-2 bg-clr-bg-body left-0 flex justify-between">
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
    // const { orders } = useSelector((state: RootState) => state.productSlice);
    // console.log(orders)
    const orders = fakeOrders as TOrder[];

    // handlers
    const handleEditOrder = (order) => {
        console.log(order, ' ')
    }
    return (
        <>
            {
                !!orders?.length && <div className="flex flex-col gap-2">
                    {
                        orders.map(order => <button key={order.id} onClick={() => handleEditOrder(order)} className='w-full flex bg-clr-card overflow-hidden custom-shadow-md group z-0'>
                            <div className="relative p-1 flex items-center justify-center">
                                {order.customer_type === "Online" ?
                                    <div className="pt-1 gap-1 pb-0 bg-clr-bg-body  flex flex-col w-[70px] h-[70px] overflow-hidden rounded-md">
                                        <div className="w-10/12 mx-auto grow overflow-hidden" >
                                            <Image src={"/images/shared/Delivery-icon-white.png"} className='hidden dark:block z-10 w-full duration-300 group-hover:scale-105 h-full' width={300} height={400} alt="Delivery Icon" />
                                            <Image src={"/images/shared/Delivery-icon-black.png"} className='block dark:hidden z-10 w-full duration-300 group-hover:scale-105 h-full' width={300} height={400} alt="Delivery Icon" />
                                        </div>
                                        <p className="text-sm rounded-[3px] bg-secondary px-0.5 font-bold text-white"><RenderText group="shared" variable="online" /></p>
                                    </div>
                                    :
                                    order.customer_type === "Self Pickup" ?
                                        <div className="pt-1 gap-1 pb-0 bg-clr-bg-body  flex flex-col w-[70px] h-[70px] overflow-hidden rounded-md">
                                            <div className="grow overflow-hidden mx-auto w-auto" >
                                                <Image src={"/images/shared/percel-icon-white.png"} className='hidden dark:block z-10 w-auto duration-300 group-hover:scale-105 h-full' width={300} height={400} alt="Table icon" />
                                                <Image src={"/images/shared/percel-icon-black.png"} className='block dark:hidden z-10 w-auto duration-300 group-hover:scale-105 h-full' width={300} height={400} alt="Table icon" />
                                            </div>
                                            <p className="text-sm bg-primary font-bold text-white rounded-[3px]"><RenderText group="shared" variable="percel" /></p>
                                        </div>
                                        :
                                        <div className="bg-clr-bg-body  flex flex-col w-[70px] h-[70px] overflow-hidden rounded-md">
                                            <div className="px-1.5 w-auto overflow-hidden grow" >
                                                <Image src={"/images/shared/table-white.svg"} className='hidden dark:block z-10 w-full duration-300 group-hover:scale-105 h-full' width={300} height={400} alt="Table icon" />
                                                <Image src={"/images/shared/table.svg"} className='block dark:hidden z-10 w-full duration-300 group-hover:scale-105 h-full' width={300} height={400} alt="Table icon" />
                                            </div>
                                            <p className="text-sm font-bold bg-primary text-white rounded-[3px]"><RenderText group="shared" variable="table" />-5</p>
                                        </div>
                                }
                            </div>

                            <div className="grow flex text-left flex-col items-start pb-1.5 bg-clr-card relative">
                                <h5 className="bg-slate-200 w-full text-sm px-2 py-0.5 flex items-center gap-3 justify-between">
                                    {/* <span className=""><RenderText group="shared" variable="waiter" />: <span className="font-semibold" >Akash</span></span> */}
                                    <span className="w-6 h-6 text-sm flex items-center gap-1.5 rounded-full bg-primary p-0.5" >
                                        <Image src={"/images/shared/waiter-icon.png"} className='z-10 w-full h-full' width={300} height={400} alt="Delivery Icon" /><span>Akash</span>
                                    </span>
                                    <Timer date={new Date(order.created_at)} />
                                </h5>
                                <div className="px-2 w-full mt-2 items-center flex justify-between">
                                    <h6 className="text-base flex flex-wrap leading-[130%]" >
                                        <span className="mr-1"><RenderText group="shared" variable="customerName" />:</span>
                                        <span>{order.customer.name}</span>
                                    </h6>
                                    <p className="text-sm px-2 py-0.5 rounded-md font-bold text-primary" >
                                        <RenderFormatedPrice price={+order.final_receivable} />
                                    </p>
                                </div>
                            </div>
                        </button>)
                    }
                </div>
            }
        </>
    )
}

