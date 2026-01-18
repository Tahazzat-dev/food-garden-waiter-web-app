import Container from "@/sharedComponents/wrapper/Container";
import Image from "next/image";
import NoFoodFound from "./components/NoFoodFound";
import FoodContent from "./components/FoodContent";
import ProductDescription from "./components/ProductDescription";
import { getData, getImage } from "@/lib/utils";
import { TProduct } from "@/types/types";

// export const dynamic = 'force-static';
// export const revalidate = 300

export default async function SinglePage({ params }: { params: Promise<{ id: string }> }) {
    // get the product
    const { id } = await params;
    const result = await getData(`/foods/${id}`);
    const product = (result?.data || {}) as TProduct;

    // class variables
    const smallImageStyle = "overflow-hidden grow min-h-[57.5px] max-h-[58px] sm:min-h-[64.5px] sm:max-h-[65px] md:min-h-[80px] md:max-h-[80.5px] rounded-[4px]"
    const imgStyle = "w-full h-full object-cover rounded-[6px]"
    const tempImgSrc = product.image ? getImage(product.image) : '/images/placeholder/placeholder.jpg';
    return (
        <>
            {
                !product ? <NoFoodFound /> :
                    <div className="w-full mt-[91px] sm:mt-[100px] md:mt-[120px] lg:mt-[130px]">
                        <Container className="">
                            <div className="w-full flex flex-col lg:flex-row border gap-1 md:gap-3 lg:gap-4 border-slate-400 dark:border-slate-600 rounded-[6px]">
                                {/* == images ====  */}
                                <div className="w-full lg:w-6/12 flex max-h-[280px] sm:max-h-[320px] overflow-hidden md:max-h-[400px] lg:max-h-full gap-2.5 sm:gap-4 border-r border-slate-400 dark:border-slate-600 lg:gap-4 p-2.5 sm:p-4">
                                    <div className="w-[83%] sm:w-[85%] lg:w-[83%] max-h-full lg:max-h-[450px] overflow-hidden rounded-[6px]">
                                        <Image className={imgStyle} src={tempImgSrc} width={300} height={400} alt={product.name} />
                                    </div>
                                    <div className="w-[17%] sm:w-[15%] lg:w-[17%] flex overflow-y-auto flex-col gap-2.5 md:gap-4">
                                        <button className={smallImageStyle}>
                                            <Image className={imgStyle} src={tempImgSrc} width={300} height={400} alt={product.name} />
                                        </button>
                                        <button className={smallImageStyle}>
                                            <Image className={imgStyle} src={tempImgSrc} width={300} height={400} alt={product.name} />
                                        </button>
                                        <button className={smallImageStyle}>
                                            <Image className={imgStyle} src={tempImgSrc} width={300} height={400} alt={product.name} />
                                        </button>
                                        <button className={smallImageStyle}>
                                            <Image className={imgStyle} src={tempImgSrc} width={300} height={400} alt={product.name} />
                                        </button>
                                    </div>
                                </div>

                                {/* ==== content ===== */}
                                <FoodContent item={product} />

                            </div>
                            <ProductDescription des={product.description || ""} />
                        </Container>
                    </div>
            }
            {/* <SimilarItems items={similarProducts} /> */}
            <div className="w-full pb-[75px] md:pb-5"></div>
        </>
    )
}
