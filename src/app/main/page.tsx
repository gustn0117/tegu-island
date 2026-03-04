import { supabase } from '@/lib/supabase';
import type { BannerSlide, Notice, CareSheet, Adoption } from '@/lib/types';
import HeroBanner from '@/components/HeroBanner';
import GateSection from '@/components/GateSection';
import NoticeSection from '@/components/NoticeSection';
import AdoptionSection from '@/components/AdoptionSection';

export const revalidate = 60;

export default async function MainPage() {
  const [
    { data: bannerSlides },
    { data: notices },
    { data: careSheets },
    { data: adoptions },
  ] = await Promise.all([
    supabase.from('banner_slides').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('notices').select('*').eq('is_active', true).order('created_at', { ascending: false }),
    supabase.from('care_sheets').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('adoptions').select('*').eq('is_active', true).eq('status', 'Active').order('sort_order').limit(6),
  ]);

  return (
    <>
      <HeroBanner slides={(bannerSlides as BannerSlide[]) || []} />

      {/* 분양 중인 개체 */}
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
    </>
  );
}
