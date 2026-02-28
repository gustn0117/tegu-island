'use client';

import type { Notice, CareSheet } from '@/lib/types';
import Link from 'next/link';
import { ArrowRight, Bell, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  notices: Notice[];
  careSheets: CareSheet[];
}

export default function NoticeSection({ notices, careSheets }: Props) {
  return (
    <section className="py-24 md:py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Notices */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-gray-400 mb-1.5"
                  style={{ fontFamily: 'var(--font-accent)' }}>Notices</p>
                <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900">공지사항</h3>
              </div>
              <Link href="/main/notices" className="flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-brand transition-colors group">
                전체보기
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="h-px bg-gray-200 mb-2" />
            {notices.length === 0 ? (
              <div className="py-16 flex flex-col items-center gap-3">
                <Bell size={28} className="text-gray-200" />
                <p className="text-[14px] text-gray-300">등록된 공지사항이 없습니다</p>
              </div>
            ) : (
              <div>
                {notices.map((n) => (
                  <div key={n.id}
                    className="en-tooltip flex items-center justify-between py-4 px-3 -mx-3 rounded-lg border-b border-gray-100 cursor-pointer group transition-colors hover:bg-gray-50/80"
                    data-en={n.title_en}>
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`text-[11px] px-2.5 py-1 rounded shrink-0 font-medium ${
                        n.tag === '공지' ? 'bg-gray-100 text-gray-500' :
                        n.tag === '신규' ? 'bg-brand text-white' :
                        'bg-gray-100 text-gray-500'
                      }`}>{n.tag}</span>
                      <span className="text-[14px] text-gray-600 truncate group-hover:text-gray-900 transition-colors">{n.title}</span>
                    </div>
                    <span className="text-[12px] text-gray-400 shrink-0 ml-4 tabular-nums">{n.date}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Care Sheets */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-gray-400 mb-1.5"
                  style={{ fontFamily: 'var(--font-accent)' }}>Care Sheets</p>
                <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900">케어시트</h3>
              </div>
              <Link href="/care-guide" className="flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-brand transition-colors group">
                전체보기
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="h-px bg-gray-200 mb-6" />
            {careSheets.length === 0 ? (
              <div className="py-16 flex flex-col items-center gap-3">
                <BookOpen size={28} className="text-gray-200" />
                <p className="text-[14px] text-gray-300">등록된 케어시트가 없습니다</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {careSheets.map((cs) => (
                  <div key={cs.id}
                    className="en-tooltip flex items-start gap-4 p-5 rounded-xl border border-gray-100 cursor-pointer group hover:bg-gray-50 hover:border-gray-200 transition-all duration-300"
                    data-en={cs.title_en}>
                    <span className="text-2xl mt-0.5 block shrink-0 transition-transform duration-300 group-hover:scale-110">{cs.icon}</span>
                    <div>
                      <p className="text-[14px] font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{cs.title}</p>
                      <p className="text-[13px] mt-1.5 text-gray-400 leading-relaxed">{cs.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
