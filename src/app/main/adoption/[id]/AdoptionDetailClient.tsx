'use client';

import Link from 'next/link';
import type { Adoption } from '@/lib/types';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, PawPrint } from 'lucide-react';

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
        <Link
          href="/main/adoption"
          className="inline-flex items-center gap-2 text-[13px] text-gray-400 hover:text-gray-600 transition-colors mb-8"
        >
          <ArrowLeft size={14} /> 분양 목록으로
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100"
          >
            {adoption.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={adoption.image_url}
                alt={adoption.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <PawPrint size={64} className="text-gray-200" />
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span
              className={`inline-flex text-[11px] px-3 py-1.5 rounded-lg font-semibold mb-4 ${
                isAvailable
                  ? 'bg-green-50 text-green-600'
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
              <p className="text-2xl font-bold text-brand mb-8">{adoption.price}</p>
            )}

            {/* Specs */}
            {specs.length > 0 && (
              <div className="space-y-0 mb-8">
                {specs.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between py-3.5 border-b border-gray-50"
                  >
                    <span className="text-[13px] text-gray-400">{s.label}</span>
                    <span className="text-[14px] font-medium text-gray-700">{s.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            {adoption.description && (
              <div className="mb-10">
                <h3 className="text-[13px] font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                  상세 설명
                </h3>
                <p className="text-[14px] leading-[1.8] text-gray-500 whitespace-pre-line">
                  {adoption.description}
                </p>
              </div>
            )}

            {/* CTA */}
            {isAvailable && (
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-[15px] font-medium btn-primary"
              >
                <MessageCircle size={16} /> 분양 문의하기
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
