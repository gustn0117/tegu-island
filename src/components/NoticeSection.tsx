'use client';

import type { Notice, CareSheet } from '@/lib/types';
import Link from 'next/link';
import { FileText, BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  notices: Notice[];
  careSheets: CareSheet[];
}

export default function NoticeSection({ notices, careSheets }: Props) {
  return (
    <section className="py-24 md:py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Notices */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl lg:rounded-3xl p-8 md:p-10 subtle-border bg-white"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-brand-50">
                  <FileText size={18} className="text-brand/60" />
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-gray-400 mb-0.5"
                    style={{ fontFamily: 'var(--font-accent)' }}>Notices</p>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900">공지사항</h3>
                </div>
              </div>
              <Link href="/main/notices" className="flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-brand transition-colors group px-3 py-1.5 rounded-lg hover:bg-brand-50/50">
                전체보기
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            {notices.length === 0 ? (
              <div className="py-16 text-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/30">
                <FileText size={28} className="mx-auto mb-3 text-gray-200" />
                <p className="text-[15px] text-gray-400">등록된 공지사항이 없습니다</p>
              </div>
            ) : (
              <div className="space-y-2">
                {notices.map((n) => (
                  <div key={n.id}
                    className="en-tooltip flex items-center justify-between py-4 px-5 rounded-xl hover:bg-gray-50/80 transition-all duration-300 cursor-pointer group border border-transparent hover:border-gray-100"
                    data-en={n.title_en}>
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`text-[11px] px-3 py-1.5 rounded-lg shrink-0 font-semibold tracking-wide ${
                        n.tag === '공지' ? 'bg-gray-100 text-gray-600' :
                        n.tag === '신규' ? 'bg-brand text-white' :
                        'bg-gray-100 text-gray-500'
                      }`}>{n.tag}</span>
                      <span className="text-[14px] md:text-[15px] text-gray-600 truncate group-hover:text-gray-900 transition-colors">{n.title}</span>
                    </div>
                    <span className="text-[12px] text-gray-300 shrink-0 ml-4 tabular-nums">{n.date}</span>
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
            className="rounded-2xl lg:rounded-3xl p-8 md:p-10 subtle-border bg-white"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-brand-50">
                  <BookOpen size={18} className="text-brand/60" />
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-gray-400 mb-0.5"
                    style={{ fontFamily: 'var(--font-accent)' }}>Care Sheets</p>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900">케어시트</h3>
                </div>
              </div>
              <Link href="/care-guide" className="flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-brand transition-colors group px-3 py-1.5 rounded-lg hover:bg-brand-50/50">
                전체보기
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            {careSheets.length === 0 ? (
              <div className="py-16 text-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/30">
                <BookOpen size={28} className="mx-auto mb-3 text-gray-200" />
                <p className="text-[15px] text-gray-400">등록된 케어시트가 없습니다</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {careSheets.map((cs) => (
                  <div key={cs.id}
                    className="en-tooltip p-6 rounded-xl card-hover cursor-pointer group border border-gray-100/80 hover:border-gray-200 hover:bg-gray-50/50"
                    data-en={cs.title_en}>
                    <div className="flex items-start gap-4">
                      <span className="text-3xl mt-0.5 block transition-transform duration-300 group-hover:scale-110">{cs.icon}</span>
                      <div>
                        <p className="text-[15px] font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{cs.title}</p>
                        <p className="text-[13px] mt-2 text-gray-400 leading-relaxed">{cs.description}</p>
                      </div>
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
