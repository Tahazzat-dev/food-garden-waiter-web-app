import CategorySection from "../(home)/components/CategorySection";

export default async function ProductsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <main className='w-full pt-[80px]'>
            <CategorySection />
            <div>
                <h1>{id}Products Page</h1>
            </div>
        </main>
    )
}
