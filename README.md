# 🤖 AI Chatbot (HTML, CSS, JS + Gemini API)

A simple browser-based AI chatbot built with vanilla **HTML, CSS, and JavaScript**, powered by Google's **Gemini API** (`gemini-2.5-flash` model). Chat history is saved in the browser using `localStorage`.

## Features

- Clean, glassmorphism-style chat UI
- Real-time chat with Gemini AI
- "AI is typing..." indicator while waiting for a response
- Chat history persists across page reloads (via `localStorage`)
- Send messages with button click or **Enter** key

## Project Structure

```
.
├── index.html         # Main HTML structure
├── style.css          # Styling (glassmorphism UI)
├── script.js          # Chat logic + Gemini API calls
├── config.js          # API key (⚠️ DO NOT COMMIT — see below)
├── .gitignore         # Excludes config.js and other files from Git
└── README.md          # Project documentation
```

## ⚠️ Important: API Key Security

This project currently loads the API key from `config.js`:

```javascript
export const apikey = "YOUR_API_KEY_HERE";
```

**Never commit `config.js` with a real key to GitHub** — it will be publicly visible and can be stolen/abused within minutes on a public repo. Make sure:

1. `config.js` is listed in `.gitignore` (already included).
2. If a real key was ever pushed to a public repo, **regenerate/revoke it immediately** in [Google AI Studio](https://aistudio.google.com/app/apikey).
3. For real deployments, don't expose API keys in frontend JS at all — route requests through a small backend/serverless function that keeps the key server-side.

## Setup & Usage

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Create your own `config.js` file (this file is gitignored, so you must create it locally):
   ```javascript
   export const apikey = "your-gemini-api-key-here";
   ```

3. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey) if you don't have one.

4. Open `index.html` in your browser.
   - Since `script.js` uses ES modules (`type="module"`), it must be served over `http://` or `https://`, not opened directly as a `file://` path. Use a simple local server, for example:
     ```bash
     # Python
     python -m http.server 5500

     # or VS Code "Live Server" extension
     ```
   - Then visit `http://localhost:5500` in your browser.

5. Start chatting! Type a message and press **Enter** or click **Send**.

## How It Works

- `script.js` sends the user's message to the Gemini API endpoint:
  ```
  https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
  ```
- The AI's reply is extracted from the response and displayed in the chat box.
- Each conversation (user + bot messages) is saved to `localStorage` so it persists on page refresh.

## Known Limitations / Possible Improvements

- No loading/error UI beyond simple text messages.
- Chat history is stored in plain `localStorage` (not encrypted, browser-specific).
- API key is exposed client-side — fine for local testing, **not safe for production**.
- No "clear chat" button yet — could be added to reset `localStorage`.

## License

Free to use and modify.
