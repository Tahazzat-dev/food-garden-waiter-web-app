import React from 'react';
import Container from '../wrapper/Container';
import Link from 'next/link';
import { Heart, User } from 'lucide-react';
import SearchFilter from './SearchFilter';
import { VerticalDivider } from '../utils/Utils';
import PublicSidebar from './PublicSidebar';
import { CartSheet } from '../cart/CartSheet';
import SiteLogo from './SiteLogo';
import LocaleSwitcher from '../toggler/LocaleSwitcher';
import { useTranslations } from 'next-intl';
import ThemeSwitcher from '../toggler/ThemeSwitcher';

export default function PubliceHeader() {
  const tTracking = useTranslations('header');
  return (
    <>
      <section className='z-[9998] w-full fixed top-0 left-0 py-1 bg-[var(--bg-header)]'>
        <Container className='flex items-center gap-3 lg:justify-between lg:gap-5'>
          <div className="grow lg:grow-0 flex items-center justify-between lg:justify-start gap-4 lg:gap-5">
            <PublicSidebar />
            <SiteLogo />
          </div>
          <div className='hidden lg:flex fg_rounded items-center  h-9 gap-2'>
            <SearchFilter />
          </div>
          <div className='flex grow items-center justify-end gap-3  lg:grow-0 lg:justify-between'>
            <div className='hidden text-white items-center gap-2 md:flex'>
              <span className='fg_fs-xs '>{tTracking('trackingTxt')}</span>
            </div>
            <VerticalDivider className='hidden h-full lg:block' />
            <Link href='' className='text-white hidden md:block'>
              <Heart fill='white' className='h-6 w-6' />
            </Link>
            <CartSheet />
            <div className='text-white'>
              <User fill='white' className='h-6 w-6' />
            </div>
            <LocaleSwitcher type='ghost' className='hidden xl:block' />
            <ThemeSwitcher type='ghost' className='hidden xl:flex' />
          </div>
        </Container>
      </section>
    </>
  );
}
