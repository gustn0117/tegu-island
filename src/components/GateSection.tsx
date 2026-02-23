'use client';

import { motion } from 'framer-motion';
import { Eye, Shield, GraduationCap, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const gates = [
  {
    icon: <Eye size={30} />,
    title: '생태형 전시',
    titleEn: 'Ecological Exhibition',
    desc: '테구의 자연 서식지를 재현한 생태형 전시 공간에서\n관찰을 통해 테구의 본래 모습을 경험하세요.',
    href: '/booking',
    cta: '관람 예약',
    accent: 'from-brand-50/80 to-brand-100/40',
    iconBg: 'bg-brand/10 text-brand',
    hoverBorder: 'hover:border-brand/20',
  },
  {
    icon: <Shield size={30} />,
    title: '전문 라인브리딩',
    titleEn: 'Professional Line Breeding',
    desc: '혈통과 퀄리티 중심의 전문 육종 시스템.\n검증된 페어링 데이터와 성장 기록을 공개합니다.',
    href: '/main/adoption',
    cta: '개체 보기',
    accent: 'from-gray-50 to-gray-100/50',
    iconBg: 'bg-gray-900/[0.06] text-gray-700',
    hoverBorder: 'hover:border-gray-200',
  },
  {
    icon: <GraduationCap size={30} />,
    title: '교육 프로그램',
    titleEn: 'Education Programs',
    desc: '학교·기관·대학을 위한 전문 교육 과정.\n브리딩, 사육 표준, 생태 보호를 배웁니다.',
    href: '/booking',
    cta: '교육 신청',
    accent: 'from-amber-50/60 to-yellow-50/40',
    iconBg: 'bg-amber-100/60 text-amber-700',
    hoverBorder: 'hover:border-amber-200/50',
  },
  {
    icon: <Heart size={30} />,
    title: '윤리적 분양',
    titleEn: 'Ethical Adoption',
    desc: '단순 판매가 아닌, 가족이 될 수 있는 인연 연결.\n건강 인증·성장 기록·케어 교육을 제공합니다.',
    href: '/contact',
    cta: '분양 상담',
    accent: 'from-rose-50/60 to-pink-50/30',
    iconBg: 'bg-rose-100/60 text-rose-600',
    hoverBorder: 'hover:border-rose-200/50',
  },
];

export default function GateSection() {
  return (
    <section className="py-24 md:py-32 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[11px] md:text-[12px] tracking-[0.3em] uppercase mb-4 text-gray-400"
            style={{ fontFamily: 'var(--font-accent)' }}>
            What We Offer
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-gray-900">
            테구아일랜드가 하는 일
          </h2>
          <div className="flex items-center gap-4 mt-6 justify-center">
            <div className="h-px w-14 md:w-20 bg-gradient-to-r from-transparent to-brand/20" />
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand/25" />
              <div className="w-2 h-2 rounded-full bg-brand" />
              <div className="w-1.5 h-1.5 rounded-full bg-brand/25" />
            </div>
            <div className="h-px w-14 md:w-20 bg-gradient-to-l from-transparent to-brand/20" />
          </div>
          <p className="text-base md:text-lg mt-6 max-w-xl mx-auto leading-relaxed text-gray-400">
            테구의 자연을 사람에게 보여주고, 가족이 될 수 있는 인연을 이어줍니다
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {gates.map((gate, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={gate.href} className="block group">
                <div className={`relative overflow-hidden rounded-2xl lg:rounded-3xl p-8 md:p-10 lg:p-12 bg-gradient-to-br ${gate.accent} border border-gray-100/80 ${gate.hoverBorder} transition-all duration-500 group-hover:shadow-[0_24px_64px_-16px_rgba(0,0,0,0.1)] group-hover:-translate-y-1.5`}>
                  {/* Icon row */}
                  <div className="flex items-start justify-between mb-8">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${gate.iconBg} transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}>
                      {gate.icon}
                    </div>
                    <div className="w-11 h-11 rounded-full flex items-center justify-center bg-white/80 border border-gray-100/80 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-x-3 group-hover:translate-x-0 shadow-sm">
                      <ArrowRight size={16} className="text-gray-500" />
                    </div>
                  </div>

                  {/* Text */}
                  <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                    {gate.title}
                  </h3>
                  <p className="text-[12px] tracking-[0.12em] uppercase text-gray-400 mb-5"
                    style={{ fontFamily: 'var(--font-accent)' }}>
                    {gate.titleEn}
                  </p>
                  <p className="text-[14px] md:text-[15px] leading-[1.75] text-gray-500 whitespace-pre-line mb-8">
                    {gate.desc}
                  </p>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-gray-600 group-hover:text-brand transition-colors duration-300">
                    {gate.cta}
                    <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
