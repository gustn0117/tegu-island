import { supabase } from '@/lib/supabase';
import type { BannerSlide } from '@/lib/types';
import HeroBanner from '@/components/HeroBanner';
import WelcomeSection from '@/components/WelcomeSection';
import GateSection from '@/components/GateSection';

export const revalidate = 60;

export default async function MainPage() {
  const { data: bannerSlides } = await supabase
    .from('banner_slides')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  return (
    <>
      <HeroBanner slides={(bannerSlides as BannerSlide[]) || []} />

      {/* Welcome 섹션 */}
      <WelcomeSection />

      {/* 테구아일랜드가 하는 일 (2단2열) */}
      <div className="section-divider" />
      <GateSection />
    </>
  );
}
