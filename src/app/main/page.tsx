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

  const noticeList = (notices as Notice[]) || [];
  const careSheetList = (careSheets as CareSheet[]) || [];
  const adoptionList = (adoptions as Adoption[]) || [];
  const dailyList = (dailyPosts as DailyPost[]) || [];
  const featured = (featuredProducts as Product[]) || [];
  const newItems = (newProducts as Product[]) || [];
  const supplyList = (supplies as Product[]) || [];
  const reviewList = (reviews as Review[]) || [];

  const hasNotices = noticeList.length > 0 || careSheetList.length > 0;
  const hasAdoptions = adoptionList.length > 0;
  const hasDaily = dailyList.length > 0;
  const hasProducts = featured.length > 0 || newItems.length > 0 || supplyList.length > 0;
  const hasReviews = reviewList.length > 0;

  return (
    <>
      <HeroBanner slides={(bannerSlides as BannerSlide[]) || []} />

      <div className="section-divider" />
      <GateSection />

      {hasNotices && <><div className="section-divider" /><NoticeSection notices={noticeList} careSheets={careSheetList} /></>}
      {hasAdoptions && <><div className="section-divider" /><AdoptionSection adoptions={adoptionList} /></>}
      {hasDaily && <><div className="section-divider" /><DailySection posts={dailyList} /></>}
      {hasProducts && <><div className="section-divider" /><ProductSection featuredProducts={featured} newProducts={newItems} supplies={supplyList} /></>}
      {hasReviews && <><div className="section-divider" /><ReviewSection reviews={reviewList} /></>}
    </>
  );
}
