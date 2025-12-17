import { ContactInfo } from '@/types/data';

function FooterContact({ info }: { info: ContactInfo }) {
  return (
    <div key={info.title} className='mb-6 space-y-1'>
      <h5 className='!text-[18px] font-semibold'>{info?.title}</h5>
      {info.address && (
        <address className='text-muted-foreground text-sm not-italic'>{info.address}</address>
      )}
      {info.phone && (
        <a
          href={`tel:${info?.phone}`}
          className='text-muted-foreground block text-sm hover:underline'
        >
          <span className='font-semibold'>Tel:</span> {info?.phone}
        </a>
      )}
      {info.hotline && (
        <a
          href={`tel:${info?.hotline}`}
          className='text-muted-foreground block text-sm hover:underline'
        >
          <span className='font-semibold'>Tel:</span> {info?.hotline}
        </a>
      )}
      {info.email && (
        <p className='text-muted-foreground !text-sm'>
          <span className='font-semibold'>Email:</span>{' '}
          <a href={`mailto:${info.email}`} className='hover:underline'>
            {info.email}
          </a>
        </p>
      )}
    </div>
  );
}

export default FooterContact;
