import { PostPagination, Posts } from './posts'

export interface SubCategory {
  id?: number
  name: string
  slug: string
  color?: string
  posts: Posts[]
  featured: Posts
}

export interface CategoryEconomy {
  id?: number
  name: string
  slug: string
  color?: string
  posts: Posts[]
  featured: Posts
  titles: Posts[]
  oped: Posts[]
}

export interface CategoryStock {
  id?: number
  name: string
  slug: string
  color?: string
  featured: Posts
  posts: Posts[]
  bangladesh: Posts[]
  global: Posts[]
  oped: Posts[]
}

export interface CategoryTrade {
  id?: number
  name: string
  slug: string
  color?: string
  featured: Posts
  posts: Posts[]
  mostRead: Posts[]
  oped: Posts[]
}

export interface CategoryEducation {
  id?: number
  name: string
  slug: string
  color?: string
  featured: Posts
  posts: Posts[]
  articles: Posts[]
  oped: Posts[]
}

export interface CategoryNational {
  id?: number
  name: string
  slug: string
  color?: string
  featured: Posts
  national: Posts[]
  titles: Posts[]
  oped: Posts[]
}

export interface CategoryHomeLifestyle {
  id?: number
  name: string
  slug: string
  color?: string
  featured: Posts
  posts: Posts[]
  titles: Posts[]
  oped: Posts[]
  living: Posts[]
  entertainment: Posts[]
  foods: Posts[]
  culture: Posts[]
  others: Posts[]
}

export interface CategoryWorld {
  id?: number
  name: string
  slug: string
  color?: string
  featured: Posts
  posts: Posts[]
  asia: Posts[]
  america: Posts[]
  europe: Posts[]
  africa: Posts[]
}

export interface CategorySport {
  id?: number
  name: string
  slug: string
  color?: string
  featured: Posts
  posts: Posts[]
  latest: Posts[]
  titles: Posts[]
}

export interface CategorySportChild {
  id?: number
  name: string
  slug: string
  color?: string
  featured: Posts
  posts: PostPagination
}

export interface CategoryYouth {
  id?: number
  name: string
  slug: string
  color?: string
  posts: Posts[]
}

export interface CategoryFinance {
  id?: number
  name: string
  slug: string
  color?: string
  featured: Posts
  posts: Posts[]
  titles: Posts[]
}

export interface CategoryViews {
  id?: number
  name: string
  slug: string
  color?: string
  posts: Posts[]
  featured: Posts
  titles: Posts[]
  mostread: Posts[]
}

export interface CategoryViewsChild {
  id?: number
  name: string
  slug: string
  color?: string
  featured: Posts
  posts: Posts[]
}

export interface CategoryLifestyle {
  id?: number
  name: string
  slug: string
  color?: string
  posts: Posts[]
  featured: Posts
  titles: Posts[]
}

export interface CategoryLiving {
  id?: number
  name: string
  slug: string
  color?: string
  posts: Posts[]
  featured: Posts
  titles: Posts[]
}

export interface CategoryBangla {
  id?: number
  name: string
  slug: string
  color?: string
  featured: Posts
  posts: Posts[]
  mostRead: Posts[]
  oped: Posts[]
}
