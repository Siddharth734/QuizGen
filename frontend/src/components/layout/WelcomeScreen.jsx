import TopicSuggestions from "../ui/TopicSuggestions";


export default function WelcomeScreen({ onSelect }) {
    
    return (
        <div className="flex flex-col justify-center items-center pt-[12vh] text-green-400">
            <span className="text-6xl mb-4"><i class="ri-tent-line"></i></span>
            <h1 className="text-5xl font-bold tracking-[8px] mb-2">
                QuizGen
            </h1>
            <p className="text-gray-800 text-sm tracking-[4px] mb-10">
                LLM-BASED QUIZ GENERATION WRAPPER
            </p>

            <TopicSuggestions onSelect={onSelect}/>

        </div>
    )
}