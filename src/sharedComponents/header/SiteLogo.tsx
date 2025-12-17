import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function SiteLogo() {
    return (
        <Link href="/" className='inline-block -mb-2.5 py-2'>
            <Image className='w-full min-w-[140px] lg:min-w-[160px] max-w-[160px] h-auto' width={190} height={42} src="/images/shared/site-logo.svg" alt="Site logo" />
        </Link>
    )
}