import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

export default function SiteLogo() {
    return (
        // <Link href="/" className='inline-block border border-red-500  -mb-2.5 py-2'>
        <div className='w-auto min-h-[65px] md:min-h-[67.53px] h-[65px] md:h-[67.53px] py-2.5'>
            <Image className='w-auto h-full' width={190} height={42} src="/images/shared/site-logo.svg" alt="Site logo" />
        </div>
        // <Image className='w-full min-h-[140px] lg:min-w-[160px] max-w-[160px] h-auto' width={190} height={42} src="/images/shared/site-logo.svg" alt="Site logo" />
        // </Link>
    )
}