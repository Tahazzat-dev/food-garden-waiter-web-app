import SearchFilter from '@/sharedComponents/header/SearchFilter'
import Container from '@/sharedComponents/wrapper/Container'

export default function MobileSearch() {
    return (
        <>
            <Container className='sticky z-[9999] top-[60px] py-8 left-0 lg:hidden'>
                <div className='relative max-w-[600px]  mx-auto flex fg_rounded items-center  h-9 gap-2'>
                    <SearchFilter className='!bg-white' />
                </div>
            </Container>
        </>
    )
}
