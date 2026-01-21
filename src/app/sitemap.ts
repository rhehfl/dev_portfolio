import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://doyoon.site';

  const projectIds = ['coko', 'p-pick', 'doran-doran', 'dev-portfolio'];

  // 상세 페이지 사이트맵 생성
  const projectUrls = projectIds.map((id) => ({
    url: `${baseUrl}/card/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projectUrls,
  ];
}
