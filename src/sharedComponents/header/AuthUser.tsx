"use client"

import { logoutUser } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { getResponsiveRightStyle } from '@/lib/utils';
import { SET_EXPAND } from '@/redux/features/actions/actionSlice';
import { RootState } from '@/redux/store';
import * as Dialog from "@radix-ui/react-dialog";
import { IdCardLanyard, User, X } from 'lucide-react';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from "../loading/LoadingSpinner";
import RenderText from "../utils/RenderText";


export function AuthUser() {
    // variables
    const KEY = "OPEN_PROFILE_MODAL"
    // hooks
    const dispatch = useDispatch();
    const router = useRouter()
    const { favouriteProducts } = useSelector((state: RootState) => state.productSlice);
    const { authUser } = useSelector((state: RootState) => state.auth);
    const { EXPAND } = useSelector((state: RootState) => state.actions);
    const [mounted, setMounted] = useState(false);
    const cartRef = useRef<HTMLButtonElement | null>(null)
    const [style, setStyle] = useState<CSSProperties>({})
    const [isLoading, setIsLoading] = useState(false)

    // handlers 
    const openModal = () => {
        if (!cartRef.current || typeof window === "undefined") return;
        const elStyle = getResponsiveRightStyle(cartRef)
        setStyle(elStyle)
        dispatch(SET_EXPAND(KEY));
    }

    const closeModal = () => {
        dispatch(SET_EXPAND(null));
    }

    const handleLogout = async () => {
        setIsLoading(true)
        try {
            await logoutUser()
            router.replace('/login');
        } catch (error) {
            console.log(error, ' error msg');
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const elStyle = getResponsiveRightStyle(cartRef)
        setStyle(elStyle)
    }, [cartRef])


    if (!mounted) return null;
    return (
        <>
            <button ref={cartRef} onClick={openModal} className='relative'>
                <User onClick={() => dispatch(SET_EXPAND("OPEN_PROFILE_MODAL"))} fill='white' className='text-white h-6 w-6 cursor-pointer' />
                {
                    favouriteProducts.length > 0 ?
                        <span className='flex items-center justify-center text-xs px-0.5 min-w-4 min-h-4  absolute -top-[40%] left-[80%] translate-x-[-50%] bg-secondary text-white rounded-full p-[1px]'>{favouriteProducts.length}</span> : <></>
                }
                {/* {EXPAND === KEY && <span className='w-5 h-5 rotate-45 bg-primary absolute pointer-events-none top-[190%] left-1/2 -translate-x-1/2'></span>} */}
            </button>


            <Dialog.Root open={EXPAND === KEY} onOpenChange={closeModal}>
                <Dialog.Portal>
                    <div className="fixed inset-0 global-overlay wishlist-overlay top-[81px] !border-none lg:top-[83.53px] z-[9999]" />
                    <Dialog.Content style={style} className="prevent-body-trigger wishlist-modal fixed w-full flex flex-col top-[81px] !border-none !m-0 !p-0 lg:top-[83.53px] max-w-[95vw] sm:max-w-[600px] md:max-w-[600px] !rounded-[6px] md:rounded-[8px] lg:!rounded-[10px] overflow-hidden bg-body z-[99999]">
                        <div className="flex items-center justify-between bg-primary px-2.5 sm:px-4 py-2">
                            <Dialog.Title className="fg_fs-md text-white">
                                <RenderText group="authentication" variable="profile" />
                            </Dialog.Title>
                            <Button onClick={closeModal} className="rounded-full !px-2 max-h-8" variant="secondary"> <X className="!text-white w-5 md:w-6 md:h-6 h-5 lg:w-8 lg:h-8" /></Button>
                        </div>
                        <div className="px-3 md:px-4 my-2.5 md:my-4 overflow-y-auto grow flex flex-col gap-2">
                            <p className="flex items-center gap-1.5" ><span className="min-w-11"><IdCardLanyard className="w-6 h-auto" /></span><span>:</span> <span>{authUser?.id}</span></p>
                            <p className="flex items-center gap-1.5" ><span className="min-w-11"><RenderText group="authentication" variable="name" /></span><span>:</span> <span>{authUser?.fname} {authUser?.lname}</span></p>
                            <p className="flex items-center gap-1.5" ><span className="min-w-11"><RenderText group="authentication" variable="email" /></span><span>:</span> <span>{authUser?.email}</span></p>
                            <div className="w-full flex justify-end">
                                {
                                    isLoading ?
                                        <div className="w-full min-h-[32px] overflow-hidden justify-end px-5 flex items-center">
                                            <LoadingSpinner className="" />
                                        </div>
                                        :
                                        <Button onClick={handleLogout} variant="secondary" size="sm" className="text-white font-semibold" >
                                            <RenderText group="authentication" variable="logout" />
                                        </Button>
                                }
                            </div>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal >
            </Dialog.Root >
        </>
    );
}
