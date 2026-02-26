'use client';

import Link from 'next/link';
import type { Adoption } from '@/lib/types';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, PawPrint, ArrowRight, Share2 } from 'lucide-react';

export default function AdoptionDetailClient({ adoption }: { adoption: Adoption }) {
  const isAvailable = adoption.status === 'Active';
  const specs = [
    { label: '종', value: adoption.species },
    { label: '모프', value: adoption.morph },
    { label: '성별', value: adoption.sex },
    { label: '나이', value: adoption.age },
  ].filter((s) => s.value);

  return (
    <section className="pt-36 md:pt-40 pb-28 md:pb-32 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/main/adoption"
            className="inline-flex items-center gap-2 text-[13px] text-gray-400 hover:text-brand transition-colors duration-300 mb-10 group"
          >
            <span className="w-8 h-8 rounded-xl flex items-center justify-center bg-gray-50 group-hover:bg-brand/[0.06] transition-colors duration-300">
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
            </span>
            분양 목록으로
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[4/5] rounded-2xl lg:rounded-3xl overflow-hidden bg-gray-100 relative group"
          >
            {adoption.image_url ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={adoption.image_url}
                  alt={adoption.name}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
                {/* Share button overlay */}
                <button
                  onClick={() => navigator.clipboard?.writeText(window.location.href)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center bg-white/80 backdrop-blur-sm border border-white/40 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:shadow-lg"
                >
                  <Share2 size={16} className="text-gray-600" />
                </button>
              </>
            ) : (
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-white/80">
                  <PawPrint size={36} className="text-gray-200" />
                </div>
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <span
              className={`inline-flex text-[11px] px-3.5 py-1.5 rounded-xl font-semibold mb-5 w-fit ${
                isAvailable
                  ? 'bg-green-50 text-green-600 shadow-sm shadow-green-100'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {isAvailable ? '분양 가능' : '분양 완료'}
            </span>

            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-gray-900 mb-2">
              {adoption.name}
            </h1>

            {adoption.name_en && (
              <p
                className="text-[14px] text-gray-400 mb-6 italic"
                style={{ fontFamily: 'var(--font-accent)' }}
              >
                {adoption.name_en}
              </p>
            )}

            {adoption.price && (
              <div className="mb-8">
                <p className="text-[12px] text-gray-400 mb-1 uppercase tracking-wider font-medium"
                  style={{ fontFamily: 'var(--font-accent)' }}>
                  Price
                </p>
                <p className="text-2xl md:text-3xl font-bold text-brand">{adoption.price}</p>
              </div>
            )}

            {/* Specs */}
            {specs.length > 0 && (
              <div className="rounded-2xl bg-gray-50/50 border border-gray-100 p-5 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  {specs.map((s) => (
                    <div key={s.label} className="space-y-1">
                      <span className="text-[11px] text-gray-400 uppercase tracking-wider font-medium block">
                        {s.label}
                      </span>
                      <span className="text-[14px] font-semibold text-gray-700 block">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {adoption.description && (
              <div className="mb-10">
                <h3 className="text-[13px] font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                  상세 설명
                </h3>
                <div className="h-px bg-gradient-to-r from-gray-100 to-transparent mb-4" />
                <p className="text-[14px] leading-[1.9] text-gray-500 whitespace-pre-line">
                  {adoption.description}
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="mt-auto pt-4">
              {isAvailable ? (
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-[15px] font-semibold btn-primary"
                >
                  <MessageCircle size={18} />
                  분양 문의하기
                  <ArrowRight size={15} />
                </Link>
              ) : (
                <div className="px-8 py-4 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                  <p className="text-[14px] text-gray-400 font-medium">이 개체는 분양이 완료되었습니다</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
