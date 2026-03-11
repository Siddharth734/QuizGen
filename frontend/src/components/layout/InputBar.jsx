import { useEffect, useRef } from "react";

export default function InputBar({ input, loading, onChange, onSubmit }) {
    const inputRef = useRef(null);

    const keySetter = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        }
    }

    useEffect(() => {
        const handler = (e) => {
            if(e.key.length === 1 && e.key.match(/[a-zA-Z]/))
                inputRef.current?.focus()
        }

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler)
    }, [])


    return (
        <div className="bg-black border-t border-white/5 px-4 py-3 shrink-0">
            <div className="flex gap-3">
                <div className="flex-1 border border-gray-800 bg-black px-4 py-2.5 transition-all duration-200 focus-within:border-green-900 rounded-2xl">
                    <textarea ref={inputRef} value={input} onChange={(e) => onChange(e.target.value)} onKeyDown={keySetter}
                        rows="1" placeholder="you need to enter a topic to witness magic.."
                        className="w-full resize-none bg-transparent font-mono text-sm leading-relaxed tracking-wide text-gray-200 placeholder-gray-800 outline-none">
                    </textarea>
                </div>

                <div className="flex items-center">
                    <button onClick={onSubmit} disabled={loading || !input.trim()} className="flex p-2 rounded-2xl shrink-0 border-2 border-green-400 font-mono text-base text-green-400 transition-all duration-200 hover:bg-green-400 hover:text-black">
                        {loading ? <span className="animate-pulse tracking-widest">▪▪▪</span> : <i className="ri-send-ins-line"></i>}
                    </button>
                </div>
            </div>
        </div>
    );
}