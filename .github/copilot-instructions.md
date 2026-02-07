# Copilot instructions (hardy)

Use these instructions for every change in this repo.

## What this repo is

- Turborepo monorepo.
- Main app: `apps/web` (Next.js App Router).
- Shared packages: `packages/*`.
- Styling: TailwindCSS (custom palette + Iconify plugin).
- State: Zustand (store/actions/selectors pattern).
- Next.js config: `apps/web/next.config.js` uses `output: "export"` (static export).

## Project structure

```text
apps/                     # runnable applications
  web/                    # main Next.js app (Next.js App Router)
    app/                  # App Router routes + most UI
      components/         # shared UI components (Modal, Button, tables, etc.)
      constants/          # shared constants (defaults, limits, labels)
      helpers/            # shared pure helpers (parsing/formatting/sorting)
      plugins/            # app-specific plugins
      providers/          # React providers (context/setup)
      store/              # Zustand store (state/actions/selectors)
  docs/                   # docs app (also Next.js)
    app/

packages/                 # shared workspace packages
  ui/                     # shared UI package
  eslint-config/          # shared ESLint configs
  typescript-config/      # shared TS configs

_stuff/                   # local artifacts (e.g. HAR files); don’t import from here

package.json              # workspace scripts + dependency versions
turbo.json                # Turborepo pipeline
```

## Coding conventions

- Prefer TypeScript with strong typing at component boundaries.
- Keep components small; extract reusable UI into `apps/web/app/components/`.
- Avoid one-letter variable names (except trivial loops).
- Keep Tailwind class strings readable; compute long `className` strings outside `return`.
- Don’t do drive-by refactors unrelated to the goal.
- Keep file names short and descriptive.

## Constants and helpers

- Colocate helpers/constants next to a component first; extract only when shared.
- Use these shared locations under `apps/web/app/` when appropriate:
  - `constants/` for defaults/limits/labels.
  - `helpers/` for pure functions (parsing/formatting/sorting).
- Don’t create extra `*.types.ts` / `*.constants.ts` files for a single component. Keep small local types/constants in the component file unless they’re reused across multiple modules.
- Keep helpers pure (no store access, no `window`) unless explicitly browser-only.
- Avoid “god utils” files; export small, testable functions.

## State management (Zustand)

- Prefer existing actions/selectors patterns.
- Don’t mix unrelated concerns in the same state object.
- If persisting to localStorage, keep defaults exported (e.g. `initialSettings`) so reset-to-default is easy.

### Store structure (apps/web/app/store)

- Source of truth is `apps/web/app/store/store.ts`:
  - Exports types (`AppState`, `Ui`, `UiPersistent`, `Filter`, `Sorting`, `Settings`, …).
  - Exports initial/default objects (`initialUiState`, `initialUiPersistentState`, `initialFilterState`, `initialSortingState`, `initialSettings`, …).
  - Creates the hook: `useAppStore = create<AppState>()(persist(...))`.
- Persistence:
  - Only persist _small UI preferences_ (currently `uiPersistent` + `settings`) via `partialize`.
  - Keep persisted merge logic inside `store.ts` (`merge`) and keep it backward-compatible (defaults first, then persisted overlay).

### Actions

- Put mutations in `apps/web/app/store/actions.ts`.
- Pattern used here: `useAppStore.setState((state) => ({ ... }))` with immutable updates.
  - For nested fields, spread the parent object: `uiPersistent: { ...state.uiPersistent, sortingActive }`.
  - For `Set` updates (e.g. `pinnedIds`), always clone first: `const pinnedIds = new Set(state.ui.pinnedIds)`.
- Keep actions small and named as verbs:
  - `setFilterActive`, `setSortingActive`, `clearSorting`, `togglePinnedRow`, etc.
- Keep cross-cutting state separate (this repo already splits `filter` vs `sorting` vs `uiPersistent`).

### Selectors

- Put getters in `apps/web/app/store/selectors.ts`.
- Keep selectors pure and predictable:
  - Simple selectors return a field (`selectSorting = (state) => state.sorting`).
  - Derived selectors can compose other selectors (`selectFileSize` uses `selectFiles` + `selectFileId`).
  - Be defensive with optional HAR data (`?.`) and array checks.
- Prefer descriptive names with `select*` prefix.

## React component best practices

- Function components + hooks.
- Avoid `useEffect` unless syncing with the outside world; always clean up.
- Don’t store derived values in state; compute them or memoize if expensive.
- Stable list keys (IDs), not array indexes.
- Accessibility: semantic elements, keyboard support, focus styles.
- Next.js App Router:
  - Add `"use client"` only when needed.
  - Server components must not reference client-only APIs (`window`, Zustand store, etc.).

## UI guidelines

- Modals use the shared `Modal` component (built on `<dialog>`): Escape/backdrop close, size variants, scrollable body + fixed footer.
- For creating buttons, use the shared `Button` component for consistent variants/sizes.

## Dark mode

- Verify UI in light + dark mode.
- Use Tailwind `dark:` variants.
- Avoid hardcoding light-only colors without a dark counterpart.
- Ensure hover/focus/disabled states look correct in both themes.

## Quality gates (prefer before finishing)

- Typecheck (TS)
- Lint
- Tests (if configured)
- Small smoke check of the web app
