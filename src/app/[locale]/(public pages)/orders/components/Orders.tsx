"use client"

import { getImage } from "@/lib/utils";
import { RootState } from "@/redux/store";
import RenderFormatedPrice from "@/sharedComponents/utils/RenderFormatedPrice";
import RenderText from "@/sharedComponents/utils/RenderText";
import { CreateTrnslateText } from "@/sharedComponents/utils/TranslateText";
import Image from "next/image";
import { useSelector } from "react-redux";


/*

                                    <td>
                                        @if($estimate->status == '2')
                                        <span style="padding: 5px 5px" class="badge badge-danger">Delete</span>
                                        @else
                                            @if ($estimate->convert_status == '1')
                                                <span style="padding: 5px 5px" class="badge badge-success">Delivered</span>
                                            @else
                                                <span style="padding: 5px 5px" class="badge badge-warning">Pending</span>
                                            @endif
                                        @endif
                                    </td>
*/

export default function Orders() {
    const { orders } = useSelector((state: RootState) => state.productSlice);
    return (
        <>
            {orders?.length ?
                <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start">
                    {orders?.map((order, index) => (
                        <div
                            key={order.id}
                            className="rounded-xl border dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md transition"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-400">
                                        #{index + 1}
                                    </span>
                                    <span className="text-xs text-gray-700 dark:text-gray-400">
                                        {order.order_id}
                                    </span>
                                </div>

                                <span
                                    className={`text-xs px-3 py-1 rounded-full font-medium capitalize
                                        ${order.status === 2 ? "bg-red-100 text-red-700" :
                                            order.convert_status === 1 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
                                >
                                    {/* <RenderText group='shared' variable={order.status} key={`ITEM_STATUS_${order.id}`} /> */}
                                    <span className="capitalize text-xs">{order.status === 2 ? "Deleted" : order.convert_status === 1 ? "Delivered" : "Pending"}</span>
                                </span>
                            </div>

                            {/* Items */}
                            <div className="space-y-2 mb-3">
                                {order?.items?.map(item => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-3"
                                    >
                                        <Image
                                            src={item?.product.image ? getImage(item?.product.image) : '/images/shared/food-placeholder.jpg'}
                                            alt=""
                                            width={40}
                                            height={40}
                                            className="rounded-md object-cover"
                                        />
                                        <div className="flex-1 text-sm">
                                            <p className="font-medium leading-tight">
                                                <CreateTrnslateText text={item?.product?.name || ''} />
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-300">
                                                {item?.variation?.variation || ''} × {item.qty}
                                            </p>
                                        </div>

                                        <p className="text-sm font-semibold flex gap-2">
                                            <RenderFormatedPrice price={+item.sub_total} key={`DISCOUNT_PRICE_CALCULATION_${order.id}`} />
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="border-t pt-3 flex items-center justify-between">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(order.estimate_date).toLocaleDateString()}
                                </span>

                                <div className="text-right">
                                    {
                                        Number(order?.delivery_charge || '0') > 0 && <p className='text-xs flex gap-10 items-center justify-between'><span><RenderText key={`ORDER_DELIVERY_CHARGE_${order.id}`} group='checkout' variable='deliveryCharge' /></span><span className="text-sm"><RenderFormatedPrice price={+order?.delivery_charge || 0} /></span></p>
                                    }
                                    <p className='text-sm flex gap-10 items-center justify-between'><span><RenderText group="shared" variable="totalBill" /></span><span className='text-base font-semibold'><RenderFormatedPrice price={+order.final_receivable} /></span></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> : <div className="w-full min-h-40 flex items-center  justify-center">
                    <p><RenderText group="pages" variable="noOrder" /></p>
                </div>
            }
        </>
    )
}
