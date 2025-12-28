import SearchFilter from '@/sharedComponents/header/SearchFilter'
import Container from '@/sharedComponents/wrapper/Container'

export default function MobileSearch() {
    return (
        <>
            <Container className='bg-inherit sticky z-[9997] top-[81px] py-2 my-2 md:my-4 lg:my-6 left-0 lg:hidden'>
                <div className='relative max-w-[600px] mx-auto flex fg_rounded items-center  h-9 gap-2'>
                    <SearchFilter className='!bg-white dark:!bg-slate-700 border border-slate-300 dark:border-slate-500/50 focus:!border-slate-400/60' />
                </div>
            </Container>
        </>
    )
}
