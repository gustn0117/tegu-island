'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { TeguInfo } from '@/lib/types';
import { BookOpen, ImageIcon, ArrowRight } from 'lucide-react';

interface Props {
  articles: TeguInfo[];
}

export default function TeguInfoPageClient({ articles }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(articles.map((a) => a.category).filter(Boolean))) as string[];
  const filtered = selectedCategory
    ? articles.filter((a) => a.category === selectedCategory)
    : articles;

  const getCategoryCount = (cat: string) => articles.filter((a) => a.category === cat).length;

  return (
    <section className="pt-36 md:pt-40 pb-28 md:pb-32 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20 md:mb-24"
        >
          <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-gray-900/[0.06]">
            <BookOpen size={32} className="text-gray-700" />
          </div>
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
          <p className="text-base mt-5 text-gray-500 max-w-lg mx-auto leading-relaxed">
            테구의 종류, 사육 정보, 브리딩 지식을 전문적으로 정리했습니다.
          </p>
        </motion.div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-14"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-2.5 rounded-full text-[13px] transition-all duration-300 ${
                !selectedCategory
                  ? 'bg-brand text-white font-medium shadow-lg shadow-brand/20'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
              }`}
            >
              전체
              <span className="ml-1.5 text-[11px] opacity-70">({articles.length})</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-[13px] transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-brand text-white font-medium shadow-lg shadow-brand/20'
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                }`}
              >
                {cat}
                <span className="ml-1.5 text-[11px] opacity-70">({getCategoryCount(cat)})</span>
              </button>
            ))}
          </motion.div>
        )}

        {/* Articles */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-24 text-center rounded-2xl lg:rounded-3xl bg-white subtle-border"
          >
            <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center bg-gray-50">
              <BookOpen size={28} className="text-gray-200" />
            </div>
            <p className="text-base text-gray-400">등록된 정보가 없습니다</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filtered.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group rounded-2xl lg:rounded-3xl bg-white overflow-hidden subtle-border card-hover"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Thumbnail */}
                  {article.image_url ? (
                    <div className="sm:w-52 md:w-60 shrink-0">
                      <div className="aspect-[4/3] sm:aspect-auto sm:h-full relative overflow-hidden bg-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="hidden sm:flex sm:w-52 md:w-60 shrink-0 items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100/50">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/80">
                        <ImageIcon size={24} className="text-gray-200" />
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      {article.category && (
                        <span className="text-[11px] px-3 py-1 rounded-lg bg-brand/[0.06] text-brand font-medium">
                          {article.category}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg md:text-xl font-display font-bold text-gray-900 mb-2 group-hover:text-brand transition-colors duration-300">
                      {article.title}
                    </h3>
                    {article.content && (
                      <p className="text-[14px] leading-[1.8] text-gray-500 line-clamp-3 mb-4">
                        {article.content}
                      </p>
                    )}
                    <div className="mt-auto pt-2">
                      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-400 group-hover:text-brand transition-colors duration-300">
                        자세히 보기
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Result count */}
        {filtered.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-[13px] text-gray-300 mt-10"
          >
            {filtered.length}개의 정보
          </motion.p>
        )}
      </div>
    </section>
  );
}
