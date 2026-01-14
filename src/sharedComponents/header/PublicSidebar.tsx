import { MenuIcon, X } from "lucide-react"

export function MenuTabSwitcher() {
    // const showOfferedMark = 5;
    // const orders = 5;
    return (
        <div className="flex w-full  flex-col gap-6">
            <ul className="flex flex-col">
                <li className="border-b border-slate-200 py-2.5">
                    <Link href="/" className="hover:text-primary transition-colors">
                        <RenderText group="mobileBottomActions" variable="home" />
                    </Link>
                </li>
                <li className="border-b border-slate-200 py-2.5">
                    <Link href="/offers" className="flex items-center justify-between hover:text-primary transition-colors">
                        <RenderText group="mobileBottomActions" variable="offers" />
                        {/* {
                            !!showOfferedMark &&
                            <span className='flex items-center justify-center text-xs px-0.5 min-w-[18px] min-h-4 bg-secondary text-white rounded-full p-[1px]'>!</span>
                        } */}
                    </Link>
                </li>
                <li className="border-b border-slate-200 py-2.5">
                    <Link href="/orders" className="flex items-center justify-between hover:text-primary transition-colors">
                        <RenderText group="mobileBottomActions" variable="orders" />
                        {/* {
                            !!orders &&
                            <span className='flex items-center justify-center text-xs px-0.5 min-w-[18px] min-h-4 bg-secondary text-white rounded-full p-[1px]'>{orders}</span>
                        } */}
                    </Link>

                </li>
                {/* <li className="border-b border-slate-200 py-2.5">
                    <Link href="/elements" className="hover:text-primary transition-colors">
                        <RenderText group='header' variable='trackingTxt' />
                    </Link>
                </li> */}
                <li className="border-b border-slate-200 py-2.5 flex items-center justify-between">
                    <span><RenderText group='shared' variable='language' /></span><LocaleSwitcher />
                </li>
                <li className="border-b border-slate-200 py-2.5 flex items-center justify-between">
                    <span><RenderText group='shared' variable='theme' /></span> <ThemeSwitcher />
                </li>
            </ul>
        </div>
    )
}


import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import LocaleSwitcher from "../toggler/LocaleSwitcher"
import ThemeSwitcher from "../toggler/ThemeSwitcher"
import RenderText from "../utils/RenderText"
export default function PublicSidebar() {
    return (
        <Drawer direction="left" >
            <DrawerTrigger asChild>
                <Button className="!px-2 !h-auto !border-0" >
                    <MenuIcon className='w-5 md:w-6 h-5 md:h-6 text-white' />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="w-[78vw] max-w-[400px] top-0 left-0 z-[9999]">
                <div className="w-full h-full p-5 pt-2">
                    <div className="w-full flex items-center gap-5 mb-4">
                        <DrawerTitle className="grow flex">
                            {/* <SiteLogo /> */}
                            <Image className='w-full fill-black text-black min-w-[140px] lg:min-w-[160px] max-w-[160px] h-auto' width={190} height={42} src="/images/shared/site-logo-black.svg" alt="Site logo" />
                        </DrawerTitle>
                        {/* <div className="grow flex">
                        </div> */}
                        <div className="w-full max-w-6">
                            <DrawerClose>
                                <X className=" w-5 md:w-6 md:h-6 h-5" />
                            </DrawerClose>
                        </div>
                    </div>
                    <div className="w-full h-full">
                        <MenuTabSwitcher />
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

