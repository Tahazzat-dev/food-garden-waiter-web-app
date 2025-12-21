import { Card } from '@/components/ui/card'
import { HeartIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function FoodCart({ }) {
    return (
        <Card className='p-4'>
            <div className="w-full relative">
                <button>
                    <HeartIcon className='text-secondary' />
                </button>
                <Image src="/public/images/services/service-marketing-white-icon.png" width={300} height={400} alt="" />
            </div>
        </Card>
    )
}
