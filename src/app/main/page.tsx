import { supabase } from '@/lib/supabase';
import type { BannerSlide, Notice, CareSheet } from '@/lib/types';
import HeroBanner from '@/components/HeroBanner';
import GateSection from '@/components/GateSection';
import NoticeSection from '@/components/NoticeSection';

export const revalidate = 60;

export default async function MainPage() {
  const [
    { data: bannerSlides },
    { data: notices },
    { data: careSheets },
  ] = await Promise.all([
    supabase.from('banner_slides').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('notices').select('*').eq('is_active', true).order('created_at', { ascending: false }),
    supabase.from('care_sheets').select('*').eq('is_active', true).order('sort_order'),
  ]);

  return (
    <>
      <HeroBanner slides={(bannerSlides as BannerSlide[]) || []} />

      <div className="section-divider" />
      <GateSection />

      <div className="section-divider" />
      <NoticeSection notices={(notices as Notice[]) || []} careSheets={(careSheets as CareSheet[]) || []} />
    </>
  );
}
