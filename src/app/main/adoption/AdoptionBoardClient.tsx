'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Adoption } from '@/lib/types';
import { PawPrint } from 'lucide-react';

type FilterType = 'all' | 'available' | 'sold';
type SortType = 'featured' | 'price-asc' | 'price-desc' | 'newest';

function parsePrice(price: string | null): number {
  if (!price) return 0;
  return parseInt(price.replace(/[^0-9]/g, '')) || 0;
}

function AdoptionCard({ animal }: { animal: Adoption }) {
  const isAvailable = animal.status === 'Active';
  return (
    <Link href={`/main/adoption/${animal.id}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-2xl bg-white subtle-border card-hover"
      >
        <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
          {animal.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={animal.image_url}
              alt={animal.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-200">
              <PawPrint size={48} />
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span
              className={`text-[11px] px-3 py-1.5 rounded-lg font-semibold backdrop-blur-sm ${
                isAvailable
                  ? 'bg-green-500/90 text-white'
                  : 'bg-gray-900/70 text-gray-300'
              }`}
            >
              {isAvailable ? '분양 가능' : '분양 완료'}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-brand transition-colors">
            {animal.name}
          </h3>
          <p className="text-[13px] text-gray-400 mb-3">
            {animal.species}
            {animal.morph ? ` · ${animal.morph}` : ''}
          </p>
          {animal.price && (
            <p className="text-[15px] font-bold text-brand">{animal.price}</p>
          )}
        </div>
      </motion.div>
    </Link>
  );
}

interface Props {
  adoptions: Adoption[];
}

export default function AdoptionBoardClient({ adoptions }: Props) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('featured');

  const availableCount = adoptions.filter((a) => a.status === 'Active').length;
  const soldCount = adoptions.filter((a) => a.status !== 'Active').length;

  const filtered = useMemo(() => {
    let result = [...adoptions];

    if (filter === 'available') result = result.filter((a) => a.status === 'Active');
    else if (filter === 'sold') result = result.filter((a) => a.status !== 'Active');

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    return result;
  }, [adoptions, filter, sort]);

  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: '전체', count: adoptions.length },
    { key: 'available', label: '분양 가능', count: availableCount },
    { key: 'sold', label: '분양 완료', count: soldCount },
  ];

  const sorts: { key: SortType; label: string }[] = [
    { key: 'featured', label: '추천순' },
    { key: 'price-asc', label: '가격 낮은순' },
    { key: 'price-desc', label: '가격 높은순' },
    { key: 'newest', label: '최신순' },
  ];

  return (
    <section className="pt-36 md:pt-40 pb-28 md:pb-32 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16 md:mb-20">
          <p
            className="text-[12px] md:text-[13px] tracking-[0.3em] uppercase mb-3 text-gray-400"
            style={{ fontFamily: 'var(--font-accent)' }}
          >
            Available Tegus
          </p>
          <h1 className="text-4xl md:text-5xl font-display text-gray-900 font-bold tracking-tight">
            분양 게시판
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
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          {/* Filter pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-full text-[13px] transition-all duration-300 ${
                  filter === f.key
                    ? 'bg-brand text-white font-medium'
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                }`}
              >
                {f.label}
                <span className="ml-1.5 text-[11px] opacity-70">({f.count})</span>
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-gray-400 shrink-0">정렬</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortType)}
              className="text-[13px] px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 focus:outline-none focus:border-brand/40"
            >
              {sorts.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <PawPrint size={32} className="mx-auto mb-4 text-gray-200" />
            <p className="text-base text-gray-400">해당하는 개체가 없습니다</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((animal) => (
              <AdoptionCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}

        {/* Inquiry CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-3 p-8 rounded-2xl bg-gray-50/50 border border-gray-100">
            <p className="text-[14px] text-gray-500">
              분양에 관심이 있으신가요?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-[14px] font-medium btn-primary"
            >
              분양 상담 신청하기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
