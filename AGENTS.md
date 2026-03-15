# AGENTS Guide for `todo-app-nextjs`

## Scope and app root
- The runnable app lives in `nextjs/` (treat this as the working directory for install/dev/build/lint).
- Repository root contains assessment docs (`ASSUMPTIONS.md`, `DECISIONS.md`, `DESIGN.md`, `PROBLEMS_SOLUTIONS.md`) that explain why some features are intentionally incomplete.

## Architecture (what talks to what)
- Entry flow: `nextjs/pages/index.js` -> `nextjs/src/App.js` -> `nextjs/components/TodoList.js` -> `nextjs/components/Todo.js`.
- State owner is `nextjs/src/App.js`: todo array, add/toggle/delete logic, and persistence to `localStorage` key `todo.list.app`.
- Item rows in `nextjs/components/Todo.js` receive `todo` + `toggleTodo` from parent; this component currently keeps a second local store (`todo.list.app2`) for edit attempts, so edit persistence is not wired to parent state.
- Theme is split in two places: `nextjs/pages/_app.js` wraps pages with static `nextjs/src/theme.js`, while `nextjs/src/App.js` has an inner `ToggleColorMode` provider for light/dark mode switching.
- SSR styling integration follows MUI + Emotion defaults via `nextjs/pages/_document.js` and `nextjs/src/createEmotionCache.js`.

## Developer workflows
- Install dependencies in app folder:
```bash
cd nextjs
npm install
```
- Run local dev server:
```bash
cd nextjs
npm run dev
```
- Lint and formatting scripts available in `nextjs/package.json`:
```bash
cd nextjs
npm run lint
npm run prettier:check
npm run prettier:fix
```
- There is no test script or test suite in this repo at the time of writing.

## Project-specific coding patterns
- Todos are plain objects `{ id, name, complete }`; IDs are generated with `uuid` (`v4`) in `nextjs/src/App.js`.
- Add uses uncontrolled input with `useRef` (`todoNameRef`) and Enter-key handling (`onKeyDown`) instead of controlled form state.
- `deleteTodo` means "clear completed" (keeps `!todo.complete`), while `handleDeleteTodos` currently evaluates to an empty list; preserve behavior unless explicitly asked to fix.
- The UI relies on MUI `sx` props and icon buttons/tooltips; there is little to no CSS usage in runtime paths (`nextjs/src/App.scss` is not imported by active pages).
- `nextjs/components/TodoForm.js` exists but is empty; `nextjs/hooks/useLocalStorage.js` and `nextjs/hooks/useDarkMode.js` are mostly unused helpers.

## Integration points and dependencies
- Framework/runtime: Next.js + React in `nextjs/package.json` (`next`/`react` are `latest`).
- UI stack: Material UI (`@mui/material`, icons) + Emotion cache/server setup for SSR.
- Persistence boundary: browser `localStorage` only; no backend/API calls in active code.
- Sample data exists in `nextjs/data/sample.json` (large fixture) but is not consumed by the app.

## Existing AI-instruction sources found
- Required convention glob search found only one repo-level source: `README.md` (plus many `node_modules/**/README.md` files).
- No existing repo-specific `.github/copilot-instructions.md`, `AGENT.md`, `AGENTS.md`, `CLAUDE.md`, or cursor/windsurf/cline rule files were found before this file was added.

