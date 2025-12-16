import {
  useIsomorphicLayoutEffect,
  useSessionStorage,
} from '@modern-kit/react';
import { useRef } from 'react';

interface UseKeepScrollProps {
  key: string;
  target?: React.RefObject<HTMLElement>;
  waitFor?: unknown;
}

export const useKeepScroll = ({
  key,
  target,
  waitFor,
}: UseKeepScrollProps): void => {
  const isRestoredRef = useRef(false);

  const { state: savedPos, setState } = useSessionStorage<number>({
    key,
    initialValue: 0,
  });

  useIsomorphicLayoutEffect(() => {
    const scrollTarget = target?.current || window;
    if (isRestoredRef.current || !savedPos || savedPos === 0) return;

    const currentScrollHeight =
      scrollTarget instanceof Window
        ? document.documentElement.scrollHeight
        : scrollTarget.scrollHeight;

    if (currentScrollHeight >= savedPos) {
      scrollTarget.scrollTo(0, savedPos);
      isRestoredRef.current = true;
    }
  }, [savedPos, target, waitFor]);

  useIsomorphicLayoutEffect(() => {
    const scrollTarget = target?.current || window;
    return () => {
      const currentPos =
        scrollTarget instanceof Window
          ? scrollTarget.scrollY
          : scrollTarget.scrollTop;

      setState(currentPos);
      isRestoredRef.current = false;
    };
  }, [key, target, setState]);
};
