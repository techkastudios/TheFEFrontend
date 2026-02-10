export interface Reporter {
  id?: number;
  name?: string;
  username?: string;
}

export interface Posts {
  id?: number;
  title?: string;
  slug?: string;
  image?: string;
  excerpt?: string;
  content?: string;
}

export interface Category {
  id?: number;
  name?: string;
  slug?: string;
  color?: string;
}

export interface CategoryPost {
  id?: number;
  name?: string;
  slug?: string;
  color?: string;
  posts?: Posts[]
}

export interface CategorySportPost {
  id?: number;
  name?: string;
  slug?: string;
  color?: string;
  featured?: Posts;
  posts: Posts[];
  displayed: Posts[];
  titles: Posts[];
}

export interface Post {
  id?: number;
  title?: string;
  meta_title?: string;
  meta_description?: string;
  slug?: string;
  excerpt?: string;
  image?: string;
  caption?: string;
  source?: string;
  content?: string;
  publishedAt?: string;
  updatedAt?: string;
  reporter?: Reporter;
  category?: Category;
  metaImage?:string;
}

export interface PostPagination {
  items: Posts[],
  nextPageUrl: string;
  prevPageUrl: string;
  limit: number;
  hasPages: boolean;
}
