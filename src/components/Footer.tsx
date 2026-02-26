'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Globe, ArrowUpRight } from 'lucide-react';

const socialLinks = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/821088028361',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/teguisland',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    name: 'Band',
    href: 'https://band.us/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 16.4c-.463.635-1.075 1.131-1.788 1.45a5.362 5.362 0 01-2.243.48c-.74 0-1.46-.145-2.1-.422a5.053 5.053 0 01-1.683-1.18 8.27 8.27 0 01-.614-.738c-.86.53-1.87.834-2.933.834-.48 0-.95-.063-1.4-.186a3.89 3.89 0 01-1.228-.558 2.86 2.86 0 01-.866-.95A2.68 2.68 0 012.4 14.1c0-.57.152-1.077.455-1.52a2.92 2.92 0 011.2-.99 12.98 12.98 0 01-.193-2.268c0-1.105.2-2.15.598-3.136a8.14 8.14 0 011.64-2.596A7.82 7.82 0 018.64 1.86 7.35 7.35 0 0112 1.12c1.18 0 2.288.247 3.323.74a8.13 8.13 0 012.582 1.962 8.78 8.78 0 011.693 2.84c.415 1.063.623 2.18.623 3.348 0 1.59-.34 3.06-.972 4.37a9.36 9.36 0 01-1.68 2.02zm-1.15-2.52c.395-.88.618-1.82.668-2.82.05-.998-.07-1.934-.358-2.81a6.88 6.88 0 00-1.174-2.355 5.7 5.7 0 00-1.893-1.617A5.14 5.14 0 0012 3.72a5.14 5.14 0 00-1.66.278 5.7 5.7 0 00-1.894 1.117 6.88 6.88 0 00-1.427 2.015c-.38.8-.6 1.666-.66 2.6a7.26 7.26 0 00.31 2.56 1.67 1.67 0 01-.88.24c-.27 0-.48-.07-.63-.2a.65.65 0 01-.22-.51c0-.11.02-.22.06-.35.04-.12.06-.24.06-.34a.69.69 0 00-.24-.53.83.83 0 00-.58-.22c-.37 0-.66.14-.87.41-.2.27-.31.62-.31 1.04 0 .57.24 1.02.73 1.35.48.33 1.1.5 1.84.5.85 0 1.62-.23 2.29-.68.23.42.52.8.86 1.13.5.49 1.08.85 1.73 1.07.65.23 1.34.34 2.06.34.72 0 1.39-.13 2-.39.6-.26 1.11-.63 1.51-1.12z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@teguisland',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'KakaoTalk',
    href: 'https://pf.kakao.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M12 3c-5.523 0-10 3.582-10 8 0 2.858 1.89 5.37 4.735 6.79-.162.567-.582 2.04-.667 2.357-.103.393.144.388.302.283.125-.083 1.988-1.346 2.79-1.893A11.26 11.26 0 0012 19c5.523 0 10-3.582 10-8s-4.477-8-10-8z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-white relative">
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-8 pt-20 md:pt-28 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3.5 mb-7">
              <Image src="/logo-symbol.svg" alt="Tegu Island" width={46} height={46} />
              <div>
                <Image src="/logo-text.svg" alt="TEGU ISLAND" width={140} height={24} />
                <p className="text-[11px] tracking-[0.12em] mt-1.5 text-gray-400" style={{ fontFamily: 'var(--font-accent)' }}>테구아일랜드</p>
              </div>
            </div>
            <p className="text-[15px] leading-[1.75] text-gray-400">
              아시아 유일의 테구 전문<br />생태 전시 · 라인브리딩 · 교육 센터
            </p>
            <p className="text-[12px] mt-3 leading-relaxed text-gray-300" style={{ fontFamily: 'var(--font-accent)' }}>
              Ecological Exhibition · Line Breeding · Education
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[12px] font-semibold mb-7 tracking-[0.15em] uppercase text-gray-400">바로가기</h4>
            <nav className="flex flex-col gap-3.5">
              {[
                { ko: '공지사항', href: '/main/notices' },
                { ko: '일상', href: '/main/daily' },
                { ko: '분양', href: '/main/adoption' },
                { ko: '사육용품', href: '/main/products' },
                { ko: '케어가이드', href: '/care-guide' },
                { ko: '방문예약', href: '/booking' },
                { ko: '수출(TEIU KOREA)', href: '/export' },
                { ko: '후기', href: '/reviews' },
              ].map((item) => (
                <Link key={item.ko} href={item.href}
                  className="text-[14px] text-gray-400 hover:text-brand transition-colors duration-300 group flex items-center gap-1.5 w-fit">
                  {item.ko}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-60 transition-all -translate-x-1 group-hover:translate-x-0 -translate-y-0.5" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[12px] font-semibold mb-7 tracking-[0.15em] uppercase text-gray-400">연락처</h4>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3.5 text-[14px] text-gray-400">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gray-50 border border-gray-100/80">
                  <Phone size={15} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-gray-600">010-8802-8361</p>
                  <p className="text-[12px] mt-0.5 text-gray-300">오준혁 대표</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5 text-[14px] text-gray-400">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gray-50 border border-gray-100/80">
                  <MapPin size={15} className="text-gray-400" />
                </div>
                <p className="leading-[1.75]">서울특별시 금천구 가산디지털1로 100<br />에이스골드타워 211호</p>
              </div>
            </div>
          </div>

          {/* International */}
          <div>
            <h4 className="text-[12px] font-semibold mb-7 tracking-[0.15em] uppercase text-gray-400">International</h4>
            <p className="text-[15px] leading-[1.75] mb-6 text-gray-400" style={{ fontFamily: 'var(--font-accent)' }}>
              TEIU KOREA — Asia&apos;s Premier Tegu Export.<br />
              CITES certified worldwide shipping.
            </p>
            <Link href="/export"
              className="inline-flex items-center gap-2 text-[13px] px-6 py-3 rounded-xl btn-outline group">
              <Globe size={14} />
              Export Page
              <ArrowUpRight size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-white hover:bg-gray-400 transition-colors duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-100/80">
          <p className="text-[12px] text-gray-300">
            &copy; 2026 TEGU ISLAND (테구아일랜드). All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-[12px] text-gray-300">
            <Link href="/policy" className="hover:text-gray-500 transition-colors duration-300">이용약관</Link>
            <Link href="/policy" className="hover:text-gray-500 transition-colors duration-300">개인정보처리방침</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
