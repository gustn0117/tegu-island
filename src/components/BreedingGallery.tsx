'use client';

import type { Adoption } from '@/lib/types';
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
      <div className="pt-5 pb-1 text-center">
        <h3 className="text-sm md:text-base font-semibold tracking-[0.15em] uppercase text-gray-900">
          {animal.name_en || animal.name}
        </h3>
        <p className="text-xs md:text-sm mt-1.5 text-gray-400 italic tracking-wide uppercase"
          style={{ fontFamily: 'var(--font-accent)' }}>
          {animal.species_en || animal.species}
        </p>
      </div>
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-6 py-2">
      <div className="h-px w-16 bg-gray-200" />
      <span className="text-[11px] tracking-[0.2em] uppercase text-gray-400"
        style={{ fontFamily: 'var(--font-accent)' }}>
        -{label}-
      </span>
      <div className="h-px w-16 bg-gray-200" />
    </div>
  );
}

interface Props {
  activeAnimals: Adoption[];
  inactiveAnimals: Adoption[];
}

export default function BreedingGallery({ activeAnimals, inactiveAnimals }: Props) {
  return (
    <section className="pt-36 md:pt-40 pb-28 md:pb-32 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="text-center mb-20 md:mb-24">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-[0.08em] uppercase text-gray-900">
            OUR ASSETS
          </h1>
        </div>

        {/* Active Assets */}
        <SectionDivider label="Active Assets" />
        {activeAnimals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-12 mb-28">
            {activeAnimals.map((a) => (
              <AssetCard key={a.id} animal={a} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center mb-28">
            <PawPrint size={32} className="mx-auto mb-4 text-gray-200" />
            <p className="text-sm text-gray-400">등록된 Active 개체가 없습니다</p>
          </div>
        )}

        {/* Inactive Assets */}
        {inactiveAnimals.length > 0 && (
          <>
            <SectionDivider label="Inactive Assets" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-12">
              {inactiveAnimals.map((a) => (
                <AssetCard key={a.id} animal={a} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
