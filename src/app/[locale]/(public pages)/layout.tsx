// import Footer from '@/sharedComponets/footer/Footer';
// import ProductDetailsModal from '@/sharedComponets/modal/ProductDetailsModal';
import MobileBottomButtons from '@/sharedComponents/footer/MobileBottomButtons';
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
            <MobileBottomButtons />
        </>
    );
}
