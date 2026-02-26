'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { TeguInfo } from '@/lib/types';
import { BookOpen, ImageIcon } from 'lucide-react';

interface Props {
  articles: TeguInfo[];
}

export default function TeguInfoPageClient({ articles }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(articles.map((a) => a.category).filter(Boolean))) as string[];
  const filtered = selectedCategory
    ? articles.filter((a) => a.category === selectedCategory)
    : articles;

  return (
    <section className="pt-36 md:pt-40 pb-28 md:pb-32 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-20 md:mb-24">
          <p
            className="text-[12px] md:text-[13px] tracking-[0.3em] uppercase mb-3 text-gray-400"
            style={{ fontFamily: 'var(--font-accent)' }}
          >
            Tegu Information
          </p>
          <h1 className="text-4xl md:text-5xl font-display text-gray-900 font-bold tracking-tight">
            테구 정보
          </h1>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="h-px w-14 md:w-20 bg-gradient-to-r from-transparent to-brand/20" />
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-brand/25" />
              <div className="w-2 h-2 rounded-full bg-brand" />
              <div className="w-1.5 h-1.5 rounded-full bg-brand/25" />
            </div>
            <div className="h-px w-14 md:w-20 bg-gradient-to-l from-transparent to-brand/20" />
          </div>
          <p className="text-base mt-5 text-gray-500">
            테구의 종류, 사육 정보, 브리딩 지식을 전문적으로 정리했습니다.
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-[13px] transition-all duration-300 ${
                !selectedCategory
                  ? 'bg-brand text-white font-medium'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
              }`}
            >
              전체
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-[13px] transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-brand text-white font-medium'
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Articles */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <BookOpen size={32} className="mx-auto mb-4 text-gray-200" />
            <p className="text-base text-gray-400">등록된 정보가 없습니다</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-2xl lg:rounded-3xl bg-white overflow-hidden subtle-border card-hover"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Thumbnail */}
                  {article.image_url ? (
                    <div className="sm:w-48 md:w-56 shrink-0">
                      <div className="aspect-[4/3] sm:aspect-auto sm:h-full relative overflow-hidden bg-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="hidden sm:flex sm:w-48 md:w-56 shrink-0 items-center justify-center bg-gray-50">
                      <ImageIcon size={32} className="text-gray-200" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      {article.category && (
                        <span className="text-[11px] px-3 py-1 rounded-lg bg-brand/[0.06] text-brand font-medium">
                          {article.category}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg md:text-xl font-display font-bold text-gray-900 mb-2">
                      {article.title}
                    </h3>
                    {article.content && (
                      <p className="text-[14px] leading-[1.8] text-gray-500 line-clamp-3">
                        {article.content}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
