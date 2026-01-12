"use client"
import { useGetAddressesQuery } from '@/redux/features/address/addressApiSlice'
import { useGetAllProductsQuery } from '@/redux/features/product/productApiSlice';
import React from 'react'

export default function TestPage() {
    const { isLoading, data } = useGetAddressesQuery('');
    console.log(data, ' data')
    console.log(isLoading, ' is loading')

    return (
        <div>TestPage</div>
    )
}
