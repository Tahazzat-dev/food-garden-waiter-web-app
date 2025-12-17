import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SearchFilter() {
    return (
        <div className='hidden lg:flex fg_rounded items-center  h-9 gap-2'>
            <Select>
                <SelectTrigger className="!border-none !shadow-none btn-primary">
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent >
                    <SelectItem value="burger">Burger</SelectItem>
                    <SelectItem value="pizza">Pizza</SelectItem>
                    <SelectItem value="sushi">Sushi</SelectItem>
                    <SelectItem value="pasta">Pasta</SelectItem>
                    <SelectItem value="taco">Taco</SelectItem>
                    <SelectItem value="salad">Salad</SelectItem>
                    <SelectItem value="steak">Steak</SelectItem>
                    <SelectItem value="soup">Soup</SelectItem>
                    <SelectItem value="sandwich">Sandwich</SelectItem>
                    <SelectItem value="dessert">Dessert</SelectItem>
                    <SelectItem value="appetizer">Appetizer</SelectItem>
                    <SelectItem value="drink">Drink</SelectItem>
                </SelectContent>
            </Select>
            <div className="grow flex gap-2">
                <input type="text" className='grow fg_fs-sm lg:min-w-[350px] py-1 rounded-[4px] px-3 bg-white focus:border-0 focus:outline-0' placeholder='Search' />
                <Button variant="primary" className='mr-4 text-white'>
                    Search
                </Button>
            </div>
        </div>
    )
}