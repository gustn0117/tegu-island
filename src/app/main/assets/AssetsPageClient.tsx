'use client';

import { motion } from 'framer-motion';
import type { TeguSpecies } from '@/lib/types';
import { PawPrint } from 'lucide-react';

function AssetCard({ animal, index }: { animal: TeguSpecies; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <div className="group">
        {/* Image */}
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          {animal.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={animal.image_url}
              alt={animal.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <PawPrint size={40} className="text-gray-200" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-4">
          <p className="text-[13px] tracking-[0.15em] uppercase text-gray-400"
            style={{ fontFamily: 'var(--font-accent)' }}>
            {animal.name}
          </p>
          <h3 className="text-[15px] md:text-[17px] font-display font-bold tracking-wide uppercase text-gray-800 mt-1">
            {animal.scientific || animal.name_en || ''}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

interface Props {
  species: TeguSpecies[];
}

export default function AssetsPageClient({ species }: Props) {
  return (
    <section className="pt-36 md:pt-40 pb-28 md:pb-32 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight uppercase text-gray-900">
            Our Assets
          </h1>
          <p className="text-[14px] md:text-[15px] mt-4 text-gray-400"
            style={{ fontFamily: 'var(--font-accent)' }}>
            -Active Assets-
          </p>
        </motion.div>

        {/* Grid */}
        {species.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-24 text-center rounded-2xl lg:rounded-3xl bg-white subtle-border"
          >
            <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center bg-gray-50">
              <PawPrint size={28} className="text-gray-200" />
            </div>
            <p className="text-base text-gray-400">등록된 개체가 없습니다</p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {species.map((animal, i) => (
                <AssetCard key={animal.id} animal={animal} index={i} />
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-[13px] text-gray-300 mt-12"
            >
              {species.length} Active Assets
            </motion.p>
          </>
        )}
      </div>
    </section>
  );
}
