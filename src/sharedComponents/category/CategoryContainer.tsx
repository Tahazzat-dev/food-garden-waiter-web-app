import Container from '@/sharedComponents/wrapper/Container'
import { cn, getData } from '@/lib/utils'
import Category from './Category'
import { TCategory } from '@/types/types';

export default async function CategorySection({ className }: { className?: string }) {
    const result = await getData('/categories');
    const categories = result?.data || [];
    return (
        <section className={cn("bg-inherit", className)}>
            <div className="w-full pb-1 mb-1">
                <Container className=''>
                    <div className="w-full category-container overflow-x-auto mt-4 lg:mt-1 lg:pt-3 pb-2">
                        <div className=" flex flex-nowrap gap-2">
                            {
                                categories.map((item: TCategory, i: number) => <Category isIndex={i === 0} item={item} key={item.id} />
                                )}
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    )
}