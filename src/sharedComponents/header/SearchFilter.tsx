import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl';

export default function SearchFilter() {
    const tCategory = useTranslations('header.categories');
    const tSearch = useTranslations('header.search');
    return (
        <div className='hidden lg:flex fg_rounded items-center  h-9 gap-2'>
            <Select>
                <SelectTrigger className="!border-none !shadow-none btn-primary">
                    <SelectValue placeholder={tCategory('all')} />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="burger">{tCategory('burger')}</SelectItem>
                    <SelectItem value="pizza">{tCategory('pizza')}</SelectItem>
                    <SelectItem value="sushi">{tCategory('sushi')}</SelectItem>
                    <SelectItem value="pasta">{tCategory('pasta')}</SelectItem>
                    <SelectItem value="taco">{tCategory('taco')}</SelectItem>
                    <SelectItem value="salad">{tCategory('salad')}</SelectItem>
                    <SelectItem value="steak">{tCategory('steak')}</SelectItem>
                    <SelectItem value="soup">{tCategory('soup')}</SelectItem>
                    <SelectItem value="sandwich">{tCategory('sandwich')}</SelectItem>
                    <SelectItem value="dessert">{tCategory('dessert')}</SelectItem>
                    <SelectItem value="appetizer">{tCategory('appetizer')}</SelectItem>
                    <SelectItem value="drink">{tCategory('drink')}</SelectItem>
                </SelectContent>
            </Select>
            <div className="grow flex gap-2">
                <input type="text" className='grow fg_fs-sm lg:min-w-[150px] xl:min-w-[350px] py-1 rounded-[4px] px-3 bg-white focus:border-0 focus:outline-0' placeholder={tSearch('placeholder')} />
                <Button variant="primary" className='mr-4 text-white'>
                    {
                        tSearch('btn')
                    }
                </Button>
            </div>
        </div>
    )
}