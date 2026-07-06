# 포트폴리오 디자인 리프레시 (C 플레이풀 톤) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** doyoon.site 홈을 승인된 C 플레이풀 톤(크림/네이비 배경 + 핑크·티얼 포인트, 2px 잉크 보더 + 하드 섀도)으로 재구성한다.

**Architecture:** 전역 shadcn 토큰(`src/styles/theme.css`)을 새 팔레트로 교체하고, 홈의 5개 영역(히어로·프로젝트 그리드·경력·Credentials·푸터)을 컴포넌트 단위로 순차 개편한다. 프로젝트 카드는 `tier` 스키마를 도입해 위계(featured/sub/mini)를 데이터로 표현한다.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4 (`@theme inline`), framer-motion, shadcn/ui 컨벤션.

**Spec:** `docs/superpowers/specs/2026-07-06-portfolio-design-refresh-design.md`

**검증 방식 주의:** 이 저장소는 test 스크립트가 없다 (`package.json` scripts: dev/build/start/lint 뿐). 디자인 작업 특성상 태스크별 검증은 `yarn build` + `yarn lint` + 육안 확인으로 한다. TDD 단계는 적용하지 않는다.

**콘텐츠 확정값 (노션 이력서에서 추출, 임의 창작 금지):**
- react-suspense-check 저장소: `https://github.com/rhehfl/eslint-plugin-react-suspense-check`
- 테크톡 발표 영상 모음: `https://www.youtube.com/playlist?list=PLhVmi3OfetvXFynZIgx9IaYypuXYtM54d`
- ACK 2025 논문: `https://koreascience.kr/article/CFKO202532536103584.page`
- 학력: 인덕대학교 컴퓨터소프트웨어학과 **졸업** 2021.03–2026.02, 학점 4.37/4.5
- 이력서 링크(CTA): `https://app.notion.com/p/1b278b12a47f80178755dcf3fa5c8922` — 공개 공유 여부는 사용자 확인 필요
- 캐주얼 사진 에셋 없음 → `profile_image.jpg`를 플레이스홀더로 쓰고 완료 보고에서 사용자에게 요청

---

### Task 1: 디자인 토큰 교체 + 하드섀도·마커 유틸리티

**Files:**
- Modify: `src/styles/theme.css` (전체 교체)
- Modify: `src/app/globals.css` (마커 유틸리티 추가)

- [ ] **Step 1: `src/styles/theme.css`의 `:root` 블록을 아래로 교체** (구조·비색상 속성은 유지, chart/sidebar 토큰은 기존 값 그대로 둔다)

```css
:root {
  scroll-behavior: smooth;
  margin-inline: auto;
  padding-inline: 1rem;
  max-width: 1280px;
  color-scheme: light;
  --radius: 0.625rem;
  --background: oklch(0.975 0.025 86.9); /* #fef6e4 cream */
  --foreground: oklch(0.241 0.056 289.1); /* #1f1a38 ink */
  --card: oklch(0.994 0.007 88.6); /* #fffdf8 */
  --card-foreground: oklch(0.241 0.056 289.1);
  --popover: oklch(0.994 0.007 88.6);
  --popover-foreground: oklch(0.241 0.056 289.1);
  --primary: oklch(0.746 0.148 357.0); /* #f582ae pink */
  --primary-foreground: oklch(0.241 0.056 289.1);
  --primary-soft: oklch(0.940 0.032 348.1); /* #fde3ef */
  --secondary: oklch(0.947 0.029 89.6); /* #f5edd8 */
  --secondary-foreground: oklch(0.241 0.056 289.1);
  --muted: oklch(0.947 0.029 89.6);
  --muted-foreground: oklch(0.465 0.061 287.4); /* #57547a */
  --accent: oklch(0.823 0.073 206.9); /* #8bd3dd teal */
  --accent-foreground: oklch(0.241 0.056 289.1);
  --accent-soft: oklch(0.953 0.021 207.6); /* #e0f4f7 */
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.901 0.036 85.4); /* #e9ddc4 soft hairline */
  --input: oklch(0.901 0.036 85.4);
  --ring: oklch(0.746 0.148 357.0);
  /* --chart-1 ~ --chart-5, --sidebar ~ --sidebar-ring: 기존 값 유지 */
}
```

- [ ] **Step 2: `.dark` 블록의 색상 토큰을 아래로 교체** (chart/sidebar는 기존 값 유지)

```css
.dark {
  color-scheme: dark;
  --background: oklch(0.220 0.053 286.0); /* #191632 deep navy */
  --foreground: oklch(0.959 0.020 295.2); /* #f2effe */
  --card: oklch(0.260 0.066 286.0); /* #221e42 */
  --card-foreground: oklch(0.959 0.020 295.2);
  --popover: oklch(0.260 0.066 286.0);
  --popover-foreground: oklch(0.959 0.020 295.2);
  --primary: oklch(0.746 0.148 357.0); /* pink 유지 */
  --primary-foreground: oklch(0.241 0.056 289.1);
  --primary-soft: oklch(0.304 0.059 323.0); /* #3d2440 */
  --secondary: oklch(0.296 0.074 285.3); /* #2a2650 */
  --secondary-foreground: oklch(0.959 0.020 295.2);
  --muted: oklch(0.296 0.074 285.3);
  --muted-foreground: oklch(0.785 0.052 290.1); /* #b8b4d9 */
  --accent: oklch(0.823 0.073 206.9); /* teal 유지 */
  --accent-foreground: oklch(0.241 0.056 289.1);
  --accent-soft: oklch(0.330 0.039 222.5); /* #1d3a44 */
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(0.311 0.070 286.1); /* #2e2a52 */
  --input: oklch(0.311 0.070 286.1);
  --ring: oklch(0.746 0.148 357.0);
}
```

- [ ] **Step 3: `@theme inline` 블록 끝에 신규 토큰 매핑 추가** (기존 매핑 다음 줄에)

```css
  --color-primary-soft: var(--primary-soft);
  --color-accent-soft: var(--accent-soft);
  --shadow-hard: 4px 4px 0 0 var(--foreground);
  --shadow-hard-sm: 3px 3px 0 0 var(--foreground);
  --shadow-hard-pink: 6px 6px 0 0 var(--primary);
  --shadow-hard-teal: 5px 5px 0 0 var(--accent);
```

(Tailwind v4에서 `--shadow-hard`는 `shadow-hard` 유틸리티 클래스를, `--color-accent-soft`는 `bg-accent-soft` 등을 생성한다. `@theme inline`이므로 `var()` 참조가 유지되어 다크모드에 자동 반응한다.)

- [ ] **Step 4: `src/app/globals.css` 맨 아래에 마커 하이라이트 유틸리티 추가**

```css
@utility marker-teal {
  background-image: linear-gradient(transparent 58%, var(--accent) 58%);
}
```

- [ ] **Step 5: 빌드·린트 확인**

Run: `yarn build && yarn lint`
Expected: 둘 다 성공 (경고 허용, 에러 0)

- [ ] **Step 6: 육안 스모크 — `yarn dev` 후 홈·블로그·`/card/coko` 라이트/다크에서 배경이 크림/네이비로 바뀌고 텍스트가 읽히는지 확인.** 특히 `github-markdown-css` 사용 영역(블로그 상세)이 깨지지 않는지. 마커·하드섀도는 아직 미사용이므로 안 보이는 게 정상.

- [ ] **Step 7: Commit**

```bash
git add src/styles/theme.css src/app/globals.css
git commit -m "feat(design): 크림/네이비 + 핑크·티얼 디자인 토큰으로 교체, 하드섀도·마커 유틸 추가"
```

---

### Task 2: 히어로 개편

**Files:**
- Modify: `src/features/hero/components/HeroSection.tsx` (전면 재작성)
- Delete: `src/features/hero/components/ProfileCard.tsx`
- Delete: `src/features/hero/components/CapabilityCard.tsx`
- Delete: `src/features/hero/contents/capabilites.tsx`

- [ ] **Step 1: `HeroSection.tsx`를 아래 내용으로 전면 교체**

```tsx
'use client';

import Image from 'next/image';
import { Github, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const STACKS = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'TanStack Query'];

const RESUME_URL = 'https://app.notion.com/p/1b278b12a47f80178755dcf3fa5c8922';

export default function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const fadeUp = {
    initial: prefersReducedMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="grid grid-cols-12 gap-6 pt-8 md:pt-16"
      id="intro"
    >
      <motion.div
        {...fadeUp}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
        className="col-span-12 flex flex-col items-start gap-6 md:col-span-6 md:col-start-2"
      >
        <span className="rounded-full border-2 border-foreground bg-card px-4 py-1.5 text-sm font-semibold shadow-hard-sm">
          👋 안녕하세요!
        </span>

        <h1 className="text-3xl font-bold leading-snug md:text-4xl">
          재미있게 배우고,{' '}
          <span className="marker-teal">단단하게 만드는</span>
          <br />
          프론트엔드 개발자 구도윤입니다.
        </h1>

        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          지금은 앤드와이즈에서 n8n·LLM 기반 운영 자동화 플랫폼을 만들고
          있습니다. 번들 사이즈 85% 감소처럼 측정 가능한 개선과, 팀의 개발
          생산성을 높이는 도구 만들기를 좋아합니다.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-hard-sm transition-transform hover:-translate-y-0.5"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            이력서 보기
          </a>
          <a
            href="https://github.com/rhehfl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-card px-5 py-2.5 text-sm font-bold shadow-hard-sm transition-transform hover:-translate-y-0.5"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
        </div>

        <ul className="flex flex-wrap gap-2" aria-label="주요 기술 스택">
          {STACKS.map((stack) => (
            <li
              key={stack}
              className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground"
            >
              {stack}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.figure
        {...fadeUp}
        transition={
          prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.15 }
        }
        className="col-span-12 flex justify-center md:col-span-3 md:col-start-9 md:justify-end"
      >
        {/* TODO(사용자 에셋): 캐주얼 사진 수급 시 교체 — 현재는 증명사진 플레이스홀더 */}
        <Image
          src="/profile_image.jpg"
          alt="프론트엔드 개발자 구도윤 프로필 사진"
          width={172}
          height={212}
          priority
          className="rotate-[1.5deg] rounded-[20px] border-2 border-foreground object-cover shadow-hard-teal"
        />
      </motion.figure>
    </section>
  );
}
```

- [ ] **Step 2: 미사용 파일 삭제**

```bash
git rm src/features/hero/components/ProfileCard.tsx src/features/hero/components/CapabilityCard.tsx src/features/hero/contents/capabilites.tsx
```

- [ ] **Step 3: 잔여 참조 확인**

Run: `grep -rn "ProfileCard\|CapabilityCard\|capabilites\|CAPABILITIES" src/`
Expected: 결과 없음 (있으면 해당 import 제거)

- [ ] **Step 4: 빌드·린트 확인**

Run: `yarn build && yarn lint`
Expected: 성공

- [ ] **Step 5: 육안 확인 — 홈 히어로에 배지·마커 헤드라인·CTA 2개·스택 칩·기울어진 사진 프레임이 라이트/다크 모두 정상 표시**

- [ ] **Step 6: Commit**

```bash
git add -A src/features/hero/
git commit -m "feat(hero): 플레이풀 히어로 개편 — 배지·마커 헤드라인·CTA·스택 칩·스티커 사진 프레임"
```

---

### Task 3: 프로젝트 카드 스키마·데이터 확장

**Files:**
- Modify: `src/features/project/types/ProjectCard.ts`
- Modify: `src/features/project/contents/common/projectCardData.ts`
- Modify: `src/features/project/components/TechStack.tsx` (색상 맵 추가)
- Modify: `src/app/card/[id]/page.tsx` (optional 필드 대응)

- [ ] **Step 1: `ProjectCard.ts` 인터페이스 교체**

```ts
import { TechStackType } from '@/features/project/components/TechStack';

export type ProjectTier = 'featured' | 'sub' | 'mini';

export interface ProjectCard {
  title: string;
  description: string;
  previewImageUrl?: string;
  githubLink?: string;
  detailUrl?: string;
  techStack: TechStackType[];
  period: string;
  /** 홈 그리드 위계. 없으면 홈에 노출하지 않는다 (상세 페이지 라우팅은 유지). */
  tier?: ProjectTier;
  badge?: 'work';
  /** featured 카드의 성과 불릿 (2개 권장) */
  highlights?: string[];
}
```

- [ ] **Step 2: `TechStack.tsx`의 `TECH_COLOR_MAP`에 신규 항목 추가** (기존 항목 뒤에)

```ts
  JavaScript:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
  ESLint:
    'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  Vitest: 'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300',
  'Chrome Extension':
    'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
  n8n: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  'Jira API': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  LLM: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
```

- [ ] **Step 3: `projectCardData.ts` 데이터 갱신** — 기존 CoKo 항목에 `tier: 'featured'`와 `highlights` 추가, DoranDoran에 `tier: 'mini'` 추가, p-pick·DevPortfolio는 **tier 없이 그대로 유지**(상세 페이지·메타데이터 보존), 신규 3개 항목을 CoKo 다음에 삽입:

```ts
// CoKo 항목에 추가:
    tier: 'featured',
    highlights: [
      '초기 번들 사이즈 85% 감소 (2.0MB → 300KB)',
      'SSE 실시간 이벤트 동기화 · 영역별 에러 바운더리 방어 설계',
    ],

// 신규 항목 (CoKo 다음, p-pick 앞에 삽입):
  {
    description:
      '접속한 고객사 사이트의 CMS 종류·버전을 자동 판별하는 운영용 크롬 확장 프로그램',
    title: 'CMS Inspector',
    techStack: ['JavaScript', 'Chrome Extension', 'Vitest'],
    period: '2026.06 ~',
    tier: 'sub',
    badge: 'work',
  },
  {
    description:
      '고객 인입을 LLM이 자동 트리아지해 Jira로 티켓팅하는 n8n 기반 사내 자동화 플랫폼',
    title: 'Hermes',
    techStack: ['n8n', 'Jira API', 'LLM'],
    period: '2026.05 ~',
    tier: 'mini',
    badge: 'work',
  },
  {
    description:
      'Suspense 런타임 에러를 네이밍 규칙으로 사전 차단하는 ESLint 플러그인 (npm 배포)',
    githubLink: 'https://github.com/rhehfl/eslint-plugin-react-suspense-check',
    title: 'react-suspense-check',
    techStack: ['JavaScript', 'ESLint', 'Vitest'],
    period: '개인 프로젝트',
    tier: 'mini',
  },

// DoranDoran 항목에 추가:
    tier: 'mini',
```

- [ ] **Step 4: `src/app/card/[id]/page.tsx`를 optional 필드에 대응** — `generateStaticParams`와 `generateMetadata`의 두 곳 수정:

```ts
export async function generateStaticParams() {
  return ProjectCardData.filter((project) => project.detailUrl).map(
    (project) => ({ id: project.detailUrl! }),
  );
}
```

`generateMetadata` 안의 `const imageUrl = project.previewImageUrl;` 을:

```ts
  const imageUrl = project.previewImageUrl ?? '/opengraph-image.png';
```

- [ ] **Step 5: 빌드·린트 확인** (ProjectCard.tsx가 아직 구 스키마 기준이라 optional 관련 타입 에러가 나면 Task 4에서 함께 해소해도 되지만, 이 시점 에러는 `previewImageUrl` 필수 사용처 2곳뿐이어야 한다)

Run: `yarn build && yarn lint`
Expected: `ProjectCard.tsx`에서 `previewImageUrl` string|undefined 타입 에러 가능 — Task 4에서 해소. 그 외 에러 없음. (에러가 그 범위면 커밋은 Task 4와 묶는다. 에러가 없으면 여기서 커밋.)

- [ ] **Step 6: Commit** (Task 4와 묶어 커밋하는 경우 생략)

```bash
git add src/features/project/types/ProjectCard.ts src/features/project/contents/common/projectCardData.ts src/features/project/components/TechStack.tsx src/app/card/[id]/page.tsx
git commit -m "feat(project): tier/badge/highlights 스키마 도입, 실무 프로젝트 3종 카드 데이터 추가"
```

---

### Task 4: ProjectCard 티어 변형 + 홈 그리드 재배치

**Files:**
- Modify: `src/features/project/components/ProjectCard.tsx` (전면 재작성)
- Modify: `src/app/page.tsx`

- [ ] **Step 1: `ProjectCard.tsx`를 아래로 전면 교체** — 티어별 형태: featured(2칸, 썸네일+성과 불릿, 핑크 하드섀도) / sub(1칸, 티얼 하드섀도) / mini(1칸, 컴팩트, 잉크 하드섀도). 링크 우선순위: `detailUrl`(내부) → `githubLink`(외부) → 링크 없음.

```tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AspectRatio } from '@modern-kit/react';
import TechStack from '@/features/project/components/TechStack';
import { ProjectCard as ProjectCardType } from '@/features/project/types/ProjectCard';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

function WorkBadge() {
  return (
    <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-bold text-foreground">
      실무
    </span>
  );
}

export default function ProjectCard(project: ProjectCardType) {
  const {
    title,
    description,
    detailUrl,
    githubLink,
    previewImageUrl,
    techStack,
    period,
    tier = 'mini',
    badge,
    highlights,
  } = project;
  const prefersReducedMotion = usePrefersReducedMotion();

  const isFeatured = tier === 'featured';

  const cardBody = (
    <div className="flex h-full flex-col gap-3 p-6">
      <div className="flex items-center gap-2">
        <h3 className={cn('font-bold', isFeatured ? 'text-2xl' : 'text-lg')}>
          {title}
        </h3>
        {badge === 'work' && <WorkBadge />}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {isFeatured && highlights && (
        <ul className="flex flex-col gap-1.5" aria-label="주요 성과">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm font-medium">
              <span className="mt-0.5 text-primary" aria-hidden="true">
                ✦
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}
      <p className="text-xs text-muted-foreground">{period}</p>
      <TechStack stacks={techStack} />
      {isFeatured && previewImageUrl && (
        <div className="mt-2">
          <AspectRatio ratio={16 / 9} className="relative w-full">
            <Image
              src={previewImageUrl}
              alt={`${title} 프로젝트 미리보기`}
              fill
              priority={false}
              className="rounded-lg border-2 border-foreground object-cover"
            />
          </AspectRatio>
        </div>
      )}
    </div>
  );

  const cardFrame = cn(
    'h-full rounded-2xl border-2 border-foreground bg-card transition-transform',
    isFeatured && 'shadow-hard-pink',
    tier === 'sub' && 'shadow-hard-teal',
    tier === 'mini' && 'shadow-hard',
  );

  const motionProps = {
    initial: prefersReducedMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.5, ease: 'easeOut' as const },
    whileHover: prefersReducedMotion ? undefined : { y: -4 },
  };

  const wrapperClass = cn(
    'h-full',
    isFeatured ? 'md:col-span-2' : 'md:col-span-1',
  );

  const interactiveClass =
    'flex h-full flex-col rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

  return (
    <motion.article
      {...motionProps}
      className={wrapperClass}
      aria-label={`${title} 프로젝트`}
    >
      {detailUrl ? (
        <Link
          href={`/card/${detailUrl}`}
          className={cn(interactiveClass, cardFrame)}
          aria-label={`${title} 상세 보기`}
        >
          {cardBody}
        </Link>
      ) : githubLink ? (
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(interactiveClass, cardFrame)}
          aria-label={`${title} GitHub 저장소 (새 탭)`}
        >
          {cardBody}
        </a>
      ) : (
        <div className={cardFrame}>{cardBody}</div>
      )}
    </motion.article>
  );
}
```

- [ ] **Step 2: `src/app/page.tsx`의 프로젝트 섹션을 tier 기반 3칸 그리드로 교체** (섹션 라벨 ✦ 형식도 여기서 적용)

```tsx
import ProjectCard from '@/features/project/components/ProjectCard';
import ExperienceSection from '@/features/experience/components/ExperienceSection';
import HeroSection from '@/features/hero/components/HeroSection';
import { ProjectCardData } from '@/features/project/contents/common/projectCardData';
import CredentialSection from '@/features/credential/components/CredentialsSection';

export default function Home() {
  const homeProjects = ProjectCardData.filter((project) => project.tier);

  return (
    <main className="mx-6">
      <HeroSection />
      <section className="grid grid-cols-12 gap-6" id="projects">
        <header className="col-span-10 col-start-2 mt-16 md:mt-24">
          <h2 className="text-3xl font-bold">
            <span className="text-primary" aria-hidden="true">
              ✦
            </span>{' '}
            Projects
          </h2>
        </header>
        <div className="col-span-12 grid grid-cols-1 gap-6 md:col-span-10 md:col-start-2 md:grid-cols-3 md:gap-8">
          {homeProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>
      <ExperienceSection />
      <CredentialSection />
    </main>
  );
}
```

- [ ] **Step 3: 빌드·린트 확인**

Run: `yarn build && yarn lint`
Expected: 성공 (Task 3의 잠정 타입 에러 포함 전부 해소)

- [ ] **Step 4: 회귀 확인 — `yarn dev`에서:**
- 홈 1행: CoKo(넓은 카드, 핑크 섀도, 불릿 2개, 썸네일) + CMS Inspector(실무 태그)
- 2행: Hermes(실무) · react-suspense-check · DoranDoran
- 홈에서 CoKo 클릭 → 오버레이(모달)로 상세 열림
- `/card/coko` 직접 진입 → 풀페이지 상세 정상
- `/card/p-pick` 직접 진입 → 여전히 동작 (홈에서만 숨김)
- react-suspense-check 클릭 → GitHub 새 탭

- [ ] **Step 5: Commit**

```bash
git add src/features/project/ src/app/page.tsx src/app/card/
git commit -m "feat(project): 티어 기반 카드 변형(featured/sub/mini) + 홈 3칸 그리드 재배치"
```

---

### Task 5: 경력 타임라인 갱신 + 앤드와이즈 추가

**Files:**
- Modify: `src/features/experience/contents/experiences.ts`
- Modify: `src/features/experience/components/ExperienceItem.tsx` (스타일만)
- Modify: `src/features/experience/components/ExperienceSection.tsx` (라벨·여백)

- [ ] **Step 1: `experiences.ts` 배열 맨 앞에 앤드와이즈 항목 추가, modern-kit의 `period: 'Constant'`를 날짜로 교체**

```ts
// 배열 맨 앞에 추가:
  {
    id: 0,
    type: 'work',
    period: '2026.04 - 현재',
    title: '앤드와이즈',
    company: '운영서비스팀',
    role: 'CMS 운영 · 자동화',
    description: `
대학·기관 CMS 운영 서비스를 담당하며, 반복 운영 업무를 자동화하는 사내 도구를 만듭니다.

- n8n·Jira API 기반 사내 자동화 플랫폼(Hermes) 설계·구축 — 고객 인입을 LLM이 자동 트리아지해 Jira로 티켓팅
- 수만 건의 운영 이력을 근거 기반 지식 위키(MCP 서버)로 축적`,
  },

// modern-kit 항목의 period 교체:
    period: '2024.06 - 현재',
```

(상세 문구는 콘텐츠 단계에서 확정 — 위 문구는 이력서 자기소개 문단에서 그대로 가져온 사실 기반 초안이다.)

- [ ] **Step 2: `ExperienceItem.tsx` 타임라인 스타일 교체** — 컴포넌트 본문에 현재 여부 파생 추가:

```tsx
  const isCurrent = period.includes('현재');
```

라인 요소(기존 `border-l border-border md:border-l-2` 부분)를:

```tsx
      <div className="flex-1 relative pl-6 md:pl-8 border-l-[3px] border-accent py-4">
```

도트 요소(기존 `bg-background border-2 md:border-4 border-primary` div)를:

```tsx
        <div
          className={`absolute left-[-7px] md:left-[-10px] top-0 md:top-[6px] w-[11px] h-[11px] md:w-[17px] md:h-[17px] rounded-full border-2 border-foreground z-10 transition-transform duration-300 group-hover:scale-110 ${
            isCurrent ? 'bg-primary' : 'bg-card'
          }`}
        />
```

- [ ] **Step 3: `ExperienceSection.tsx` 라벨·여백 교체** — `__Experience` h2 내용을 아래로, header 클래스의 `mt-30`을 `mt-16 md:mt-24`로:

```tsx
          <span className="text-primary" aria-hidden="true">✦</span> Experience
```

- [ ] **Step 4: 빌드·린트 확인**

Run: `yarn build && yarn lint`
Expected: 성공

- [ ] **Step 5: 육안 확인 — 타임라인 최상단에 앤드와이즈(핑크 채움 도트), modern-kit도 핑크 도트(2024.06 - 현재), 과거 항목은 빈 도트, 라인은 티얼 3px**

- [ ] **Step 6: Commit**

```bash
git add src/features/experience/
git commit -m "feat(experience): 앤드와이즈 경력 추가, 티얼 타임라인 + 현재/과거 도트 구분"
```

---

### Task 6: Credentials 2단 카드 개편

**Files:**
- Modify: `src/features/credential/types/CredentialItem.ts`
- Modify: `src/features/credential/contents/CredentialItemData.ts`
- Modify: `src/features/credential/components/CredentialItem.tsx` (전면 재작성)
- Modify: `src/features/credential/components/CredentialsSection.tsx` (전면 재작성)

- [ ] **Step 1: 타입에 `talk` 추가 + `link` 필드**

```ts
export type ItemType = 'education' | 'award' | 'certificate' | 'talk';

export interface CredentialItem {
  id: number;
  type: ItemType;
  date: string;
  title: string;
  subtitle: string;
  link?: string;
}
```

- [ ] **Step 2: `CredentialItemData.ts` 갱신** — 학력 항목을 졸업으로 수정하고 발표 항목 2개 추가:

```ts
// 기존 id:1 (인덕대학교) 항목 교체:
  {
    id: 1,
    type: 'education',
    date: '2021.03 - 2026.02',
    title: '인덕대학교',
    subtitle: '컴퓨터소프트웨어학과 졸업 (학점 4.37/4.5)',
  },

// 배열 끝에 추가:
  {
    id: 8,
    type: 'talk',
    date: '2025.11',
    title: '한국정보처리학회 ACK 2025 논문 발표',
    subtitle: 'AI 개발 파트너와의 실시간 대화형 학습 시스템 설계',
    link: 'https://koreascience.kr/article/CFKO202532536103584.page',
  },
  {
    id: 9,
    type: 'talk',
    date: '2024.06 - 2025.02',
    title: '테크톡 발표',
    subtitle: '동아리에서 2주 주기로 진행한 기술 발표 (영상 모음)',
    link: 'https://www.youtube.com/playlist?list=PLhVmi3OfetvXFynZIgx9IaYypuXYtM54d',
  },
```

- [ ] **Step 3: `CredentialItem.tsx` 전면 교체** — 카드 내부 컴팩트 행 (타임라인 제거):

```tsx
import { GraduationCap, Trophy, BadgeCheck, Presentation, ExternalLink } from 'lucide-react';
import type { CredentialItem } from '@/features/credential/types/CredentialItem';

const ICONS = {
  education: GraduationCap,
  certificate: BadgeCheck,
  award: Trophy,
  talk: Presentation,
} as const;

export default function CredentialItem({
  type,
  date,
  title,
  subtitle,
  link,
}: CredentialItem) {
  const Icon = ICONS[type] ?? BadgeCheck;

  const heading = link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-bold hover:text-primary transition-colors"
    >
      {title}
      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  ) : (
    <span className="font-bold">{title}</span>
  );

  return (
    <li className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground/70" aria-hidden="true" />
      <div className="flex flex-col">
        <div className="flex flex-wrap items-baseline gap-x-2">
          {heading}
          <span className="text-xs font-mono text-muted-foreground">{date}</span>
        </div>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </li>
  );
}
```

(주의: 기존 CredentialItem은 `index` prop을 받았으나 새 버전은 받지 않는다 — Section도 함께 교체.)

- [ ] **Step 4: `CredentialsSection.tsx` 전면 교체** — 2단 카드 그룹:

```tsx
'use client';

import CredentialItem from '@/features/credential/components/CredentialItem';
import { CREDENTIAL_ITEM_DATA } from '@/features/credential/contents/CredentialItemData';
import { motion } from 'framer-motion';

const GROUPS = [
  {
    heading: '학력 & 자격증',
    types: ['education', 'certificate'],
  },
  {
    heading: '수상 & 발표',
    types: ['award', 'talk'],
  },
] as const;

export default function CredentialsSection() {
  return (
    <section className="grid grid-cols-12 gap-6 mb-24" id="credentials">
      <header className="col-span-10 col-start-2 mt-16 md:mt-24 mb-2">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold tracking-tight text-foreground"
        >
          <span className="text-primary" aria-hidden="true">✦</span> Credentials
        </motion.h2>
      </header>

      <div className="col-span-12 grid grid-cols-1 gap-6 md:col-span-10 md:col-start-2 md:grid-cols-2 md:gap-8">
        {GROUPS.map((group) => (
          <article
            key={group.heading}
            className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-hard"
          >
            <h4 className="mb-4 text-lg font-bold">
              <span className="text-primary" aria-hidden="true">★</span>{' '}
              {group.heading}
            </h4>
            <ul className="flex flex-col gap-4">
              {CREDENTIAL_ITEM_DATA.filter((item) =>
                (group.types as readonly string[]).includes(item.type),
              ).map((item) => (
                <CredentialItem key={item.id} {...item} />
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: 빌드·린트 확인**

Run: `yarn build && yarn lint`
Expected: 성공

- [ ] **Step 6: 육안 확인 — 2단 카드([학력 & 자격증]/[수상 & 발표]), ★ 핑크 프리픽스, 발표 항목 2개에 외부 링크 아이콘**

- [ ] **Step 7: Commit**

```bash
git add src/features/credential/
git commit -m "feat(credentials): 2단 카드 개편 — 학력&자격증 / 수상&발표, 발표 링크 추가"
```

---

### Task 7: 푸터 신설

**Files:**
- Create: `src/components/layout/Footer.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: `Footer.tsx` 생성**

```tsx
import Link from 'next/link';
import { Github, Mail, NotebookPen } from 'lucide-react';

const pillClass =
  'inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-card px-3.5 py-1.5 text-xs font-bold shadow-hard-sm transition-transform hover:-translate-y-0.5';

export default function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-dashed border-foreground/50">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 px-6 py-10 md:flex-row">
        <p className="text-sm font-semibold">여기까지 읽어주셔서 감사해요! 🙌</p>
        <nav className="flex flex-wrap gap-3" aria-label="푸터 링크">
          <a
            href="https://github.com/rhehfl"
            target="_blank"
            rel="noopener noreferrer"
            className={pillClass}
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            GitHub
          </a>
          <a href="mailto:rhehfl418q@gmail.com?subject=[채용 문의]" className={pillClass}>
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            이메일
          </a>
          <Link href="/blog" className={pillClass}>
            <NotebookPen className="h-3.5 w-3.5" aria-hidden="true" />
            Blog
          </Link>
        </nav>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: `layout.tsx`에 등록** — import 추가 후 `{children}` 바로 뒤에:

```tsx
import Footer from '@/components/layout/Footer';
// ...
          <ThemeProvider>
            <Header />
            {children}
            <Footer />
            {modal}
            {photo}
          </ThemeProvider>
```

- [ ] **Step 3: 빌드·린트 확인**

Run: `yarn build && yarn lint`
Expected: 성공

- [ ] **Step 4: 육안 확인 — 홈·블로그 페이지 하단에 대시 보더 푸터, pill 링크 3종 동작 (블로그 페이지 레이아웃과 충돌 없는지 포함)**

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Footer.tsx src/app/layout.tsx
git commit -m "feat(layout): 대시 보더 푸터 신설 — 인사말 + GitHub/이메일/Blog pill 링크"
```

---

### Task 8: 최종 검증 (스펙 §테스트/검증 전체 수행)

**Files:** 수정 없음 (발견된 문제만 수정)

- [ ] **Step 1: 클린 빌드·린트**

Run: `yarn build && yarn lint`
Expected: 에러 0

- [ ] **Step 2: `yarn dev` 실행 후 chrome-devtools MCP(또는 브라우저)로 확인·스크린샷:**
- 홈 전 섹션 라이트 모드 (데스크톱 1280px)
- 홈 전 섹션 다크 모드
- 390px 모바일 (히어로·카드 그리드 1열 스택·타임라인·푸터)
- `/card/coko` 오버레이 + 직접 진입
- `/blog` 목록 + 블로그 상세 1건 (`github-markdown-css` 영역이 크림 배경에서 읽히는지)
- `/login` 페이지 배경·입력창

- [ ] **Step 3: 색 역할 규칙 준수 여부 셀프 체크** — 핑크: CTA·현재 도트·대표작 섀도·✦/★ 라벨 외 사용처 없음. 티얼: 마커·실무 태그·타임라인·사진 프레임 섀도·sub 카드 섀도 외 사용처 없음.

- [ ] **Step 4: 발견된 문제 수정 후 커밋**

```bash
git add -A
git commit -m "fix(design): 최종 검증에서 발견된 시각 회귀 수정"
```

(문제가 없으면 이 커밋은 생략)

- [ ] **Step 5: 스크린샷을 `docs/verification-design-refresh-2026-07-06/`에 저장하고 결과 요약을 사용자에게 보고.** 보고에 포함: ① 캐주얼 사진 에셋 요청 (현재 증명사진 플레이스홀더) ② 이력서 CTA의 노션 링크 공개 공유 설정 확인 요청 ③ Hermes 시작 시점(2026.05로 잠정 기입) 확인 요청
