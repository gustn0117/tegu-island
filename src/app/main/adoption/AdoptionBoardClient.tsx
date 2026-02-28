'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Adoption } from '@/lib/types';
import { PawPrint, ChevronDown } from 'lucide-react';

type FilterType = 'all' | 'available' | 'sold';
type SortType = 'featured' | 'price-asc' | 'price-desc' | 'newest';

function parsePrice(price: string | null): number {
  if (!price) return 0;
  return parseInt(price.replace(/[^0-9]/g, '')) || 0;
}

/* ── Filter Dropdown ── */
function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const enter = () => { clearTimeout(timeout.current); setOpen(true); };
  const leave = () => { timeout.current = setTimeout(() => setOpen(false), 120); };

  const current = options.find((o) => o.value === value);

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-[14px] text-gray-600 hover:text-gray-900 transition-colors py-1"
      >
        {label}{current && current.value !== options[0]?.value ? `: ${current.label}` : ''}
        <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 min-w-[160px] bg-white rounded-lg border border-gray-200 shadow-lg py-1 z-50"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors ${
                  value === opt.value ? 'text-gray-900 font-medium bg-gray-50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Card ── */
function AdoptionCard({ animal, index }: { animal: Adoption; index: number }) {
  const isSold = animal.status !== 'Active';

  return (
    <Link href={`/main/adoption/${animal.id}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.45, delay: index * 0.04 }}
      >
        {/* Image */}
        <div className="aspect-square relative overflow-hidden bg-gray-100 mb-4">
          {animal.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={animal.image_url}
              alt={animal.name}
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${isSold ? 'opacity-80' : ''}`}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <PawPrint size={32} className="text-gray-200" />
            </div>
          )}
          {/* Badge */}
          <div className="absolute bottom-3 left-3">
            <span className={`text-[12px] px-3 py-1.5 font-medium ${
              isSold
                ? 'bg-gray-600/90 text-white'
                : 'bg-[#baa54e]/90 text-white'
            }`}>
              {isSold ? 'Sold out' : '분양 가능'}
            </span>
          </div>
        </div>

        {/* Info */}
        <div>
          <h3 className="text-[14px] text-gray-800 group-hover:text-gray-600 transition-colors leading-snug">
            {animal.name}
            {animal.species ? ` - ${animal.species}` : ''}
          </h3>
          <div className="mt-1.5">
            {animal.price ? (
              <p className="text-[15px] font-medium text-gray-900">{animal.price}</p>
            ) : (
              <p className="text-[14px] text-gray-400">가격 문의</p>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

/* ── Main ── */
interface Props {
  adoptions: Adoption[];
}

export default function AdoptionBoardClient({ adoptions }: Props) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('featured');

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

  const filterOptions = [
    { value: 'all', label: '전체' },
    { value: 'available', label: '분양 가능' },
    { value: 'sold', label: '분양 완료' },
  ];

  const sortOptions = [
    { value: 'featured', label: '추천순' },
    { value: 'price-asc', label: '가격 낮은순' },
    { value: 'price-desc', label: '가격 높은순' },
    { value: 'newest', label: '최신순' },
  ];

  return (
    <section className="pt-36 md:pt-40 pb-28 md:pb-32 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Filter & Sort Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between border-b border-gray-200 pb-4 mb-10"
        >
          {/* Left: Filters */}
          <div className="flex items-center gap-6">
            <span className="text-[14px] text-gray-400">Filter:</span>
            <FilterDropdown
              label="Availability"
              options={filterOptions}
              value={filter}
              onChange={(v) => setFilter(v as FilterType)}
            />
          </div>

          {/* Right: Sort + Count */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[14px] text-gray-400">Sort by:</span>
              <FilterDropdown
                label={sortOptions.find((o) => o.value === sort)?.label || '추천순'}
                options={sortOptions}
                value={sort}
                onChange={(v) => setSort(v as SortType)}
              />
            </div>
            <span className="text-[14px] text-gray-400">
              {filtered.length} products
            </span>
          </div>
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-24 text-center"
          >
            <PawPrint size={32} className="mx-auto mb-4 text-gray-200" />
            <p className="text-[15px] text-gray-400">해당하는 개체가 없습니다</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {filtered.map((animal, i) => (
              <AdoptionCard key={animal.id} animal={animal} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
