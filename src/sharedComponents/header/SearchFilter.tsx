"use client";
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { fakeSearch } from '../utils/Utils';
// import SearchProductLoader from '../loading/searchingLoader';
import Image from 'next/image';
// import { getDiscountPrice } from '@/lib/utils';
import useFormatPrice from '@/hooks/useFormatPrice';
import { getImage } from '@/lib/utils';
import { SET_EXPAND } from '@/redux/features/actions/actionSlice';
import { setModalProduct } from '@/redux/features/product/productSlice';
import { RootState } from '@/redux/store';
import { TProduct } from '@/types/types';
import { useDispatch, useSelector } from 'react-redux';
import RenderText from '../utils/RenderText';
import { CreateTrnslateText } from '../utils/TranslateText';

export default function SearchFilter({ className }: { className?: string }) {
    // hooks
    const dispatch = useDispatch();
    const tSearch = useTranslations('header.search');
    const { allProducts } = useSelector((state: RootState) => state.productSlice);
    const [searchTxt, setSearchTxt] = useState('');
    const [results, setResults] = useState<TProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const { formatPrice } = useFormatPrice()
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
            const matched = await fakeSearch(searchTxt, null, allProducts);
            setResults(matched);
            setLoading(false);
        }, 1);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [searchTxt, allProducts]);

    // handlers
    const handleRefresh = () => {
        setSearchTxt('');
        setResults([]);
    }

    const handleOpenProductModal = (product: TProduct) => {
        dispatch(setModalProduct(product));
        dispatch(SET_EXPAND("OPEN_PRODUCT_DETAILS_MODAL"))

        // reset query
        handleRefresh()
    }

    return (
        <>
            <div className="grow flex gap-2">
                <input
                    value={searchTxt} onChange={(e) => setSearchTxt(e.target.value)}
                    type="text" className={clsx("dark:text-black grow fg_fs-sm w-full lg:min-w-[150px] xl:min-w-[350px] py-1 rounded-[4px] px-3 bg-white focus:outline-0",
                        className)} placeholder={tSearch('placeholder')} />
                <Button onClick={handleRefresh} variant="primary" className='text-white'>
                    {
                        tSearch('btn')
                    }
                </Button>
            </div>
            {
                !!searchTxt ? <div className="w-full absolute p-2 top-[110%] left-0 h-auto rounded-md lg:rounded-lg min-h-20 bg-body border border-slate-300 dark:border-slate-600 shadow-sm dark:shadow-slate-600">
                    <div className='max-h-[300px] lg:max-h-[350px] h-auto overflow-y-auto'>
                        {
                            // !!loading ? <SearchProductLoader /> :
                            results.length === 0 && !loading ? <p className='fg_fs-sm text-center py-4'><RenderText group='shared' variable='noFoodFound' /></p> :
                                <div className="w-full mx-auto space-y-2">
                                    {
                                        results.map((item, i) => <div
                                            onClick={() => handleOpenProductModal(item)}
                                            key={item.name + i}
                                            title='Click for details'
                                            className="flex gap-2 cursor-pointer mr-0.5 p-2 shadow rounded-lg bg-white dark:bg-slate-700 "
                                        >
                                            <Image src={item?.image ? getImage(item?.image) : "/images/shared/food-placeholder.jpg"} className='w-12 h-12' width={300} height={400} alt={item.name} />
                                            <div className="flex flex-col flex-1">
                                                <h6>
                                                    <CreateTrnslateText text={item.name} />
                                                </h6>
                                                <p className='flex items-center gap-3'><span>{formatPrice(item.variations[0]?.price ? Number(item.variations[0]?.price) : 0)}</span>
                                                    {/* <span className='line-through'>৳{item?.variations[0]?.price || 0}</span> */}
                                                </p>
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