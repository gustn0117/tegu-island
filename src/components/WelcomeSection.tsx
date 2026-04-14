'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function WelcomeSection() {
  return (
    <section className="py-20 md:py-32 lg:py-40 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
          {/* Left - Image with circular background */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center py-8 md:py-0"
          >
            {/* Circular background shape */}
            <div className="absolute w-[75%] aspect-square rounded-full bg-gray-50 border border-gray-100" />
            {/* Logo symbol as visual element */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-symbol.svg"
              alt="Tegu Island"
              className="relative z-10 w-[45%] max-w-[200px] mx-auto object-contain opacity-90"
            />
          </motion.div>

          {/* Right - Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[12px] md:text-[13px] tracking-[0.25em] uppercase mb-5 text-gray-400"
              style={{ fontFamily: 'var(--font-accent)' }}>
              Welcome to Tegu Island
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold !leading-[1.3] tracking-tight text-gray-900 mb-6">
              테구아일랜드
            </h2>
            <p className="text-[15px] md:text-[16px] leading-[1.9] text-gray-500 mb-10 max-w-lg">
              아시아 유일의 테구도마뱀 전문 농장으로, 혈통과 유전을 기반으로 한
              전문 라인브리딩을 진행하고 있습니다. 생태형 전시 공간에서 테구의 자연
              서식지를 경험하고, 교육 프로그램을 통해 파충류에 대한 올바른 이해를
              넓혀보세요.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="text-[13px] md:text-[14px] tracking-[0.1em] uppercase font-medium text-gray-800 hover:text-brand transition-colors duration-300 pb-1 border-b border-gray-300 hover:border-brand"
                style={{ fontFamily: 'var(--font-accent)' }}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-[13px] md:text-[14px] tracking-[0.1em] uppercase font-medium text-gray-800 hover:text-brand transition-colors duration-300 pb-1 border-b border-gray-300 hover:border-brand ml-4"
                style={{ fontFamily: 'var(--font-accent)' }}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
