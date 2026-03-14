# ⚡ QUIZGen

![status](https://img.shields.io/badge/status-active-4ade80?style=flat-square)
![stack](https://img.shields.io/badge/built_with-React_+_Vite_+_Tailwind-60a5fa?style=flat-square)
![license](https://img.shields.io/badge/license-MIT-a78bfa?style=flat-square)

> AI-powered quiz generator built with React, Vite, and Tailwind CSS.

---

## ✦ What is this?

QUIZGen lets you pick any topic and instantly generates a quiz using AI. Type a topic or pick one from the suggestions — the app handles the rest and walks you through the questions in a clean chat-style interface.

> Built as a hands-on AI project to explore LLM-powered apps with a React frontend.

## ✦ Project Structure

```
QuizGen/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UI/
│   │   │   │   ├── OptionButton.jsx
│   │   │   │   └── TopicChips.jsx
│   │   │   ├── Layout/
│   │   │   │   ├── WelcomeScreen.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   └── InputBar.jsx
│   │   │   └── Chat/
│   │   │       └── QuizCard.jsx
│   │   ├── utils/
│   │   │   ├── parseQuizJson.js
│   │   │   └── generateSessionId.js
│   │   └── App.jsx
│   ├── index.html
│   └── vite.config.js
│
└── backend/
```

## ✦ Frontend Structure (Steps 1–8 complete)

### `utils/parseQuizJson.js`
Cleans and parses the AI's raw text response into a usable JavaScript object. Handles markdown fences and extra text the AI might wrap around the JSON. Returns `null` on invalid input.

### `utils/generateSessionId.js`
Generates a unique `sessionId` each time a new quiz starts. This ID travels through the app to identify the current session.

### `components/UI/OptionButton.jsx`
A single answer button. Driven by four props: `label`, `isSelected`, `isCorrect`, `isDisabled` — which together handle all its visual states: default, selected, correct/wrong, and locked after submission.

### `components/UI/TopicChips.jsx`
A row of preset topic tags the user can tap to auto-fill the input bar. Fires the chosen topic string via an `onSelect` callback to the parent.

### `components/Layout/WelcomeScreen.jsx`
The landing view shown before any quiz starts. Renders a greeting and mounts `TopicChips`. Disappears once a session begins.

### `components/Layout/Header.jsx`
The fixed top bar showing the app name/logo. Fully standalone — no props or dependencies.

### `components/Layout/InputBar.jsx`
The text input at the bottom of the screen. Accepts a topic from the user and submits it to generate a quiz. Has two keyboard shortcuts baked in: pressing Enter submits the form, and typing any letter from anywhere on the page auto-focuses the input. Props: `input`, `loading`, `onChange`, `onSubmit`.

### `components/Chat/QuizCard.jsx`
Renders the full quiz — question by question. Tracks selected answers in `answers` state, scores them on submit, and shows per-question feedback (correct/wrong/skipped) with a final score in the header. Supports MCQ (via `OptionButton`), fill-in-the-blank, and open Q&A question types, detected automatically from the question data.

## ✦ Tech Stack

| Layer    | Tech                      |
|----------|---------------------------|
| Frontend | React, Vite, Tailwind CSS |
| Backend  | Coming soon               |

## ✦ Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/quizgen.git
cd quizgen/frontend

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## ✦ Roadmap

- [x] Utility functions (parse, session ID)
- [x] Core UI components (OptionButton, TopicChips)
- [x] Layout components (Header, WelcomeScreen, InputBar)
- [x] QuizCard chat component (85-90% completed)
- [ ] Message and ChatContainer components
- [ ] App state + full quiz flow
- [ ] Backend + AI integration

## ✦ License

MIT — use it, fork it, build on it.

---

Made by **Siddharth** · [Portfolio](#) · [LinkedIn](#)