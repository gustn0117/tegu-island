'use client';

import type { Product } from '@/lib/types';
import SectionTitle from './SectionTitle';
import Link from 'next/link';
import { Sparkles, Star, ShoppingBag, Package, Pill, Lightbulb, Leaf, Flame, BarChart3, Mountain, Wrench, Droplets, Beef, Hammer, ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

const categoryIcons: Record<string, ReactNode> = {
  supplement: <Pill size={36} />,
  lighting: <Lightbulb size={36} />,
  substrate: <Leaf size={36} />,
  heating: <Flame size={36} />,
  monitoring: <BarChart3 size={36} />,
  decor: <Mountain size={36} />,
  accessory: <Wrench size={36} />,
  humidity: <Droplets size={36} />,
  food: <Beef size={36} />,
  tool: <Hammer size={36} />,
};

const categoryIconsSmall: Record<string, ReactNode> = {
  supplement: <Pill size={20} />,
  lighting: <Lightbulb size={20} />,
  substrate: <Leaf size={20} />,
  heating: <Flame size={20} />,
  monitoring: <BarChart3 size={20} />,
  decor: <Mountain size={20} />,
  accessory: <Wrench size={20} />,
  humidity: <Droplets size={20} />,
  food: <Beef size={20} />,
  tool: <Hammer size={20} />,
};

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="en-tooltip group relative rounded-2xl overflow-hidden card-hover cursor-pointer"
      data-en={product.name_en}>
      <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl bg-gray-50">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 group-hover:text-gray-400 group-hover:scale-110 transition-all duration-500">
            {categoryIcons[product.category || ''] || <Package size={36} />}
          </div>
        )}
        {(product.badge || product.is_new) && (
          <span className={`absolute top-3 right-3 text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium shadow-sm ${
            product.badge === '베스트' ? 'bg-brand text-white' :
            product.badge === '추천' ? 'bg-brand-700 text-white' :
            product.is_new ? 'bg-white text-gray-800 border border-gray-200' :
            'bg-gray-100 text-gray-600'
          }`}>
            {product.is_new ? <Sparkles size={11} /> : <Star size={11} />}
            {product.badge || 'NEW'}
          </span>
        )}
        <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <ShoppingBag size={15} className="text-gray-600" />
        </div>
      </div>
      <div className="p-5 bg-white rounded-b-2xl group-hover:bg-gray-50/50 transition-colors duration-300 border border-gray-100 border-t-0">
        <p className="text-[14px] md:text-[15px] text-gray-600 group-hover:text-gray-900 transition-colors leading-relaxed">{product.name}</p>
        <p className="text-base font-bold mt-2.5 text-gray-900">{product.price}</p>
      </div>
    </div>
  );
}

function CompactProductCard({ product }: { product: Product }) {
  return (
    <div className="en-tooltip group relative rounded-xl overflow-hidden card-hover cursor-pointer"
      data-en={product.name_en}>
      <div className="aspect-square relative overflow-hidden rounded-t-xl bg-gray-50">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            {categoryIconsSmall[product.category || ''] || <Package size={20} />}
          </div>
        )}
        {(product.badge || product.is_new) && (
          <span className={`absolute top-2 right-2 text-[10px] px-2 py-1 rounded-md flex items-center gap-0.5 font-medium shadow-sm ${
            product.badge === '베스트' ? 'bg-brand text-white' :
            product.badge === '추천' ? 'bg-brand-700 text-white' :
            product.is_new ? 'bg-white text-gray-800 border border-gray-200' :
            'bg-gray-100 text-gray-600'
          }`}>
            {product.is_new ? <Sparkles size={9} /> : <Star size={9} />}
            {product.badge || 'NEW'}
          </span>
        )}
      </div>
      <div className="p-3 bg-white rounded-b-xl border border-gray-100 border-t-0">
        <p className="text-[13px] text-gray-600 group-hover:text-gray-900 transition-colors truncate">{product.name}</p>
        <p className="text-[13px] font-bold mt-1.5 text-gray-900">{product.price}</p>
      </div>
    </div>
  );
}

function EmptyProductState({ title }: { title: string }) {
  return (
    <p className="py-20 text-center text-[14px] text-gray-300">등록된 {title}이 없습니다</p>
  );
}

/* Compact single-column product section for 2-col grid layout */
export function CompactProductColumn({ products, ko, en, delay = 0 }: { products: Product[]; ko: string; en: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-gray-400 mb-1.5"
            style={{ fontFamily: 'var(--font-accent)' }}>{en}</p>
          <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900">{ko}</h3>
        </div>
        <Link href="/main/products" className="flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-brand transition-colors group">
          전체보기
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
      <div className="h-px bg-gray-200 mb-6" />
      {products.length === 0 ? (
        <div className="py-16 flex flex-col items-center gap-3">
          <Package size={28} className="text-gray-200" />
          <p className="text-[14px] text-gray-300">등록된 {ko}이 없습니다</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {products.slice(0, 4).map((p) => (
            <CompactProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

interface Props {
  featuredProducts: Product[];
  newProducts: Product[];
  supplies: Product[];
}

export default function ProductSection({ featuredProducts, newProducts, supplies }: Props) {
  return (
    <>
      <section className="py-24 md:py-28 px-8" id="featured">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            ko="추천상품"
            en="Recommended Products"
            sub="테구 사육에 필수적인 검증된 용품"
            subEn="Verified essentials for tegu keeping"
          />
          {featuredProducts.length === 0 ? (
            <EmptyProductState title="추천상품" />
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
                {featuredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              <div className="mt-12 text-center">
                <p className="text-[12px] text-gray-400 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-100">
                  결제수단: 네이버페이 · 카카오페이 (소액 굿즈 및 사육용품)
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      <div className="section-divider" />
      <section className="py-24 md:py-28 px-8 bg-gray-50/50" id="new-products">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            ko="신상품"
            en="New Arrivals"
            sub="새로 입고된 사육용품을 확인하세요"
            subEn="Check out our latest equipment"
          />
          {newProducts.length === 0 ? (
            <EmptyProductState title="신상품" />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
              {newProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="section-divider" />
      <section className="py-24 md:py-28 px-8" id="supplies">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            ko="사육용품"
            en="Keeping Supplies"
            sub="테구 전문 농장이 직접 테스트한 사육 장비"
            subEn="Equipment tested by our specialized tegu farm"
          />
          {supplies.length === 0 ? (
            <EmptyProductState title="사육용품" />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
              {supplies.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
