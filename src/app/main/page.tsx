import { supabase } from '@/lib/supabase';
import type { BannerSlide, Adoption } from '@/lib/types';
import HeroBanner from '@/components/HeroBanner';
import WelcomeSection from '@/components/WelcomeSection';
import GateSection from '@/components/GateSection';
import AdoptionSection from '@/components/AdoptionSection';

export const revalidate = 60;

export default async function MainPage() {
  const [
    { data: bannerSlides },
    { data: adoptions },
  ] = await Promise.all([
    supabase.from('banner_slides').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('adoptions').select('*').eq('is_active', true).eq('status', 'Active').order('sort_order'),
  ]);

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

      {/* 분양 중인 개체 (2nd) */}
      <div className="section-divider" />
      <AdoptionSection adoptions={allAdoptions.slice(0, 6)} />
    </>
  );
}
