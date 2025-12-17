// import Footer from '@/sharedComponets/footer/Footer';
// import ProductDetailsModal from '@/sharedComponets/modal/ProductDetailsModal';
import PubliceHeader from '@/sharedComponents/header/PubliceHeader';
import React from 'react';

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <PubliceHeader />
            {children}
            {/* <ProductDetailsModal /> */}
            {/* <Footer /> */}
        </>
    );
}
