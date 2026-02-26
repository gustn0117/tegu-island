import { supabase } from '@/lib/supabase';
import type { BannerSlide, Notice, CareSheet, Adoption, DailyPost, Product, Review } from '@/lib/types';
import HeroBanner from '@/components/HeroBanner';
import GateSection from '@/components/GateSection';
import NoticeSection from '@/components/NoticeSection';
import AdoptionSection from '@/components/AdoptionSection';
import DailySection from '@/components/DailySection';
import ProductSection from '@/components/ProductSection';
import ReviewSection from '@/components/ReviewSection';

export const revalidate = 60;

export default async function MainPage() {
  const [
    { data: bannerSlides },
    { data: notices },
    { data: careSheets },
    { data: adoptions },
    { data: dailyPosts },
    { data: featuredProducts },
    { data: newProducts },
    { data: supplies },
    { data: reviews },
  ] = await Promise.all([
    supabase.from('banner_slides').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('notices').select('*').eq('is_active', true).order('created_at', { ascending: false }),
    supabase.from('care_sheets').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('adoptions').select('*').eq('is_active', true).eq('status', 'Active').order('sort_order').limit(6),
    supabase.from('daily_posts').select('*').eq('is_active', true).order('created_at', { ascending: false }).limit(5),
    supabase.from('products').select('*').eq('is_active', true).eq('product_type', 'featured').order('sort_order').limit(8),
    supabase.from('products').select('*').eq('is_active', true).eq('product_type', 'new').order('sort_order').limit(8),
    supabase.from('products').select('*').eq('is_active', true).eq('product_type', 'supply').order('sort_order').limit(8),
    supabase.from('reviews').select('*').eq('is_active', true).order('created_at', { ascending: false }).limit(4),
  ]);

  return (
    <>
      <HeroBanner slides={(bannerSlides as BannerSlide[]) || []} />

      <div className="section-divider" />
      <GateSection />

      <div className="section-divider" />
      <NoticeSection notices={(notices as Notice[]) || []} careSheets={(careSheets as CareSheet[]) || []} />

      <div className="section-divider" />
      <AdoptionSection adoptions={(adoptions as Adoption[]) || []} />

      <div className="section-divider" />
      <DailySection posts={(dailyPosts as DailyPost[]) || []} />

      <div className="section-divider" />
      <ProductSection
        featuredProducts={(featuredProducts as Product[]) || []}
        newProducts={(newProducts as Product[]) || []}
        supplies={(supplies as Product[]) || []}
      />

      <div className="section-divider" />
      <ReviewSection reviews={(reviews as Review[]) || []} />
    </>
  );
}
