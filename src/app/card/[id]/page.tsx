import CardRenderer from '@/components/common/CardRenderer';
import { ProjectCardData } from '@/features/project/contents/common/projectCardData';
import { Metadata } from 'next';

interface CardDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ProjectCardData.map((project) => ({ id: project.detailUrl }));
}

export async function generateMetadata({ params }: CardDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = ProjectCardData.find((p) => p.detailUrl === id);

  if (!project) {
    return { title: '프로젝트를 찾을 수 없음' };
  }

  const description = `${project.description} | 기술 스택: ${project.techStack.join(', ')} | 개발 기간: ${project.period}`;
  const imageUrl = project.previewImageUrl;

  return {
    title: project.title,
    description,
    keywords: [...project.techStack, project.title, '프론트엔드', '포트폴리오', '구도윤'],
    alternates: {
      canonical: `/card/${id}`,
    },
    openGraph: {
      title: `${project.title} | 구도윤 포트폴리오`,
      description,
      type: 'website',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${project.title} 프로젝트 미리보기` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | 구도윤 포트폴리오`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function CardDetailPage({ params }: CardDetailPageProps) {
  const { id } = await params;

  return <CardRenderer id={id} />;
}
