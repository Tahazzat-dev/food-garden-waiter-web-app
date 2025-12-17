'use client';

import { ClockFading } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { camerasData } from '@/lib/demo-data';

export function RecentlyViewed() {
  const recentProducts = camerasData.slice(0, 10);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='relative cursor-pointer'>
          <ClockFading className='h-7 w-7 rounded-full bg-white text-black' />
          {recentProducts.length > 0 && (
            <span className='absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-medium text-black'>
              {recentProducts.length}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[300px] md:w-[850px]'>
        <DropdownMenuLabel>Recently Viewed</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {recentProducts.length === 0 ? (
          <div className='text-muted-foreground py-6 text-center text-sm'>
            No recently viewed products
          </div>
        ) : (
          <div className='max-h-96 overflow-y-auto'>
            {recentProducts.map((product) => (
              <DropdownMenuItem key={product.id} asChild>
                <Link
                  href={`/product/${product.id}`}
                  className='flex cursor-pointer items-center gap-3 py-2'
                >
                  <div className='bg-muted relative h-12 w-12 flex-shrink-0 overflow-hidden rounded border'>
                    <Image
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-sm font-medium'>{product.name}</p>
                  </div>
                  <div className='flex-shrink-0 text-sm font-semibold'>
                    ${product.priceMin.toFixed(2)}
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
