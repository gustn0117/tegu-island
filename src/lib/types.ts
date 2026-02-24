export interface BannerSlide {
  id: number;
  title: string;
  title_en: string | null;
  subtitle: string | null;
  subtitle_en: string | null;
  bg: string;
  accent: string;
  image_url: string | null;
  link: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Notice {
  id: number;
  title: string;
  title_en: string | null;
  date: string | null;
  tag: string | null;
  tag_en: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CareSheet {
  id: number;
  title: string;
  title_en: string | null;
  description: string | null;
  desc_en: string | null;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DailyPost {
  id: number;
  title: string;
  title_en: string | null;
  date: string | null;
  category: string | null;
  category_en: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  name_en: string | null;
  price: string | null;
  badge: string | null;
  badge_en: string | null;
  is_new: boolean;
  category: string | null;
  image_url: string | null;
  product_type: 'featured' | 'new' | 'supply';
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: number;
  author: string;
  author_en: string | null;
  rating: number;
  text: string | null;
  text_en: string | null;
  type: string | null;
  type_en: string | null;
  date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TeguSpecies {
  id: number;
  name: string;
  name_en: string | null;
  scientific: string | null;
  status: string | null;
  status_en: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Adoption {
  id: number;
  name: string;
  name_en: string | null;
  species: string | null;
  species_en: string | null;
  morph: string | null;
  morph_en: string | null;
  sex: string | null;
  sex_en: string | null;
  age: string | null;
  age_en: string | null;
  price: string | null;
  status: string | null;
  status_en: string | null;
  description: string | null;
  desc_en: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
