# 🐉 Dragon Cards

A dynamic, interactive betting mini-game built with React and Zustand. Match the dragons, manage your risk, and multiply your balance!
DEMO:[https://dragon-cards-kappa.vercel.app/]

## 🎮 About the Game

Dragon Cards is a slot-style prediction game. The player starts with a base balance and tries to guess the sequence of dragons that will be revealed in the top row. Before placing a bet, players can reorder their bottom cards using Drag & Drop to match their predictions with the highest multipliers.

## ✨ Key Features

- **State Machine Logic:** Strict game phases (`idle`, `revealing`, `result`) managed by Zustand to prevent bugged interactions during animations.
- **Native HTML5 Drag & Drop:** Smooth, dependency-free card reordering mechanic.
- **Dynamic Multipliers & Risk Levels:** Four risk profiles (Low, Medium, High, Classic) dynamically calculate win potentials.
- **Custom Sound Manager:** Integrated Web Audio API for immersive sound effects (card flips, wins, interactions) with a global mute toggle.
- **Data Persistence:** Balance, selected risk level, and audio settings are saved in `localStorage` via Zustand's `persist` middleware.
- **Responsive UI:** Fully adaptive design that shifts the layout gracefully for mobile devices.

## 🛠️ Tech Stack

- **Frontend:** React 19 (Functional Components, Hooks)
- **State Management:** Zustand
- **Language:** TypeScript
- **Styling:** CSS3 (Flexbox, Media Queries, CSS Modules/Classnames)
- **Build Tool:** Vite

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/lvlashnin/dragon-cards.git](https://github.com/lvlashnin/dragon-cards.git)
   Navigate to the project directory:
   ```

Bash
cd dragon-cards
Install dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev
