'use client';

import type { Notice } from '@/lib/types';
import { FileText, Bell, Megaphone } from 'lucide-react';

interface Props {
  notices: Notice[];
}

function TagIcon({ tag }: { tag: string | null }) {
  if (tag === '신규') return <Bell size={14} />;
  if (tag === '중요') return <Megaphone size={14} />;
  return <FileText size={14} />;
}

export default function NoticesPageClient({ notices }: Props) {
  return (
    <section className="py-12 md:py-20 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-[11px] md:text-[12px] tracking-[0.3em] uppercase mb-4 text-gray-500"
            style={{ fontFamily: 'var(--font-accent)' }}>
            Notices
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-gray-900">
            공지사항
          </h1>
          <div className="flex items-center gap-4 mt-6 justify-center">
            <div className="h-px w-14 md:w-20 bg-gradient-to-r from-transparent to-brand/20" />
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand/25" />
              <div className="w-2 h-2 rounded-full bg-brand" />
              <div className="w-1.5 h-1.5 rounded-full bg-brand/25" />
            </div>
            <div className="h-px w-14 md:w-20 bg-gradient-to-l from-transparent to-brand/20" />
          </div>
          <p className="text-base mt-6 max-w-lg mx-auto text-gray-500">
            테구아일랜드의 전시·브리딩·교육 소식을 확인하세요
          </p>
        </div>

        {/* Notices List */}
        {notices.length === 0 ? (
          <div className="py-24 text-center rounded-2xl bg-white subtle-border">
            <div className="w-20 h-20 rounded-xl mx-auto mb-4 flex items-center justify-center bg-gray-50">
              <FileText size={32} className="text-gray-200" />
            </div>
            <p className="text-base text-gray-400">등록된 공지사항이 없습니다</p>
            <p className="text-[12px] mt-2 text-gray-300">새로운 소식이 등록되면 이곳에 표시됩니다</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((n) => (
              <div
                key={n.id}
                className="en-tooltip group p-6 md:p-8 rounded-2xl bg-white subtle-border card-hover cursor-pointer"
                data-en={n.title_en}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    n.tag === '신규' ? 'bg-brand text-white' :
                    n.tag === '중요' ? 'bg-brand-700 text-white' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    <TagIcon tag={n.tag} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-[11px] px-3 py-1 rounded-lg font-medium shrink-0 ${
                        n.tag === '공지' ? 'bg-gray-100 text-gray-600' :
                        n.tag === '신규' ? 'bg-brand text-white' :
                        n.tag === '중요' ? 'bg-brand-700 text-white' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {n.tag || '공지'}
                      </span>
                      <span className="text-[12px] text-gray-300">{n.date}</span>
                    </div>
                    <h3 className="text-base md:text-lg font-medium text-gray-700 group-hover:text-gray-900 transition-colors leading-relaxed">
                      {n.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
