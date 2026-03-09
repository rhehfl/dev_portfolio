export interface Post {
  id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  thumbnail: string | null;
  view_count: number;
  is_published: boolean;
}
