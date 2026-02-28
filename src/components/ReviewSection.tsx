'use client';

import type { Review } from '@/lib/types';
import SectionTitle from './SectionTitle';
import { Star, Quote, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Props {
  reviews: Review[];
}

export default function ReviewSection({ reviews }: Props) {
  if (reviews.length === 0) return null;

  return (
    <section className="py-24 md:py-28 px-8" id="reviews">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          ko="구매후기"
          en="Reviews"
          sub="전시 관람·분양·용품 이용 고객님들의 후기"
          subEn="Reviews from exhibition visitors, adopters, and supply customers"
        />
        {reviews.length === 0 ? (
          <p className="py-20 text-center text-[14px] text-gray-300">등록된 후기가 없습니다</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviews.map((r) => (
                <div key={r.id}
                  className="en-tooltip p-8 md:p-9 rounded-2xl bg-white card-hover subtle-border"
                  data-en={r.text_en}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-medium bg-gradient-to-br from-gray-100 to-gray-50 text-gray-600">
                        {r.author[0]}
                      </div>
                      <div>
                        <p className="text-[15px] font-medium text-gray-700">{r.author}</p>
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
                    <span className="text-[11px] px-3.5 py-1.5 rounded-lg font-medium bg-gray-100 text-gray-500">
                      {r.type}
                    </span>
                  </div>
                  <div className="relative pl-7">
                    <Quote size={18} className="absolute top-0 left-0 text-gray-300" />
                    <p className="text-[14px] md:text-[15px] leading-[1.9] text-gray-600">
                      {r.text}
                    </p>
                  </div>
                  <p className="text-[11px] mt-6 text-gray-300">{r.date}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-14">
              <Link href="/reviews"
                className="inline-flex items-center gap-2 text-[14px] px-8 py-3 rounded-full btn-outline group">
                후기 전체보기
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
