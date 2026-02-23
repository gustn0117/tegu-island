'use client';

import { MessageCircle } from 'lucide-react';

export default function KakaoButton() {
  return (
    <a
      href="https://pf.kakao.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-7 right-7 z-50 group"
      title="카카오톡 문의"
    >
      <div className="relative">
        <div className="absolute -inset-2 rounded-full animate-pulse-soft"
          style={{ background: 'rgba(254,229,0,0.15)' }} />
        <div className="absolute inset-0 w-[60px] h-[60px] rounded-full animate-pulse-soft"
          style={{ background: 'rgba(254,229,0,0.3)' }} />
        <div className="relative w-[60px] h-[60px] rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #FEE500, #FFEB3B)',
            boxShadow: '0 6px 24px rgba(254, 229, 0, 0.35), 0 2px 8px rgba(0,0,0,0.08)',
          }}>
          <MessageCircle size={24} color="#3C1E1E" strokeWidth={1.8} />
        </div>
      </div>
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-white text-[12px] text-gray-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-lg border border-gray-100">
        카카오톡 문의
      </div>
    </a>
  );
}
