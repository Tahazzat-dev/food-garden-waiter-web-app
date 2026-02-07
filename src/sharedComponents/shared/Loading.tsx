import { cn } from '@/lib/utils';
import LoadingSpinner from '../loading/LoadingSpinner';


type Props = {
    className?: string;
}
export default function DataLoading({ className = '' }: Props) {
    return (
        <div className={cn('w-full min-h-40 flex items-center justify-center', className)}>
            <LoadingSpinner />
        </div>
    )
}
