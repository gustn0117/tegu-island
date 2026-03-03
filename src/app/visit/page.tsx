'use client';

import { useState, useMemo, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, Calendar, Clock, Users, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const TIME_SLOTS = [
  '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30',
];

const VISITOR_OPTIONS = [
  { value: '1', label: '1명' },
  { value: '2', label: '2명' },
  { value: '3', label: '3명' },
  { value: '4', label: '4명' },
  { value: '5', label: '5명 이상' },
];

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month - 1, 1).getDay();
}

export default function VisitPage() {
  const [form, setForm] = useState({
    name: '', phone: '', visitors: '', date: '', time: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewYear, setViewMonth_year] = useState(today.getFullYear());
  const [viewMonth, setViewMonth_month] = useState(today.getMonth() + 1);

  const goNextMonth = useCallback(() => {
    if (viewMonth === 12) {
      setViewMonth_year(viewYear + 1);
      setViewMonth_month(1);
    } else {
      setViewMonth_month(viewMonth + 1);
    }
  }, [viewYear, viewMonth]);

  const goPrevMonth = useCallback(() => {
    const now = new Date();
    const currentY = now.getFullYear();
    const currentM = now.getMonth() + 1;
    if (viewYear === currentY && viewMonth <= currentM) return;
    if (viewMonth === 1) {
      setViewMonth_year(viewYear - 1);
      setViewMonth_month(12);
    } else {
      setViewMonth_month(viewMonth - 1);
    }
  }, [viewYear, viewMonth]);

  const canGoNext = true;
  const canGoPrev = (() => {
    const now = new Date();
    return viewYear > now.getFullYear() || (viewYear === now.getFullYear() && viewMonth > now.getMonth() + 1);
  })();

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfWeek(viewYear, viewMonth);

    const blanks = Array.from({ length: firstDay }, () => null);
    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const date = new Date(viewYear, viewMonth - 1, day);
      const isPast = date < today;
      const isMonday = date.getDay() === 1;
      const isSunday = date.getDay() === 0;
      return {
        day,
        value: `${viewYear}-${String(viewMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        isPast,
        isMonday,
        isSunday,
        isDisabled: isPast || isMonday,
      };
    });

    return { blanks, days };
  }, [viewYear, viewMonth, today]);

  const canSubmit = form.name && form.phone && form.date && form.time;

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
    } catch { /* ignore */ }
    setSubmitting(false);
  };

  const inputClass = 'w-full px-5 py-4 rounded-2xl bg-white text-sm text-gray-800 placeholder-gray-300 focus:outline-none transition-all duration-300 border border-gray-200 focus:border-brand/40 focus:ring-2 focus:ring-brand/10';

  return (
    <>
      <Header />
      <main className="min-h-screen pt-36 md:pt-40 pb-28 md:pb-32 px-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16 md:mb-20"
          >
            <p
              className="text-[12px] md:text-[13px] tracking-[0.3em] uppercase mb-3 text-gray-400"
              style={{ fontFamily: 'var(--font-accent)' }}
            >
              Visit Reservation
            </p>
            <h1 className="text-4xl md:text-5xl font-display text-gray-900 font-bold tracking-tight">
              방문예약
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
            <p className="text-base mt-5 text-gray-400">
              테구아일랜드 농장을 직접 방문하여 테구를 만나보세요.
            </p>
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14"
          >
            {[
              { icon: <Calendar size={20} />, label: '운영시간', value: '화-일 10:00-17:00', sub: '월요일 휴무' },
              { icon: <Clock size={20} />, label: '방문 소요시간', value: '약 30-60분', sub: '사전 예약 필수' },
              { icon: <Users size={20} />, label: '방문 인원', value: '1-5명', sub: '소규모 방문 환영' },
            ].map((info, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white text-center subtle-border">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 bg-brand/[0.06]">
                  <div className="text-brand/60">{info.icon}</div>
                </div>
                <p className="text-[13px] text-gray-400 mb-1">{info.label}</p>
                <p className="text-[15px] font-semibold text-gray-700">{info.value}</p>
                <p className="text-[12px] text-gray-400 mt-1">{info.sub}</p>
              </div>
            ))}
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center py-24 rounded-2xl lg:rounded-3xl bg-white subtle-border"
            >
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-green-500/5">
                <CheckCircle size={36} className="text-green-500/60" />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900">방문예약이 접수되었습니다</h3>
              <p className="text-sm mt-3 text-gray-500/50 max-w-sm mx-auto leading-relaxed">
                확인 후 연락드리겠습니다. 감사합니다.
              </p>
              <div className="mt-6 text-[14px] text-gray-400">
                <p>{form.date} · {form.time}</p>
                <p className="mt-1">{form.name} · {form.visitors || '1'}명</p>
              </div>
            </motion.div>
          ) : (
            <div>
              {/* Section 1: 날짜 선택 */}
              <section className="pb-14 border-b border-gray-100">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <div className="mb-8">
                    <p className="text-[12px] font-bold text-brand/40 tracking-widest mb-3" style={{ fontFamily: 'var(--font-accent)' }}>01</p>
                    <h2 className="text-2xl md:text-[28px] font-display font-bold text-gray-900 leading-snug">날짜 선택</h2>
                    <p className="text-[14px] text-gray-400 mt-2">방문하실 날짜를 선택해주세요. (월요일 휴무)</p>
                  </div>

                  <div className="p-5 md:p-6 rounded-2xl border border-gray-100 bg-white">
                    {/* Month navigation */}
                    <div className="flex items-center justify-between mb-5">
                      <button
                        onClick={goPrevMonth}
                        disabled={!canGoPrev}
                        className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 text-gray-400 hover:border-brand hover:text-brand transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-brand" />
                        <p className="text-[15px] font-semibold text-gray-700">
                          {viewYear}년 {viewMonth}월
                        </p>
                      </div>
                      <button
                        onClick={goNextMonth}
                        disabled={!canGoNext}
                        className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 text-gray-400 hover:border-brand hover:text-brand transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    {/* Weekday headers */}
                    <div className="grid grid-cols-7 mb-2">
                      {WEEKDAYS.map((w, i) => (
                        <div key={w} className={`text-center text-[11px] font-medium py-1.5 ${
                          i === 0 ? 'text-red-300' : i === 1 ? 'text-gray-300' : 'text-gray-400'
                        }`}>
                          {w}
                          {i === 1 && <span className="text-[9px] block text-gray-300">휴무</span>}
                        </div>
                      ))}
                    </div>

                    {/* Day cells */}
                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.blanks.map((_, i) => <div key={`blank-${i}`} />)}
                      {calendarDays.days.map((d) => {
                        const isSelected = form.date === d.value;
                        return (
                          <button
                            key={d.day}
                            type="button"
                            disabled={d.isDisabled}
                            onClick={() => setForm({ ...form, date: form.date === d.value ? '' : d.value })}
                            className={`aspect-square rounded-xl flex items-center justify-center text-[13px] transition-all duration-200 ${
                              isSelected
                                ? 'bg-brand text-white font-bold shadow-md shadow-brand/25'
                                : d.isDisabled
                                ? 'text-gray-200 cursor-not-allowed'
                                : d.isSunday
                                ? 'text-red-400 hover:bg-red-50'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {d.day}
                          </button>
                        );
                      })}
                    </div>

                    {form.date && (
                      <p className="text-[13px] text-brand font-medium mt-4 text-center">
                        {form.date.replace(/-/g, '. ')} 선택됨
                      </p>
                    )}
                  </div>
                </motion.div>
              </section>

              {/* Section 2: 시간 선택 */}
              <section className="py-14 border-b border-gray-100">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <div className="mb-8">
                    <p className="text-[12px] font-bold text-brand/40 tracking-widest mb-3" style={{ fontFamily: 'var(--font-accent)' }}>02</p>
                    <h2 className="text-2xl md:text-[28px] font-display font-bold text-gray-900 leading-snug">시간 선택</h2>
                    <p className="text-[14px] text-gray-400 mt-2">원하시는 방문 시간대를 선택해주세요.</p>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setForm({ ...form, time: form.time === slot ? '' : slot })}
                        className={`px-4 py-3.5 rounded-xl border text-[14px] text-center transition-all duration-300 ${
                          form.time === slot
                            ? 'border-brand bg-brand text-white font-medium shadow-lg shadow-brand/20'
                            : 'border-gray-200 text-gray-500 hover:border-gray-300 bg-white'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  {Number(TIME_SLOTS.indexOf(form.time)) <= 3 && form.time && (
                    <p className="text-[12px] text-gray-400 mt-3">오전 시간대를 선택하셨습니다.</p>
                  )}
                </motion.div>
              </section>

              {/* Section 3: 방문 인원 */}
              <section className="py-14 border-b border-gray-100">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                  <div className="mb-8">
                    <p className="text-[12px] font-bold text-brand/40 tracking-widest mb-3" style={{ fontFamily: 'var(--font-accent)' }}>03</p>
                    <h2 className="text-2xl md:text-[28px] font-display font-bold text-gray-900 leading-snug">방문 인원</h2>
                    <p className="text-[14px] text-gray-400 mt-2">방문 인원수를 선택해주세요. (선택)</p>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {VISITOR_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setForm({ ...form, visitors: form.visitors === opt.value ? '' : opt.value })}
                        className={`px-4 py-4 rounded-xl border text-[14px] text-center transition-all duration-300 ${
                          form.visitors === opt.value
                            ? 'border-brand bg-brand/[0.02] text-gray-900 font-medium shadow-sm'
                            : 'border-gray-200 text-gray-500 hover:border-gray-300 bg-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </section>

              {/* Section 4: 예약자 정보 */}
              <section className="py-14 border-b border-gray-100">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <div className="mb-8">
                    <p className="text-[12px] font-bold text-brand/40 tracking-widest mb-3" style={{ fontFamily: 'var(--font-accent)' }}>04</p>
                    <h2 className="text-2xl md:text-[28px] font-display font-bold text-gray-900 leading-snug">예약자 정보</h2>
                    <p className="text-[14px] text-gray-400 mt-2">예약자의 이름과 연락처를 입력해주세요.</p>
                  </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="이름 *"
                      className={inputClass}
                    />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="연락처 (010-0000-0000) *"
                      className={inputClass}
                    />
                  </div>
                </motion.div>
              </section>

              {/* Section 5: 추가 요청사항 */}
              <section className="py-14">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                  <div className="mb-8">
                    <p className="text-[12px] font-bold text-brand/40 tracking-widest mb-3" style={{ fontFamily: 'var(--font-accent)' }}>05</p>
                    <h2 className="text-2xl md:text-[28px] font-display font-bold text-gray-900 leading-snug">추가 요청사항</h2>
                    <p className="text-[14px] text-gray-400 mt-2">전달할 내용이 있다면 작성해주세요. (선택)</p>
                  </div>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    placeholder="방문 목적이나 추가 요청사항을 작성해주세요."
                    className={`${inputClass} resize-none`}
                  />
                </motion.div>
              </section>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

              {/* Summary + Submit */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="pt-14 space-y-6"
              >
                {/* Summary */}
                {(form.date || form.time) && (
                  <div className="p-5 rounded-2xl bg-brand/[0.03] border border-brand/10">
                    <p className="text-[12px] font-semibold text-brand/60 mb-3 tracking-wider uppercase">예약 요약</p>
                    <div className="flex flex-wrap gap-3 text-[14px] text-gray-600">
                      {form.date && (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-100">
                          <Calendar size={13} className="text-brand" />
                          {form.date.replace(/-/g, '. ')}
                        </span>
                      )}
                      {form.time && (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-100">
                          <Clock size={13} className="text-brand" />
                          {form.time}
                        </span>
                      )}
                      {form.visitors && (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-100">
                          <Users size={13} className="text-brand" />
                          {form.visitors}명
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || submitting}
                  className="w-full py-5 rounded-2xl text-[15px] font-semibold btn-primary transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
                >
                  {submitting ? (
                    '예약 접수 중...'
                  ) : (
                    <>방문예약 접수하기 <ArrowRight size={16} /></>
                  )}
                </button>

                {!canSubmit && (
                  <p className="text-center text-[12px] text-gray-300">
                    이름, 연락처, 날짜, 시간은 필수 항목입니다.
                  </p>
                )}
              </motion.section>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
