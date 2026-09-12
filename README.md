# Yagyavi Birthday Scrapbook 🎉

A personalized, interactive birthday scrapbook web app built with Next.js. Features animated greetings, music playback, photo archives, friendship messages, inside jokes, and more.

![Yagyavi Birthday Scrapbook](placeholder.png)

---

## ✨ Features

- **Opening Screen** - Animated welcome with celebration theme
- **Birthday Hero** - Main birthday greeting section
- **Birthday Letter** - Personal letter from the creator
- **Music Player** - Play birthday songs (JAWNY - Honeypie)
- **Photo Archive** - View photos and videos from memories
- **Inside Joke Vault** - Funny moments and AI-generated jokes
- **Friendship Message** - Heartfelt friendship notes
- **Bestie Stats & Cards** - Fun statistics and greetings
- **Easter Eggs** - Hidden surprises throughout
- **Final Surprise** - A special ending moment

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/tanishq1983/Y-B.git
cd Y-B

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
Y-B/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles (Tailwind)
├── components/            # React components
│   ├── BirthdayExperience.tsx
│   ├── BirthdayHero.tsx
│   ├── BirthdayLetter.tsx
│   ├── MusicPlayer.tsx
│   ├── PhotoArchive.tsx
│   ├── BestieCards.tsx
│   ├── BestieStats.tsx
│   ├── InsideJokeVault.tsx
│   ├── FriendshipMessage.tsx
│   ├── FinalSurprise.tsx
│   ├── EasterEggs.tsx
│   ├── Decorations.tsx
│   ├── OpeningScreen.tsx
│   ├── AudioProvider.tsx
│   └── ...
├── data/
│   └── siteConfig.ts      # Configuration data
├── public/               # Static assets
│   ├── PHOTOS/           # Images and videos
│   ├── MP3/              # Audio files
│   └── JOKES/            # Audio jokes
├── JOKES/                # Source audio files
├── LETTER/               # Letter text
├── MP3/                  # Source audio files
├── PHOTOS/               # Source photos
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── vercel.json           # Vercel deployment config
```

---

## 🎨 Tech Stack

- **Next.js 16** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

---

## 🛠 Development

```bash
# Development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click **"Add New" → "Project"**
4. Import the `tanishq1983/Y-B` repository
5. Vercel auto-detects Next.js — no config needed
6. Click **"Deploy"**

Your app will be live at `https://y-b.vercel.app`

### Deploy with Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## ⚙️ Configuration

Edit `data/siteConfig.ts` to customize:
- Names (birthday person, creator)
- Messages and greetings
- Photo/audio paths
- Colors and themes

---

## 🎂 About

This birthday scrapbook was created as a special gift to celebrate **Yagyavi's birthday**. It combines personal photos, voice messages, music, and interactive elements to create a memorable digital experience.

---

## 📄 License

This project is private and personal. All rights reserved.

---

**Made with ❤️ for Yagyavi**
