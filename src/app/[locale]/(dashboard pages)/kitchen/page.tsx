import Container from "@/sharedComponents/wrapper/Container";
import PreparingFoods from "./components/PreparingFoods";

export default async function KitchenPage() {
    return (
        <section className="w-full mt-[81px]  pb-20 md:pb-7 lg:pb-10">
            <Container className="w-full">
                <PreparingFoods />
            </Container>
        </section>
    )
}

