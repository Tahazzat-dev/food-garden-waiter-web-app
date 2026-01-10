import { getData } from "@/lib/utils";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("category_id");
        const data = await getData(`/products${categoryId ? ("category_id=" + categoryId) : ''}`);
        return Response.json(data);
    } catch (error) {
        console.error(error);
    }

}