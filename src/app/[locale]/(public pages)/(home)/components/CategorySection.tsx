import { categoryItems } from '@/lib/demo-data'
import Container from '@/sharedComponents/wrapper/Container'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CategorySection() {
    return (
        <section>
            <Container className='overflow-x-auto'>
                <div className="flex flex-nowrap gap-2">
                    {
                        categoryItems.map(item => <Link
                            href={item.slug}
                            className='rounded-[6px] min-w-[120px] grow group group block overflow-hidden z-30 relative' key={item.id} >
                            <Image className='object-cover w-full duration-300 group-hover:scale-105 ' src={item.img} width={300} height={400} alt="Google add banner" />
                            <span className='duration-300 group-hover:bg-secondary text-center font-semibold absolute bg-slate-800/20 py-1 backdrop-blur-xs block w-full text-white z-30 left-0 bottom-0'>
                                {item.name}
                            </span>
                        </Link>)
                    }
                </div>
            </Container>
        </section>
    )
}
