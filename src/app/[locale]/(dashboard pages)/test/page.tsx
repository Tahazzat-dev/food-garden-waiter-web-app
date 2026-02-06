"use client"

import { useDispatch } from 'react-redux';

export default function TestPage() {
    const dispatch = useDispatch();
    return (

        <div className="min-h-screen flex bg-inherit items-center justify-center">
            <div className="flex flex-col items-center gap-6">
                <div className="relative w-14 h-14 md:w-20 md:h-20">
                    <div className="absolute inset-0 rounded-full border-4 border-[#fe0103]/50"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-secondary border-t-transparent animate-spin"></div>
                </div>
                <div className="text-center">
                    <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Heating up the kitchen 🔥
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                        Please wait a moment...
                    </p>
                </div>
            </div>
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
