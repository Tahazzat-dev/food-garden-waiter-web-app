import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

function BreadcrumbHeading({ currentPage }: { currentPage: string }) {
  return (
    <section className='mb-12'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href='/cart'
                className={`${currentPage === 'cart' && 'text-primary font-bold'}`}
              >
                Shopping Cart
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href='/checkout'
                className={`${currentPage === 'checkout' && 'text-primary font-bold'}`}
              >
                Checkout
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </section>
  );
}

export default BreadcrumbHeading;
