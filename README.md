# Task Planner Pro

A fast, minimal personal task manager built with the Next.js App Router, TypeScript, TanStack Query, Tailwind CSS, shadcn/ui and Firebase.

**Live:** https://task-planner-pro.vercel.app

## Features

- Google sign-in (Firebase Auth)
- Quick-add tasks from the list, or create one with details
- One-tap completion with optimistic updates
- Progress summary ("3 of 8 completed")
- Filter by status (All / Pending / Done), search, and sort (saved between visits)
- Edit title and description; renamed tasks get a fresh URL
- Delete with a confirmation dialog and **Undo**
- Light, dark and system themes
- Mobile-first layout: safe-area aware, 16px inputs so iOS Safari never zooms on focus

## Tech stack

| Area      | Tools                                                                |
| --------- | -------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router, Turbopack), React 19                         |
| Data      | Firebase 13 (Auth + Firestore), TanStack Query 5                     |
| UI        | Tailwind CSS 4, shadcn/ui (Radix), lucide-react, sonner, next-themes |
| Tooling   | TypeScript 5, ESLint 9 (flat config), Prettier, changelogen          |

## Architecture

Data flows one way through small, single-purpose layers. Firestore types never reach components.

```
Firestore / Firebase Auth
        │
  src/api/            raw I/O only; returns API types (DTOs)
  src/api/types/      DTOs: documents exactly as Firestore stores them
        │
  src/converters/     DTO ⇄ frontend types (e.g. Timestamp → Date)
        │
  src/providers/      business rules: ownership checks, slugs, soft delete
        │
  src/hooks/          React Query queries & mutations (cache, optimistic UI)
        │
  src/components/     UI consumes frontend types from src/types/
```

```
src/
├─ api/                firebase.ts, tasks.api.ts, auth.api.ts, types/*.dto.ts
├─ converters/         task.converter.ts, user.converter.ts
├─ providers/          task.provider.ts, auth.provider.ts
├─ hooks/              queries/, mutations/, useTaskFilters.ts, useAuthActions.ts
├─ context/            AuthContext (current user + loading state)
├─ types/              Task, AppUser and related frontend types
├─ components/
│  ├─ app/             AppProviders (theme, query client, auth, toasts)
│  ├─ auth/            AuthCard, RequireAuth, RedirectIfAuthenticated
│  ├─ layout/          Navbar, ThemeToggle, UserMenu
│  ├─ tasks/           TaskList, TaskItem, TaskForm, QuickAddTask, TaskFilters, …
│  └─ ui/              shadcn/ui primitives
├─ app/
│  ├─ (auth)/          /, /sign-in, /sign-up (guests only)
│  └─ (protected)/     /home, /create, /task/[slug] (one shared auth guard)
├─ lib/                constants, query client & keys, errors, cn()
└─ utils/              slug and time helpers
```

**Adding a feature**: add or extend the DTO and API function, map it in a converter, expose it through the provider, wrap it in a hook, then use the hook in a component.

## Getting started

Requires Node.js 22+.

```bash
git clone https://github.com/iamsomraj/task-planner.git
cd task-planner
npm install
cp .env.example .env.local   # fill in your Firebase web config
npm run dev
```

| Variable                                   | Description          |
| ------------------------------------------ | -------------------- |
| `NEXT_PUBLIC_FIREBASE_API_KEY`             | Firebase web API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         | Auth domain          |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          | Project id           |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`      | Storage bucket       |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender id  |
| `NEXT_PUBLIC_FIREBASE_APP_ID`              | App id               |

Firestore needs a composite index on `tasks`: `userId ↑, isDeleted ↑, updatedAt ↓, createdAt ↓`. The Firebase console offers a link to create it the first time the query runs. To sign in from a Vercel preview URL, add that domain under **Firebase Auth → Settings → Authorized domains**.

## Scripts

| Script                          | What it does                                                                |
| ------------------------------- | --------------------------------------------------------------------------- |
| `npm run dev`                   | Start the dev server                                                        |
| `npm run build` / `npm start`   | Production build / serve                                                    |
| `npm run type-check`            | TypeScript, no emit                                                         |
| `npm run lint` / `lint:fix`     | ESLint                                                                      |
| `npm run format` / `format:fix` | Prettier (with Tailwind class sorting)                                      |
| `npm run pre-commit`            | type-check + lint + format                                                  |
| `npm run release`               | Bump version from conventional commits, update `CHANGELOG.md`, tag and push |

## Contributing

Commits follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:` …); the changelog and version bump are generated from them.

## Feedback

Feedback and tips are welcome: iamsomraj@gmail.com.
