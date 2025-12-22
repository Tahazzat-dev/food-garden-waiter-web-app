"use client"
import { HeartIcon } from 'lucide-react'
import Swal from 'sweetalert2';

export default function CartButton({ productId }: { productId: string }) {
    const handleFavourite = () => {
        // Implementation for handling favourite action
        Swal.fire({
            title: "Warning!",
            text: "Feature in progress",
            icon: "warning",
            confirmButtonText: "OK",
        });
        console.log(productId);
    }
    return (
        <button onClick={handleFavourite} className='absolute top-2 left-2 z-20'>
            <HeartIcon fill='white' className='w-8 h-8 text-secondary' />
        </button>
    )
}
