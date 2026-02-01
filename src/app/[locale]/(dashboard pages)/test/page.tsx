"use client"

import { SET_EXPAND } from '@/redux/features/actions/actionSlice';
import { useDispatch } from 'react-redux';

export default function TestPage() {
    const dispatch = useDispatch();
    return (
        <div className="flex flex-col items-center justify-center h-full w-full min-h-screen">
            <button onClick={() => dispatch(SET_EXPAND("OPEN_ADD_CUSTOMER_MODAL"))} >Add Customer </button>
        </div>
    )
}



// export default function TestPage() {
//     return (
//         <div>
//             <h1>Test Page</h1>
//             <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime voluptate neque accusamus veniam totam beatae odit ex, consequatur facere, tempora exercitationem quis animi asperiores perferendis adipisci quidem nesciunt obcaecati maiores error, cupiditate sed. Nostrum cumque optio unde eaque, ducimus similique assumenda eos, doloremque odit excepturi, at suscipit minima officia! Tenetur inventore nihil possimus laudantium, vel vero deleniti iusto cum iure et dignissimos repellat in consequatur qui odio dolore tempora voluptatum, exercitationem cumque delectus voluptas. Nulla, placeat. Quod, enim, quae quas corporis, et libero repellendus laudantium veniam aut sunt numquam consectetur voluptates quis odit facere? Enim eius, architecto dignissimos earum laudantium alias labore minima, eos laboriosam culpa omnis quibusdam fugit nobis dolor officiis debitis magnam amet rem incidunt est. Reprehenderit est nostrum dolor corporis nemo, omnis itaque quaerat inventore accusantium illo porro maiores iure, nihil voluptates consequatur rem perferendis, recusandae explicabo. Repudiandae, odit. Magnam harum veniam animi nihil distinctio tempore optio inventore corporis fugiat dolore, et quibusdam perspiciatis impedit dolorum, mollitia numquam velit tenetur unde possimus quidem ut culpa quod suscipit eum. Assumenda, omnis obcaecati totam, natus ullam blanditiis dignissimos minus commodi deserunt labore nesciunt aspernatur nemo at accusantium facere autem sunt tempora quas atque ex. Saepe commodi modi ab atque?</p>
//         </div>
//     )
// }
