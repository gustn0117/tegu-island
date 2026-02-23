'use client';

import type { Adoption } from '@/lib/types';
import SectionTitle from './SectionTitle';
import { Heart, PawPrint, Tag, Clock, Palette, Mars, Venus, HelpCircle, MessageCircle } from 'lucide-react';

function StatusBadge({ status }: { status: string | null }) {
  if (!status) return null;
  const isAvailable = status === '분양가능' || status === '분양 가능';
  const isReserved = status === '예약중' || status === '예약';
  return (
    <span className={`text-[11px] px-3 py-1.5 rounded-lg font-medium ${
      isAvailable ? 'bg-brand text-white ring-2 ring-brand/10' :
      isReserved ? 'bg-amber-50 text-amber-700' :
      'bg-red-50 text-red-500'
    }`}>
      {status}
    </span>
  );
}

function SexIcon({ sex }: { sex: string | null }) {
  if (!sex) return <HelpCircle size={12} className="text-gray-300" />;
  if (sex === '수컷' || sex.toLowerCase() === 'male') return <Mars size={12} className="text-gray-500" />;
  if (sex === '암컷' || sex.toLowerCase() === 'female') return <Venus size={12} className="text-gray-500" />;
  return <HelpCircle size={12} className="text-gray-300" />;
}

function AdoptionCard({ adoption }: { adoption: Adoption }) {
  return (
    <div className="en-tooltip group relative rounded-2xl overflow-hidden card-hover"
      data-en={adoption.name_en}>
      <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl bg-gray-100">
        {adoption.image_url ? (
          <img
            src={adoption.image_url}
            alt={adoption.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-200 group-hover:text-gray-300 group-hover:scale-110 transition-all duration-500">
            <PawPrint size={48} />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <StatusBadge status={adoption.status} />
        </div>
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <a href="https://pf.kakao.com/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[12px] font-medium bg-yellow-400 text-yellow-900">
            <MessageCircle size={12} />
            문의
          </a>
        </div>
      </div>

      <div className="p-6 bg-white rounded-b-2xl group-hover:bg-gray-50/50 transition-colors duration-300 border border-gray-100 border-t-0">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors leading-relaxed">
          {adoption.name}
        </h3>

        {(adoption.species || adoption.morph) && (
          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            {adoption.species && (
              <span className="text-[12px] px-2.5 py-1 rounded-md bg-gray-100 text-gray-500">
                {adoption.species}
              </span>
            )}
            {adoption.morph && (
              <span className="flex items-center gap-1 text-[12px] text-gray-400">
                <Palette size={12} />
                {adoption.morph}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-4 mt-3.5 text-[12px] text-gray-400">
          {adoption.sex && (
            <span className="flex items-center gap-1">
              <SexIcon sex={adoption.sex} />
              {adoption.sex}
            </span>
          )}
          {adoption.age && (
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {adoption.age}
            </span>
          )}
        </div>

        {adoption.description && (
          <p className="text-[13px] mt-4 text-gray-400 leading-relaxed line-clamp-2">
            {adoption.description}
          </p>
        )}

        {adoption.price && (
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
            <span className="flex items-center gap-1 text-[11px] text-gray-300">
              <Tag size={11} />
              분양가
            </span>
            <span className="text-lg md:text-xl font-bold text-gray-900">
              {adoption.price}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyAdoptionState() {
  return (
    <div className="py-20 text-center rounded-2xl bg-white subtle-border">
      <div className="w-20 h-20 rounded-xl mx-auto mb-4 flex items-center justify-center bg-gray-50">
        <Heart size={32} className="text-gray-200" />
      </div>
      <p className="text-base text-gray-400">현재 분양 가능한 개체가 없습니다</p>
      <p className="text-[12px] mt-2 text-gray-300">새로운 분양 개체가 등록되면 이곳에 표시됩니다</p>
      <a href="https://pf.kakao.com/" target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[13px] px-6 py-3 rounded-xl mt-6 bg-yellow-50 text-yellow-800 transition-all duration-300 hover:bg-yellow-100">
        <MessageCircle size={14} />
        카카오톡으로 분양 문의
      </a>
    </div>
  );
}

interface Props {
  adoptions: Adoption[];
}

export default function AdoptionSection({ adoptions }: Props) {
  return (
    <section className="py-24 md:py-28 px-8" id="adoption">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          ko="분양"
          en="Adoption"
          sub="가족이 될 수 있는 건강한 테구를 만나보세요"
          subEn="Meet your future family — ethically bred, health certified"
        />

        {adoptions.length === 0 ? (
          <EmptyAdoptionState />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {adoptions.map((a) => (
                <AdoptionCard key={a.id} adoption={a} />
              ))}
            </div>

            <div className="mt-14 text-center">
              <div className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-2xl bg-gray-50 border border-gray-100">
                <p className="text-[13px] text-gray-400">
                  분양 관련 자세한 문의는 카카오톡으로 연락주세요
                </p>
                <a href="https://pf.kakao.com/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] px-6 py-3 rounded-xl bg-yellow-50 text-yellow-800 transition-all duration-300 hover:bg-yellow-100">
                  <MessageCircle size={14} />
                  카카오톡 문의
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
