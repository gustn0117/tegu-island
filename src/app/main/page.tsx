import { supabase } from '@/lib/supabase';
import type { BannerSlide, Notice, CareSheet, Adoption, DailyPost, Product, Review } from '@/lib/types';
import HeroBanner from '@/components/HeroBanner';
import GateSection from '@/components/GateSection';
import NoticeSection from '@/components/NoticeSection';
import AdoptionSection from '@/components/AdoptionSection';
import DailySection from '@/components/DailySection';
import { CompactProductColumn } from '@/components/ProductSection';
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

      {/* 분양 + 일상 (2열) */}
      <div className="section-divider" />
      <section className="py-24 md:py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            <AdoptionSection adoptions={(adoptions as Adoption[]) || []} compact />
            <DailySection posts={(dailyPosts as DailyPost[]) || []} compact />
          </div>
        </div>
      </section>

      {/* 추천상품 + 신상품 (2열) */}
      <div className="section-divider" />
      <section className="py-24 md:py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            <CompactProductColumn products={(featuredProducts as Product[]) || []} ko="추천상품" en="Recommended" />
            <CompactProductColumn products={(newProducts as Product[]) || []} ko="신상품" en="New Arrivals" delay={0.1} />
          </div>
        </div>
      </section>

      {/* 사육용품 + 후기 (2열) */}
      <div className="section-divider" />
      <section className="py-24 md:py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            <CompactProductColumn products={(supplies as Product[]) || []} ko="사육용품" en="Keeping Supplies" />
            <ReviewSection reviews={(reviews as Review[]) || []} compact />
          </div>
        </div>
      </section>
    </>
  );
}
