"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { TFoodItem } from '@/types/demoData';
import { fakeSearch } from '../utils/Utils';
import SearchProductLoader from '../loading/searchingLoader';
import Image from 'next/image';

export default function SearchFilter({ className }: { className?: string }) {
    // translations functions
    const tCategory = useTranslations('header.categories');
    const tSearch = useTranslations('header.search');


    // hooks
    const [searchTxt, setSearchTxt] = useState('');
    const [results, setResults] = useState<TFoodItem[]>([]);
    const [loading, setLoading] = useState(false);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!searchTxt.trim()) {
            setResults([]);
            setLoading(false);
            return;
        }

        // clear previous timer
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(async () => {
            setLoading(true);
            const matched = await fakeSearch(searchTxt);
            setResults(matched);
            setLoading(false);
        }, 400);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [searchTxt]);

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

                <SelectContent className='z-[9999]' >
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
                !!searchTxt ? <div className="w-full absolute p-2 top-[110%] left-0 h-auto rounded-md lg:rounded-lg min-h-20 bg-body border border-slate-300 dark:border-slate-600 shadow-sm dark:shadow-slate-600">
                    <div className='max-h-[300px] lg:max-h-[350px] h-auto overflow-y-auto'>
                        {
                            !!loading ? <SearchProductLoader /> :
                                results.length === 0 ? <p className='fg_fs-sm text-center py-4'>No results found</p> :
                                    <div className="w-full mx-auto space-y-2">
                                        {
                                            results.map((item) => <div
                                                key={item.price + item.titleEn}
                                                className="flex gap-2 p-2 shadow rounded-lg bg-white dark:bg-slate-700 "
                                            >
                                                <Image src={item.productImage} className='w-12 h-12' width={300} height={400} alt={item.titleEn} />
                                                <div className="flex flex-col flex-1">
                                                    <h5>{item.titleBn} | {item.titleEn}</h5>
                                                    <p className='flex items-center gap-3'><span>৳{item.discountPrice}</span> <span className='line-through'>৳{item.price}</span></p>
                                                </div>
                                            </div>)
                                        }
                                    </div>

                        }
                    </div>
                </div> : <></>
            }

        </>
    )
}