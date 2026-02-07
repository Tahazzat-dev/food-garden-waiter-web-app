import InitialDataLoader from '@/sharedComponents/dataLoader/InitialDataLoader';
import MobileBottomButtons from '@/sharedComponents/footer/MobileBottomButtons';
import PublicHeader from '@/sharedComponents/header/PublicHeader';
import React from 'react';

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <PublicHeader />
            {children}
            <MobileBottomButtons />
            <InitialDataLoader />
        </>
    );
}
