import { supabase } from '@/lib/supabase';
import type { BannerSlide, GalleryPhoto, Adoption } from '@/lib/types';
import HeroBanner from '@/components/HeroBanner';
import WelcomeSection from '@/components/WelcomeSection';
import AdoptionSection from '@/components/AdoptionSection';
import GalleryMarquee from '@/components/GalleryMarquee';

export const revalidate = 60;

export default async function MainPage() {
  const [{ data: bannerSlides }, { data: galleryPhotos }, { data: adoptions }] = await Promise.all([
    supabase.from('banner_slides').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('gallery_photos').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('adoptions').select('*').eq('is_active', true).eq('status', 'Active').order('sort_order'),
  ]);

  const allAdoptions = (adoptions as Adoption[]) || [];

  return (
    <>
      <HeroBanner slides={(bannerSlides as BannerSlide[]) || []} />

      {/* Welcome 섹션 */}
      <WelcomeSection />

      {/* 분양 중인 개체 */}
      {allAdoptions.length > 0 && (
        <>
          <div className="section-divider" />
          <AdoptionSection adoptions={allAdoptions.slice(0, 6)} />
        </>
      )}

      {/* 갤러리 마퀴 */}
      <div className="section-divider" />
      <GalleryMarquee photos={(galleryPhotos as GalleryPhoto[]) || []} />
    </>
  );
}
