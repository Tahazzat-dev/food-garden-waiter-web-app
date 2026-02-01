
export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
                {/* Plate Loader */}
                <div className="relative w-14 h-14">
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
