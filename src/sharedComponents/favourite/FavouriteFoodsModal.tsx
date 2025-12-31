// "use client";

// import * as Dialog from "@radix-ui/react-dialog";
// import { ShoppingCart, Trash2, X } from "lucide-react"; // optional icon
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { useEffect } from "react";
// import { RootState } from "@/redux/store";
// import { useDispatch, useSelector } from "react-redux";
// import { useTranslations } from "next-intl";
// import { addCartProduct, removeFavouriteProduct } from "@/redux/features/product/productSlice";
// import { demoProducts } from "@/lib/demo-data";

// interface Props {
//     open: boolean;
//     onOpenChange: () => void;
// }

// export function FavouriteFoodsModal({ open, onOpenChange }: Props) {
//     const t = useTranslations('shared');
//     const dispatch = useDispatch();
//     const { favouriteProducts, cartProducts } = useSelector((state: RootState) => state.productSlice);
//     const { locale } = useSelector((state: RootState) => state.locale)

//     useEffect(() => {
//         if (open) {
//             document.body.style.overflow = "hidden";
//         } else {
//             document.body.style.overflow = "";
//         }

//         return () => {
//             document.body.style.overflow = "";
//         };
//     }, [open]);
//     return (
//         <Dialog.Root open={open} onOpenChange={onOpenChange}>
//             <Dialog.Portal>
//                 {/* <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]" /> */}
//                 <Dialog.Content dir="top" className="fixed !max-h-[70vh] flex flex-col top-[86px] sm:top-[84px] md:top-[81px] lg:top-[83.53px] left-1/2 md:max-h-[70vh]  max-w-[93vw] md:max-w-[700px] !rounded-[10px] lg:!rounded-[12px] overflow-hidden w-full bg-body rounded-lg shadow-lg dark:shadow-slate-800 z-[99999]">
//                     <div className="flex items-center justify-between bg-primary px-2.5 sm:px-4 py-2">
//                         <Dialog.Title className="fg_fs-md text-white">
//                             {t('favouriteFoods')}
//                         </Dialog.Title>
//                         <Button onClick={onOpenChange} className="rounded-full !px-2.5" variant="secondary"> <X className="!text-white w-5 md:w-6 md:h-6 h-5 lg:w-8 lg:h-8" /></Button>
//                     </div>
//                     <div className="px-2.5 md:px-4 my-2.5 md:my-4 overflow-y-auto grow flex flex-col gap-5">
//                         {
//                             favouriteProducts.length > 0 ?
//                                 favouriteProducts.map((food) => {
//                                     const discountedPrice = food.price - (food.price * food.discount) / 100;
//                                     const isAddedToCart = cartProducts.some(item => item.id === food.id);
//                                     return <div key={food.id} className='flex gap-3 pb-3'>
//                                         <div className='bg-muted relative w-14 h-14 lg:w-16 lg:h-16 xl:w-[72px] xl:h-[72px] rounded-md overflow-hidden'>
//                                             <Image
//                                                 src={food.img || '/images/placeholder/placeholder.jpg'}
//                                                 alt={locale === "bn" ? food.title.bn : food.title.en || 'Product Image'}
//                                                 width={72}
//                                                 height={72}
//                                                 className='object-cover w-full h-full'
//                                             />
//                                         </div>

//                                         <div className='flex gap-1 justify-between flex-grow'>
//                                             <div className="flex items-center flex-grow gap-2 justify-between">
//                                                 <div className="flex flex-col gap-1 justify-between">
//                                                     <div className="w-full grow">
//                                                         <h6 className='line-clamp-2 text-primary leading-tight font-medium'>{locale === "bn" ? food.title.bn : food.title.en}</h6>
//                                                         <p className='text-muted-foreground fg_fs-xs text-primary font-medium'>{locale === "bn" ? food.title.bn : food.title.en}</p>
//                                                     </div>
//                                                     <p className='fg_fs-sm'>{food.discount < 1 ? <span className=''>{food?.price}TK</span> : <span className='flex items-center gap-3'> <span className='line-through fg_fs-xs'>{food?.price}TK</span> <span className='text-primary'>{discountedPrice}TK</span></span>}</p>
//                                                 </div>

//                                             </div>

//                                             <div className='flex flex-col justify-between items-end'>
//                                                 <Button
//                                                     variant='secondary'
//                                                     size='icon'
//                                                     className='p-1 h-6 w-6 rounded-full shadow-sm'
//                                                     onClick={() => dispatch(removeFavouriteProduct(food.id))}
//                                                 >
//                                                     <Trash2 className='text-white  h-3 w-3' />
//                                                 </Button>
//                                                 <Button onClick={() => { dispatch(addCartProduct({ ...food, quantity: 1 })) }} className={`mt-2 fg_fs-xxs text-white font-semibold  ${isAddedToCart ? ' bg-secondary hover:bg-secondary !cursor-not-allowed' : 'custom-shadow-md  bg-primary hover:bg-primary-500'}`} ><ShoppingCart /> <span>{t('addToCart')}</span></Button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                 })

//                                 : <p className="text-center text-muted-foreground py-4">{t('noFavouriteFoods')}</p>
//                         }
//                     </div>
//                 </Dialog.Content>
//             </Dialog.Portal >
//         </Dialog.Root >
//     );
// }



'use client';
import { ShoppingCart, X } from 'lucide-react';
import { CartCard } from '../cards/CartCard';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { DialogTitle } from '@radix-ui/react-dialog';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { SET_EXPAND } from '@/redux/features/actions/actionSlice';


interface Props {
    open: boolean;
    onOpenChange: () => void;
}
export function FavouriteFoodsModal({ open, onOpenChange }: Props) {
    const dispatch = useDispatch();
    const { cartProducts } = useSelector((state: RootState) => state.productSlice);
    const { EXPAND } = useSelector((state: RootState) => state.actions);
    const openCart = EXPAND === "CART_SHEET";
    return (
        <>
            <button onClick={() => dispatch(SET_EXPAND('CART_SHEET'))} className='relative'>
                <ShoppingCart fill='white' className='text-white h-6 w-6 cursor-pointer' />
                {
                    cartProducts.length > 0 ?
                        <span className='flex items-center justify-center text-xs px-0.5 min-w-[18px] min-h-4  absolute -top-[40%] left-[80%] translate-x-[-50%] bg-secondary text-white rounded-full p-[1px]'>{cartProducts.length}</span> : <></>
                }
            </button>
            <Drawer open={open} onOpenChange={onOpenChange} direction="top" >
                <DrawerContent hideOverlay={true} className="cartsheet-drawer prevent-body-trigger z-[9999] w-[90vw] max-w-[450px] top-[86px] sm:top-[84px] md:top-[81px] lg:top-[88px] dark:shadow-amber-50 right-0 rounded-md lg:!rounded-r-none" >
                    <div className="w-full h-full flex flex-col">
                        <div className="w-full flex items-center gap-5 py-3 px-4 bg-primary">
                            <DialogTitle className="grow flex text-white">
                                <span className='fg_fs-lg'>Add To Cart ({cartProducts.length})</span>
                            </DialogTitle>

                            <div className="w-full max-w-6">
                                <button onClick={() => dispatch(SET_EXPAND(null))} className='bg-secondary p-1 rounded-full' >
                                    <X className="text-white w-5 md:w-6 md:h-6 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="w-full h-full grow px-2.5 sm:px-4 overflow-y-auto py-4 dark:border-l dark:border-slate-700">
                            {cartProducts.map((item) => (
                                <CartCard
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </div>
                        <div className="w-full">
                            <div className="w-full flex justify-between gap-4 flex-wrap px-4 bg-black dark:bg-white clr-opposite py-2 ">
                                <p>Total Bill</p>
                                <p className='font-semibold'>{cartProducts.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}/-</p>
                            </div>
                            <button className="bg-primary fg_fs-md py-3 !text-white font-semibold !rounded-0 w-full">
                                Checkout
                            </button>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}
