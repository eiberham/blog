export interface Post {
  slug: string;
  title: string;
  description?: string;
  date: string;
  category?: string;
  tags?: string;
  status: PostStatus;
}

export type PostStatus = 'published' | 'draft';

export interface PostsByYear {
  [key: string]: Post[]
}