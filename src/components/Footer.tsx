'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Globe, ArrowUpRight } from 'lucide-react';
import { socialLinks } from '@/lib/socialLinks';

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
                className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-white hover:bg-gray-400 transition-colors duration-300 [&_svg]:w-[18px] [&_svg]:h-[18px]"
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
