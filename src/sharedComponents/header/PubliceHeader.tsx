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
      <section className='w-full py-1 bg-[var(--bg-header)]'>
        <Container className='flex items-center gap-3 lg:justify-between lg:gap-5'>
          <SiteLogo />
          <SearchFilter />
          <div className='flex grow items-center justify-end gap-5 lg:grow-0 lg:justify-between'>
            <div className='hidden text-white items-center gap-2 md:flex'>
              <span className='fg_fs-xs '>{tTracking('trackingTxt')}</span>
            </div>
            <VerticalDivider className='hidden h-full lg:block' />
            <Link href='' className='text-white hidden md:block'>
              <Heart fill='white' className='h-6 w-6' />
            </Link>
            <CartSheet />
            <div className='text-white hidden md:block'>
              <User fill='white' className='h-6 w-6' />
            </div>
            <LocaleSwitcher />
            <PublicSidebar />
            <ThemeSwitcher />
          </div>
        </Container>
      </section>
    </>
  );
}
