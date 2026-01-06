import Coko from '@/components/project/Coko';

const cardDetailMap = {
  coko: <Coko />,
} as const;

export default function CardDetailPage() {
  return <>{cardDetailMap['coko']}</>;
}
