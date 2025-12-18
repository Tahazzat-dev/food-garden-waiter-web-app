import SearchFilter from '@/sharedComponents/header/SearchFilter'
import Container from '@/sharedComponents/wrapper/Container'

export default function MobileSearch() {
    return (
        <>
            <Container className='sticky top-[54px] py-8 left-0'>
                <div className='relative max-w-[600px]  mx-auto flex lg:hidden fg_rounded items-center  h-9 gap-2'>
                    <SearchFilter className='!bg-white' />
                </div>
            </Container>
        </>
    )
}
