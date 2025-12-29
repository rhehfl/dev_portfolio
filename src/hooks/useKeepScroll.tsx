import {
  useIsomorphicLayoutEffect,
  useSessionStorage,
} from '@modern-kit/react';
import { useRef } from 'react';

const generateUniqueId = () => {
  return `scroll_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const getHistoryKey = () => {
  if (typeof window === 'undefined') return '';

  const state = window.history.state;
  const historyKey = state?.key || state?.__scroll_key;

  if (historyKey) return historyKey;

  const newKey = generateUniqueId();
  window.history.replaceState({ ...state, __scroll_key: newKey }, '');
  return newKey;
};

interface UseScrollRestorationProps {
  enabled?: boolean;
}

// 저장소 데이터 타입 정의
type ScrollStorageMap = Record<string, number>;
const STORAGE_KEY = '__modern_kit_scroll_restoration_map__';

export const useScrollRestoration = <T extends HTMLElement>({
  enabled = true,
}: UseScrollRestorationProps = {}) => {
  const isRestoredRef = useRef(false);
  const ref = useRef<T | null>(null);

  const historyKeyRef = useRef<string>('');

  const { state: storageMap, setState: setStorageMap } =
    useSessionStorage<ScrollStorageMap>({
      key: STORAGE_KEY,
      initialValue: {},
    });

  useIsomorphicLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      const original = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      return () => {
        window.history.scrollRestoration = original;
      };
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!historyKeyRef.current) {
      historyKeyRef.current = getHistoryKey();
    }

    if (!enabled || isRestoredRef.current || !storageMap) return;

    const historyKey = historyKeyRef.current;
    const savedPos = storageMap[historyKey];

    if (!savedPos) return;

    const scrollTarget = ref.current || window;
    const currentScrollHeight =
      scrollTarget instanceof Window
        ? document.documentElement.scrollHeight
        : scrollTarget.scrollHeight;

    if (currentScrollHeight >= savedPos) {
      const scrollToOptions: ScrollToOptions = {
        top: savedPos,
        behavior: 'instant',
      };

      if (scrollTarget instanceof Window) {
        window.scrollTo(scrollToOptions);
      } else {
        (scrollTarget as HTMLElement).scrollTo(scrollToOptions);
      }

      isRestoredRef.current = true;
    }
  }, [enabled, storageMap]);

  useIsomorphicLayoutEffect(() => {
    return () => {
      const historyKey = historyKeyRef.current;
      if (!historyKey) return;
      console.log(ref);
      const scrollTarget = ref.current || window;
      const currentPos =
        scrollTarget instanceof Window
          ? window.scrollY
          : (scrollTarget as HTMLElement).scrollTop;

      setStorageMap((prev) => ({
        ...prev,
        [historyKey]: currentPos,
      }));
    };
  }, [setStorageMap]);

  return { ref };
};
