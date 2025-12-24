export default async function SinglePage({ params }: { params: { title: string } }) {
    const { title } = await params;
    return (
        <section className='w-full pt-[70px]'>
            <div>
                <h1>{title}</h1>
            </div>
        </section>
    )
}
