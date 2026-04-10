'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { BannerSlide } from '@/lib/types';
import Link from 'next/link';

interface Props {
  slides: BannerSlide[];
}

export default function HeroBanner({ slides }: Props) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const displaySlides = slides.length > 0 ? slides : [];
  const total = displaySlides.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next, total]);

  // Fallback: no slides
  if (slides.length === 0) {
    return (
      <section className="relative w-full h-[50vh] md:h-[70vh] bg-gray-100 flex items-center justify-center">
        <div className="text-center px-8">
          <p className="text-[12px] md:text-[13px] tracking-[0.3em] uppercase mb-4 text-gray-400"
            style={{ fontFamily: 'var(--font-accent)' }}>
            TEGU ISLAND — Since 2020
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-[1.35] tracking-tight text-gray-900">
            테구의 자연을<br />
            <span className="text-brand-700">사람에게 보여주다</span>
          </h1>
          <div className="flex flex-wrap gap-3 mt-10 justify-center">
            <Link href="/visit"
              className="btn-primary px-10 py-4 text-[15px] tracking-wider rounded-full">
              방문예약
            </Link>
            <Link href="/contact"
              className="btn-outline px-10 py-4 text-[15px] tracking-wider rounded-full">
              분양문의
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const slide = displaySlides[current];

  return (
    <section
      className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {slide.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={slide.image_url}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
          )}
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Text overlay - right side */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="max-w-7xl mx-auto w-full px-8 md:px-12">
          <div className="md:ml-auto md:max-w-[50%] lg:max-w-[45%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {slide.subtitle_en && (
                  <p className="text-[13px] md:text-[15px] tracking-wide mb-4 text-white/70"
                    style={{ fontFamily: 'var(--font-accent)' }}>
                    {slide.subtitle_en}
                  </p>
                )}
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.2] text-white mb-4">
                  {slide.title}
                </h2>
                {slide.subtitle && (
                  <p className="text-[14px] md:text-[16px] leading-relaxed text-white/70 max-w-md">
                    {slide.subtitle}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300"
        aria-label="이전"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300"
        aria-label="다음"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {displaySlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group py-2"
            aria-label={`슬라이드 ${i + 1}`}
          >
            <div className={`rounded-full transition-all duration-500 ${
              i === current
                ? 'w-8 h-[3px] bg-white'
                : 'w-4 h-[3px] bg-white/40 group-hover:bg-white/60'
            }`} />
          </button>
        ))}
      </div>
    </section>
  );
}
