import CategorySection from "../../(home)/components/CategorySection";

export default async function SinglePage({ params }: { params: Promise<{ id: string }> }) {
    // const { id } = await params;
    return (
        <>
            <CategorySection className="sticky top-[133px] lg:top-[83.53px] left-0 z-[9998]" />
            {/* <h1>Some text</h1> */}
            <div className="w-full min-h-[200vh]">
            </div>

        </>
    )
}
