# 🌿 Virtual Companion

**Your AI-powered emotional support and productivity companion.**

Virtual Companion is a web application designed to help users reflect on their emotions, track their moods, practise calming activities, and build healthier daily habits through a welcoming digital experience.

## ✨ Features

- 💬 **AI Companion** — A dedicated space for conversational emotional support.
- 🌈 **Mood Tracker** — Record and monitor daily moods.
- 🧘 **Calm Corner** — Explore calming activities and relaxation exercises.
- 🤝 **Find Support** — Access guidance on seeking additional support.
- 📔 **My Reflections** — Reflect on personal experiences and progress.
- ⚙️ **Settings** — Manage app preferences.
- 🔐 **Demo Login** — Explore the application's sign-in experience.

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- CSS
- Lucide React icons
- Browser localStorage for selected demo data

## 🚀 Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) and Git.

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd virtual-companion
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL.

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### 4. Build the application

```bash
npm run build
```

## 📁 Project Structure

```text
virtual-companion/
├── public/
├── src/
│   ├── pages/
│   │   ├── ChatPage.tsx
│   │   ├── MoodPage.tsx
│   │   ├── CalmCorner.tsx
│   │   ├── FindSupport.tsx
│   │   ├── ReflectionsPage.tsx
│   │   └── SettingsPage.tsx
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

*The structure above is illustrative; keep the actual files and folders in your repository.*

## 🔒 Privacy and Security

This project is a prototype. Its demo authentication and browser-based storage are not suitable for production use. Do not enter real passwords or sensitive personal information. Production deployment would require secure authentication, appropriate data protection, and further security testing.

## 🧪 Testing

Run the production build to check for compilation errors:

```bash
npm run build
```

Test the landing page, login flow, dashboard navigation, mood tracking, reflections, and logout functionality manually.

## 🌱 Future Improvements

- Secure user authentication and account management
- AI-powered conversational support
- Mood trends and personalized reflections
- Accessible, responsive UI improvements
- Optional professional-support resources
- Automated testing and privacy enhancements

## 📄 License

This project is available under the MIT License. Add a `LICENSE` file containing the MIT License text before publishing under this license.

---

**Note:** Virtual Companion is intended for emotional support and wellbeing reflection. It is not a substitute for professional mental health care.
