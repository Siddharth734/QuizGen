import parseQuizJson from "../../utils/parseQuizJson";
import QuizCard from "./QuizCard";

export default function Message({ msg }){
    const quiz = (msg.role == "assistant") ? parseQuizJson(msg.content) : null;
    const textContent = (quiz) ? msg.content.replace(/```(?:json)?[\s\S]*?```/, "").trim() : msg.content;

    return (
        <div className={`flex items-start gap-3 mb-4 ${(msg.role == "user") ? "flex-row-reverse" : "flex-row"}`}>
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center border font-mono text-xs 
                ${(msg.role == "user") ? "border-teal-900 bg-black/2 text-teal-400 rounded-sm"
                    : "border-gray-800 bg-black/2 text-gray-500 rounded-sm"}`}>
                {msg.role === "user" ? "You" : "Gen"}
            </div>
            <div className="flex-1 min-w-0">
                {textContent && (
                    <div className={`mb-3 rounded-lg px-4 py-3 font-mono text-sm border 
                        ${(msg.role == "user" ? "border-teal-900 bg-black/2 text-teal-400"
                            : "border-gray-800 bg-black/2 text-gray-500 whitespace-break-spaces")}`}>
                        {textContent}
                        {msg.streaming && (
                            <span className="inline-block h-4 w-1 ml-1 animate-pulse bg-green-400"></span>
                        )}
                    </div>
                )}

                {quiz && <QuizCard questions={quiz}/>}
            </div>
        </div>
    );
}