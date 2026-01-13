"use client"
import { getFromStorage } from '@/lib/storage'
import { useGetAllProductsQuery } from '@/redux/features/product/productApiSlice'
import { setAllProduct, setPendingOrders } from '@/redux/features/product/productSlice'
import { TOrder } from '@/types/types'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function InitialDataLoader() {
    const dispatch = useDispatch()
    const { data: productData } = useGetAllProductsQuery("");
    console.log(productData, ' pd')
    useEffect(() => {
        // set product data;
        if (productData.success) {
            dispatch(setAllProduct(productData.data));
        }

        // dispatch(setAllProduct)
        // TODO: have to midify this with the real data.
        const orders = getFromStorage("orders") as TOrder[] || [];
        dispatch(setPendingOrders(orders));
    }, [dispatch])
    return (
        <></>
    )
}
