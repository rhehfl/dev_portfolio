import MarkDownWrapper from '@/components/common/MarkDownWrapper';
import { MODERN_AGILE_CONTENT } from '@/features/experience/contents/modern-agile/modern-agile';
export default function ModernAgile() {
  return (
    <article className="p-10">
      <MarkDownWrapper>{MODERN_AGILE_CONTENT}</MarkDownWrapper>
    </article>
  );
}
