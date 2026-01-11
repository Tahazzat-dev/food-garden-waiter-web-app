import { getData } from "@/lib/utils";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("category_id");
        const query = categoryId ? ("category_id=" + categoryId) : '';
        console.log(query, 'serach query');
        const data = await getData(`/products`);
        return Response.json(data);
    } catch (error) {
        console.error(error);
    }

}