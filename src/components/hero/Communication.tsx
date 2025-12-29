import ZoomableImage from '@/components/common/ZoomableImage';
import { GitMerge } from 'lucide-react';

export default function Communication() {
  return (
    <section className="p-12">
      <h2 className="bold text-2xl">코드에 자존심을 담지 않습니다.</h2>
      <ZoomableImage
        src="/communication/1.png"
        alt="깃허브 리뷰 사진"
        width={500}
        height={300}
      />
      <p className="text-gray-600 leading-relaxed pt-2">
        제가 작성한 코드가 무조건 정답은 아니라고 생각합니다. 코드 리뷰 시
        팀원이나 선후배의 지적이 논리적이라면, 방어하기보다 즉시 수용하고
        개선합니다.
      </p>
      <h2 className="bold text-2xl">모든 코드에는 이유와 목적을 담습니다.</h2>
      <ZoomableImage
        src="/communication/1.png"
        alt="깃허브 리뷰 사진"
        width={500}
        height={300}
      />
      <p className="text-gray-600 leading-relaxed pt-2">
        제가 작성한 코드가 무조건 정답은 아니라고 생각합니다. 코드 리뷰 시
        팀원이나 선후배의 지적이 논리적이라면, 방어하기보다 즉시 수용하고
        개선합니다.
      </p>
    </section>
  );
}
