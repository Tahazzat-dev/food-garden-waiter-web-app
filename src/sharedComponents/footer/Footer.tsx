import { ContactInfo, FooterMenus } from '@/types/data';
import Container from '../wrapper/Container';
import FooterMenu from './FooterMenu';
import logo from '@/assets/img/logo.png';
import Image from 'next/image';
import FooterContact from './FooterContact';
import Newsletter from './Newsletter';
import CopyRight from './CopyRight';

export const footerLinks: FooterMenus[] = [
  {
    title: 'Company',
    links: [
      { name: 'What is Flashmart?', url: '/about-flashmart' },
      { name: 'Requirements', url: '/requirements' },
      { name: 'Jobs & Jobs', url: '/jobs' },
      { name: 'Contacts', url: '/contacts' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Contact Us', url: '/contact' },
      { name: 'Delivery', url: '/delivery' },
      { name: 'Payment', url: '/payment' },
      { name: 'Purchase Returns', url: '/purchase-returns' },
    ],
  },
  {
    title: 'Shop',
    links: [
      { name: 'Cart', url: '/cart' },
      { name: 'Wishlist', url: '/wishlist' },
      { name: 'Checkout', url: '/checkout' },
      { name: 'My Account', url: '/account' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { name: 'About Us', url: '/about' },
      { name: 'Contact Us', url: '/contact' },
      { name: 'Order Status', url: '/order-status' },
      { name: 'Shipping & Returns', url: '/shipping-returns' },
      { name: 'Privacy Policy', url: '/privacy-policy' },
    ],
  },
  {
    title: 'Our Mission',
    links: [
      { name: 'Payment Methods', url: '/payment-methods' },
      { name: 'Money-back guarantee!', url: '/money-back' },
      { name: 'Products Returns', url: '/products-returns' },
      { name: 'Support Center', url: '/support' },
      { name: 'Shipping', url: '/shipping' },
    ],
  },
];

export const contactInfo: ContactInfo[] = [
  {
    title: 'Service Center',
    address: '02 Birch Coppice Business Park, Morson, Tamworth, B78 1SE',
    phone: '0(800)123-456',
    email: 'support@wolmart.com',
  },
  {
    title: 'Shipping Center',
    phone: '0(800)123-456',
    hotline: '0(800)456-789',
    email: 'contact@wolmart.com',
  },
];

function Footer() {
  return (
    <footer className=''>
      <Container>
        <section className='cd-border-primary flex flex-wrap items-start justify-between gap-2 border-b pb-11'>
          {footerLinks?.map((menu, idx) => (
            <FooterMenu key={idx} menu={menu} />
          ))}
        </section>
        <section className='mt-11 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4'>
          <div>
            <Image src={logo.src} alt='CellsDeal' width={200} height={100} />
            <p className='text-muted-foreground max-w-3xs text-justify !text-sm'>
              Ac tincidunt vitae semper quis lectus tiamno quam lacus suspendisse fau cibus inte
              dums uere lorem ipsume velit dignis
            </p>
          </div>
          {contactInfo?.map((info, idx) => (
            <FooterContact key={idx} info={info} />
          ))}
          <Newsletter />
        </section>
      </Container>
      <CopyRight />
    </footer>
  );
}

export default Footer;
