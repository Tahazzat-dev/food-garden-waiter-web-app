'use client';
import { Heart } from 'lucide-react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { FavouriteFoodsModal } from './FavouriteFoodsModal';
import { useState } from 'react';


export function FavouriteFoods() {
    const { favouriteProducts } = useSelector((state: RootState) => state.productSlice);
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <button onClick={() => setIsModalOpen(true)} className='relative'>
                <Heart fill='white' className='text-white h-6 w-6 cursor-pointer' />
                {
                    favouriteProducts.length > 0 ?
                        <span className='flex items-center justify-center text-xs px-0.5 min-w-4 min-h-4  absolute -top-[40%] left-[80%] translate-x-[-50%] bg-secondary text-white rounded-full p-[1px]'>{favouriteProducts.length}</span> : <></>
                }
            </button>

            <FavouriteFoodsModal open={isModalOpen} onOpenChange={() => setIsModalOpen(false)} />
        </>
    );
}
