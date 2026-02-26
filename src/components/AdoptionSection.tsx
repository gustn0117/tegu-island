'use client';

import type { Adoption } from '@/lib/types';
import SectionTitle from './SectionTitle';
import Link from 'next/link';
import { PawPrint, ArrowRight } from 'lucide-react';

function AdoptionCard({ animal }: { animal: Adoption }) {
  return (
    <Link href={`/main/adoption/${animal.id}`} className="block group">
      <div className="overflow-hidden rounded-2xl bg-white subtle-border card-hover">
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
            <span className="text-[11px] px-3 py-1.5 rounded-lg font-semibold backdrop-blur-sm bg-green-500/90 text-white">
              분양 가능
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-brand transition-colors">
            {animal.name}
          </h3>
          <p className="text-[13px] text-gray-400 mb-2">
            {animal.species}
            {animal.morph ? ` · ${animal.morph}` : ''}
          </p>
          {animal.price && (
            <p className="text-[14px] font-bold text-brand">{animal.price}</p>
          )}
        </div>
      </div>
    </Link>
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
          ko="분양 중인 개체"
          en="Available Tegus"
          sub="건강하고 아름다운 테구를 만나보세요"
          subEn="Meet our healthy and beautiful tegus"
        />

        {adoptions.length === 0 ? (
          <div className="py-20 text-center">
            <PawPrint size={32} className="mx-auto mb-4 text-gray-200" />
            <p className="text-base text-gray-400">등록된 개체가 없습니다</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {adoptions.map((a) => (
                <AdoptionCard key={a.id} animal={a} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/main/adoption"
                className="inline-flex items-center gap-2 text-[14px] font-medium text-gray-500 hover:text-brand transition-colors group"
              >
                전체 보기
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
