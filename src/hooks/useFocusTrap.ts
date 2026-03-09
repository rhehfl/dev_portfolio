import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * WCAG 2.1.2 (Level A) 준수:
 * 모달/다이얼로그 내부로 포커스를 가두어 키보드 사용자가
 * 배경 콘텐츠로 이동하지 못하도록 합니다.
 * 오버레이 닫힘 시 이전 포커스 요소로 복원합니다.
 *
 * motion.aside의 layoutId ref 충돌을 피하기 위해
 * HTMLDivElement를 사용하며, 반환된 ref를 내부 <div>에 연결합니다.
 */
export function useFocusTrap(active: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    const getFocusableElements = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));

    // 오픈 시 첫 번째 포커스 가능 요소로 이동
    getFocusableElements()[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const elements = getFocusableElements();
      const first = elements[0];
      const last = elements[elements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      // 닫힘 시 이전 포커스 요소로 복원
      previousFocusRef.current?.focus();
    };
  }, [active]);

  return containerRef;
}
