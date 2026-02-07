"use client"
import { orders as fakeOrders } from "@/lib/demo-data";
import { SET_EXPAND, updateActiveOrderDetailsModal } from "@/redux/features/actions/actionSlice";
import { useLazyGetAllOrdersQuery, useLazyGetMyOrdersQuery } from "@/redux/features/product/productApiSlice";
import { updateDetailsOrder } from "@/redux/features/product/productSlice";
import DataLoading from "@/sharedComponents/shared/Loading";
import NoDataMsg from "@/sharedComponents/shared/NoDataMsg";
import Pagination from "@/sharedComponents/shared/Pagination";
import Timer from "@/sharedComponents/shared/Timer";
import { OrdersTab } from "@/sharedComponents/tab/Tab";
import RenderFormatedPrice from "@/sharedComponents/utils/RenderFormatedPrice";
import RenderText from "@/sharedComponents/utils/RenderText";
import { IOrderResult, TOrder } from "@/types/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";


export default function Orders() {
    const dispatch = useDispatch()
    const ordersSwiperRef = useRef<SwiperType | null>(null);
    const [activeTab, setActiveTab] = useState(0)
    const orders = fakeOrders as TOrder[];

    // handlers
    const handleEditOrder = (order: TOrder) => {
        dispatch(updateDetailsOrder(order));
        dispatch(SET_EXPAND("ORDER_DETAILS_MODAL"));
    }

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
                <SwiperSlide >
                    <MyOrders />
                </SwiperSlide>
                <SwiperSlide >
                    <AllOrders />
                </SwiperSlide>
            </Swiper>
        </>
    )
}



const MyOrders = () => {
    // hooks
    const [currentPage, setCurrentPage] = useState(1);
    const [results, setResults] = useState<IOrderResult | null>(null)
    const [loadOrders, { isLoading }] = useLazyGetMyOrdersQuery();
    const dispatch = useDispatch()
    // handlers
    const handleEditOrder = (order: TOrder) => {
        dispatch(updateDetailsOrder(order));
        dispatch(updateActiveOrderDetailsModal("web"));
        dispatch(SET_EXPAND("ORDER_DETAILS_MODAL"));
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await loadOrders(`page=${currentPage}`).unwrap()
                if (res.success) {
                    setResults(res?.data || null);
                } else {
                    throw new Error("Something went wrong");
                }
            } catch (error) {
                console.log(error);
                setResults(null)
            }
        }

        loadData()
    }, [currentPage, loadOrders])

    if (isLoading) return <DataLoading />
    return <>
        {
            results?.data && !!results?.data?.length ?
                <div className="flex flex-col gap-2">
                    {
                        results?.data.map(order => <button key={order.id} onClick={() => handleEditOrder(order)} className='relative w-full flex bg-clr-card  overflow-hidden rounded-md border-slate-300 dark:border-slate-600 border group z-0'>
                            {/* demo overlay */}
                            {/* <div className="w-full flex items-center justify-center h-full z-20  absolute top-0 left-0 bg-slate-700/70">
                                <p className="text-white">Pending for approval</p>
                            </div> */}
                            {/* demo overlay */}

                            <div className="relative z-10 p-1 flex items-center justify-center">
                                {order.customer_type === "Online" ?
                                    <div className="gap-1 bg-secondary pb-0 flex flex-col w-[70px] h-[70px] overflow-hidden rounded-md">
                                        <div className="w-[35px] pt-1 flex items-center justify-center mx-auto grow overflow-hidden" >
                                            <Image src={"/images/shared/Delivery-icon-white.png"} className='z-10 w-full duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Delivery Icon" />
                                            {/* <Image src={"/images/shared/Delivery-icon-black.png"} className='block dark:hidden z-10 w-full duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Delivery Icon" /> */}
                                        </div>
                                        <p className="text-[13px] pb-0.5 rounded-[3px] bg-secondary px-0.5 font-bold text-white"><RenderText group="shared" variable="percel" /></p>
                                    </div>
                                    :
                                    order.customer_type === "Self Pickup" ?
                                        <div className="pt-1 bg-blue-500 gap-1 pb-0 flex flex-col w-[70px] h-[70px] overflow-hidden rounded-md">
                                            <div className="grow overflow-hidden mx-auto w-6 flex items-center justify-center" >
                                                <Image src={"/images/shared/percel-icon-white.png"} className='z-10 w-auto duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Table icon" />
                                                {/* <Image src={"/images/shared/percel-icon-black.png"} className='block dark:hidden z-10 w-auto duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Table icon" /> */}
                                            </div>
                                            <p className="text-[13px] pb-0.5 bg-blue-500 font-bold text-white rounded-[3px]"><RenderText group="shared" variable="percel" /></p>
                                        </div>
                                        :
                                        <div className="bg-black flex flex-col w-[70px] h-[70px] overflow-hidden rounded-md">
                                            <div className=" px-1.5 flex items-center justify-center w-[45px] mx-auto overflow-hidden grow" >
                                                {/* <Image src={"/images/shared/table-white.svg"} className='hidden dark:block z-10 w-full duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Table icon" /> */}
                                                <Image src={"/images/shared/table-white.svg"} className='z-10 w-full duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Table icon" />
                                                {/* <Image src={"/images/shared/table.svg"} className='block dark:hidden z-10 w-full duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Table icon" /> */}
                                            </div>
                                            <p className="text-[13px] pb-0.5 font-bold text-white rounded-[3px]"><RenderText group="shared" variable="table" />-5</p>
                                        </div>
                                }
                            </div>

                            <div className="grow flex z-10 flex-col bg-clr-card relative">
                                <h5 className="bg-slate-200 dark:bg-slate-800 w-full text-sm px-2 py-0.5 flex items-center gap-3 justify-between">
                                    <span className="w-[18px] h-[18px] text-sm flex items-center gap-1.5 rounded-full bg-primary p-0.5" >
                                        <Image src={"/images/shared/waiter-icon.png"} className='mr-1 z-10 w-full h-full' width={300} height={400} alt="Delivery Icon" /><span>Akash</span>
                                    </span>
                                    <Timer className="fg_fs-xxs" date={new Date(order.created_at)} />
                                </h5>
                                <div className="w-full grow flex mt-2 mb-1 justify-between items-center">
                                    <div className="px-2 w-full items-start justify-between h-full  flex flex-col ">
                                        <h6 className="text-sm items-center gap-1 flex flex-wrap leading-[130%]" >
                                            <span className="mr-1">
                                                <Image src={"/images/shared/customer-white-icon.png"} className='hidden dark:block z-10 w-4 h-auto' width={200} height={200} alt="Customer Icon" />
                                                <Image src={"/images/shared/customer-black-icon.png"} className='dark:hidden z-10 w-4 h-auto' width={200} height={200} alt="Customer Icon" />
                                            </span>
                                            <span className="text-[12px]" >{order.customer.name.length > 25 ? `${order.customer.name.slice(0, 25)}...` : order.customer.name}</span>

                                        </h6>
                                        <p className="text-[10px]">
                                            {order.customer_type === "Dine-In" ?
                                                <span className="text-primary py-0.5 bg-green-500/20 px-1 rounded-sm" ><RenderText group="shared" variable="onlineHomeDelivery" /></span> :
                                                order.customer_type === "Online" ? <span className="text-secondary bg-red-500/20 px-1 rounded-sm" ><RenderText group="shared" variable="onlineHomeDelivery" /></span> :
                                                    <span className="text-blue-500 bg-blue-500/20 px-1 rounded-sm" ><RenderText group="shared" variable="onlineTakeWay" /></span>}
                                        </p>
                                    </div>
                                    <p className="text-[15px] px-2 py-0.5 rounded-md font-bold text-primary" >
                                        <RenderFormatedPrice price={+order.final_receivable} />
                                    </p>
                                </div>
                            </div>
                        </button>)
                    }
                </div>
                : <NoDataMsg group="orders" variable="notOrderFound" />
        }
        {
            !!results && results?.last_page > 1 && <Pagination className="my-5" currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={results.last_page} />
        }
    </>
}



const AllOrders = () => {
    // hooks
    const [refetch, setRefetch] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [results, setResults] = useState<IOrderResult | null>(null)
    const [loadOrders, { isLoading }] = useLazyGetAllOrdersQuery();
    const dispatch = useDispatch()
    // handlers
    const handleEditOrder = (order: TOrder) => {
        dispatch(updateDetailsOrder(order));
        dispatch(updateActiveOrderDetailsModal("web"));
        dispatch(SET_EXPAND("ORDER_DETAILS_MODAL"));
    }

    useEffect(() => {

        if (!refetch) return;

        const loadData = async () => {
            try {
                const res = await loadOrders(`page=${currentPage}`).unwrap()
                if (res.success) {
                    setResults(res?.data || null);
                } else {
                    throw new Error("Something went wrong");
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.log(error);
                setResults(null)
            } finally {
                setRefetch(false);
            }
        }

        loadData()
    }, [currentPage, loadOrders, refetch])

    // interval for manual pooling
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setRefetch(true)
    //     }, 10000)

    //     return () => clearInterval(interval)
    // }, [])

    if (isLoading) return <DataLoading />
    // console.log("Refreshing from all orders...", results);

    return <>
        {
            results?.data && !!results?.data?.length ?
                <div className="flex flex-col gap-2">
                    {
                        results?.data.map(order => <button key={order.id} onClick={() => handleEditOrder(order)} className='relative w-full flex bg-clr-card  overflow-hidden rounded-md border-slate-300 dark:border-slate-600 border group z-0'>
                            {/* demo overlay */}
                            {/* <div className="w-full flex items-center justify-center h-full z-20  absolute top-0 left-0 bg-slate-700/70">
                                <p className="text-white">Pending for approval</p>
                            </div> */}
                            {/* demo overlay */}

                            <div className="relative z-10 p-1 flex items-center justify-center">
                                {order.customer_type === "Online" ?
                                    <div className="gap-1 bg-secondary pb-0 flex flex-col w-[70px] h-[70px] overflow-hidden rounded-md">
                                        <div className="w-[35px] pt-1 flex items-center justify-center mx-auto grow overflow-hidden" >
                                            <Image src={"/images/shared/Delivery-icon-white.png"} className='z-10 w-full duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Delivery Icon" />
                                            {/* <Image src={"/images/shared/Delivery-icon-black.png"} className='block dark:hidden z-10 w-full duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Delivery Icon" /> */}
                                        </div>
                                        <p className="text-[13px] pb-0.5 rounded-[3px] bg-secondary px-0.5 font-bold text-white"><RenderText group="shared" variable="percel" /></p>
                                    </div>
                                    :
                                    order.customer_type === "Self Pickup" ?
                                        <div className="pt-1 bg-blue-500 gap-1 pb-0 flex flex-col w-[70px] h-[70px] overflow-hidden rounded-md">
                                            <div className="grow overflow-hidden mx-auto w-6 flex items-center justify-center" >
                                                <Image src={"/images/shared/percel-icon-white.png"} className='z-10 w-auto duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Table icon" />
                                                {/* <Image src={"/images/shared/percel-icon-black.png"} className='block dark:hidden z-10 w-auto duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Table icon" /> */}
                                            </div>
                                            <p className="text-[13px] pb-0.5 bg-blue-500 font-bold text-white rounded-[3px]"><RenderText group="shared" variable="percel" /></p>
                                        </div>
                                        :
                                        <div className="bg-black flex flex-col w-[70px] h-[70px] overflow-hidden rounded-md">
                                            <div className=" px-1.5 flex items-center justify-center w-[45px] mx-auto overflow-hidden grow" >
                                                {/* <Image src={"/images/shared/table-white.svg"} className='hidden dark:block z-10 w-full duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Table icon" /> */}
                                                <Image src={"/images/shared/table-white.svg"} className='z-10 w-full duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Table icon" />
                                                {/* <Image src={"/images/shared/table.svg"} className='block dark:hidden z-10 w-full duration-300 group-hover:scale-105 h-auto' width={300} height={400} alt="Table icon" /> */}
                                            </div>
                                            <p className="text-[13px] pb-0.5 font-bold text-white rounded-[3px]"><RenderText group="shared" variable="table" />-5</p>
                                        </div>
                                }
                            </div>

                            <div className="grow flex z-10 flex-col bg-clr-card relative">
                                <h5 className="bg-slate-200 dark:bg-slate-800 w-full text-sm px-2 py-0.5 flex items-center gap-3 justify-between">
                                    <span className="w-[18px] h-[18px] text-sm flex items-center gap-1.5 rounded-full bg-primary p-0.5" >
                                        <Image src={"/images/shared/waiter-icon.png"} className='mr-1 z-10 w-full h-full' width={300} height={400} alt="Delivery Icon" /><span>Akash</span>
                                    </span>
                                    <Timer className="fg_fs-xxs" date={new Date(order.created_at)} />
                                </h5>
                                <div className="w-full grow flex mt-2 mb-1 justify-between items-center">
                                    <div className="px-2 w-full items-start justify-between h-full  flex flex-col ">
                                        <h6 className="text-sm items-center gap-1 flex flex-wrap leading-[130%]" >
                                            <span className="mr-1">
                                                <Image src={"/images/shared/customer-white-icon.png"} className='hidden dark:block z-10 w-4 h-auto' width={200} height={200} alt="Customer Icon" />
                                                <Image src={"/images/shared/customer-black-icon.png"} className='dark:hidden z-10 w-4 h-auto' width={200} height={200} alt="Customer Icon" />
                                            </span>
                                            <span className="text-[12px]" >{order.customer.name.length > 25 ? `${order.customer.name.slice(0, 25)}...` : order.customer.name}</span>

                                        </h6>
                                        <p className="text-[10px]">
                                            {order.customer_type === "Dine-In" ?
                                                <span className="text-primary py-0.5 bg-green-500/20 px-1 rounded-sm" ><RenderText group="shared" variable="onlineHomeDelivery" /></span> :
                                                order.customer_type === "Online" ? <span className="text-secondary bg-red-500/20 px-1 rounded-sm" ><RenderText group="shared" variable="onlineHomeDelivery" /></span> :
                                                    <span className="text-blue-500 bg-blue-500/20 px-1 rounded-sm" ><RenderText group="shared" variable="onlineTakeWay" /></span>}
                                        </p>
                                    </div>
                                    <p className="text-[15px] px-2 py-0.5 rounded-md font-bold text-primary" >
                                        <RenderFormatedPrice price={+order.final_receivable} />
                                    </p>
                                </div>
                            </div>
                        </button>)
                    }
                </div>
                : <NoDataMsg group="orders" variable="notOrderFound" />
        }
        {
            !!results && results?.last_page > 1 && <Pagination className="my-5" currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={results.last_page} />
        }
    </>
}