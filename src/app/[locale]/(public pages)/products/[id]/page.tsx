import Container from "@/sharedComponents/wrapper/Container";
import CategorySection from "../../(home)/components/CategorySection";
import Image from "next/image";
import { demoProducts } from "@/lib/demo-data";
import MobileSearch from "../../(home)/components/MobileSearch";
import { useTranslations } from "next-intl";
import NoFoodFound from "./components/NoFoodFound";
import FoodContent from "./components/FoodContent";

// get product
const getProductById = async (id: string) => {
    // const baseURL = process.env.API_URL;
    // if(!baseURL) return null;

    // const res =  await fetch(`${baseURL}/products/${id}`);
    // const result = await res.json();
    // return result.product;
    console.log(id)
    // fake product search
    return demoProducts.find(item => item.id === id) || null;
}


export default async function SinglePage({ params }: { params: Promise<{ id: string }> }) {
    // get the product
    const { id } = await params;
    const product = await getProductById(id)
    return (
        <main className="w-full mt-[62px] bg-inherit lg:mt-[83.5px]">
            <MobileSearch className="my-0 md:my-0 lg:my-0 xl:my-0" />
            <CategorySection className="sticky top-[133px] lg:top-[83.53px] left-0 z-[9998]" />
            {
                !product ? <NoFoodFound /> :
                    <div className="w-full">
                        <Container className="pt-10">
                            <div className="w-full flex border lg:gap-5 border-slate-400 dark:border-slate-600 rounded-[6px]">
                                {/* == images ====  */}
                                <div className=" w-full lg:w-6/12 flex lg:flex-col gap-2.5 md:gap-3.5 border-r border-slate-400 dark:border-slate-600 lg:gap-4 p-2.5 md:p-3.5 lg:p-4">
                                    <div className="w-5/6 lg:w-full max-h-[400px] md:max-h-[450px] lg:max-h-[500px] overflow-hidden rounded-[6px]">
                                        <Image className="w-full rounded-[6px]" src={product.img} width={300} height={400} alt={product.title.en} />
                                    </div>
                                    <div className="w-1/6 lg:w-full flex flex-col lg:flex-row gap-2.5 md:gap-3.5 lg:gap-4">
                                        <button className="overflow-hidden max-h-[100px] rounded-[4px]">
                                            <Image className="w-full rounded-[6px]" src={product.img} width={300} height={400} alt={product.title.en} />
                                        </button>
                                        <button className="overflow-hidden max-h-[100px] rounded-[4px]">
                                            <Image className="w-full rounded-[6px]" src={product.img} width={300} height={400} alt={product.title.en} />
                                        </button>
                                        <button className="overflow-hidden max-h-[100px] rounded-[4px]">
                                            <Image className="w-full rounded-[6px]" src={product.img} width={300} height={400} alt={product.title.en} />
                                        </button>
                                        <button className="overflow-hidden max-h-[100px] rounded-[4px]">
                                            <Image className="w-full rounded-[6px]" src={product.img} width={300} height={400} alt={product.title.en} />
                                        </button>
                                    </div>
                                </div>

                                {/* ==== content ===== */}
                                <FoodContent item={product} />

                            </div>
                        </Container>
                    </div>
            }
            {/* <h1>Some text</h1> */}
            <div className="w-full min-h-[200vh]">
            </div>

        </main>
    )
}
