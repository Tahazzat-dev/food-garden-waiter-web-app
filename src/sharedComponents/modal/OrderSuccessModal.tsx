// "use client";
// import { Button } from "@/components/ui/button";
// import * as Dialog from "@radix-ui/react-dialog";
// import { ShoppingCart, X } from "lucide-react"; // optional icon



// export default function OrderSuccessModal() {
//     // variables
//     const KEY = "OPEN_PRODUCT_DETAILS_MODAL";



//     if (!modalProduct) return null;

//     return (
//         <>
//             <Dialog.Root open={KEY === EXPAND} onOpenChange={closeModal}>
//                 <Dialog.Portal>
//                     <div className="fixed inset-0 global-overlay z-[9999]" />
//                     <Dialog.Content className="prevent-body-trigger fixed top-1/2 left-1/2  max-w-[93vw] md:max-w-[700px] !rounded-[10px] lg:!rounded-[12px] overflow-hidden w-full -translate-x-1/2 -translate-y-1/2 bg-body rounded-lg shadow-lg dark:shadow-slate-800 z-[99999]">
//                         <div className="flex items-center justify-between bg-primary px-4 py-2">
//                             <Dialog.Title className="fg_fs-md text-white">
//                                 {t('foodDetails')}
//                             </Dialog.Title>
//                             <Button onClick={closeModal} className="rounded-full !px-2.5" variant="secondary"> <X className="!text-white w-5 md:w-6 md:h-6 h-5 lg:w-8 lg:h-8" /></Button>
//                         </div>
//                         <div className="p-4">

//                         </div>
//                         <div className="w-full flex justify-end p-4">
//                             <Dialog.Close className="" asChild >
//                                 <Button disabled={showVariantWarning} onClick={handleAddToCart} className={`text-white mt-2 font-semibold  ${addedItem && addedItem.quantity === quantity ? ' bg-secondary hover:bg-secondary' : 'custom-shadow-md  bg-primary hover:bg-primary-500'}`} ><ShoppingCart /> <span>{t('addToCart')}</span></Button>
//                             </Dialog.Close>
//                         </div>
//                     </Dialog.Content>
//                 </Dialog.Portal>
//             </Dialog.Root>
//         </>
//     )
// }





export default function OrderSuccessModal() {
    return (
        <div>OrderSuccessModal</div>
    )
}
