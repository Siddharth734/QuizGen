const TOPICS = ["DSA", "Sports", "History", "GenAI", "Movies", "Dhurandar movie"];

export default function TopicSuggestions({ onSelect }) {
    return (
        <div className="grid grid-cols-3 gap-2">
            {TOPICS.map((topic) => (
                <button key={topic} onClick={() => onSelect(topic)} 
                className="border border-gray-800 bg-white/1.5 p-2.5 font-mono text-sm tracking-wide text-white/20
                 transition-all duration-200 hover:border-green-800 hover:text-green-400">
                    {topic}
                </button>
            ))}
        </div>
    );
}