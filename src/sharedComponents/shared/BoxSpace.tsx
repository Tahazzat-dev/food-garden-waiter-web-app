import { cn } from '@/lib/utils'
import { ReactNode } from 'react';

type Props = {
    className?: string;
    children: ReactNode;
}

export default function BoxSpace({ className = "", children }: Props) {
    return (
        <div className={cn('w-full min-h-10 flex items-center justify-center p-5', className)}>
            {children}
        </div>
    )
}
