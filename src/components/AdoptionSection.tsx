'use client';

import type { Adoption } from '@/lib/types';
import SectionTitle from './SectionTitle';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PawPrint, ArrowRight } from 'lucide-react';

function AdoptionCard({ animal, index }: { animal: Adoption; index: number }) {
  return (
    <Link href={`/main/adoption/${animal.id}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
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
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/80">
                <PawPrint size={28} className="text-gray-200" />
              </div>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span className="text-[11px] px-3 py-1.5 rounded-xl font-semibold backdrop-blur-md bg-green-500/90 text-white shadow-lg shadow-green-500/25">
              분양 가능
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
          <p className="text-[13px] text-gray-400 mb-2.5">
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

export default function AdoptionSection({ adoptions }: Props) {
  if (adoptions.length === 0) return null;

  return (
    <section className="py-24 md:py-28 px-8" id="adoption">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          ko="분양 중인 개체"
          en="Available Tegus"
          sub="건강하고 아름다운 테구를 만나보세요"
          subEn="Meet our healthy and beautiful tegus"
        />

        {adoptions.length === 0 ? (
          <p className="py-20 text-center text-[14px] text-gray-300">등록된 개체가 없습니다</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {adoptions.map((a, i) => (
                <AdoptionCard key={a.id} animal={a} index={i} />
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-14 text-center"
            >
              <Link
                href="/main/adoption"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-[14px] font-medium btn-outline group"
              >
                전체 보기
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
