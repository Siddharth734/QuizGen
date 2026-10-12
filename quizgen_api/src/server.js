import express from "express";
import cors from "cors";
import { config } from "./config.js";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

const app = express();

app.disable("x-powered-by");
app.use(cors({
  origin(origin, callback) {
    // Permit non-browser clients without an Origin header; browser origins are allow-listed.
    if (!origin || config.allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Origin is not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({ limit: "64kb" }));

app.get("/", (_req, res) => {
  res.json({
    message: "QuizGen API",
    status: "running",
    version: config.appVersion,
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/", chatRoutes);
app.use("/", sessionRoutes);

app.use((req, res) => {
  res.status(404).json({ detail: "Route not found" });
});

app.use((error, _req, res, _next) => {
  console.error("API error:", error?.message || error);
  if (res.headersSent) return;
  const isCorsError = error?.message === "Origin is not allowed by CORS";
  res.status(isCorsError ? 403 : 500).json({
    detail: isCorsError ? error.message : "Internal server error",
  });
});

app.listen(config.port, "0.0.0.0", () => {
  console.log(`QuizGen API listening on port ${config.port}`);
});
