import { MenuIcon, X } from "lucide-react"

export function MenuTabSwitcher() {
    return (
        <div className="flex w-full  flex-col gap-6">
            <ul className="flex flex-col">
                <li className="border-b border-slate-200 py-2.5">
                    <Link href="/" className="hover:text-primary transition-colors">
                        Home
                    </Link>
                </li>
                <li className="border-b border-slate-200 py-2.5">
                    <Link href="/shop" className="hover:text-primary transition-colors">
                        Shop
                    </Link>
                </li>
                <li className="border-b border-slate-200 py-2.5">
                    <Link href="/vendor" className="hover:text-primary transition-colors">
                        Vendor
                    </Link>
                </li>
                <li className="border-b border-slate-200 py-2.5">
                    <Link href="/blogs" className="hover:text-primary transition-colors">
                        Blogs
                    </Link>
                </li>
                <li className="border-b border-slate-200 py-2.5">
                    <Link href="/elements" className="hover:text-primary transition-colors">
                        Elements
                    </Link>
                </li>
                <li className="border-b border-slate-200 py-2.5">
                    <Link href="/elements" className="hover:text-primary transition-colors">
                        Parcel Tracking
                    </Link>
                </li>
                <li className="border-b border-slate-200 py-2.5 flex items-center justify-between">
                    <span>Language</span><LocaleSwitcher />
                </li>
                <li className="border-b border-slate-200 py-2.5 flex items-center justify-between">
                    <span>Theme</span> <ThemeSwitcher />
                </li>
            </ul>
        </div>
    )
}



import * as React from "react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SiteLogo from "./SiteLogo"
import Image from "next/image"
import LocaleSwitcher from "../toggler/LocaleSwitcher"
import ThemeSwitcher from "../toggler/ThemeSwitcher"
export default function PublicSidebar() {
    return (
        <Drawer direction="left" >
            <DrawerTrigger asChild>
                <Button className="!px-2.5 !h-auto !border-0" >
                    <MenuIcon size={45} className='w-5 md:w-6 h-5 md:h-6 text-white' />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="w-full h-full p-5 pt-2">
                    <div className="w-full flex items-center gap-5 mb-4">
                        <div className="grow flex">
                            {/* <SiteLogo /> */}
                            <Image className='w-full fill-black text-black min-w-[140px] lg:min-w-[160px] max-w-[160px] h-auto' width={190} height={42} src="/images/shared/site-logo-black.svg" alt="Site logo" />
                        </div>

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

