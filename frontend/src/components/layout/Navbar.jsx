export default function Navbar({ sessionId, onReset }) {
    return (
        <div className="flex items-center justify-between border-b border-gray-700 bg-black p-5 font-mono">
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center text-green-400 text-4xl shrink-0">
                    ◈
                </div>
                <div className="flex flex-col">
                    <div className="text-green-400 text-lg font-bold tracking-[4px]">
                        QUIZGen
                    </div>
                    <div className="text-[9px] tracking-[3px] text-gray-800">
                        LLM-WRAPPER v1.0
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden sm:block text-[9px] tracking-[2px] text-gray-800">
                    {`SID: ${sessionId.toUpperCase()}`}
                </div>
                <button onClick={onReset} className="border border-gray-800 px-2.5 py-1.5 tracking-[2px] text-gray-600 transition-all duration-200 hover:border-red-500 hover:text-red-500">
                    RESET
                </button>
            </div>
        </div>
    )
}