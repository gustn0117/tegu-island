import { supabase } from '@/lib/supabase';
import type { BannerSlide, Notice, CareSheet, DailyPost, Product, Review, Adoption } from '@/lib/types';
import HeroBanner from '@/components/HeroBanner';
import WelcomeSection from '@/components/WelcomeSection';
import GateSection from '@/components/GateSection';
import NoticeSection from '@/components/NoticeSection';
import DailySection from '@/components/DailySection';
import AdoptionSection from '@/components/AdoptionSection';
import ProductSection from '@/components/ProductSection';
import ReviewSection from '@/components/ReviewSection';

export const revalidate = 60;

export default async function MainPage() {
  const [
    { data: bannerSlides },
    { data: notices },
    { data: careSheets },
    { data: dailyPosts },
    { data: products },
    { data: reviews },
    { data: adoptions },
  ] = await Promise.all([
    supabase.from('banner_slides').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('notices').select('*').eq('is_active', true).order('created_at', { ascending: false }),
    supabase.from('care_sheets').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('daily_posts').select('*').eq('is_active', true).order('created_at', { ascending: false }),
    supabase.from('products').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('reviews').select('*').eq('is_active', true).order('created_at', { ascending: false }),
    supabase.from('adoptions').select('*').eq('is_active', true).eq('status', 'Active').order('sort_order'),
  ]);

  const allProducts = (products as Product[]) || [];
  const featuredProducts = allProducts.filter(p => p.product_type === 'featured');
  const supplies = allProducts.filter(p => p.product_type === 'supply');
  const allAdoptions = (adoptions as Adoption[]) || [];

  return (
    <>
      <HeroBanner slides={(bannerSlides as BannerSlide[]) || []} />

      {/* Welcome 섹션 */}
      <WelcomeSection />

      {/* 분양 중인 개체 (1st) */}
      <div className="section-divider" />
      <AdoptionSection adoptions={allAdoptions.slice(0, 6)} />

      {/* 테구아일랜드가 하는 일 (2단2열) */}
      <div className="section-divider" />
      <GateSection />

      {/* 공지사항 + 케어시트 (2열) */}
      <div className="section-divider" />
      <NoticeSection notices={(notices as Notice[]) || []} careSheets={(careSheets as CareSheet[]) || []} />

      {/* 일상 */}
      <div className="section-divider" />
      <DailySection posts={(dailyPosts as DailyPost[]) || []} />

      {/* 분양 중인 개체 (2nd) */}
      <div className="section-divider" />
      <AdoptionSection adoptions={allAdoptions.slice(0, 6)} />

      {/* 추천상품 + 사육용품 */}
      <div className="section-divider" />
      <ProductSection featuredProducts={featuredProducts} supplies={supplies} />

      {/* 구매후기 */}
      <div className="section-divider" />
      <ReviewSection reviews={(reviews as Review[]) || []} />
    </>
  );
}
