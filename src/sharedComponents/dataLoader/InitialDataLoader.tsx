"use client"
import { getFromStorage } from '@/lib/storage'
import { updateFetchOrders } from '@/redux/features/actions/actionSlice'
import { useGetAddressesQuery } from '@/redux/features/address/addressApiSlice'
import { setAddress } from '@/redux/features/address/addressSlice'
import { setCategories } from '@/redux/features/category/categorySlice'
import { useGetAllProductsQuery, useLazyGetAllOrdersQuery } from '@/redux/features/product/productApiSlice'
import { setAllProduct, setCartProducts, setFavouriteProducts, setOrders } from '@/redux/features/product/productSlice'
import { RootState } from '@/redux/store'
import { TCartProduct, TCategory, TProduct } from '@/types/types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function InitialDataLoader() {
    const dispatch = useDispatch()
    const { data: productData } = useGetAllProductsQuery("");
    const { data: addressData } = useGetAddressesQuery('');
    const [loadOrders] = useLazyGetAllOrdersQuery();
    const { fetchOrders } = useSelector((state: RootState) => state.actions);
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
    }, [dispatch, productData])

    useEffect(() => {
        // set product data;
        if (addressData && addressData?.success) {
            dispatch(setAddress(addressData?.data));
        }
    }, [dispatch, addressData])


    useEffect(() => {

        if (!fetchOrders) return;

        (async () => {
            try {
                const address = getFromStorage('user_address') as { name: string; phone: string };
                if (address && address?.name && address.phone) {
                    const res = await loadOrders(`name=${address.name}&phone=${address.phone}`).unwrap();
                    if (res.success) {
                        dispatch(setOrders(res.data))
                        if (fetchOrders) {
                            dispatch(updateFetchOrders(false))
                        }
                    }

                }
            } catch (error) {
                console.error('Error loading data', error)
            }
        })()

    }, [loadOrders, fetchOrders, dispatch])

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