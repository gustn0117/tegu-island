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
    { data: supplies },
    { data: reviews },
  ] = await Promise.all([
    supabase.from('banner_slides').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('notices').select('*').eq('is_active', true).order('created_at', { ascending: false }),
    supabase.from('care_sheets').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('adoptions').select('*').eq('is_active', true).eq('status', 'Active').order('sort_order').limit(6),
    supabase.from('daily_posts').select('*').eq('is_active', true).order('created_at', { ascending: false }).limit(5),
    supabase.from('products').select('*').eq('is_active', true).eq('product_type', 'featured').order('sort_order').limit(8),
    supabase.from('products').select('*').eq('is_active', true).eq('product_type', 'supply').order('sort_order').limit(8),
    supabase.from('reviews').select('*').eq('is_active', true).order('created_at', { ascending: false }).limit(4),
  ]);

  return (
    <>
      <HeroBanner slides={(bannerSlides as BannerSlide[]) || []} />

      {/* 분양 중인 개체 (히어로 바로 아래, 기존 4카드 대체) */}
      <div className="section-divider" />
      <section className="py-24 md:py-32 px-8 bg-gray-50/40">
        <div className="max-w-7xl mx-auto">
          <AdoptionSection adoptions={(adoptions as Adoption[]) || []} compact />
        </div>
      </section>

      {/* 테구아일랜드가 하는 일 (2단2열) */}
      <div className="section-divider" />
      <GateSection />

      {/* 공지사항 + 케어시트 (2열) */}
      <div className="section-divider" />
      <NoticeSection notices={(notices as Notice[]) || []} careSheets={(careSheets as CareSheet[]) || []} />

      {/* 일상 (1열) */}
      <div className="section-divider" />
      <section className="py-24 md:py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <DailySection posts={(dailyPosts as DailyPost[]) || []} compact />
        </div>
      </section>

      {/* 추천상품 (1열) */}
      <div className="section-divider" />
      <section className="py-24 md:py-32 px-8 bg-gray-50/40">
        <div className="max-w-7xl mx-auto">
          <CompactProductColumn products={(featuredProducts as Product[]) || []} ko="추천상품" en="Recommended" />
        </div>
      </section>

      {/* 사육용품 (1열) */}
      <div className="section-divider" />
      <section className="py-24 md:py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <CompactProductColumn products={(supplies as Product[]) || []} ko="사육용품" en="Keeping Supplies" />
        </div>
      </section>

      {/* 구매후기 (1열) */}
      <div className="section-divider" />
      <section className="py-24 md:py-32 px-8 bg-gray-50/40">
        <div className="max-w-7xl mx-auto">
          <ReviewSection reviews={(reviews as Review[]) || []} compact />
        </div>
      </section>
    </>
  );
}
