import ExperienceCard from '@/components/hero/ExperienceCard';
import { Wrench, Network } from 'lucide-react';

export default function Communication() {
  return (
    <section className="p-12 max-w-6xl mx-auto space-y-20">
      <ExperienceCard
        imgSrc="/communication/admin_dashboard.png"
        imgAlt="협업 이미지"
        subTitle="디자이너와의 협업"
        badge="Problem Solving"
        title="디자인 의도를 존중하며 개발합니다."
        icon={<Wrench className="w-4 h-4" />}
        description={
          <p>
            무조건적인 신기술 도입보다는
            <strong>팀의 운영 병목을 해결하는 도구</strong>를 도입하는것이 더
            중요하다고 생각합니다. 어드민 페이지 개발, 환경에 맞는 아키텍처 설계
            등으로 운영 효율성을 개선한 경험이 있습니다.
          </p>
        }
      >
        <h4 className="font-semibold text-gray-900">
          🛠️ 반복 소통 비용 0원으로 만들기
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed mt-2">
          콘텐츠 추가 요청이 올 때마다 개발자가 DB를 조작해야 하는 비효율이
          있었습니다. 이를 해결하고자
          <strong>어드민 페이지를 먼저 제안하고 개발</strong>했습니다.
          결과적으로 반복적인 요청 처리를 자동화하여 동료들이 본질적인 업무에
          집중할 수 있는 환경을 만들었습니다.
        </p>
      </ExperienceCard>

      <hr className="border-gray-200" />
    </section>
  );
}
