'use client';
import { trimText } from '@/utils/blog';
import { formatDateToShortString } from '@/utils/date';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  thumnail: string;
  title: string;
  excerpt?: string;
  description: string;
  slug: string;
  createdAt: string;
};
export default function BlogCardWrapper({
  thumnail,
  createdAt,
  title,
  excerpt = '',
  description,
  children,
  slug,
}: Props) {
  const isDashboard = usePathname()?.includes('settings');
  return (
    <Link
      href={isDashboard ? `/settings/blogs/${slug}` : `/blog/${slug}`}
      className='relative flex min-h-[500px] w-full flex-col overflow-hidden rounded-[10px] border border-slate-300 shadow-md shadow-slate-300 duration-200 hover:border-slate-400 hover:shadow lg:duration-500 lg:hover:scale-[1.02] lg:hover:shadow-xl dark:border-slate-600 dark:shadow dark:shadow-white dark:hover:shadow-md dark:hover:shadow-slate-600'
    >
      <div className='h-[230px] w-full'>
        <Image
          src={thumnail}
          width={300}
          className='h-full w-full object-cover'
          height={230}
          alt={title}
        />
      </div>
      <div className='flex w-full grow flex-col p-4'>
        <h6>{trimText(title, 52)}</h6>
        <p className='mt-2'>{trimText(excerpt ? excerpt : description, 133)}</p>
        <div className='flex w-full grow items-end'>
          <div className='flex w-full items-center justify-between'>
            <p>{formatDateToShortString(createdAt)}</p>
            {children}
          </div>
        </div>
      </div>
    </Link>
  );
}
