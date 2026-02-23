'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingPage() {
  const router = useRouter();
  const [entered, setEntered] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setEntered(true);
    setTimeout(() => router.push('/main'), 900);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden grain-overlay"
        style={{ background: '#ffffff' }}
        animate={entered ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {showContent && (
          <>
            {/* Decorative circles */}
            <motion.div
              className="absolute animate-spin-slow"
              style={{
                width: '65vmin',
                height: '65vmin',
                border: '1px solid rgba(33,84,51,0.08)',
                borderRadius: '50%',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute"
              style={{
                width: '45vmin',
                height: '45vmin',
                border: '1px dashed rgba(33,84,51,0.05)',
                borderRadius: '50%',
                animation: 'spin-slow 30s linear infinite reverse',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.3 }}
            />
            <motion.div
              className="absolute"
              style={{
                width: '80vmin',
                height: '80vmin',
                border: '1px solid rgba(33,84,51,0.03)',
                borderRadius: '50%',
                animation: 'spin-slow 50s linear infinite',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            />

            {/* Particles */}
            {[...Array(28)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 4 + 1.5,
                  height: Math.random() * 4 + 1.5,
                  background: `rgba(33,84,51,${Math.random() * 0.15 + 0.06})`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -(Math.random() * 50 + 20), 0],
                  x: [0, Math.random() * 15 - 7.5, 0],
                  opacity: [0.15, 0.6, 0.15],
                }}
                transition={{
                  duration: Math.random() * 6 + 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </>
        )}

        <div className="relative z-10 text-center px-6">
          {showContent && (
            <>
              {/* Logo symbol */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="mb-10"
              >
                <div className="w-40 h-40 md:w-48 md:h-48 mx-auto flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full animate-pulse-soft border border-brand/15" />
                  <div className="absolute inset-[-10px] rounded-full animate-pulse-soft border border-brand/8" style={{ animationDelay: '1s' }} />
                  <div className="absolute inset-[-20px] rounded-full animate-pulse-soft border border-brand/4" style={{ animationDelay: '2s' }} />
                  <Image src="/logo-symbol.svg" alt="Tegu Island" width={110} height={110} priority />
                </div>
              </motion.div>

              {/* Logo text */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image src="/logo-text.svg" alt="TEGU ISLAND" width={500} height={60} className="mx-auto w-[280px] md:w-[500px]" priority />
              </motion.div>

              {/* Korean subtitle */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="mt-7"
              >
                <div className="flex items-center justify-center gap-5">
                  <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent to-brand/20" />
                  <p className="text-base md:text-lg tracking-[0.4em] uppercase text-brand-800"
                    style={{ fontFamily: 'var(--font-accent)' }}>
                    테구아일랜드
                  </p>
                  <div className="h-px w-20 md:w-32 bg-gradient-to-l from-transparent to-brand/20" />
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="mt-10 mb-16"
              >
                <p className="text-lg md:text-xl max-w-xl mx-auto leading-relaxed text-gray-500">
                  생태형 전시 · 전문 라인브리딩 · 교육 센터
                </p>
                <p className="text-[13px] md:text-[14px] mt-4 tracking-[0.15em] uppercase text-gray-400"
                  style={{ fontFamily: 'var(--font-accent)' }}>
                  Ecological Exhibition · Line Breeding · Education Center
                </p>
              </motion.div>

              {/* Enter button */}
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <button
                  onClick={handleEnter}
                  className="group relative px-20 py-6 rounded-full transition-all duration-500 overflow-hidden border border-brand/25 hover:bg-brand hover:border-brand hover:shadow-[0_16px_48px_rgba(33,84,51,0.25)]"
                >
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 bg-brand" />
                  <span className="relative text-[15px] tracking-[0.3em] uppercase font-medium text-gray-800 group-hover:text-white transition-colors duration-500"
                    style={{ fontFamily: 'var(--font-accent)' }}>
                    Enter
                  </span>
                  <motion.div
                    className="absolute inset-0 rounded-full border border-brand/15"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </button>
              </motion.div>

              {/* Bottom keywords */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.4 }}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 text-center"
              >
                <div className="flex items-center gap-3 text-[11px] md:text-[12px] tracking-[0.25em] uppercase text-gray-400"
                  style={{ fontFamily: 'var(--font-accent)' }}>
                  <span>Exhibition</span>
                  <span className="w-1 h-1 rounded-full bg-brand/30" />
                  <span>Breeding</span>
                  <span className="w-1 h-1 rounded-full bg-brand/30" />
                  <span>Education</span>
                  <span className="w-1 h-1 rounded-full bg-brand/30" />
                  <span>Adoption</span>
                  <span className="w-1 h-1 rounded-full bg-brand/30" />
                  <span>Export</span>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
