export const TECH_COLOR_MAP = {
  // Frontend
  React: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  'React 18': 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  TypeScript:
    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'Next.js': 'bg-black text-white dark:bg-white dark:text-black',
  'Tailwind CSS':
    'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
  Zustand:
    'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200',
  'Tanstack Query':
    'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  'Framer Motion':
    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  Vite: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  'Styled-Components':
    'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  'Node.js':
    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  NestJS: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  Docker: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-200',
  AWS: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
} as const;

export type TechStackType = keyof typeof TECH_COLOR_MAP;
interface TechStackProps {
  stacks: TechStackType[];
  className?: string;
}

export default function TechStack({ stacks, className }: TechStackProps) {
  return (
    <ul className={`flex  gap-2 mb-3 ${className}`}>
      {stacks.map((stack) => (
        <li
          key={stack}
          className={`px-3 py-1 text-xs font-semibold rounded-full ${TECH_COLOR_MAP[stack]}`}
        >
          {stack}
        </li>
      ))}
    </ul>
  );
}
