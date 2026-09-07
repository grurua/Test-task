# Discover — Banking Prototype

An interactive frontend prototype of **Discover**, a new primary navigation
destination for a mobile banking app that surfaces personalized
recommendations, new product capabilities, and merchant offers in one
curated feed.

## Stack

- React + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- lucide-react (icons)

## Structure

```
src/
  types/        Domain types (Recommendation, FeatureUpdate, MerchantOffer, ...)
  data/         Mock data, separated from presentation
  state/        AppStateContext — interactive state (dismiss, activate, opt-out)
  lib/          Formatting, icon registry, small hooks
  components/
    layout/     AppShell, BottomNavigation, TabLayout, ScreenHeader
    discover/   Reusable Discover UI (cards, chips, sheets, badges, ...)
  pages/        Screens, wired together in App.tsx
```

## Running locally

```
npm install
npm run dev
```

The app renders at a 375px-wide mobile shell, centered on wider viewports.
