import Container from '../wrapper/Container';
import bkashPaymentIcons from '@/assets/icons/bkash.png';
import nagadPaymentIcons from '@/assets/icons/nagad.png';
import Image from 'next/image';

function CopyRight() {
  return (
    <section className='fg_border-primary mt-12 border-t'>
      <Container className='flex flex-col items-center justify-between py-1 md:flex-row'>
        <p className='text-muted-foreground py-2 !text-sm'>
          © {new Date().getFullYear().toString()} CellsDeal. All rights reserved.
        </p>
        <ul className='flex items-center gap-2'>
          <li>
            <Image src={bkashPaymentIcons.src} height={20} width={40} alt='bkash' />
          </li>
          <li>
            <Image src={nagadPaymentIcons.src} height={20} width={40} alt='nagad' />
          </li>
        </ul>
      </Container>
    </section>
  );
}

export default CopyRight;
