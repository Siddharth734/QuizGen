import { ChatGroq } from "@langchain/groq";
import { ChatOpenAI } from "@langchain/openai";
import { config } from "../config.js";
import { buildMessages } from "./messageBuilder.js";
import { appendMessage, getSession } from "./sessionService.js";

function createModel() {
  if (!config.apiKey) {
    throw new Error("API_KEY is missing. Set it in quizgen_api/.env.");
  }

  if (config.llmProvider === "groq") {
    return new ChatGroq({
      apiKey: config.apiKey,
      model: config.llmModel || "llama-3.3-70b-versatile",
      streaming: true,
    });
  }

  if (config.llmProvider === "openai") {
    return new ChatOpenAI({
      apiKey: config.apiKey,
      model: config.llmModel || "gpt-4o-mini",
      streaming: true,
    });
  }

  throw new Error(
    `Unsupported LLM_PROVIDER "${config.llmProvider}". This JS conversion currently supports "groq" and "openai".`,
  );
}

let model;
function getModel() {
  if (!model) model = createModel();
  return model;
}

export async function getChatResponse(sessionId, userMessage) {
  appendMessage(sessionId, "user", userMessage);
  const messages = buildMessages(getSession(sessionId));
  const response = await getModel().invoke(messages);
  const reply = typeof response.content === "string"
    ? response.content
    : JSON.stringify(response.content);
  appendMessage(sessionId, "assistant", reply);
  return reply;
}

export async function* streamChatResponse(sessionId, userMessage) {
  appendMessage(sessionId, "user", userMessage);
  const messages = buildMessages(getSession(sessionId));
  let fullResponse = "";

  try {
    for await (const chunk of await getModel().stream(messages)) {
      const content = chunk.content;
      const token = typeof content === "string" ? content : "";
      if (token) {
        fullResponse += token;
        yield token;
      }
    }
    appendMessage(sessionId, "assistant", fullResponse);
  } catch (error) {
    // Do not expose provider details or secrets in API responses.
    console.error("LLM streaming error:", error?.message || error);
    yield "\n[ERROR]: The model could not complete this response.";
  }
}
