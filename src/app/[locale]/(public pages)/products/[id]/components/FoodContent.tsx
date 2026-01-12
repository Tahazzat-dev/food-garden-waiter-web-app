// "use client"
// import { Button } from "@/components/ui/button"
// import useFormatPrice from "@/hooks/useFormatPrice"
// import useRenderText from "@/hooks/useRenderText"
// import { categoryItems } from "@/lib/demo-data"
// import { calculateSubtotal, getDiscountAmount, getDiscountPrice, getSellingPrice } from "@/lib/utils"
// import { SET_EXPAND } from "@/redux/features/actions/actionSlice"
// import { addCartProduct, updateCartProduct } from "@/redux/features/product/productSlice"
// import { RootState } from "@/redux/store"
// import { WhatsAppIcon } from "@/sharedComponents/icons/Icons"
// import { TCartProduct, TCategory, TFoodVariant, TProduct } from "@/types/types"
// import { CreditCard, Minus, Plus, ShoppingCart } from "lucide-react"
// import { useTranslations } from "next-intl"
// import { MouseEvent, useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { toast } from "react-toastify"

// const getCategory = (id: string): TCategory | null => {
//     return categoryItems.find(item => item.id === id) || null;
// }

// export default function FoodContent({ item }: { item: TProduct }) {
//     const t = useTranslations('shared');
//     const dispatch = useDispatch();
//     const [quantity, setQuantity] = useState(1);
//     const { cartProducts } = useSelector((state: RootState) => state.productSlice);
//     const [variant, setVariant] = useState<TFoodVariant | null>(null);
//     const { formatPrice } = useFormatPrice()
//     const { renderText } = useRenderText()

//     const addedItem = cartProducts.find(item => item?.id === variant?.id);

//     // handlers
//     const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
//         event.stopPropagation();
//         event.preventDefault();
//         addItemToCart(true);
//     }

//     const addItemToCart = (triggerAlert: boolean = false) => {
//         if (!item || !variant) return;
//         if (addedItem) {
//             if (addedItem.quantity === quantity) {
//                 if (triggerAlert) {
//                     toast.error(t("alreadyExist"));
//                 }
//                 return;
//             }
//             // update the quantity
//             dispatch(updateCartProduct({ product: { ...addedItem, quantity }, id: addedItem.id }))
//             if (triggerAlert) {
//                 toast.success(t("quantityUpdated"));
//             }
//             return;
//         }
//         const cartItem: TCartProduct = {
//             quantity,
//             ...variant,
//             productId: item.id,
//             categoryId: item.categoryId,
//             img: item.img,
//             title: item.title
//         }
//         dispatch(addCartProduct(cartItem));
//         if (triggerAlert) {
//             toast.success(t('addedToCart'));
//         }
//     }

//     const handleQuantityChange = (newQuantity: number) => {
//         if (newQuantity < 1) return;
//         if (!item?.id) return;
//         setQuantity(newQuantity);
//     }

//     const handleBuyNow = () => {
//         addItemToCart();
//         dispatch(SET_EXPAND("CHECKOUT_MODAL"))
//     }

//     useEffect(() => {
//         if (!item) return;
//         setQuantity(1);
//         setVariant(item?.variations[0] || null);
//     }, [item])


//     // TODO: we will get this info from redux store later;
//     const category = getCategory(item.categoryId);

//     return (
//         <div className=" w-full lg:w-6/12 p-2.5 sm:p-4 flex flex-col gap-4 md:gap-5 lg:gap-7">
//             <h1 className="fg_fs-xl lg:text-[28px] xl:text-[32px] text-primary font-semibold">{renderText(item?.title?.en, item?.title?.bn)}
//                 {variant ? " - " : ""}
//                 {variant ? renderText(variant.name.en, variant.name.bn) : ""}</h1>
//             <div className="w-full">
//                 {/* <h3 className="mb-2 md:mb-3 fg_fs-md">{t("price")} : <span className="font-semibold">{formatPrice(variant?.price || 0)}</span></h3> */}
//                 {
//                     variant?.discount && variant?.discount > 0 ? <h4 className="fg_fs-base">{t("specialDiscount")} : <span className="text-secondary font-semibold">{variant?.discount}% ({formatPrice(getDiscountAmount(variant?.price || 0, variant?.discount || 0))})</span></h4> : <></>
//                 }
//                 <h5 className="mt-1 md:mt-3 fg_fs-base">{t("category")} : <span className="text-primary">{category && renderText(category.name.en, category.name.bn)}</span></h5>
//             </div>

//             <div className="w-full">
//                 <h6 className="fg_fs-base">{t("selectVariants")}</h6>
//                 <div className="mt-1 md:mt-2 flex flex-wrap items-center gap-2">
//                     {
//                         item.variants.map(item => <Button key={item.id} onClick={() => setVariant(item)} variant={item.id === variant?.id ? "secondary" : "primary"} className="text-white custom-shadow-md !py-0.5">{renderText(item?.name?.en, item?.name?.bn)}</Button>)
//                     }
//                 </div>
//             </div>

//             <div className="w-full">
//                 {/* <p className="mb-3">{locale === "bn" ? "পণ্য নোটস:" : "Product Notes:"}</p> */}
//                 <p className="mb-0.5 md:mb-2 fg_fs-base">{t('quantity')}</p>
//                 <div className='mt-auto flex items-center justify-between bg-slate-300/60 dark:bg-slate-700 px-2 py-1 rounded-[4px]'>
//                     <p className='fg_fs-base font-semibold text-center grow '>{!!variant && variant.discount < 1 ? formatPrice(variant?.price) : getDiscountPrice(variant?.price || 0, variant?.discount || 0)}/-</p>
//                     <div className='flex items-center gap-3 rounded-md py-0.5 lg:py-1'>
//                         <Button
//                             variant='primary'
//                             size='icon'
//                             className='h-6 w-6 !rounded-full'
//                             onClick={() => handleQuantityChange(quantity - 1)}
//                         >
//                             <Minus className='h-3 w-3' />
//                         </Button>
//                         <span className='rounded-[4px] fg_fs-base py-1 bg-white dark:!text-black px-4 inline-block text-center text-xs'>{quantity}</span>
//                         <Button
//                             variant='primary'
//                             size='icon'
//                             className='h-6 w-6 !rounded-full'
//                             onClick={() => handleQuantityChange(quantity + 1)}
//                         >
//                             <Plus className='h-3 w-3' />
//                         </Button>
//                     </div>

//                     <p className='fg_fs-base font-semibold text-center grow '>{calculateSubtotal(getSellingPrice(variant?.price || 0, variant?.discount || 0), quantity)}/-</p>
//                 </div>
//             </div>

//             <div className="w-full">
//                 <div className=" w-full gap-2  md:gap-3.5 lg:gap-4 flex items-center">
//                     <Button onClick={handleAddToCart} size="lg" className={`!px-2 fg_fs-base font-semibold w-full ${addedItem && addedItem.quantity === quantity ? ' bg-secondary hover:bg-secondary' : 'custom-shadow-md  bg-primary hover:bg-primary-500'}`}>
//                         {/* <ShoppingCart className="!w-10" /> */}
//                         <span>{t('addToCart')}</span>
//                     </Button>
//                     <Button onClick={handleBuyNow} size="lg" className="fg_fs-base !px-2 font-semibold w-full custom-shadow-md  bg-primary hover:bg-primary-500">
//                         {/* <CreditCard /> */}
//                         <span>{t("buyNow")}</span></Button>
//                 </div>
//                 <div className="bg-[#37bd69] fg_fs-base overflow-hidden  h-10 items-center px-4 py-1.5 text-white justify-center mt-2.5 md:mt-3.5 lg:mt-4 xl:mt-5 flex gap-2.5 md:gap-3">
//                     <WhatsAppIcon className=" w-7 h-7" /><span className="">{t("whatsappNo")}</span>
//                 </div>
//             </div>
//         </div>
//     )
// }

import { TProduct } from '@/types/types'
import React from 'react'

export default function FoodContent({ item }: { item: TProduct }) {
    return (
        <div>FoodContent</div>
    )
}
