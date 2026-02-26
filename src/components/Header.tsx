'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, Globe, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { socialLinks } from '@/lib/socialLinks';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<'ko' | 'en'>('ko');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { ko: '홈', en: 'Home', href: '/main' },
    { ko: '공지사항', en: 'Notices', href: '/main/notices' },
    { ko: '일상', en: 'Daily', href: '/main/daily' },
    { ko: '분양', en: 'Adoption', href: '/main/adoption' },
    { ko: '사육용품', en: 'Supplies', href: '/main/products' },
    { ko: '케어가이드', en: 'Care Guide', href: '/care-guide' },
    { ko: '후기', en: 'Reviews', href: '/reviews' },
    { ko: '방문예약', en: 'Reservation', href: '/booking' },
    { ko: '수출(TEIU)', en: 'Export(TEIU)', href: '/export' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-2xl shadow-[0_1px_30px_rgba(0,0,0,0.06)]'
          : 'bg-white/70 backdrop-blur-xl'
      }`} style={{ borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent' }}>
        {/* Top bar */}
        <div className={`hidden md:block transition-all duration-500 overflow-hidden ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        }`}>
          <div className="border-b border-gray-100/60">
            <div className="max-w-7xl mx-auto px-8 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-6 text-[12px] text-gray-400">
                <span className="flex items-center gap-1.5 hover:text-gray-600 transition-colors">
                  <Phone size={11} />
                  010-8802-8361
                </span>
                <span className="hidden lg:inline text-gray-300 tracking-wide">서울 금천구 가산디지털1로 100 에이스골드타워 211호</span>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
                  className="flex items-center gap-1.5 text-[12px] px-4 py-1.5 rounded-full transition-all duration-300 hover:bg-gray-50 border border-gray-200/80 text-gray-500"
                >
                  <Globe size={11} />
                  {lang === 'ko' ? 'EN' : 'KO'}
                </button>
                <div className="flex items-center gap-1.5 ml-1">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-white hover:bg-gray-400 transition-colors duration-300 [&_svg]:w-3.5 [&_svg]:h-3.5"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className={`max-w-7xl mx-auto px-8 flex items-center justify-between transition-all duration-500 ${scrolled ? 'py-3' : 'py-4'}`}>
          <Link href="/main" className="flex items-center gap-3 group">
            <Image src="/logo-symbol.svg" alt="Tegu Island" width={42} height={42} className="transition-all duration-500 group-hover:scale-105" />
            <div className="hidden sm:block">
              <Image src="/logo-text.svg" alt="TEGU ISLAND" width={140} height={24} />
            </div>
            <span className="sm:hidden text-lg font-display font-bold tracking-tight text-gray-900">
              TEGU ISLAND
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.ko}
                href={item.href}
                className="en-tooltip relative px-4 py-2.5 text-[14px] rounded-lg hover:bg-gray-50/80 transition-all duration-300 group text-gray-500"
                data-en={item.en}
              >
                <span className="group-hover:text-gray-900 transition-colors duration-300">
                  {lang === 'ko' ? item.ko : item.en}
                </span>
                <span className="absolute bottom-1 left-4 right-4 h-[2px] scale-x-0 group-hover:scale-x-100 rounded-full transition-transform duration-300 origin-left bg-brand" />
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all duration-300"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-white/[0.98] backdrop-blur-xl flex flex-col"
          >
            <div className="px-8 py-5 flex items-center justify-between border-b border-gray-100/60">
              <div className="flex items-center gap-3">
                <Image src="/logo-symbol.svg" alt="Tegu Island" width={38} height={38} />
                <Image src="/logo-text.svg" alt="TEGU ISLAND" width={130} height={22} />
              </div>
              <button onClick={() => setMenuOpen(false)} className="p-2.5 rounded-xl text-gray-400 hover:bg-gray-50 transition-all">
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col px-8 mt-6 flex-1 overflow-y-auto">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.ko}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-5 group border-b border-gray-50"
                  >
                    <div>
                      <span className="text-[17px] text-gray-700 group-hover:text-gray-900 transition-colors font-medium">{item.ko}</span>
                      <p className="text-[12px] mt-0.5 text-gray-300" style={{ fontFamily: 'var(--font-accent)' }}>{item.en}</p>
                    </div>
                    <ChevronRight size={18} className="text-gray-200 group-hover:text-gray-400 transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="px-8 pb-10 pt-6 space-y-4 border-t border-gray-100"
            >
              <a href="tel:010-8802-8361" className="flex items-center gap-2.5 text-[15px] text-gray-400">
                <Phone size={15} /> 010-8802-8361
              </a>
              <button onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
                className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-gray-200 hover:bg-gray-50 text-[14px] text-gray-400 transition-all">
                <Globe size={15} /> {lang === 'ko' ? 'Switch to English' : '한국어로 전환'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
