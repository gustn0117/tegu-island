'use client';

import { motion } from 'framer-motion';
import { Shield, Heart, Eye, GraduationCap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const gates = [
  {
    icon: <Shield size={24} />,
    title: '전문 라인브리딩',
    titleEn: 'Professional Line Breeding',
    desc: '혈통과 유전을 기반으로 한 전문 브리딩.\n건강하고 아름다운 테구를 만들어갑니다.',
    href: '/main/assets',
    cta: '개체 보기',
  },
  {
    icon: <Heart size={24} />,
    title: '윤리적 분양',
    titleEn: 'Ethical Adoption',
    desc: '분양 중인 개체의 상세 정보와 사진을 확인하고\n가족이 될 인연을 만나보세요.',
    href: '/main/adoption',
    cta: '개체 보기',
  },
  {
    icon: <Eye size={24} />,
    title: '생태형 전시',
    titleEn: 'Ecological Exhibition',
    desc: '테구의 자연 서식지를 재현한 생태형 전시 공간에서\n관찰을 통해 테구의 본래 모습을 경험하세요.',
    href: '/booking',
    cta: '관람 예약',
  },
  {
    icon: <GraduationCap size={24} />,
    title: '교육 프로그램',
    titleEn: 'Education Programs',
    desc: '학교·기관·대학을 위한 전문 교육 과정.\n브리딩, 사육 표준, 생태 보호를 배웁니다.',
    href: '/education',
    cta: '교육 신청',
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {gates.map((gate, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={gate.href} className="block group">
                <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl p-8 md:p-10 lg:p-12 bg-white border border-gray-200/80 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-brand/[0.08] group-hover:-translate-y-1 group-hover:border-brand/20">

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon + number row */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50 text-gray-500 border border-gray-100 transition-all duration-500 group-hover:bg-brand group-hover:text-white group-hover:border-brand group-hover:shadow-lg group-hover:shadow-brand/20">
                        {gate.icon}
                      </div>
                      <span className="text-[48px] font-display font-bold text-gray-100 leading-none select-none transition-colors duration-500 group-hover:text-brand/10">
                        0{i + 1}
                      </span>
                    </div>

                    {/* Text */}
                    <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900 mb-1.5 transition-colors duration-500">
                      {gate.title}
                    </h3>
                    <p className="text-[11px] tracking-[0.15em] uppercase text-gray-300 mb-5 transition-colors duration-500 group-hover:text-brand/50"
                      style={{ fontFamily: 'var(--font-accent)' }}>
                      {gate.titleEn}
                    </p>
                    <p className="text-[14px] md:text-[15px] leading-[1.8] text-gray-400 whitespace-pre-line mb-8">
                      {gate.desc}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] font-semibold text-gray-500 group-hover:text-brand transition-colors duration-300">
                        {gate.cta}
                      </span>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 transition-all duration-300 group-hover:bg-brand group-hover:shadow-md group-hover:shadow-brand/20">
                        <ArrowRight size={13} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
