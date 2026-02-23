'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, Shield, GraduationCap, Leaf, ArrowRight } from 'lucide-react';
import type { BannerSlide } from '@/lib/types';
import Link from 'next/link';

interface Props {
  slides: BannerSlide[];
}

export default function HeroBanner({ slides }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const displaySlides = slides.length > 0 ? slides : [];
  const total = displaySlides.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused || isDragging || total <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, isDragging, next, total]);

  // Scroll to current slide with offset for active-center feel
  useEffect(() => {
    if (!trackRef.current || total === 0) return;
    const track = trackRef.current;
    const cards = track.querySelectorAll('[data-slide]');
    if (cards[current]) {
      const card = cards[current] as HTMLElement;
      const trackWidth = track.clientWidth;
      const cardWidth = card.offsetWidth;
      const scrollLeft = card.offsetLeft - (trackWidth / 2) + (cardWidth / 2);
      track.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [current, total]);

  // Fallback: no slides
  if (slides.length === 0) {
    return (
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10 py-16 md:py-24 lg:py-28">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 lg:mb-20"
          >
            <p className="text-[12px] md:text-[13px] tracking-[0.3em] uppercase mb-5 text-gray-400"
              style={{ fontFamily: 'var(--font-accent)' }}>
              TEGU ISLAND — Since 2020
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.35] tracking-tight mb-6 text-gray-900">
              테구의 자연을<br />
              <span className="text-brand-700">사람에게 보여주다</span>
            </h1>
            <p className="text-lg md:text-xl mb-4 text-gray-500 max-w-lg">
              아시아 유일의 테구 전문 생태 전시 · 라인브리딩 · 교육 센터
            </p>
            <p className="text-[13px] md:text-[14px] mb-12 max-w-lg text-gray-400" style={{ fontFamily: 'var(--font-accent)' }}>
              Asia&apos;s Only Specialized Tegu Ecological Exhibition · Line Breeding · Education Center
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/booking"
                className="btn-primary px-10 py-4 text-[15px] tracking-wider rounded-full">
                방문예약
              </Link>
              <Link href="/contact"
                className="btn-outline px-10 py-4 text-[15px] tracking-wider rounded-full">
                분양문의
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {[
              { icon: <Eye size={28} />, label: '생태형 전시', labelEn: 'Ecological Exhibition', desc: '자연 서식지를 재현한 관찰형 전시' },
              { icon: <Shield size={28} />, label: '전문 라인브리딩', labelEn: 'Line Breeding', desc: '혈통과 퀄리티 중심 전문 육종' },
              { icon: <Leaf size={28} />, label: '윤리적 분양', labelEn: 'Ethical Adoption', desc: '가족이 될 수 있는 인연을 연결' },
              { icon: <GraduationCap size={28} />, label: '교육 프로그램', labelEn: 'Education', desc: '관찰형·교육형 체험 프로그램' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                className="group relative rounded-2xl overflow-hidden bg-white subtle-border card-hover"
              >
                <div className="aspect-[3/2] flex flex-col items-center justify-center p-8 bg-gray-50/50">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 bg-brand-50">
                    <div className="text-brand/50">{item.icon}</div>
                  </div>
                  <p className="text-[15px] font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">{item.label}</p>
                  <p className="text-[12px] mt-1.5 text-gray-400 leading-relaxed text-center">{item.desc}</p>
                  <p className="text-[11px] mt-2 tracking-[0.1em] uppercase text-gray-300" style={{ fontFamily: 'var(--font-accent)' }}>
                    {item.labelEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative w-full py-16 md:py-24 lg:py-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header area */}
      <div className="max-w-7xl mx-auto px-8 mb-12 md:mb-16">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <p className="text-[12px] md:text-[13px] tracking-[0.3em] uppercase mb-4 text-gray-400"
              style={{ fontFamily: 'var(--font-accent)' }}>
              TEGU ISLAND — Since 2020
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.35] tracking-tight text-gray-900">
              테구의 자연을<br className="sm:hidden" /> 사람에게 보여주다
            </h1>
            <p className="text-base md:text-lg mt-4 text-gray-400 max-w-md leading-relaxed">
              생태형 전시 · 전문 라인브리딩 · 교육 센터
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Progress dots */}
            <div className="flex items-center gap-2">
              {displaySlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="group flex items-center justify-center py-2"
                  aria-label={`슬라이드 ${i + 1}`}
                >
                  <div className={`rounded-full transition-all duration-500 ${
                    i === current
                      ? 'w-8 h-[3px] bg-brand'
                      : 'w-4 h-[3px] bg-gray-200 group-hover:bg-gray-400'
                  }`} />
                </button>
              ))}
            </div>
            {/* Nav arrows */}
            <div className="flex items-center gap-2 ml-2">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full flex items-center justify-center border border-gray-200 text-gray-400 hover:border-brand hover:text-brand hover:bg-brand-50/50 transition-all duration-300"
                aria-label="이전"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full flex items-center justify-center border border-gray-200 text-gray-400 hover:border-brand hover:text-brand hover:bg-brand-50/50 transition-all duration-300"
                aria-label="다음"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Carousel track */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div
          ref={trackRef}
          className="flex gap-5 md:gap-7 overflow-x-auto scroll-smooth px-8 pb-6 snap-x snap-mandatory no-scrollbar"
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
        >
          {/* Left spacer */}
          <div className="shrink-0 w-0 lg:w-[calc((100vw-1280px)/2+16px)]" />

          {displaySlides.map((slide, i) => {
            const isActive = i === current;
            const hasLink = !!slide.link;

            const cardContent = (
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg">
                <div className="aspect-[4/5] sm:aspect-[3/4] relative overflow-hidden">
                  {slide.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={slide.image_url}
                      alt={slide.title}
                      className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-9">
                    {slide.subtitle_en && (
                      <p className="text-[11px] md:text-[12px] tracking-[0.2em] uppercase mb-3 text-white/50"
                        style={{ fontFamily: 'var(--font-accent)' }}>
                        {slide.subtitle_en}
                      </p>
                    )}
                    <h3 className="text-2xl md:text-3xl font-display font-bold leading-[1.35] text-white mb-2">
                      {slide.title}
                    </h3>
                    {slide.subtitle && (
                      <p className="text-[14px] md:text-[15px] leading-relaxed text-white/60 line-clamp-2 mb-6">
                        {slide.subtitle}
                      </p>
                    )}
                    {hasLink && (
                      <span className="inline-flex items-center gap-2 text-[13px] font-medium text-white/70 group-hover:text-white transition-colors duration-300">
                        자세히 보기
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );

            return (
              <motion.div
                key={slide.id}
                data-slide
                className="shrink-0 snap-center"
                style={{ width: 'clamp(300px, 72vw, 460px)' }}
                animate={{
                  scale: isActive ? 1 : 0.94,
                  opacity: isActive ? 1 : 0.55,
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setCurrent(i)}
              >
                {hasLink ? (
                  <Link href={slide.link!} className="block group cursor-pointer">
                    {cardContent}
                  </Link>
                ) : (
                  <div className="block group cursor-pointer">
                    {cardContent}
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Right spacer */}
          <div className="shrink-0 w-8 lg:w-[calc((100vw-1280px)/2+16px)]" />
        </div>
      </motion.div>

      {/* CTA buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-7xl mx-auto px-8 mt-12 md:mt-16 flex flex-wrap gap-3"
      >
        <Link href="/booking"
          className="btn-primary px-10 py-4 text-[15px] tracking-wider rounded-full">
          방문예약
        </Link>
        <Link href="/contact"
          className="btn-outline px-10 py-4 text-[15px] tracking-wider rounded-full">
          분양문의
        </Link>
      </motion.div>
    </section>
  );
}
