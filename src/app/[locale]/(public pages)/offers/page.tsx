import { demoProducts } from "@/lib/demo-data";
import Container from "@/sharedComponents/wrapper/Container";
import FoodCart from "../(home)/components/FoodCart";
import RenderText from "@/sharedComponents/utils/RenderText";

// get product
const getDiscountedProducts = async () => {
    // const baseURL = process.env.API_URL;
    // if(!baseURL) return null;

    // const res =  await fetch(`${baseURL}/products/discount`);
    // const result = await res.json();
    // return result.product;
    // fake product search
    const discountedProducts = demoProducts.filter(product =>
        product.variants.some(variant => variant.discount > 0)
    )
    return { products: discountedProducts };
}

export default async function OffersPage() {
    const { products } = await getDiscountedProducts()
    return (
        <section className="w-full mt-[91px] sm:mt-[100px] md:mt-[120px] pb-6 md:pb-7 lg:pb-10">
            <Container className="w-full">
                <h1 className="mb-4 fg_fs-lg font-semibold"><RenderText group="shared" key="similar_products_section_title" variable="specialDiscount" /></h1>
                <div className="w-full grid gap-2.5 sm:gap-4 grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                    {
                        products.map(product => <FoodCart product={product} key={product?.id} />)
                    }
                </div>
            </Container>
        </section>
    )
}
