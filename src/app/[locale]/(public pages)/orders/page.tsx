
import RenderText from '@/sharedComponents/utils/RenderText'
import Container from '@/sharedComponents/wrapper/Container'
import Orders from './components/Orders'

export default async function OrdersPage() {
    return (
        <section className="w-full mt-[91px] sm:mt-[100px] md:mt-[120px] pb-20 md:pb-7 lg:pb-10">
            <Container className="w-full">
                <h1 className="mb-4 fg_fs-lg font-semibold"><RenderText group="checkout" key="similar_products_section_title" variable="orderHistory" /></h1>
                <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start">
                    <Orders />
                </div>
            </Container>
        </section>
    )
}
