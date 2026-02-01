import Container from '@/sharedComponents/wrapper/Container'
import Orders from './components/Orders'

export default function OrdersPage() {
    return (
        <section className="w-full mt-[81px] pb-20 md:pb-7 lg:pb-10">
            <Container className="w-full">
                <Orders />
            </Container>
        </section>
    )
}
