import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import fbIcon from '@/assets/icons/facebook.svg';
import twitterIcon from '@/assets/icons/twitter.svg';
import instagramIcon from '@/assets/icons/instagram.svg';
import pinterestIcon from '@/assets/icons/pinterest.svg';
import youtubeIcon from '@/assets/icons/youtube.svg';
import Image from 'next/image';

const socialLinks = [
  { icon: fbIcon, url: 'https://www.facebook.com/' },
  { icon: twitterIcon, url: 'https://www.twitter.com/' },
  { icon: instagramIcon, url: 'https://www.instagram.com/' },
  { icon: pinterestIcon, url: 'https://www.pinterest.com/' },
  { icon: youtubeIcon, url: 'https://www.youtube.com/' },
];

function Newsletter() {
  return (
    <div className='space-y-2'>
      <h5 className='!text-[18px] font-semibold'>Sign Up For NewsLetter</h5>
      <p className='text-muted-foreground !text-sm capitalize'>
        Be the first to know. Sign up for newsletter today
      </p>
      <div className='relative w-full'>
        <input
          type='email'
          placeholder='Your E-mail Address'
          className='fg_border-primary h-10 w-full rounded-full ps-4 placeholder:text-sm'
        />
        <Button
          variant={'default'}
          size={'icon'}
          className='absolute top-1/2 right-1 -translate-y-1/2 rounded-full'
        >
          <ChevronRight className='rounded-full text-white' />
        </Button>
      </div>
      <div className='mt-4'>
        {
          <ul className='flex items-center gap-2'>
            {socialLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.url} target='_blank' rel='noopener noreferrer'>
                  <Image
                    src={link.icon.src}
                    alt='social-icon'
                    className='h-8 w-8'
                    height={32}
                    width={32}
                  />
                </a>
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
}

export default Newsletter;
