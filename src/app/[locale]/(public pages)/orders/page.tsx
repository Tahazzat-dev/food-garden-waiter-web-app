// import { demoOrders } from '@/lib/demo-data'
// import { getDiscountPrice } from '@/lib/utils'
// import RenderFormatedPrice from '@/sharedComponents/utils/RenderFormatedPrice'
// import RenderText from '@/sharedComponents/utils/RenderText'
// import TranslateText from '@/sharedComponents/utils/TranslateText'
// import Container from '@/sharedComponents/wrapper/Container'
// import Image from 'next/image'

// export default function OrdersPage() {
//     return (
//         <section className="w-full mt-[91px] sm:mt-[100px] md:mt-[120px] pb-20 md:pb-7 lg:pb-10">
//             <Container className="w-full">
//                 <h1 className="mb-4 fg_fs-lg font-semibold"><RenderText group="checkout" key="similar_products_section_title" variable="orderHistory" /></h1>
//                 <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start">

//                     {demoOrders.map((order, index) => (
//                         <div
//                             key={order.id}
//                             className="rounded-xl border dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md transition"
//                         >
//                             {/* Header */}
//                             <div className="flex items-center justify-between mb-3">
//                                 <div className="flex items-center gap-2">
//                                     <span className="text-sm font-semibold text-gray-700 dark:text-gray-400">
//                                         #{index + 1}
//                                     </span>
//                                     <span className="text-xs text-gray-700 dark:text-gray-400">
//                                         {order.id}
//                                     </span>
//                                 </div>

//                                 <span
//                                     className={`text-xs px-2 py-1 rounded-full font-medium capitalize
//                                         ${order.status === "delivered" && "bg-green-100 text-green-700"}
//                                         ${order.status === "preparing" && "bg-yellow-100 text-yellow-700"}
//                                         ${order.status === "pending" && "bg-gray-100 text-gray-700"}
//                                         ${order.status === "cancelled" && "bg-red-100 text-red-700"}
//                                     `}
//                                 >
//                                     <RenderText group='shared' variable={order.status} key={`ITEM_STATUS_${order.id}`} />
//                                 </span>
//                             </div>

//                             {/* Items */}
//                             <div className="space-y-2 mb-3">
//                                 {order.items.map(item => (
//                                     <div
//                                         key={item.id}
//                                         className="flex items-center gap-3"
//                                     >
//                                         <Image
//                                             src={item.img}
//                                             alt=""
//                                             width={40}
//                                             height={40}
//                                             className="rounded-md object-cover"
//                                         />
//                                         <div className="flex-1 text-sm">
//                                             <p className="font-medium leading-tight">
//                                                 <TranslateText key={`ITEM_TITLE_${order.id}`} text={item.title} />
//                                             </p>
//                                             <p className="text-xs text-gray-500 dark:text-gray-300">
//                                                 <TranslateText key={`ITEM_NAME_${order.id}`} text={item.name} /> × {item.quantity}
//                                             </p>
//                                         </div>

//                                         <p className="text-sm font-semibold flex gap-2">
//                                             {
//                                                 item.discount > 0 && <span className='line-through'><RenderFormatedPrice price={item.price * item.quantity} key={`TOTAL_PRICE_FOR_ITEMS_${order.id}`} /></span>
//                                             }
//                                             <RenderFormatedPrice price={item.discount > 0 ? getDiscountPrice(item.price, item.discount) * item.quantity : item.price * item.quantity} key={`DISCOUNT_PRICE_CALCULATION_${order.id}`} />
//                                         </p>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Footer */}
//                             <div className="border-t pt-3 flex items-center justify-between">
//                                 <span className="text-xs text-gray-500 dark:text-gray-400">
//                                     {new Date(order.createdAt).toLocaleDateString()}
//                                 </span>

//                                 <div className="text-right">
//                                     {
//                                         order?.priceSummary?.deliveryFee > 0 && <p className='text-sm flex gap-10 items-center justify-between'><span><RenderText key={`ORDER_DELIVERY_CHARGE_${order.id}`} group='checkout' variable='deliveryCharge' /></span><span><RenderFormatedPrice price={order.priceSummary.deliveryFee} /></span></p>
//                                     }
//                                     <p className='text-sm flex gap-10 items-center justify-between'><span><RenderText key={`ORDER_TOTAL_CHARGE_${order.id}`} group='checkout' variable={order.paymentMethod} /></span><span className='text-base font-semibold'><RenderFormatedPrice price={order.priceSummary.total} /></span></p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </Container>
//         </section>
//     )
// }


import React from 'react'

export default function OrdersPage() {
    return <></>
}
