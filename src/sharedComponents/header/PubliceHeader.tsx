import Container from '../wrapper/Container';
import Link from 'next/link';
import SearchFilter from './SearchFilter';
import PublicSidebar from './PublicSidebar';
import { CartSheet } from '../cart/CartSheet';
import SiteLogo from './SiteLogo';
import LocaleSwitcher from '../toggler/LocaleSwitcher';
import { useTranslations } from 'next-intl';
import ThemeSwitcher from '../toggler/ThemeSwitcher';
import { FavouriteFoods } from '../favourite/FavouriteFoods';
import AuthUser from './AuthUser';
import { CheckoutModal } from '../modal/CheckoutModal';

export default function PubliceHeader() {
  const tTracking = useTranslations('header');
  return (
    <>
      <section className='z-[9998] w-full fixed top-0 left-0 py-2 bg-[var(--bg-header)]'>
        <Container className='flex items-center gap-3 lg:justify-between lg:gap-5'>
          <div className="grow lg:grow-0 flex items-center justify-between lg:justify-start gap-4 lg:gap-5">
            <PublicSidebar />
            <Link href="/" className=' inline-block'>
              <SiteLogo />
            </Link>
          </div>
          <div className='hidden relative lg:flex fg_rounded items-center  h-9 gap-2'>
            <SearchFilter />
          </div>
          <div className='flex grow items-center justify-end gap-3  lg:grow-0 lg:justify-between'>
            <div className='hidden text-white items-center gap-2 md:flex'>
              <span className='fg_fs-xs '>{tTracking('trackingTxt')}</span>
            </div>
            <FavouriteFoods />
            <CartSheet />
            <AuthUser />
            <LocaleSwitcher type='ghost' className='hidden xl:block' />
            <ThemeSwitcher type='ghost' className='hidden xl:flex' />
          </div>
        </Container>
      </section>

      {/* modals */}
      <CheckoutModal />
    </>
  );
}
