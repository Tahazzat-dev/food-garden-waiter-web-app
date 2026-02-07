import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    className?: string;
}
export default function Container({ children, className = "" }: Props) {
    return (
        <div className={`${className} w-full mx-auto px-2.5 sm:px-4 md:px-5 lg:px-7 xl:px-8 2xl:px-10 max-w-[768px]`}>{children}</div>
    )
}
