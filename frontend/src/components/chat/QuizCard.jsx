import { useState } from "react";
import OptionButton from "../ui/OptionButton";

export default function QuizCard({ questions }) {
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);

    const handleSelect = (questionIndex, value) => {
        if (submitted) return;
        setAnswers(prev => ({ ...prev, [questionIndex]: value }));
    };

    const handleSubmit = () => {
        let correct = 0;
        questions.forEach((q, i) => {
            const userAns = (answers[i] || "").toLowerCase().trim();
            const correctAns = (q.answer || "").toLowerCase().trim();
            if (userAns === correctAns) correct++;
        });
        setScore(correct);
        setSubmitted(true);
    }

    const isMCQ = questions[0]?.options;
    const isQA = questions.every((q) => !q.options && !q.question.includes("___"));
    const scorePercentage = (score != null) ? Math.round((score / questions.length) * 100) : 0;
    const scoreColor = (scorePercentage >= 70) ? "text-green-400" : ((scorePercentage >= 40) ? "text-yellow-200" : "text-red-400");

    return (
        <div className="font-mono">
            <div className="mb-4 flex items-center justify-between border border-green-950 bg-black px-5 py-4">
                <span className="text-sm font-bold tracking-widest text-green-400">
                    QUIZ LOADED [ {questions.length} Questions ]
                </span>
                {submitted && (
                    <span className={`text-sm font-bold tracking-widest ${scoreColor}`}>
                        SCORE: {score}/{questions.length} {scorePercentage}%
                    </span>
                )}
            </div>

            {questions.map((q, i) => {
                const userAns = (answers[i] || "");
                const correctAns = (q.answer || "");
                const isCorrect = (submitted && userAns.toLowerCase().trim() === correctAns.toLowerCase().trim());
                const isWrong = (submitted && userAns && !isCorrect);
                const isSkipped = (submitted && !userAns);

                const cardBorder = (!submitted) ? "border-gray-800"
                    : (isCorrect) ? "border-green-950"
                        : (isWrong) ? "border-red-950"
                            : "border-yellow-950";

                const cardText = (isCorrect) ? "text-green-400"
                    : (isWrong) ? "text-red-400"
                        : "text-yellow-400";

                return (
                    <div key={i} className={`mb-3 border bg-black p-4 transition-all duration-200 ${cardBorder}`}>
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-[10px] tracking-[3px] text-gray-600">
                                Q{String(i + 1).padStart(2, "0")}
                            </span>
                            {submitted && !isQA && (
                                <span className={`text-[10px] font-bold tracking-widest ${cardText}`}>
                                    {(isCorrect) ? "✓ CORRECT" : (isWrong) ? "X WRONG" : "- SKIPPED"}
                                </span>
                            )}
                        </div>

                        <p className="mb-3 text-sm leading-relaxed text-gray-300">
                            {q.question}
                        </p>

                        {isMCQ && q.options ? (
                            <div className="grid grid-cols-2 gap-2">
                                {q.options.map((opt, j) => (
    
                                    <OptionButton
                                        key={j}
                                        opt={opt}
                                        index={j}
                                        userAns={userAns}
                                        correctAns={correctAns}
                                        submitted={submitted}
                                        onSelect={(val) => handleSelect(i, val)} />
                                ))}
                            </div>
                        ) : (q.question?.includes("___") ? (
                            <input type="text" value={userAns}
                                onChange={(e) => handleSelect(i, e.target.value)}
                                placeholder="Fill in the blank..."
                                className={`w-full border bg-black px-4 py-2.5 font-mono text-sm outline-none 
                                disabled:cursor-default placeholder-gray-700 transition-all duration-200 
                                ${(!submitted) ? "border-gray-800 text-gray-200 focus:border-green-900"
                                        : (isCorrect) ? "border-green-400 text-green-400" : "border-red-400 text-red-400"
                                    }`} />
                        ) : (
                            < div className="w-full p-2 border border-gray-800 bg-black font-mono">
                                <h1 className="border-b text-green-400">Ans:</h1>
                                <p className="px-2 py-2 text-sm text-green-100">
                                    {q.answer}
                                </p>
                            </div>
                        ))}

                        {submitted && !isQA && (isWrong || isSkipped) && (
                            <div className="mt-3 border border-green-900 bg-black px-3 py-2 
                            text-[11px] tracking-widest text-green-400">
                                CORRECT ANS: <span className="font-bold">{q.answer}</span>
                            </div>
                        )}
                    </div>
                );
            })}

            {
                (!isQA) && (
                    (!submitted) ? (
                        <button onClick={handleSubmit}
                        className="flex items-center justify-center gap-2 mt-1 w-full border border-green-400 py-3 text-xs font-bold tracking-[3px]
                        text-green-400 transition-all duration-200 hover:bg-green-400 hover:text-black">
                            SUBMIT ANSWERS <i className="ri-send-plane-2-line"></i>
                        </button>
                    ) : (
                        <div className={`mt-1 border py-3 text-center
                        ${scorePercentage >= 70 ? "border-green-400/20" : scorePercentage >= 40 ? "border-yellow-400/20" : "border-red-400/20"}`}>
                            <div className={`text-4xl font-bold tracking-widest ${scoreColor}`}>
                                {score}/{questions.length}
                            </div>
                            <div className="mt-2 text-[11px] tracking-[3px] text-[#555]">
                                FINAL SCORE: {scorePercentage}%
                            </div>
                            <div className={`mt-3 text-[11px] tracking-widest font-bold ${scoreColor}`}>
                                {(scorePercentage >= 90) ? "You should be the one taking quizzes"
                                    : (scorePercentage >= 75) ? "You're good at this"
                                        : (scorePercentage >= 40) ? "You know your topic, you'll do better next time"
                                            : "No Worries - try our Question Answers mode for practice"}
                            </div>
                        </div>
                    )

                )
            }
        </div >
    );
}