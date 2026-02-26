'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, Globe, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { socialLinks } from '@/lib/socialLinks';

interface NavChild {
  ko: string;
  en: string;
  href: string;
}

interface NavGroup {
  ko: string;
  en: string;
  href?: string;
  children?: NavChild[];
}

const navGroups: NavGroup[] = [
  { ko: '홈', en: 'Home', href: '/main' },
  {
    ko: '테구', en: 'Tegu',
    children: [
      { ko: '보유 개체', en: 'Our Assets', href: '/main/assets' },
      { ko: '분양', en: 'Adoption', href: '/main/adoption' },
    ],
  },
  {
    ko: '소식', en: 'News',
    children: [
      { ko: '공지사항', en: 'Notices', href: '/main/notices' },
      { ko: '일상', en: 'Daily', href: '/main/daily' },
      { ko: '후기', en: 'Reviews', href: '/reviews' },
    ],
  },
  {
    ko: '사육', en: 'Care',
    children: [
      { ko: '사육용품', en: 'Supplies', href: '/main/products' },
      { ko: '케어가이드', en: 'Care Guide', href: '/care-guide' },
    ],
  },
  {
    ko: '프로그램', en: 'Programs',
    children: [
      { ko: '교육 신청', en: 'Education', href: '/education' },
      { ko: '방문예약', en: 'Reservation', href: '/booking' },
    ],
  },
  { ko: '수출', en: 'Export', href: '/export' },
];

function DesktopDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const enter = () => { clearTimeout(timeout.current); setOpen(true); };
  const leave = () => { timeout.current = setTimeout(() => setOpen(false), 150); };

  if (!group.children) {
    return (
      <Link href={group.href!}
        className="relative px-4 py-2 rounded-lg hover:bg-gray-50/80 transition-all duration-300 group text-center">
        <span className="block text-[13px] font-medium text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
          {group.ko}
        </span>
        <span className="block text-[10px] tracking-[0.08em] text-gray-300 group-hover:text-brand/60 transition-colors duration-300"
          style={{ fontFamily: 'var(--font-accent)' }}>
          {group.en}
        </span>
        <span className="absolute bottom-0.5 left-4 right-4 h-[2px] scale-x-0 group-hover:scale-x-100 rounded-full transition-transform duration-300 origin-left bg-brand" />
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        className={`flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-300 ${open ? 'bg-gray-50/80' : 'hover:bg-gray-50/80'}`}>
        <span className="flex items-center gap-1">
          <span className={`text-[13px] font-medium transition-colors duration-300 ${open ? 'text-gray-900' : 'text-gray-600'}`}>
            {group.ko}
          </span>
          <ChevronDown size={12} className={`text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </span>
        <span className={`text-[10px] tracking-[0.08em] transition-colors duration-300 ${open ? 'text-brand/60' : 'text-gray-300'}`}
          style={{ fontFamily: 'var(--font-accent)' }}>
          {group.en}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-1 min-w-[200px] bg-white rounded-xl border border-gray-100 shadow-xl shadow-black/[0.06] py-2 z-50"
          >
            {group.children.map((child) => (
              <Link key={child.ko} href={child.href}
                className="flex items-center justify-between px-5 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50/80 transition-all duration-200 group/item">
                <span className="text-[13px]">{child.ko}</span>
                <span className="text-[11px] text-gray-400 group-hover/item:text-brand/60 transition-colors"
                  style={{ fontFamily: 'var(--font-accent)' }}>
                  {child.en}
                </span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            {navGroups.map((group) => (
              <DesktopDropdown key={group.ko} group={group} />
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

            <nav className="flex flex-col px-8 mt-4 flex-1 overflow-y-auto">
              {navGroups.map((group, gi) => (
                <motion.div
                  key={group.ko}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: gi * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  {group.children ? (
                    <div className="border-b border-gray-50">
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === group.ko ? null : group.ko)}
                        className="w-full flex items-center justify-between py-5"
                      >
                        <div>
                          <span className="text-[17px] text-gray-700 font-medium">{group.ko}</span>
                          <p className="text-[12px] mt-0.5 text-gray-300" style={{ fontFamily: 'var(--font-accent)' }}>{group.en}</p>
                        </div>
                        <ChevronDown size={18} className={`text-gray-300 transition-transform duration-300 ${mobileExpanded === group.ko ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === group.ko && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pb-4 space-y-0.5">
                              {group.children.map((child) => (
                                <Link
                                  key={child.ko}
                                  href={child.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors group"
                                >
                                  <div>
                                    <span className="text-[15px] text-gray-600 group-hover:text-gray-900 transition-colors">{child.ko}</span>
                                    <p className="text-[11px] mt-0.5 text-gray-300" style={{ fontFamily: 'var(--font-accent)' }}>{child.en}</p>
                                  </div>
                                  <ChevronRight size={14} className="text-gray-200 group-hover:text-gray-400 transition-colors" />
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={group.href!}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-5 group border-b border-gray-50"
                    >
                      <div>
                        <span className="text-[17px] text-gray-700 group-hover:text-gray-900 transition-colors font-medium">{group.ko}</span>
                        <p className="text-[12px] mt-0.5 text-gray-300" style={{ fontFamily: 'var(--font-accent)' }}>{group.en}</p>
                      </div>
                      <ChevronRight size={18} className="text-gray-200 group-hover:text-gray-400 transition-colors" />
                    </Link>
                  )}
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
