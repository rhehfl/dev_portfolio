import { useEffect } from 'react';

/**
 * WCAG 2.1.1 (Level A) 준수:
 * Escape 키 입력 시 콜백을 실행합니다.
 * 모달, 드로어, 전체화면 등 오버레이 닫기에 공통 사용합니다.
 */
export function useEscapeKey(onEscape: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscape();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onEscape]);
}
