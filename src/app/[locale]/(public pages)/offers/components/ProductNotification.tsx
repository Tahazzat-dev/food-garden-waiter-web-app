"use client"
import { setHasOfferedProducts } from "@/redux/features/product/productSlice";
import { TProduct } from "@/types/types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function ProductNotification({ products }: { products: TProduct[] }) {
    // hooks
    const dispatch = useDispatch()
    useEffect(() => {
        if (products.length) {
            dispatch(setHasOfferedProducts(true));
        }
    }, [dispatch, products])

    return <></>
}
