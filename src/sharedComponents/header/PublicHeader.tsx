import { CartSheet } from '../cart/CartSheet';
import CheckoutModal from '../modal/CheckoutModal';
import LocaleSwitcher from '../toggler/LocaleSwitcher';
import ThemeSwitcher from '../toggler/ThemeSwitcher';
import Container from '../wrapper/Container';
import { AuthUser } from './AuthUser';
import ClientLink from './ClientLink';
import PublicSidebar from './PublicSidebar';
import SiteLogo from './SiteLogo';
import TaskLists from './TaskLists';

export default function PublicHeader() {
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
          <div className='flex grow items-center justify-end gap-4  lg:grow-0 lg:justify-between'>
            <TaskLists />
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
