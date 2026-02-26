import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Clock, Users, AlertCircle } from 'lucide-react';

export default function BookingPage() {

  const inputClass = "w-full px-5 py-4 rounded-2xl bg-white text-sm text-gray-700 placeholder-gray-300 border border-gray-200 focus:border-brand/40 focus:ring-2 focus:ring-brand/10 focus:outline-none transition-all duration-300";

  return (
    <>
      <Header />
      <main className="min-h-screen pt-36 md:pt-40 pb-28 md:pb-32 px-8 relative">
        {/* 준비중 오버레이 */}
        <div className="absolute inset-0 z-20 flex items-start justify-center pt-[30vh] pointer-events-none">
          <div className="text-center pointer-events-auto">
            <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-white shadow-xl border border-gray-100">
              <AlertCircle size={36} className="text-brand" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3">준비중입니다</h2>
            <p className="text-base text-gray-500 mb-1">생태 전시 관람 예약 서비스를 준비하고 있습니다.</p>
            <p className="text-sm text-gray-400">빠른 시일 내에 오픈 예정이니 조금만 기다려주세요.</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto blur-[2px] opacity-40 select-none pointer-events-none">
          {/* Page Header */}
          <div className="text-center mb-20 md:mb-24">
            <p className="text-[12px] md:text-[13px] tracking-[0.3em] uppercase mb-3 text-black/40"
              style={{ fontFamily: 'var(--font-accent)' }}>Ecological Exhibition Reservation</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 tracking-tight">
              생태 전시 관람 예약
            </h1>
            <div className="flex items-center justify-center gap-4 mt-5">
              <div className="h-px w-14 md:w-20 bg-gradient-to-r from-transparent to-brand/20" />
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-brand/25" />
                <div className="w-2 h-2 rounded-full bg-brand" />
                <div className="w-1.5 h-1.5 rounded-full bg-brand/25" />
              </div>
              <div className="h-px w-14 md:w-20 bg-gradient-to-l from-transparent to-brand/20" />
            </div>
            <p className="text-base mt-5 text-black/45">
              테구의 자연을 관찰하는 생태 전시 공간입니다. 터치가 아닌 관찰을 통해<br />
              테구의 본래 모습을 경험하세요. 생태 전시 관람, 교육 프로그램, 단체/기관 방문을 예약할 수 있습니다.
            </p>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
            {[
              { icon: <Calendar size={20} />, label: '운영시간', value: '화-일 10:00-17:00', sub: '월요일 휴무' },
              { icon: <Clock size={20} />, label: '관람 소요시간', value: '약 60-90분', sub: '관찰형 프로그램별 상이' },
              { icon: <Users size={20} />, label: '인원제한', value: '회차당 최대 10명', sub: '테구 스트레스 최소화 운영' },
            ].map((info, i) => (
              <div key={i} className="p-8 rounded-2xl lg:rounded-3xl bg-white text-center subtle-border">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 bg-brand/[0.06]">
                  <div className="text-brand/60">{info.icon}</div>
                </div>
                <p className="text-[13px] text-gray-400 mb-1">{info.label}</p>
                <p className="text-base font-semibold text-gray-700">{info.value}</p>
                <p className="text-[12px] text-gray-400 mt-1">{info.sub}</p>
              </div>
            ))}
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-[13px] text-gray-500 mb-2 block font-medium">이름 *</label>
                <input type="text" disabled className={inputClass} placeholder="홍길동" />
              </div>
              <div>
                <label className="text-[13px] text-gray-500 mb-2 block font-medium">연락처 *</label>
                <input type="tel" disabled className={inputClass} placeholder="010-0000-0000" />
              </div>
            </div>
            <div>
              <label className="text-[13px] text-gray-500 mb-2 block font-medium">이메일</label>
              <input type="email" disabled className={inputClass} placeholder="email@example.com" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-[13px] text-gray-500 mb-2 block font-medium">방문일 *</label>
                <input type="date" disabled className={inputClass} />
              </div>
              <div>
                <label className="text-[13px] text-gray-500 mb-2 block font-medium">시간 *</label>
                <input type="text" disabled className={inputClass} placeholder="선택해주세요" />
              </div>
            </div>
            <button type="button" disabled
              className="w-full py-4 rounded-2xl text-[15px] tracking-wider font-medium btn-primary opacity-50 cursor-not-allowed">
              예약 접수하기
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
