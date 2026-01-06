"use client"
import { getFromStorage } from '@/lib/storage'
import { setPendingOrders } from '@/redux/features/product/productSlice'
import { TOrder } from '@/types/types'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function InitialDataLoader() {
    // load all initial data here
    // count all pending orders
    const dispatch = useDispatch()

    useEffect(() => {

        // TODO: have to midify this with the real data.
        const orders = getFromStorage("orders") as TOrder[] || [];
        dispatch(setPendingOrders(orders));
    }, [dispatch])
    return (
        <></>
    )
}
