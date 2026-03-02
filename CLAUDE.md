# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start dev server
yarn build      # Production build
yarn start      # Start production server
yarn lint       # Run ESLint
```

Package manager is **Yarn 4 (Berry)** — always use `yarn`, not `npm`.

No test runner script is defined in `package.json`, but Vitest + Playwright browser tests are configured as devDependencies.

## Architecture

**Next.js 16 App Router** portfolio site with React 19, TypeScript, Tailwind CSS v4.

### Route structure

```
src/app/
  layout.tsx          # Root layout — accepts @modal and @photo parallel route slots
  page.tsx            # Home: HeroSection, project cards grid, ExperienceSection, CredentialSection
  card/[id]/          # Full-page project detail (direct navigation)
  blog/               # Blog listing (Supabase), write, edit, [id] detail
  photo/              # Photo page
  @modal/             # Parallel slot: intercepts card/[id] to show overlay instead of full page
    (.)card/[id]/
  @photo/             # Parallel slot: intercepts photo page
    (.)photo/
```

The `@modal` slot uses Next.js **intercepting routes** — navigating to `/card/coko` from the home page renders the project detail inside an `OverlayContainer` (modal/drawer/fullscreen). Direct URL access renders the full-page version via `app/card/[id]/page.tsx`.

### Feature-based structure

`src/features/` holds domain logic split by feature:

- **`project/`** — Project cards and detail pages. Static content defined in `contents/{project-name}/data.ts` as `ProjectDetailData` objects. `CardRenderer.tsx` maps string IDs to React components.
- **`blog/`** — Blog with Supabase backend. `useEditor` hook handles create/edit with image paste-to-upload.
- **`experience/`** — Work experience section with MDX/markdown content.
- **`hero/`** — Hero and profile section.
- **`credential/`** — Certifications/credentials section.

### Overlay system

`src/components/overlays/` implements a unified overlay with four `ViewMode` values: `'hidden' | 'drawer' | 'modal' | 'fullscreen'`. The mode is persisted in `sessionStorage` (key `overlay-view-mode`). Framer Motion handles animations and layout transitions.

### External services

| Service | Purpose | Config |
|---|---|---|
| Supabase | Auth + blog `posts` table | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Notion API | Additional content | `NOTION_API_KEY`, `NOTION_DATABASE_ID` |
| GitHub Raw | Fetch `README.md` for project feature sections | public, no key needed |

Middleware (`src/middleware.ts`) protects `/blog/write` and `/blog/edit/*` — redirects unauthenticated users to `/login`.

### Adding a new project

1. Add entry to `src/features/project/contents/common/projectCardData.ts`
2. Create `src/features/project/contents/{id}/` with a component and `data.ts` exporting `ProjectDetailData`
3. Register the component in `src/components/common/CardRenderer.tsx` under `PROJECT_COMPONENTS`

### UI components

- Primitive components in `src/components/ui/` follow shadcn/ui conventions (Radix + `class-variance-authority`)
- Theme uses `gd-theme` localStorage key; toggle between `'light'` and `'dark'` via `data-theme` attribute on `<html>`
- `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge)


### 답변 참고사항
답변을 한국어로 해.