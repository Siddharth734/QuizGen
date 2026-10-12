import "dotenv/config";

export const config = {
  port: Number(process.env.PORT || 10000),
  appTitle: "QUIZGen API",
  appVersion: "1.0.0",
  llmModel: process.env.LLM_MODEL,
  llmProvider: (process.env.LLM_PROVIDER || "groq").toLowerCase(),
  apiKey: process.env.API_KEY,
  allowedOrigins: (process.env.ALLOWED_ORIGINS ||
    "https://quizgen-v1.vercel.app,http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};

if (!config.llmModel) {
  console.warn("Warning: LLM_MODEL is not configured.");
}
if (!config.apiKey) {
  console.warn("Warning: API_KEY is not configured.");
}
