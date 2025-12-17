import { Menu, Search, X } from "lucide-react"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export function MenuTabSwitcher() {
    return (
        <div className="flex w-full  flex-col gap-6">
            <Tabs defaultValue="main-menu">
                <TabsList className="w-full !p-0 fg_rounded-sm overflow-hidden">
                    <TabsTrigger className="w-full bg-slate-100 text-black data-[state=active]:bg-[var(--primary)] data-[state=active]:text-white py-2" value="main-menu">Main Menu</TabsTrigger>
                    <TabsTrigger className="w-full bg-slate-100 text-black data-[state=active]:bg-[var(--primary)] data-[state=active]:text-white py-2" value="category">Category</TabsTrigger>
                </TabsList>
                <TabsContent value="main-menu">
                    <ul className="flex flex-col">
                        <li className="border-b fg_border py-2.5 px-2">
                            <Link href="/" className="hover:text-primary transition-colors">
                                Home
                            </Link>
                        </li>
                        <li className="border-b fg_border py-2.5 px-2">
                            <Link href="/shop" className="hover:text-primary transition-colors">
                                Shop
                            </Link>
                        </li>
                        <li className="border-b fg_border py-2.5 px-2">
                            <Link href="/vendor" className="hover:text-primary transition-colors">
                                Vendor
                            </Link>
                        </li>
                        <li className="border-b fg_border py-2.5 px-2">
                            <Link href="/blogs" className="hover:text-primary transition-colors">
                                Blogs
                            </Link>
                        </li>
                        <li className="border-b fg_border py-2.5 px-2">
                            <Link href="/elements" className="hover:text-primary transition-colors">
                                Elements
                            </Link>
                        </li>
                    </ul>
                </TabsContent>
                <TabsContent value="category">
                    <ul className="flex flex-col">
                        <li className="border-b fg_border py-2.5 px-2">
                            <Link href="/fashion" className="hover:text-primary transition-colors">
                                Fashion
                            </Link>
                        </li>
                        <li className="border-b fg_border py-2.5 px-2">
                            <Link href="/home-and-garden" className="hover:text-primary transition-colors">
                                Home & Garden
                            </Link>
                        </li>
                        <li className="border-b fg_border py-2.5 px-2">
                            <Link href="/electronics" className="hover:text-primary transition-colors">
                                Electronics
                            </Link>
                        </li>
                        <li className="border-b fg_border py-2.5 px-2">
                            <Link href="/furniture" className="hover:text-primary transition-colors">
                                Furniture
                            </Link>
                        </li>
                        <li className="border-b fg_border py-2.5 px-2">
                            <Link href="/health-and-beauty" className="hover:text-primary transition-colors">
                                Health & Beauty
                            </Link>
                        </li>
                        <li className="border-b fg_border py-2.5 px-2">
                            <Link href="/toy-and-games" className="hover:text-primary transition-colors">
                                Toy & Games
                            </Link>
                        </li>
                    </ul>
                </TabsContent>
            </Tabs>
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
export default function PublicSidebar() {
    return (
        <Drawer direction="left" >
            <DrawerTrigger asChild>
                <Button className="lg:hidden">
                    <Menu className='w-5 md:w-6 h-5 md:h-6' />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="w-full h-full p-5">
                    <div className="w-full flex items-center gap-5 mb-4">
                        <div className="grow flex border border-slate-300 fg_rounded-sm">
                            <input type="text" className='w-full fg_fs-sm px-3 focus:border-0 py-1.5 focus:outline-0' placeholder='Search in...' />
                            <button className='mr-4'>
                                <Search className='w-5 h-5 duration-300  hover:scale-105' />
                            </button>
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

