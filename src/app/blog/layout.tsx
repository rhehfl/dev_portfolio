import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | 구도윤 기술 블로그',
    default: '기술 블로그',
  },

  description:
    '프론트엔드 개발자 구도윤의 학습 기록과 트러블 슈팅 경험을 공유하는 기술 블로그입니다.',

  openGraph: {
    title: '구도윤 기술 블로그',
    description: '프론트엔드 개발 지식과 트러블 슈팅 경험을 공유합니다.',
    url: 'https://doyoon.site/blog',
    type: 'website',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
