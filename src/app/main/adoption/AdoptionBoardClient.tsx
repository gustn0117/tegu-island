'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Adoption } from '@/lib/types';
import { PawPrint, Heart, ArrowRight, MessageCircle, SlidersHorizontal } from 'lucide-react';
import CustomSelect, { type SelectOption } from '@/components/CustomSelect';

type FilterType = 'all' | 'available' | 'sold';
type SortType = 'featured' | 'price-asc' | 'price-desc' | 'newest';

const sortOptions: SelectOption[] = [
  { value: 'featured', label: '추천순' },
  { value: 'price-asc', label: '가격 낮은순' },
  { value: 'price-desc', label: '가격 높은순' },
  { value: 'newest', label: '최신순' },
];

function parsePrice(price: string | null): number {
  if (!price) return 0;
  return parseInt(price.replace(/[^0-9]/g, '')) || 0;
}

function AdoptionCard({ animal, index }: { animal: Adoption; index: number }) {
  const isAvailable = animal.status === 'Active';
  return (
    <Link href={`/main/adoption/${animal.id}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        className="overflow-hidden rounded-2xl lg:rounded-3xl bg-white subtle-border card-hover"
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
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/80">
                <PawPrint size={28} className="text-gray-200" />
              </div>
            </div>
          )}
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`text-[11px] px-3 py-1.5 rounded-xl font-semibold backdrop-blur-md ${
                isAvailable
                  ? 'bg-green-500/90 text-white shadow-lg shadow-green-500/25'
                  : 'bg-gray-900/70 text-gray-300'
              }`}
            >
              {isAvailable ? '분양 가능' : '분양 완료'}
            </span>
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-white/90">
              상세 보기 <ArrowRight size={12} />
            </span>
          </div>
        </div>
        <div className="p-5 md:p-6">
          <h3 className="text-[15px] font-display font-bold text-gray-900 mb-1 group-hover:text-brand transition-colors duration-300">
            {animal.name}
          </h3>
          <p className="text-[13px] text-gray-400 mb-3">
            {animal.species}
            {animal.morph ? ` · ${animal.morph}` : ''}
          </p>
          {animal.price ? (
            <p className="text-[15px] font-bold text-brand">{animal.price}</p>
          ) : (
            <p className="text-[13px] text-gray-300">가격 문의</p>
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

  return (
    <section className="pt-36 md:pt-40 pb-28 md:pb-32 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-rose-100/60">
            <Heart size={32} className="text-rose-600" />
          </div>
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
          <p className="text-base mt-5 text-gray-500 max-w-lg mx-auto leading-relaxed">
            건강하고 아름다운 테구를 만나보세요
          </p>
        </motion.div>

        {/* Filter & Sort Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 p-4 md:p-5 rounded-2xl bg-white subtle-border"
        >
          {/* Filter pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2.5 rounded-full text-[13px] transition-all duration-300 ${
                  filter === f.key
                    ? 'bg-brand text-white font-medium shadow-lg shadow-brand/20'
                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                }`}
              >
                {f.label}
                <span className="ml-1.5 text-[11px] opacity-70">({f.count})</span>
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <SlidersHorizontal size={14} className="text-gray-300 shrink-0" />
            <div className="w-full sm:w-44">
              <CustomSelect
                options={sortOptions}
                value={sort}
                onChange={(v) => setSort(v as SortType)}
                placeholder="정렬"
              />
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-24 text-center rounded-2xl lg:rounded-3xl bg-white subtle-border"
          >
            <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center bg-gray-50">
              <PawPrint size={28} className="text-gray-200" />
            </div>
            <p className="text-base text-gray-400">해당하는 개체가 없습니다</p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((animal, i) => (
                <AdoptionCard key={animal.id} animal={animal} index={i} />
              ))}
            </div>
            {/* Result count */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-[13px] text-gray-300 mt-8"
            >
              {filtered.length}개의 개체
            </motion.p>
          </>
        )}

        {/* Inquiry CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col items-center gap-5 p-10 md:p-12 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-brand/[0.03] to-brand/[0.06] border border-brand/[0.08]">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-brand/[0.08]">
              <MessageCircle size={24} className="text-brand" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-gray-900 mb-1.5">분양에 관심이 있으신가요?</h3>
              <p className="text-[14px] text-gray-400">개체에 대한 상세 문의를 남겨주세요</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-[14px] font-semibold btn-primary"
            >
              <MessageCircle size={16} />
              분양 상담 신청하기
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
