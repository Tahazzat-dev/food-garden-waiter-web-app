'use client';
import { ListTodo } from 'lucide-react';

export default function TaskLists() {
    // const { cartProducts } = useSelector((state: RootState) => state.productSlice);

    return (
        <>
            <button className='prevent-body-trigger relative'>
                <ListTodo fill='white' className='text-white h-6 w-6 cursor-pointer' />
                {/* {
                    cartProducts.length > 0 ?
                        <span className='flex items-center justify-center text-xs px-0.5 min-w-[18px] min-h-4  absolute -top-[40%] left-[80%] translate-x-[-50%] bg-secondary text-white rounded-full p-[1px]'>{cartProducts.length}</span> : <></>
                } */}
            </button>
        </>
    );
}
