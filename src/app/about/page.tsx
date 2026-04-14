'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sprout, Dna, GraduationCap, Eye, ArrowRight, Phone, Mail, MessageCircle, MapPin } from 'lucide-react';

const VALUES = [
  {
    icon: <Dna size={26} />,
    ko: '전문 라인브리딩',
    en: 'Professional Line Breeding',
    desc: '혈통과 유전 정보를 기반으로, 건강하고 아름다운 테구를 세대를 이어 만들어갑니다.',
  },
  {
    icon: <Sprout size={26} />,
    ko: '윤리적 분양',
    en: 'Ethical Adoption',
    desc: '단순 판매가 아닌, 가족이 될 수 있는 인연을 이어줍니다. 건강 인증·성장 기록·혈통 정보·케어 교육이 함께 제공됩니다.',
  },
  {
    icon: <Eye size={26} />,
    ko: '생태형 전시',
    en: 'Ecological Exhibition',
    desc: '자연 서식지를 재현한 전시 공간에서 테구의 본래 모습과 생활 습성을 그대로 관찰할 수 있습니다.',
  },
  {
    icon: <GraduationCap size={26} />,
    ko: '교육 프로그램',
    en: 'Education Programs',
    desc: '학교·기관·대학을 위한 전문 교육 과정을 운영합니다. 브리딩 과학, 사육 표준, 생태 보호의 올바른 이해를 전합니다.',
  },
];

const MILESTONES = [
  { year: '2020', label: '테구아일랜드 설립', sub: 'Founded Tegu Island' },
  { year: '2021', label: '전문 라인브리딩 프로그램 시작', sub: 'Line breeding program' },
  { year: '2023', label: '생태형 전시 공간 오픈', sub: 'Ecological exhibition' },
  { year: '2024', label: '교육 프로그램 정식 운영', sub: 'Education programs' },
  { year: '2025', label: 'CITES 인증 국제 수출 준비', sub: 'CITES certified export' },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-36 md:pt-40 pb-28 md:pb-32 px-8">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20 md:mb-24"
          >
            <p
              className="text-[12px] md:text-[13px] tracking-[0.3em] uppercase mb-3 text-gray-400"
              style={{ fontFamily: 'var(--font-accent)' }}
            >
              About Us
            </p>
            <h1 className="text-4xl md:text-5xl font-display text-gray-900 font-bold tracking-tight">
              테구아일랜드
            </h1>
            <div className="flex items-center justify-center gap-4 mt-5">
              <div className="h-px w-14 md:w-20 bg-gradient-to-r from-transparent to-brand/20" />
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-brand/25" />
                <div className="w-2 h-2 rounded-full bg-brand" />
                <div className="w-1.5 h-1.5 rounded-full bg-brand/25" />
              </div>
              <div className="h-px w-14 md:w-20 bg-gradient-to-l from-transparent to-brand/20" />
            </div>
            <p className="text-base md:text-lg mt-6 text-gray-500 max-w-2xl mx-auto leading-[1.9]">
              아시아 유일의 테구도마뱀 전문 농장.<br />
              혈통과 유전을 기반으로 한 전문 라인브리딩을 통해,<br />
              건강하고 아름다운 테구를 세상에 이어갑니다.
            </p>
          </motion.div>

          {/* Story */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mb-24 md:mb-28"
          >
            <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
              <div>
                <p className="text-[11px] font-bold text-brand/40 tracking-widest mb-3" style={{ fontFamily: 'var(--font-accent)' }}>OUR STORY</p>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900">우리의 이야기</h2>
              </div>
              <div className="space-y-5 text-[15px] md:text-[16px] text-gray-500 leading-[1.9]">
                <p>
                  테구아일랜드는 2020년, 국내에서 생소했던 테구도마뱀을 체계적으로 연구하고 사랑하는 마음으로 시작되었습니다.
                  단순히 개체를 거래하는 곳이 아니라, 테구의 생태와 행동을 깊이 이해하고 그 매력을 올바르게 전달하는 공간을 만들고자 했습니다.
                </p>
                <p>
                  지금 테구아일랜드는 아시아에서 유일한 테구 전문 농장으로, 혈통 관리와 유전 정보를 기반으로 한 라인브리딩, 자연 서식지를 재현한 생태형 전시, 그리고 학교·기관·대학을 위한 전문 교육 프로그램까지 운영하고 있습니다.
                </p>
                <p>
                  우리는 테구 한 개체 한 개체를 가족이 될 수 있는 인연으로 대합니다. 분양은 단순한 판매가 아니라, 건강 인증서·성장 기록·혈통 정보·사전 케어 교육을 포함한 책임 있는 과정입니다.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Values */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mb-24 md:mb-28"
          >
            <div className="text-center mb-14">
              <p className="text-[11px] font-bold text-brand/40 tracking-widest mb-3" style={{ fontFamily: 'var(--font-accent)' }}>WHAT WE DO</p>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900">테구아일랜드가 하는 일</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.ko}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="p-7 md:p-8 rounded-2xl bg-white border border-gray-100 hover:border-brand/20 hover:shadow-lg hover:shadow-black/[0.03] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand/[0.06] flex items-center justify-center text-brand/70 mb-5">
                    {v.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-display font-bold text-gray-900 mb-1">{v.ko}</h3>
                  <p className="text-[11px] tracking-[0.12em] uppercase text-gray-300 mb-4" style={{ fontFamily: 'var(--font-accent)' }}>{v.en}</p>
                  <p className="text-[14px] text-gray-500 leading-[1.85]">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Timeline */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mb-24 md:mb-28"
          >
            <div className="text-center mb-14">
              <p className="text-[11px] font-bold text-brand/40 tracking-widest mb-3" style={{ fontFamily: 'var(--font-accent)' }}>MILESTONES</p>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900">걸어온 길</h2>
            </div>
            <div className="relative">
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 md:-translate-x-1/2" />
              <div className="space-y-10">
                {MILESTONES.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.05 * i }}
                    className={`relative pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-12 ${i % 2 === 0 ? '' : 'md:[&>*:first-child]:col-start-2'}`}
                  >
                    <div className={`${i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:pl-10'}`}>
                      <p className="text-3xl md:text-4xl font-display font-bold text-brand/70 mb-1" style={{ fontFamily: 'var(--font-accent)' }}>
                        {m.year}
                      </p>
                      <p className="text-[16px] md:text-[17px] font-medium text-gray-800">{m.label}</p>
                      <p className="text-[11px] tracking-[0.12em] uppercase text-gray-300 mt-1" style={{ fontFamily: 'var(--font-accent)' }}>{m.sub}</p>
                    </div>
                    <div className="absolute left-0 md:left-1/2 top-2 w-3 h-3 rounded-full bg-brand border-4 border-white shadow md:-translate-x-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Contact CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-100"
          >
            <div className="text-center mb-10">
              <p className="text-[11px] font-bold text-brand/40 tracking-widest mb-3" style={{ fontFamily: 'var(--font-accent)' }}>CONTACT</p>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900">테구아일랜드와 만나기</h2>
              <p className="text-[14px] md:text-[15px] text-gray-500 mt-4 max-w-lg mx-auto leading-[1.85]">
                방문, 분양, 교육, 수출 관련 모든 문의를 환영합니다.<br />
                빠른 상담을 원하시면 전화·카카오톡·WhatsApp을 이용해 주세요.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-gray-100">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-brand/[0.06]">
                  <Phone size={16} className="text-brand/70" />
                </div>
                <div>
                  <a href="tel:010-8802-8361" className="text-[14px] font-semibold text-gray-800 hover:text-brand transition-colors">010-8802-8361</a>
                  <p className="text-[11px] mt-0.5 text-gray-400">오준혁 대표</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-gray-100">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-brand/[0.06]">
                  <Mail size={16} className="text-brand/70" />
                </div>
                <div>
                  <a href="mailto:ccbtegu55@gmail.com" className="text-[14px] font-semibold text-gray-800 hover:text-brand transition-colors break-all">ccbtegu55@gmail.com</a>
                  <p className="text-[11px] mt-0.5 text-gray-400">Email</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-gray-100">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-brand/[0.06]">
                  <MessageCircle size={16} className="text-brand/70" />
                </div>
                <div>
                  <a href="https://wa.me/821088028361" target="_blank" rel="noopener noreferrer" className="text-[14px] font-semibold text-gray-800 hover:text-brand transition-colors">+82 10 8802 8361</a>
                  <p className="text-[11px] mt-0.5 text-gray-400">WhatsApp</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-gray-100">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-brand/[0.06]">
                  <MapPin size={16} className="text-brand/70" />
                </div>
                <div>
                  <p className="text-[14px] text-gray-700 leading-[1.55]">
                    서울특별시 금천구<br />가산디지털1로 100<br />에이스골드타워 211호
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/visit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-[13px] font-medium btn-primary transition-all duration-300"
              >
                방문예약 <ArrowRight size={13} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-[13px] font-medium btn-outline transition-all duration-300"
              >
                분양 상담 <ArrowRight size={13} />
              </Link>
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </>
  );
}
