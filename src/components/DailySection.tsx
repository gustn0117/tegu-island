'use client';

import type { DailyPost } from '@/lib/types';
import SectionTitle from './SectionTitle';
import Link from 'next/link';
import { Camera, ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  posts: DailyPost[];
  compact?: boolean;
}

export default function DailySection({ posts, compact }: Props) {
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gray-400 mb-1.5"
              style={{ fontFamily: 'var(--font-accent)' }}>Daily</p>
            <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900">일상</h3>
          </div>
          <Link href="/main/daily" className="flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-brand transition-colors group">
            전체보기
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <div className="h-px bg-gray-200 mb-6" />
        {posts.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-3">
            <Camera size={28} className="text-gray-200" />
            <p className="text-[14px] text-gray-300">등록된 일상 포스트가 없습니다</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.slice(0, 4).map((post) => (
              <div key={post.id}
                className="en-tooltip flex items-center gap-4 cursor-pointer group"
                data-en={post.title_en}
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  {post.image_url ? (
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera size={16} className="text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] px-2 py-0.5 rounded bg-gray-100 text-gray-500 font-medium">{post.category}</span>
                  <p className="text-[14px] text-gray-600 truncate mt-1.5 group-hover:text-gray-900 transition-colors">{post.title}</p>
                  <p className="text-[11px] text-gray-400 mt-1">{post.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    );
  }

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
