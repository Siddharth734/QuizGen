//just here to assign colors
const getOptionStyle = (opt, userAns, correctAns, isSubmitted) => {
    const isSelected = userAns === opt;
    const isCorrect = isSubmitted && opt.toLowerCase().trim() === correctAns.toLowerCase().trim();
    const isWrong = isSubmitted && isSelected && !isCorrect;

    if (isWrong) return "wrong";
    if (isCorrect) return "correct";
    if (isSelected) return "selected";
    return "default";
}

const optionStyles = {
    default: {
        button: "bg-black border-gray-800 text-gray-600 hover:border-gray-200 hover:text-gray-200",
    },

    selected: {
        button: "bg-[#242703] border-yellow-400 text-yellow-200",
    },

    wrong: {
        button: "bg-red-950 border-red-400 text-red-400",
    },

    correct: {
        button: "bg-green-950 border-green-400 text-green-400",
    },
}

const optionIcons = {
    correct: "✓",
    wrong: "X",
    default: null,
    selected: null,
}

const OptionButton = ({ opt, index, userAns, correctAns, submitted, onSelect }) => {
    const option = getOptionStyle(opt, userAns, correctAns, submitted);
    const style = optionStyles[option];
    const icon = optionIcons[option];

    return (
        <button onClick={() => onSelect(opt)} disabled={submitted} className={`flex w-full items-center gap-2 border px-3 py-2.5 text-left font-mono text-sm tracking-wide transition-all duration-200 disabled:cursor-default ${style.button}`}>
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center border">
                {icon || String.fromCharCode(65 + index)}
            </span>
            <span>{opt}</span>
        </button>
    )
}

export default OptionButton;