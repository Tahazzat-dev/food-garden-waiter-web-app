"use client"
import useFormatPrice from '@/hooks/useFormatPrice'

export default function RenderFormatedPrice({ price }: { price: number }) {
    const { formatPrice } = useFormatPrice()
    return formatPrice(price);
}
