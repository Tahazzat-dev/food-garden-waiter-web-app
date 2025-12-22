import { Button } from '@/components/ui/button'
import Container from '@/sharedComponents/wrapper/Container'
// import Image from 'next/image'

export default function AddsSection() {
    return (
        <section className='w-full' >
            <Container className='my-4 '>
                <div className="w-full flex items-center justify-center min-h-[200px] bg-slate-300 relative">

                    <h5 className='text-center'>Your ads here</h5>
                    <Button variant="primary" className='absolute top-[50%] translate-y-[-50%] right-10 lg:right-20' >
                        Visit
                    </Button>

                    {/* <Image className='object-cover w-full h-[200px]' src="/images/home/add-banner.png" width={300} height={400} alt="Google add banner" /> */}
                </div>
            </Container>
        </section>
    )
}
