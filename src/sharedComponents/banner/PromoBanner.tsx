'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface PromoBannerProps {
  label: string;
  title: string;
  subtitle?: string;
  image: string;
  buttonText?: string;
  variant?: 'primary' | 'secondary';
  onButtonClick?: () => void;
}

export function PromoBanner({
  label,
  title,
  subtitle,
  image,
  buttonText = 'Shop Now',
  variant = 'primary',
  onButtonClick,
}: PromoBannerProps) {
  const bgColor = variant === 'primary' ? 'bg-primary/80' : 'bg-secondary/90';

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${bgColor} flex min-h-[280px] flex-col items-center justify-between px-8 py-2 lg:flex-row`}
    >
      {/* Image */}
      <div className='relative flex h-full w-[45%] items-center justify-center'>
        <Image
          src={image || '/src/assets/img/demo-products/placeholder.svg'}
          alt={title}
          width={400}
          height={300}
          className='object-contain drop-shadow-2xl'
        />
      </div>

      {/* Content */}
      <div className='relative z-10 flex w-full flex-col gap-4 lg:w-1/2'>
        <span className='text-sm font-medium tracking-wider text-white/90 uppercase'>{label}</span>
        <h2 className='text-4xl leading-tight font-bold text-white lg:text-5xl'>{title}</h2>
        {subtitle && <p className='text-lg font-medium text-white/90'>{subtitle}</p>}
        <Button onClick={onButtonClick} variant={'outline'} size={'lg'}>
          {buttonText}
          <ArrowRight className='ml-2 h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
