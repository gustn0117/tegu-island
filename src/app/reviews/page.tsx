import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { supabase } from '@/lib/supabase';
import type { Review } from '@/lib/types';
import { Star, Quote, MessageSquare } from 'lucide-react';

export const revalidate = 60;

export default async function ReviewsPage() {
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  const reviewList = (reviews as Review[]) || [];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-36 md:pt-40 pb-28 md:pb-32 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-20 md:mb-24">
            <p className="text-[12px] md:text-[13px] tracking-[0.3em] uppercase mb-3 text-black/50"
              style={{ fontFamily: 'var(--font-accent)' }}>Visitor & Adopter Reviews</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 tracking-tight">방문자 후기</h1>
            <div className="flex items-center justify-center gap-4 mt-5">
              <div className="h-px w-14 md:w-20 bg-gradient-to-r from-transparent to-brand/20" />
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-brand/25" />
                <div className="w-2 h-2 rounded-full bg-brand" />
                <div className="w-1.5 h-1.5 rounded-full bg-brand/25" />
              </div>
              <div className="h-px w-14 md:w-20 bg-gradient-to-l from-transparent to-brand/20" />
            </div>
            <p className="text-base mt-5 text-gray-500/50">
              생태 전시 관람, 분양 가족, 교육 프로그램 참가자분들의 소중한 후기입니다.
            </p>
          </div>

          {reviewList.length === 0 ? (
            <div className="text-center py-28 rounded-2xl lg:rounded-3xl bg-white subtle-border">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-brand/[0.06]">
                <MessageSquare size={28} className="text-gray-200/30" />
              </div>
              <p className="text-base text-gray-400/45">등록된 후기가 없습니다</p>
              <p className="text-[12px] mt-2 text-gray-300/30">전시 관람, 분양, 교육 프로그램의 첫 번째 후기를 기다리고 있습니다</p>
            </div>
          ) : (
            <div className="space-y-8">
              {reviewList.map((r) => (
                <div key={r.id} className="p-8 md:p-10 rounded-2xl lg:rounded-3xl bg-white subtle-border card-hover">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium bg-gradient-to-br from-brand-50 to-brand-100/50 text-brand-800">
                        {r.author[0]}
                      </div>
                      <div>
                        <p className="text-[15px] font-medium text-gray-700/70">{r.author}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14}
                              fill={i < r.rating ? '#215433' : 'none'}
                              stroke={i < r.rating ? 'none' : '#ddd'}
                              strokeWidth={1.5}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[12px] px-3 py-1 rounded-lg font-medium bg-brand/[0.08] text-brand/80">
                        {r.type}
                      </span>
                      <p className="text-[12px] mt-2 text-gray-300/35">{r.date}</p>
                    </div>
                  </div>
                  <div className="relative pl-5">
                    <Quote size={18} className="absolute top-0 left-0 text-gray-200/25" />
                    <p className="text-[15px] md:text-[16px] leading-[1.9] text-gray-600/55">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
