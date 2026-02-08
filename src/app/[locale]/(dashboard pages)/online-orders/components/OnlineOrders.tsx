"use client"
import { SET_EXPAND, updateActiveOrderDetailsModal } from "@/redux/features/actions/actionSlice";
import { useGetOnlineOrdersQuery } from "@/redux/features/product/productApiSlice";
import { updateDetailsOrder } from "@/redux/features/product/productSlice";
import DataLoading from "@/sharedComponents/shared/Loading";
import NoDataMsg from "@/sharedComponents/shared/NoDataMsg";
import Pagination from "@/sharedComponents/shared/Pagination";
import Timer from "@/sharedComponents/shared/Timer";
import RenderFormatedPrice from "@/sharedComponents/utils/RenderFormatedPrice";
import RenderText from "@/sharedComponents/utils/RenderText";
import { TOrder } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export type TTabs = "myOrders" | "allOrders";

export default function OnlineOrders() {
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1);
    const [mount, setMount] = useState(false)
    const { data: results, isLoading } = useGetOnlineOrdersQuery(`page=${currentPage}`, {
        pollingInterval: 5000, // auto pooling after 5s.
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    });

    // handlers
    const handleEditOrder = (order: TOrder) => {
        dispatch(updateDetailsOrder(order));
        dispatch(updateActiveOrderDetailsModal("online"));
        dispatch(SET_EXPAND("ORDER_DETAILS_MODAL"));
    }

    useEffect(() => {
        setMount(true);
    }, [])

    if (!mount) return null;

    // console.log("Refreshing from online orders...")
    if (isLoading) return <DataLoading />
    return (
        <>
            {

                results.data?.data && !!results?.data?.data?.length ? <div className="flex flex-col pt-2 gap-2">
                    {
                        results?.data?.data.map(order => <button key={order.id} onClick={() => handleEditOrder(order)} className='w-full flex bg-clr-card overflow-hidden custom-shadow-md group z-0'>
                            <div className="relative p-1 flex items-center justify-center">
                                {order.customer_type === "Online" ?
                                    <div className="gap-1 bg-secondary pb-0 flex flex-col w-[70px] h-[70px] overflow-hidden rounded-md">
                                        <div className="w-7/12 pt-1 mx-auto grow overflow-hidden" >
                                            <Image src={"/images/shared/Delivery-icon-white.png"} className='hidden dark:block z-10 w-full duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Delivery Icon" />
                                            <Image src={"/images/shared/Delivery-icon-black.png"} className='block dark:hidden z-10 w-full duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Delivery Icon" />
                                        </div>
                                        <p className="text-sm rounded-[3px] bg-secondary px-0.5 font-bold text-white"><RenderText group="shared" variable="online" /></p>
                                    </div>
                                    :
                                    order.customer_type === "Self Pickup" ?
                                        <div className="pt-1 bg-blue-500 gap-1 pb-0 flex flex-col w-[70px] h-[70px] overflow-hidden rounded-md">
                                            <div className="grow overflow-hidden mx-auto w-7 flex items-center justify-center" >
                                                <Image src={"/images/shared/percel-icon-white.png"} className='hidden dark:block z-10 w-auto duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Table icon" />
                                                <Image src={"/images/shared/percel-icon-black.png"} className='block dark:hidden z-10 w-auto duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Table icon" />
                                            </div>
                                            <p className="text-sm bg-blue-500 font-bold text-white rounded-[3px]"><RenderText group="shared" variable="percel" /></p>
                                        </div>
                                        :
                                        <div className="bg-black flex flex-col w-[70px] h-[70px] overflow-hidden rounded-md">
                                            <div className=" px-1.5 flex items-center justify-center w-[55px] mx-auto overflow-hidden grow" >
                                                {/* <Image src={"/images/shared/table-white.svg"} className='hidden dark:block z-10 w-full duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Table icon" /> */}
                                                <Image src={"/images/shared/table-white.svg"} className='z-10 w-full duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Table icon" />
                                                {/* <Image src={"/images/shared/table.svg"} className='block dark:hidden z-10 w-full duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Table icon" /> */}
                                            </div>
                                            <p className="text-sm font-bold text-white rounded-[3px]"><RenderText group="shared" variable="table" />-5</p>
                                        </div>
                                }
                            </div>

                            <div className="grow flex text-left flex-col items-start pb-1.5 bg-clr-card relative">
                                <h5 className="bg-slate-200 dark:bg-slate-800 w-full text-xs px-2 py-0.5 flex items-center gap-3 justify-end">
                                    {/* <span className=""><RenderText group="shared" variable="waiter" />: <span className="font-semibold" >Akash</span></span> */}

                                    <span className="text-xs"><Timer date={new Date(order.created_at)} /></span>
                                </h5>
                                <div className="px-2 w-full mt-1 items-center flex justify-between">
                                    <h6 className="text-base items-center gap-1 flex flex-wrap leading-[130%]" >
                                        <span className="w-6 h-6 text-sm flex items-center gap-1.5 rounded-full" >
                                            <Image src={"/images/shared/customer-white-icon.png"} className='hidden dark:block z-10 w-6 h-auto' width={200} height={200} alt="Customer Icon" />
                                            <Image src={"/images/shared/customer-black-icon.png"} className='dark:hidden z-10 w-6 h-auto' width={200} height={200} alt="Customer Icon" />
                                        </span>
                                        <span>{order.customer.name}</span>
                                    </h6>
                                    <p className="text-sm px-2 py-0.5 rounded-md font-bold text-primary" >
                                        <RenderFormatedPrice price={+order.final_receivable} />
                                    </p>
                                </div>
                                <p className="px-2 text-sm ">
                                    {order.customer_type === "Dine-In" ?
                                        <span className="text-primary" ><RenderText group="shared" variable="table" /></span> :
                                        order.customer_type === "Online" ? <span className="text-secondary" ><RenderText group="shared" variable="percel" /></span> :
                                            <span className="text-blue-500" ><RenderText group="shared" variable="percel" /></span>}
                                </p>
                            </div>
                        </button>)
                    }
                </div>
                    : <NoDataMsg group="orders" variable="notOrderFound" />
            }
            {
                !!results && results?.data?.last_page > 1 && <Pagination className="my-5" currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={results?.data?.last_page} />
            }
        </>
    )
}
