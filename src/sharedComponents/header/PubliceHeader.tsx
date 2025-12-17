import React from 'react';
import Container from '../wrapper/Container';
import Link from 'next/link';
import { ClockFading, Heart, MapPin, MessageCircleMore, PhoneCall, User, UserRound } from 'lucide-react';
import SearchFilter from './SearchFilter';
import { VerticalDivider } from '../utils/Utils';
// import PublicNavlinks from './PublicNavlinks';
// import AllCategories from './AllCategories';
import PublicSidebar from './PublicSidebar';
import { CartSheet } from '../cart/CartSheet';
import { RecentlyViewed } from '../dropdown/RecentlyViewed';
import SiteLogo from './SiteLogo';
import LocaleSwitcher from '../toggler/LocaleSwitcher';
import { useTranslations } from 'next-intl';

export default function PubliceHeader() {
  const tTracking = useTranslations('header');
  return (
    <>
      {/* <section className='fg_border-primary w-full border-b'>
        <Container className='flex justify-between py-2 md:py-2.5'>
          <p className='fg_fs-xs hidden md:block'><span className='animate-pulse font-semibold [animation-duration:900ms] '>Free shipping</span> <span> orders from all items</span></p>
          <div className='flex grow items-center justify-end gap-5 lg:gap-7'>
            <Link className='fg_fs-xs' href='/contact-us'>
              Contact Us
            </Link>
            <Link className='fg_fs-xs hidden lg:block' href='/my-account'>
              My Account
            </Link>
            <span className='fg_fs-xs flex items-center gap-1'>
              <UserRound className='h-4 w-4' />
              <Link href={'/login'} className='hover:text-primary hover:underline'>
                Sign In
              </Link>
              {' / '}
              <Link href={'/register'} className='hover:text-primary hover:underline'>
                Register
              </Link>
            </span>
          </div>
        </Container>
      </section> */}
      <section className='w-full py-1 bg-[#003211]'>
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
          </div>
        </Container>
      </section>
      {/* <section className='sticky top-0 left-0 z-50 hidden w-full !bg-[var(--light-primary)] py-2 text-black lg:block'>
        <Container className='flex items-center justify-between gap-5'>
          <div className='flex items-center gap-5 lg:gap-10'>
            <AllCategories />
            <PublicNavlinks />
          </div>
          <div className='flex gap-5 lg:gap-7'>
            <Link href='' className='flex flex-nowrap items-center gap-2'>
              <MapPin className='h-7 w-7 rounded-full bg-white p-1 text-black' />
              <span className='fg_fs-xs'>Track Order</span>
            </Link>
            <div className='flex flex-nowrap items-center gap-2'>
              <RecentlyViewed />
              <span className='fg_fs-xs'>Recently Viewed</span>
            </div>
          </div>
        </Container>
      </section> */}
    </>
  );
}
