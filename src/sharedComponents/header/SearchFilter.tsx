"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { TFoodItem } from '@/types/demoData';
import { fakeSearch } from '../utils/Utils';
import LoadingSpinner from '../loading/LoadingSpinner';
import SearchProductLoader from '../loading/searchingLoader';

export default function SearchFilter({ className }: { className?: string }) {
    // translations functions
    const tCategory = useTranslations('header.categories');
    const tSearch = useTranslations('header.search');


    // hooks
    const [searchTxt, setSearchTxt] = useState('');
    const [results, setResults] = useState<TFoodItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    // 🔹 Debounce effect
    useEffect(() => {
        if (!searchTxt.trim()) {
            setResults([]);
            return;
        }
        if (intervalId) clearTimeout(intervalId);

        const timer = setTimeout(() => {
            setLoading(true);
            const matched = fakeSearch(searchTxt);
            setResults(matched);
            setLoading(false);
        }, 400); // debounce time

        setIntervalId(timer);

        return () => clearTimeout(timer);
    }, [searchTxt, intervalId]);

    // handlers
    const handleSearch = () => {
        try {
            if (!searchTxt.trim()) return;

            setLoading(true);
            // TODO: have to implement real search API later  
            // TODO: have to navigate to the all items page with search query

        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    }

    // 
    return (
        <>
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
                <input
                    value={searchTxt} onChange={(e) => setSearchTxt(e.target.value)}
                    type="text" className={clsx("dark:text-black grow fg_fs-sm w-full lg:min-w-[150px] xl:min-w-[350px] py-1 rounded-[4px] px-3 bg-white focus:border-0 focus:outline-0",
                        className)} placeholder={tSearch('placeholder')} />
                <Button onClick={handleSearch} variant="primary" className='text-white'>
                    {
                        tSearch('btn')
                    }
                </Button>
            </div>
            {
                !loading || results.length > 0 ? <div className="w-full absolute p-2 top-[110%] left-0 max-h-[300px] lg:max-h-[350px] h-auto overflow-y-auto rounded-md lg:rounded-lg min-h-20 bg-body border border-slate-300 dark:border-slate-600 shadow-sm dark:shadow-slate-600">
                    {
                        !loading && <SearchProductLoader />
                    }
                </div> : <></>
            }

        </>
    )
}