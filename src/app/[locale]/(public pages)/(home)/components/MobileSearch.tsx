import { cn } from '@/lib/utils'
import SearchFilter from '@/sharedComponents/header/SearchFilter'
import Container from '@/sharedComponents/wrapper/Container'

export default function MobileSearch({ className = '' }: { className?: string }) {
    return (
        <>
            <Container className={cn("bg-inherit sticky z-[9999] top-[81px] py-2 md:my-2 lg:my-4 xl:my-6 left-0 lg:hidden", className)}>
                <div className='relative max-w-[600px] mx-auto flex fg_rounded items-center  h-9 gap-2'>
                    <SearchFilter className='!bg-white dark:!bg-slate-700 border border-slate-300 dark:border-slate-500/50 focus:!border-slate-400/60' />
                </div>
            </Container>
        </>
    )
}
