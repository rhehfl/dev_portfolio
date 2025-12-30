import ExperienceCard from '@/components/hero/ExperienceCard';
import { GitPullRequest, Users } from 'lucide-react';

export default function Communication() {
  return (
    <section className="p-12 max-w-6xl mx-auto space-y-20">
      <ExperienceCard
        imgSrc="/communication/agile_meeting.png"
        imgAlt="모던애자일 팀 회의 모습"
        subTitle="Modern Agile 6기"
        period="2024.XX ~ 2024.XX (9개월)"
        badge=""
        title="9개월간 '불화 제로', 동료를 설득하는 나의 방식"
        icon={<Users className="w-4 h-4" />}
        description={
          <p>
            개발 동아리 '모던애자일'에서 9개월간 팀 프로젝트를 진행하며, 단순한
            코드 작성을 넘어
            <strong>기획 제안부터 배포까지의 전체 사이클</strong>을
            경험했습니다.
          </p>
        }
      >
        <h4 className="font-semibold text-gray-900">
          💡 실제 사례: 감정 소모 없는 코드 리뷰 문화 정착
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          초기에는 코드 리뷰를 '지적'으로 받아들이는 분위기가 있었습니다. 저는
          이를 개선하기 위해 먼저 <strong>"Pn(Priority) 룰"</strong> 도입을
          제안했습니다. (중략... 내용 작성)
        </p>
      </ExperienceCard>

      <hr className="border-gray-200" />

      <ExperienceCard
        imgSrc="/communication/opensource_pr.png"
        imgAlt="오픈소스 PR 승인 화면"
        subTitle="modern-kit 라이브러리"
        period="Contribution & Merge"
        badge="Open Source"
        title="내 코드가 생태계에 기여하는 즐거움"
        icon={<GitPullRequest className="w-4 h-4" />}
        description={
          <>
            혼자만 쓰는 코드가 아닌,{' '}
            <strong>누구나 사용할 수 있는 유틸리티</strong>를 고민합니다. React
            오픈소스 라이브러리인 <code>modern-kit</code> 생태계에 관심을 갖고
            직접 기여했습니다.
          </>
        }
      >
        {/* 여기가 children (회색 박스 내용) */}
        <h4 className="font-semibold text-gray-900">
          🚀 기여 사례: useKeepScroll 커스텀 훅 개발
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          페이지 이동 후 뒤로 가기 시 스크롤 위치가 초기화되는 문제를 겪는
          사용자들을 위해,
          <code>SessionStorage</code>를 활용한 <strong>useKeepScroll</strong>{' '}
          훅을 제안하고 구현했습니다. (중략... 내용 작성)
        </p>
      </ExperienceCard>
    </section>
  );
}
