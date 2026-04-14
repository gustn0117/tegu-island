import { supabase } from '@/lib/supabase';
import type { BannerSlide, GalleryPhoto } from '@/lib/types';
import HeroBanner from '@/components/HeroBanner';
import WelcomeSection from '@/components/WelcomeSection';
import GalleryMarquee from '@/components/GalleryMarquee';

export const revalidate = 60;

export default async function MainPage() {
  const [{ data: bannerSlides }, { data: galleryPhotos }] = await Promise.all([
    supabase.from('banner_slides').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('gallery_photos').select('*').eq('is_active', true).order('sort_order'),
  ]);

  return (
    <>
      <HeroBanner slides={(bannerSlides as BannerSlide[]) || []} />

      {/* Welcome 섹션 */}
      <WelcomeSection />

      {/* 갤러리 마퀴 */}
      <div className="section-divider" />
      <GalleryMarquee photos={(galleryPhotos as GalleryPhoto[]) || []} />
    </>
  );
}
