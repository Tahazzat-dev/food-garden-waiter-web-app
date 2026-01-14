"use client"
import { getFromStorage } from '@/lib/storage'
import { setCategories } from '@/redux/features/category/categorySlice'
import { useGetAllProductsQuery } from '@/redux/features/product/productApiSlice'
import { setAllProduct, setCartProducts, setFavouriteProducts, setPendingOrders } from '@/redux/features/product/productSlice'
import { TCartProduct, TCategory, TOrder, TProduct } from '@/types/types'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function InitialDataLoader() {
    const dispatch = useDispatch()
    const { data: productData } = useGetAllProductsQuery("");
    useEffect(() => {
        // set product data;
        if (productData && productData?.success) {
            dispatch(setAllProduct(productData?.data));

            // set fav items
            const fav_items: number[] = getFromStorage('fav_items') || [];
            if (fav_items?.length) {
                const favSet = new Set(fav_items);
                const favoriteProducts = productData?.data
                    .filter((p: TProduct) => favSet.has(p.id))
                dispatch(setFavouriteProducts(favoriteProducts));
            }


            // set cart items
            const cart_items: TCartProduct[] = getFromStorage('cart_items') || [];
            if (cart_items?.length) {
                dispatch(setCartProducts(cart_items));
            }
        }

        // dispatch(setAllProduct)
        // TODO: have to midify this with the real data.
        const orders = getFromStorage("orders") as TOrder[] || [];
        dispatch(setPendingOrders(orders));
    }, [dispatch, productData])
    return (
        <></>
    )
}






export const SaveCategory = ({ categories = [] }: { categories: TCategory[] }) => {
    // hooks
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setCategories(categories));
    }, [categories, dispatch])
    return <></>
}