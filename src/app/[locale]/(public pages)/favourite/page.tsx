import Container from '@/sharedComponents/wrapper/Container'
import React from 'react'

export default function FavouriteFoods() {
    return (
        <section className="mb-4">
            <Container className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                {
                    // filteredFoods.map(product => <FoodCart product={product} key={product?.id} />)
                }
                <h1>Favourite page</h1>
            </Container>
        </section>
    )
}
