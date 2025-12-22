import Container from '@/sharedComponents/wrapper/Container'
import React from 'react'
import FoodCart from './FoodCart'
import { demoProducts } from '@/lib/demo-data'

export default function FilterFood() {
    return (
        <section className="my-4">
            <Container className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                {
                    demoProducts.map(product => <FoodCart product={product} key={product?.id} />)
                }
            </Container>
        </section>
    )
}
