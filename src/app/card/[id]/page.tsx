import Communication from '@/components/hero/Communication';
import Coko from '@/components/project/Coko';

const cardDetailMap = {
  coko: <Coko />,
} as const;

export default function CardDetailPage() {
  return <>{cardDetailMap['coko']}</>;
}
