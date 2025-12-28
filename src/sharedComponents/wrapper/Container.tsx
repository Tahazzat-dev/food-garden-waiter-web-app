import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode;
    className?: string;
}
export default function Container({ children, className = "" }: Props) {
    return (
        <div className={`${className} w-full mx-auto px-2.5 md:px-5 lg:px-7 xl:px-8 2xl:px-10 max-w-[1440px]`}>{children}</div>
    )
}
