# Invest Adventure Simulator: Frontend Implementation Roadmap

This document outlines the step-by-step process to build the **Invest Adventure Simulator** using **Vite + React + Tailwind CSS**.

## Phase 1: Environment Setup 🛠️
- [ ] Initialize Vite project: `npm create vite@latest ./ -- --template react`
- [ ] Install Tailwind CSS and its dependencies.
- [ ] Configure `tailwind.config.js` with a premium color palette (Honeydew, Deep Forest, Gold).
- [ ] Install `lucide-react` for icons and `framer-motion` for smooth story transitions.
- [ ] Set up basic folder structure:
  - `src/components`, `src/hooks`, `src/context`, `src/data` (for JSON scenarios).

## Phase 2: Core State & Progress Tracking 💾
- [ ] Create `GameContext` to manage global state:
  - currentScenerio, playerXP, badges, inventory, progressLogs.
- [ ] Implement `useLocalStorage` hook to persist progress between sessions.
- [ ] Define the JSON schema for branching scenarios:
  ```json
  {
    "id": "scenario_1",
    "text": "You received your first paycheck. What do you do?",
    "options": [
      { "text": "Save 20%", "nextId": "scenario_1a", "xp": 10 },
      { "text": "Invest in a diversified fund", "nextId": "scenario_1b", "xp": 20 }
    ]
  }
  ```

## Phase 3: Essential UI Components 🎨
- [ ] **Navbar/Progress Bar**: Sticky header showing XP level and current adventure progress.
- [ ] **Story Card**: The main interactive component with narrative text and choice buttons.
- [ ] **Quiz Component**: For pre/post-adventure knowledge checks.
- [ ] **Badge Notification**: A toast or popup when a user "levels up".

## Phase 4: Game Flows 🌊
- [ ] **Onboarding**: Intro story and "Baseline Quiz" to set initial confidence levels.
- [ ] **Adventure Scenarios**: Implement 3 core adventures:
  1. *The Emergency Fund Expedition* (Liquid savings).
  2. *Market Jungle* (Diversification & Risk).
  3. *Compound Interest Mountain* (Long-term growth).
- [ ] **Summary Stats**: A final dashboard for judges showing:
  - Knowledge gain (Pre vs Post quiz score).
  - XP earned and Badges unlocked.

## Phase 5: Polish & Accessibility ✨
- [ ] Add smooth page transitions using `framer-motion` (fade-in, slide-out).
- [ ] Ensure mobile responsiveness for "on-the-go" play.
- [ ] Implement "Relatable Scenarios" logic (e.g., dynamic text based on user onboarding choices).

## Phase 6: Hackathon Readiness 🚀
- [ ] Create a `demo-mode.js` file to skip to specific scenarios for judges.
- [ ] Add "Judge View" button to quickly show the final stats page.
- [ ] Build and verify production bundle: `npm run build`.
