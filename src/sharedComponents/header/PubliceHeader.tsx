import Container from '../wrapper/Container';
import SearchFilter from './SearchFilter';
import PublicSidebar from './PublicSidebar';
import { CartSheet } from '../cart/CartSheet';
import SiteLogo from './SiteLogo';
import LocaleSwitcher from '../toggler/LocaleSwitcher';
import ThemeSwitcher from '../toggler/ThemeSwitcher';
import { FavouriteFoods } from '../favourite/FavouriteFoods';
import CheckoutModal from '../modal/CheckoutModal';
import RenderText from '../utils/RenderText';
import ClientLink from './ClientLink';

export default function PubliceHeader() {
  return (
    <>
      <section className='z-[9999] w-full fixed top-0 left-0 py-2 bg-[var(--bg-header)]'>
        <Container className='flex items-center gap-3 lg:justify-between lg:gap-5'>
          <div className="grow lg:grow-0 flex items-center justify-between lg:justify-start gap-4 lg:gap-5">
            <PublicSidebar />
            <ClientLink className='inline-block' href='/' >
              <SiteLogo />
            </ClientLink>
          </div>
          <div className='hidden relative lg:flex fg_rounded items-center  h-9 gap-2'>
            <SearchFilter />
          </div>
          <div className='flex grow items-center justify-end gap-3  lg:grow-0 lg:justify-between'>
            <ClientLink className='hidden text-white items-center gap-2 md:flex' href='/orders' >
              <span className='fg_fs-xs '><RenderText group='header' variable='myOrder' /></span>
            </ClientLink>
            <FavouriteFoods />
            <CartSheet />
            {/* <AuthUser /> */}
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
