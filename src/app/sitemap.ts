import type { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { ProjectCardData } from '@/features/project/contents/common/projectCardData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://doyoon.site';

  const projectUrls = ProjectCardData.map((project) => ({
    url: `${baseUrl}/card/${project.detailUrl}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const { data: posts } = await supabase.from('posts').select('id, created_at');

  const blogUrls = (posts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...projectUrls,
    ...blogUrls,
  ];
}
