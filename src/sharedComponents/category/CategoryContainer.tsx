import Container from '@/sharedComponents/wrapper/Container'
import { cn, getData } from '@/lib/utils'
import { TCategory } from '@/types/types';
import { SaveCategory } from '../dataLoader/InitialDataLoader';
import Categories from './Categories';

export default async function CategorySection({ className }: { className?: string }) {
    const result = await getData('/categories');
    const categories = result?.data || [] as TCategory[];
    return (
        <>
            <SaveCategory categories={categories} />
            <section className={cn("bg-inherit", className)}>
                <div className="w-full pb-1 mb-1">
                    <Container className=''>
                        <div className="w-full category-container overflow-x-auto mt-2 lg:mt-1 lg:pt-3 pb-2">
                            <Categories categories={categories} />
                            {/* <div className=" flex flex-nowrap gap-2">
                                <Category isIndex={true} item={allCategory} key="ALL_CATEGORY_DEFAULT" />
                                {
                                    categories.map((item: TCategory) => <Category isIndex={false} item={item} key={item.id} />
                                    )}
                            </div> */}
                        </div>
                    </Container>
                </div>
            </section>
        </>
    )
}