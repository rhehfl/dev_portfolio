import MarkDownWrapper from '@/components/common/MarkDownWrapper';
import { MODERN_KIT } from '@/features/experience/contents/modern-kit/modern-kit';

export default function ModernKit() {
  return (
    <article className="p-10">
      <MarkDownWrapper>{MODERN_KIT}</MarkDownWrapper>
    </article>
  );
}
