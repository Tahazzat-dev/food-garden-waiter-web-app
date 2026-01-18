"use client"
import { Link } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import React, { ReactNode } from 'react'


type Props = {
  href: string;
  children: ReactNode;
  className?: string;
}
export default function ClientLink({ className = '', href, children }: Props) {
  const locale = useLocale()

  return <Link locale={locale} href={href} className={className} >{children}</Link>
}
