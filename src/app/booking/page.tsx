'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import KakaoButton from '@/components/KakaoButton';
import { Calendar, Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';

export default function BookingPage() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', date: '', time: '', type: '개인',
    people: '1', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const timeSlots = ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
  const visitTypes = ['생태 전시 관람 (개인)', '생태 전시 관람 (가족 2-4인)', '교육 프로그램 (단체 5인 이상)', '학교/기관 교육 방문', '바이어 상담'];

  const inputClass = "w-full px-5 py-4 rounded-2xl bg-white text-sm text-gray-700 placeholder-gray-300 border border-gray-200 focus:border-brand/40 focus:ring-2 focus:ring-brand/10 focus:outline-none transition-all duration-300";

  return (
    <>
      <Header />
      <main className="min-h-screen pt-36 md:pt-40 pb-28 md:pb-32 px-8">
        <div className="max-w-3xl mx-auto">
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
              <div key={i} className="p-8 rounded-2xl lg:rounded-3xl bg-white text-center subtle-border card-hover">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 bg-brand/[0.06]">
                  <div className="text-brand/60">{info.icon}</div>
                </div>
                <p className="text-[13px] text-gray-400 mb-1">{info.label}</p>
                <p className="text-base font-semibold text-gray-700">{info.value}</p>
                <p className="text-[12px] text-gray-400 mt-1">{info.sub}</p>
              </div>
            ))}
          </div>

          {submitted ? (
            <div className="text-center py-24 rounded-2xl lg:rounded-3xl bg-white subtle-border">
              <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center bg-green-600/[0.06]">
                <CheckCircle size={32} className="text-green-500/60" />
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900">예약 접수 완료</h3>
              <p className="text-sm mt-3 text-black/45">
                확인 후 카카오톡 또는 연락처로 안내드리겠습니다.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[13px] text-gray-500 mb-2 block font-medium">이름 *</label>
                  <input type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass} placeholder="홍길동" />
                </div>
                <div>
                  <label className="text-[13px] text-gray-500 mb-2 block font-medium">연락처 *</label>
                  <input type="tel" required value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass} placeholder="010-0000-0000" />
                </div>
              </div>

              <div>
                <label className="text-[13px] text-gray-500 mb-2 block font-medium">이메일</label>
                <input type="email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass} placeholder="email@example.com" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[13px] text-gray-500 mb-2 block font-medium">방문일 *</label>
                  <input type="date" required value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className={inputClass} />
                </div>
                <div>
                  <label className="text-[13px] text-gray-500 mb-2 block font-medium">시간 *</label>
                  <select required value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className={inputClass}>
                    <option value="">선택</option>
                    {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[13px] text-gray-500 mb-2 block font-medium">관람/체험 유형 *</label>
                  <select required value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className={inputClass}>
                    {visitTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[13px] text-gray-500 mb-2 block font-medium">인원 *</label>
                  <input type="number" min="1" max="30" required value={form.people}
                    onChange={(e) => setForm({ ...form, people: e.target.value })}
                    className={inputClass} />
                </div>
              </div>

              <div>
                <label className="text-[13px] text-gray-500 mb-2 block font-medium">요청사항</label>
                <textarea value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder="관심 프로그램(생태 전시 관람, 교육 프로그램 등)이나 요청사항을 적어주세요" />
              </div>

              <div className="flex items-start gap-3 p-6 rounded-2xl bg-brand-50/40 border border-brand/[0.08]">
                <AlertCircle size={14} className="text-brand/40 mt-0.5 shrink-0" />
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  테구아일랜드는 관찰형 생태 전시 공간입니다. 테구가 중심이며, 사람은 관찰자입니다. 터치, 핸들링, 소음 유발 등 동물에게 스트레스를 주는 행위는 일절 금지됩니다. 예약 접수 후 확인 연락을 드립니다.
                </p>
              </div>

              <button type="submit"
                className="w-full py-4 rounded-2xl text-[15px] tracking-wider font-medium btn-primary transition-all duration-300">
                예약 접수하기
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
      <KakaoButton />
    </>
  );
}
