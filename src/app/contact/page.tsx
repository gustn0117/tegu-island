'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import KakaoButton from '@/components/KakaoButton';
import { CheckCircle, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', species: '', experience: '', environment: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  const inputClass = "w-full px-5 py-4 rounded-2xl bg-white text-sm text-gray-800/80 placeholder-gray-400/35 focus:outline-none transition-all duration-300 border border-gray-200 focus:border-brand/40 focus:ring-2 focus:ring-brand/10";

  return (
    <>
      <Header />
      <main className="min-h-screen pt-36 md:pt-40 pb-28 md:pb-32 px-8">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-20 md:mb-24">
            <p className="text-[12px] md:text-[13px] tracking-[0.3em] uppercase mb-3 text-gray-500/50"
              style={{ fontFamily: 'var(--font-accent)' }}>Ethical Adoption Consultation</p>
            <h1 className="text-4xl md:text-5xl font-display text-gray-900 font-bold tracking-tight">분양 상담</h1>
            <div className="flex items-center justify-center gap-4 mt-5">
              <div className="h-px w-14 md:w-20 bg-gradient-to-r from-transparent to-brand/20" />
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-brand/25" />
                <div className="w-2 h-2 rounded-full bg-brand" />
                <div className="w-1.5 h-1.5 rounded-full bg-brand/25" />
              </div>
              <div className="h-px w-14 md:w-20 bg-gradient-to-l from-transparent to-brand/20" />
            </div>
            <p className="text-base mt-5 text-gray-500/50">
              우리는 단순 판매가 아니라, 가족이 될 수 있는 인연을 이어주는 곳입니다.<br />
              모든 분양에는 건강 인증서, 성장 기록, 혈통 정보 제공 및 사전 케어 교육이 포함됩니다.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-24 rounded-2xl lg:rounded-3xl bg-white subtle-border">
              <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center bg-green-500/5">
                <CheckCircle size={32} className="text-green-500/60" />
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900">분양 상담 접수 완료</h3>
              <p className="text-sm mt-3 text-gray-500/50">건강 인증, 성장 기록, 케어 교육 일정과 함께 빠른 시일 내에 연락드리겠습니다.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">이름 *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                    className={inputClass} />
                </div>
                <div>
                  <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">연락처 *</label>
                  <input type="tel" required value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
                    className={inputClass} />
                </div>
              </div>
              <div>
                <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">관심 종 *</label>
                <select required value={form.species} onChange={(e) => setForm({...form, species: e.target.value})}
                  className={inputClass}>
                  <option value="">선택해주세요</option>
                  <option value="bw">아르헨티나 블랙&화이트 테구</option>
                  <option value="red">아르헨티나 레드 테구</option>
                  <option value="blue">블루 테구</option>
                  <option value="golden">골든 테구</option>
                  <option value="other">기타 / 상담 희망</option>
                </select>
              </div>
              <div>
                <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">파충류 사육 경험</label>
                <select value={form.experience} onChange={(e) => setForm({...form, experience: e.target.value})}
                  className={inputClass}>
                  <option value="">선택</option>
                  <option value="none">없음 (처음)</option>
                  <option value="beginner">1년 미만</option>
                  <option value="intermediate">1-3년</option>
                  <option value="advanced">3년 이상</option>
                </select>
              </div>
              <div>
                <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">현재 사육 환경 (생태형 인클로저 사이즈 등)</label>
                <textarea value={form.environment} onChange={(e) => setForm({...form, environment: e.target.value})} rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="준비 중인 사육 환경을 알려주세요 (자연 서식지 재현 여부, 인클로저 사이즈 등)" />
              </div>
              <div>
                <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">추가 문의사항</label>
                <textarea value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} rows={3}
                  className={`${inputClass} resize-none`} />
              </div>

              <div className="flex items-start gap-3 p-6 rounded-2xl bg-amber-50/40 border border-amber-200/15">
                <MessageCircle size={14} className="text-amber-500/50 mt-0.5 shrink-0" />
                <p className="text-[13px] text-amber-800/50 leading-relaxed">
                  테구아일랜드의 분양은 가족을 연결하는 과정입니다. 카카오톡 상담 → 건강 인증서·성장 기록·혈통 정보 확인 → 사전 케어 교육 이수 → 사육 환경 확인 → 계좌이체 방식으로 진행됩니다. 빠른 상담을 원하시면 카카오톡 문의를 이용해 주세요.
                </p>
              </div>

              <button type="submit"
                className="w-full py-4 rounded-2xl text-[15px] tracking-wider font-medium btn-primary transition-all duration-300">
                분양 상담 신청하기
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
