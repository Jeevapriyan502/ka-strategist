export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  created_at?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  published_at: string;
  author: string;
}

export interface BlogPostInput {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  cover_image?: string | null;
  published_at?: string;
  author?: string;
}
