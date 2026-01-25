export default function TestPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center relative gap-6">
                <div className="relative group">
                    <div
                        className="absolute inset-0 -m-[4px] rounded-[14px] opacity-70 blur-[1.5rem] animate-[spin_4s_linear_infinite]"
                        style={{
                            backgroundImage: 'conic-gradient(from var(--angle), transparent 70%, #3b82f6)',
                        }}
                    />
                    <div
                        className="absolute inset-0 -m-[4px] rounded-[14px] animate-[spin_4s_linear_infinite]"
                        style={{
                            backgroundImage: 'conic-gradient(from var(--angle), transparent 70%, #3b82f6)',
                        }}
                    />

                    {/* Main Content Card */}
                    <div className="relative w-[260px] aspect-[3/4] bg-[#1c1f2b] rounded-[10px] flex items-center justify-center p-8 text-center">
                        <h1 className="text-white font-['Montserrat'] text-2xl font-bold tracking-tight">
                            Just Border
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
