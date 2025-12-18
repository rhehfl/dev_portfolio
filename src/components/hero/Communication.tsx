import ZoomableImage from '@/components/common/ZoomableImage';
import { GitMerge } from 'lucide-react';
import Image from 'next/image';

export default function Communication() {
  return (
    <section className="p-12">
      <GitMerge className="w-5 h-5 text-purple-500" />
      <h2 className="bold text-2xl">코드 리뷰를 통한 소통</h2>
      <ZoomableImage
        src="/communication/1.png"
        alt="깃허브 리뷰 사진"
        width={500}
        height={300}
      />
      <p className="text-gray-600 leading-relaxed pt-2">
        기능 구현에 그치지 않고, <strong>왜 이 코드가 필요한가?</strong>에 대해
        치열하게 고민합니다. 단순한 LGTM보다는 건설적인 질문을 던지며 좋은 코드
        품질을 위해 노력합니다.
      </p>
      오픈소스기여랑 애자일, 노션으로 소통한거 쓰기
    </section>
  );
}
