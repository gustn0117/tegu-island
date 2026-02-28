'use client';

import type { DailyPost } from '@/lib/types';
import SectionTitle from './SectionTitle';
import { Camera, ArrowUpRight } from 'lucide-react';

interface Props {
  posts: DailyPost[];
}

export default function DailySection({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <section className="py-24 md:py-28 px-8" id="daily">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          ko="테구아일랜드 일상"
          en="Tegu Island Daily"
          sub="생태 전시 현장과 브리딩 소식을 전합니다"
          subEn="Live updates from our ecological exhibition and breeding"
        />
        {posts.length === 0 ? (
          <p className="py-20 text-center text-[14px] text-gray-300">등록된 일상 포스트가 없습니다</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {posts.map((post, idx) => (
              <div key={post.id}
                className={`en-tooltip group relative overflow-hidden rounded-2xl cursor-pointer card-hover ${idx === 0 ? 'lg:col-span-2' : ''}`}
                data-en={post.title_en}
              >
                <div className={`relative overflow-hidden rounded-2xl bg-gray-100 ${idx === 0 ? 'aspect-[4/3] lg:aspect-[16/9]' : 'aspect-[4/3]'}`}>
                  {post.image_url ? (
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-50">
                        <Camera size={24} className="text-gray-300" />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <span className="absolute top-3 left-3 text-[11px] px-3 py-1.5 rounded-lg font-medium bg-white/95 backdrop-blur-sm text-gray-600">
                    {post.category}
                  </span>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight size={14} className="text-gray-600" />
                  </div>
                </div>
                <div className="mt-5 px-0.5">
                  <h4 className={`font-medium text-gray-600 group-hover:text-gray-900 transition-colors leading-relaxed ${idx === 0 ? 'text-lg md:text-xl' : 'text-[15px] md:text-base'}`}>
                    {post.title}
                  </h4>
                  <p className="text-[12px] mt-2 text-gray-300">{post.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
