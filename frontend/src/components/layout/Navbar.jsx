import HackText from "../ui/HackText"

export default function Navbar({ sessionId, onReset }) {
    return (
        <div className="flex items-center justify-between border-b border-gray-700 bg-black/2 px-5 py-3 font-mono">
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center text-green-400 text-4xl shrink-0">
                    <i class="ri-tent-line"></i>
                </div>
                <div className="flex flex-col">
                    <div className="text-green-400 text-xl font-bold tracking-[4px]">
                        QUIZ Generator
                    </div>
                    <div className="text-xs tracking-[3px] text-gray-800">
                        quiz_generator v1.0
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden sm:block text-sm font-bold tracking-[2px] text-gray-800">
                    {/* {`SID: ${sessionId.toUpperCase().slice(-8)}`} */}
                    <HackText s_text={"USER_SESSION_ID"} text={sessionId.toUpperCase().slice(-15)}/>
                </div>
                <button onClick={onReset} className="border border-gray-800 rounded-lg px-2.5 py-1.5 tracking-[2px] text-sm font-bold text-gray-600 transition-all duration-200 hover:border-red-500 hover:text-red-500">
                    RESET
                </button>
            </div>
        </div>
    )
}