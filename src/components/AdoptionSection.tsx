'use client';

import type { Adoption } from '@/lib/types';
import SectionTitle from './SectionTitle';
import { PawPrint } from 'lucide-react';

function AssetCard({ animal }: { animal: Adoption }) {
  return (
    <div className="group">
      <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
        {animal.image_url ? (
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
      </div>
      <div className="pt-4 pb-1 text-center">
        <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-gray-900">
          {animal.name_en || animal.name}
        </h3>
        <p className="text-xs mt-1.5 text-gray-400 italic tracking-wide uppercase"
          style={{ fontFamily: 'var(--font-accent)' }}>
          {animal.species_en || animal.species}
        </p>
      </div>
    </div>
  );
}

interface Props {
  adoptions: Adoption[];
}

export default function AdoptionSection({ adoptions }: Props) {
  return (
    <section className="py-24 md:py-28 px-8" id="adoption">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          ko="전문 라인브리딩"
          en="Our Assets"
          sub="최고의 혈통을 유지하는 브리딩 개체를 소개합니다"
          subEn="Meet our carefully selected breeding stock"
        />

        {adoptions.length === 0 ? (
          <div className="py-20 text-center">
            <PawPrint size={32} className="mx-auto mb-4 text-gray-200" />
            <p className="text-base text-gray-400">등록된 개체가 없습니다</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {adoptions.map((a) => (
              <AssetCard key={a.id} animal={a} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
