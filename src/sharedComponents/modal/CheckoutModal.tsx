'use client';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import * as Dialog from "@radix-ui/react-dialog";
import { ShoppingCart, Trash2, X } from "lucide-react"; // optional icon
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { addCartProduct, removeFavouriteProduct } from "@/redux/features/product/productSlice";
import { useTranslations } from 'next-intl';
import { SET_EXPAND } from '@/redux/features/actions/actionSlice';

export function CheckoutModal() {
    // variables
    const KEY = "CHECKOUT_MODAL"
    // hooks
    const dispatch = useDispatch();
    const { EXPAND } = useSelector((state: RootState) => state.actions);
    const { cartProducts } = useSelector((state: RootState) => state.productSlice);

    const t = useTranslations('checkout');
    const { locale } = useSelector((state: RootState) => state.locale)
    const openModal = EXPAND === KEY;

    return (

        <Dialog.Root open={!openModal} onOpenChange={() => dispatch(SET_EXPAND(null))}>
            <Dialog.Portal>
                <div className="fixed inset-0 global-overlay wishlist-overlay top-[81px] !border-none lg:top-[83.53px] z-[9999]" />
                <Dialog.Content className="checkout-modal fixed w-full h-full flex flex-col right-1/2 translate-x-1/2 bottom-[85px] md:bottom-5 !border-none !m-0 !p-0 max-w-[90vw] sm:max-w-[600px] md:max-w-[600px] !rounded-[6px] md:rounded-[8px] lg:!rounded-[10px] overflow-hidden bg-body z-[99999]">
                    <div className="flex items-center justify-between bg-primary px-2.5 sm:px-4 py-2">
                        <Dialog.Title className="fg_fs-md text-white">
                            {t('makeConfirmOrder')}
                        </Dialog.Title>
                        <button onClick={() => dispatch(SET_EXPAND(EXPAND === KEY ? null : KEY))} className='prevent-body-trigger relative'>
                            <ShoppingCart fill='white' className='text-white h-6 w-6 cursor-pointer' />
                            {
                                cartProducts.length > 0 ?
                                    <span className='flex items-center justify-center text-xs px-0.5 min-w-[18px] min-h-4  absolute -top-[40%] left-[80%] translate-x-[-50%] bg-secondary text-white rounded-full p-[1px]'>{cartProducts.length}</span> : <></>
                            }
                        </button>
                    </div>
                    <div className="px-2.5 md:px-4 my-2.5 md:my-4 overflow-y-auto grow flex flex-col gap-5">
                        <h4>Some checkout details</h4>
                    </div>
                </Dialog.Content>
            </Dialog.Portal >
        </Dialog.Root >

    );
}
