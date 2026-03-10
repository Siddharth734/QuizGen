# QUIZGen

An AI-powered quiz generator built with React, Vite, and Tailwind CSS.

## Folder Structure

```
QuizGen/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UI/
│   │   │   │   ├── OptionButton.jsx
│   │   │   │   └── TopicChips.jsx
│   │   │   └── Layout/
│   │   │       ├── WelcomeScreen.jsx
│   │   │       └── Header.jsx
│   │   ├── utils/
│   │   │   ├── parseQuizJson.js
│   │   │   └── generateSessionId.js
│   │   └── App.jsx
│   ├── index.html
│   └── vite.config.js
│
└── backend/
```

## Project Structure (Steps 1–6 complete)

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

## Run Locally

Make sure you have **Node.js (v18+)** and **npm** installed.

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