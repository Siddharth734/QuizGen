export default function parseQuizJson(text) {
    try {

        const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
        const raw = match ? match[1] : text;
        const arr = JSON.parse(raw.trim());
        if (Array.isArray(arr) && arr.length > 0) return arr;

    } catch { }
    return null;
}