'use client';

import { useState, useMemo, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, GraduationCap, ArrowRight, Calendar, ChevronLeft, ChevronRight, TreePine, Home, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const PROGRAM_TYPES = [
  {
    value: 'indoor',
    label: '실내 프로그램',
    labelEn: 'Indoor Program',
    desc: '실내 교육 공간에서 진행되는 프로그램입니다.\n생태 관찰, 브리딩 과학, 사육 이론 등을 학습합니다.',
    icon: <Home size={28} />,
  },
  {
    value: 'outdoor',
    label: '실외 프로그램',
    labelEn: 'Outdoor Program',
    desc: '야외 생태 환경에서 진행되는 체험형 프로그램입니다.\n자연 서식지 탐구, 생태 보호 활동을 체험합니다.',
    icon: <TreePine size={28} />,
  },
];

const ORG_TYPES = [
  { value: 'school', label: '학교 (초·중·고)', desc: '초등학교, 중학교, 고등학교' },
  { value: 'university', label: '대학교', desc: '대학교, 대학원' },
  { value: 'government', label: '관공서 / 공공기관', desc: '지자체, 공공기관, 연구소' },
  { value: 'other', label: '기타', desc: '동물원, 사설학원, 기업 등' },
];

const PARTICIPANT_OPTIONS = [
  { value: '10', label: '10명 이하' },
  { value: '20', label: '11 ~ 20명' },
  { value: '30', label: '21 ~ 30명' },
  { value: '50', label: '31 ~ 50명' },
  { value: '100', label: '50명 이상' },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month - 1, 1).getDay();
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function SectionHeader({ num, title, desc, delay = 0 }: { num: string; title: string; desc: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="mb-8"
    >
      <p className="text-[12px] font-bold text-brand/40 tracking-widest mb-3"
        style={{ fontFamily: 'var(--font-accent)' }}>
        {num}
      </p>
      <h2 className="text-2xl md:text-[28px] font-display font-bold text-gray-900 leading-snug">
        {title}
      </h2>
      <p className="text-[14px] text-gray-400 mt-2 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function EducationPage() {
  const [form, setForm] = useState({
    program_type: '',
    org_name: '', org_type: '', org_type_custom: '',
    contact_name: '', phone: '', email: '',
    participants: '', preferred_date: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }, []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth() + 1);

  const goNextMonth = useCallback(() => {
    if (viewMonth === 12) { setViewYear(viewYear + 1); setViewMonth(1); }
    else setViewMonth(viewMonth + 1);
  }, [viewYear, viewMonth]);

  const goPrevMonth = useCallback(() => {
    const now = new Date();
    if (viewYear === now.getFullYear() && viewMonth <= now.getMonth() + 1) return;
    if (viewMonth === 1) { setViewYear(viewYear - 1); setViewMonth(12); }
    else setViewMonth(viewMonth - 1);
  }, [viewYear, viewMonth]);

  const canGoPrev = (() => {
    const now = new Date();
    return viewYear > now.getFullYear() || (viewYear === now.getFullYear() && viewMonth > now.getMonth() + 1);
  })();

  const inputClass = 'w-full px-5 py-4 rounded-2xl bg-white text-sm text-gray-800 placeholder-gray-300 focus:outline-none transition-all duration-300 border border-gray-200 focus:border-brand/40 focus:ring-2 focus:ring-brand/10';

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfWeek(viewYear, viewMonth);

    const blanks = Array.from({ length: firstDay }, () => null);
    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const date = new Date(viewYear, viewMonth - 1, day);
      const isPast = date < today;
      const isSunday = date.getDay() === 0;
      return { day, value: `${viewYear}-${String(viewMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`, isPast, isSunday };
    });

    return { blanks, days };
  }, [viewYear, viewMonth, today]);

  const orgTypeValid = form.org_type && (form.org_type !== 'other' || form.org_type_custom);
  const canSubmit = form.program_type && form.org_name && orgTypeValid && form.contact_name && form.phone;

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          org_type: form.org_type === 'other' ? form.org_type_custom : form.org_type,
        }),
      });
      if (res.ok) setSubmitted(true);
    } catch { /* ignore */ }
    setSubmitting(false);
  };

  const handleDateSelect = (dateValue: string) => {
    setForm({ ...form, preferred_date: form.preferred_date === dateValue ? '' : dateValue });
  };

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
            className="text-center mb-20 md:mb-24"
          >
            <p
              className="text-[12px] md:text-[13px] tracking-[0.3em] uppercase mb-3 text-gray-400"
              style={{ fontFamily: 'var(--font-accent)' }}
            >
              Education Program
            </p>
            <h1 className="text-4xl md:text-5xl font-display text-gray-900 font-bold tracking-tight">
              교육 프로그램 신청
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
              <h3 className="text-2xl font-display font-bold text-gray-900">교육 신청이 접수되었습니다</h3>
              <p className="text-sm mt-3 text-gray-500/50 max-w-sm mx-auto leading-relaxed">
                확인 후 담당자님께 빠른 시일 내에 연락드리겠습니다.
              </p>
            </motion.div>
          ) : (
            <div>
              {/* Program Type Selector */}
              <section className="pb-16 border-b border-gray-100">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <p className="text-[12px] font-bold text-brand/40 tracking-widest mb-3"
                    style={{ fontFamily: 'var(--font-accent)' }}>
                    PROGRAM
                  </p>
                  <h2 className="text-2xl md:text-[28px] font-display font-bold text-gray-900 leading-snug">
                    프로그램 선택
                  </h2>
                  <p className="text-[14px] text-gray-400 mt-2 leading-relaxed">원하시는 교육 프로그램 유형을 선택해주세요.</p>
                </motion.div>

                {/* Program cards */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="grid grid-cols-2 gap-4"
                >
                  {PROGRAM_TYPES.map((program) => (
                    <button
                      key={program.value}
                      type="button"
                      onClick={() => setForm({ ...form, program_type: program.value })}
                      className={`relative overflow-hidden rounded-2xl border text-left transition-all duration-300 p-5 md:p-6 ${
                        form.program_type === program.value
                          ? 'border-brand bg-brand/[0.02] shadow-md shadow-brand/10'
                          : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                        form.program_type === program.value
                          ? 'bg-brand text-white'
                          : 'bg-gray-50 text-gray-400'
                      }`}>
                        {program.icon}
                      </div>
                      <h3 className={`text-[15px] font-bold mb-1 transition-colors duration-300 ${
                        form.program_type === program.value ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {program.label}
                      </h3>
                      <p className="text-[11px] tracking-[0.1em] uppercase text-gray-300 mb-3"
                        style={{ fontFamily: 'var(--font-accent)' }}>
                        {program.labelEn}
                      </p>
                      <p className="text-[12px] text-gray-400 leading-relaxed whitespace-pre-line">
                        {program.desc}
                      </p>
                      {/* Selection indicator */}
                      <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                        form.program_type === program.value ? 'bg-brand' : 'border-2 border-gray-200'
                      }`}>
                        {form.program_type === program.value && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </motion.div>

                {/* Email notice */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="mt-6"
                >
                  <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-brand/[0.03] border border-brand/10">
                    <Mail size={16} className="text-brand/50 mt-0.5 shrink-0" />
                    <p className="text-[13px] text-gray-500 leading-relaxed">
                      세부 프로그램 내용은 기재해주신 이메일로 확인 후 발송드리겠습니다.
                    </p>
                  </div>
                </motion.div>
              </section>

              {/* Section 1: 기관 유형 */}
              <section className="py-16 border-b border-gray-100">
                <SectionHeader num="01" title="기관 유형" desc="어떤 기관에서 신청하시나요?" delay={0.1} />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                  className="space-y-3">
                  {ORG_TYPES.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setForm({ ...form, org_type: type.value, org_type_custom: '' })}
                      className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl border text-left transition-all duration-300 ${
                        form.org_type === type.value
                          ? 'border-brand bg-brand/[0.02] shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div>
                        <p className={`text-[15px] font-medium ${
                          form.org_type === type.value ? 'text-gray-900' : 'text-gray-700'
                        }`}>{type.label}</p>
                        <p className="text-[13px] text-gray-400 mt-0.5">{type.desc}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 ${
                        form.org_type === type.value
                          ? 'bg-brand'
                          : 'border-2 border-gray-200'
                      }`}>
                        {form.org_type === type.value && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                  {form.org_type === 'other' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                      className="pt-1">
                      <input type="text" value={form.org_type_custom}
                        onChange={(e) => setForm({ ...form, org_type_custom: e.target.value })}
                        placeholder="기관 유형을 직접 입력해주세요"
                        className={inputClass} />
                    </motion.div>
                  )}
                </motion.div>
              </section>

              {/* Section 2: 기관명 */}
              <section className="py-16 border-b border-gray-100">
                <SectionHeader num="02" title="기관명" desc="기관의 정확한 이름을 입력해주세요." delay={0.15} />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  <input type="text" value={form.org_name}
                    onChange={(e) => setForm({ ...form, org_name: e.target.value })}
                    placeholder="예: OO초등학교"
                    className={inputClass} />
                </motion.div>
              </section>

              {/* Section 3: 담당자 정보 */}
              <section className="py-16 border-b border-gray-100">
                <SectionHeader num="03" title="담당자 정보" desc="연락받으실 분의 정보를 입력해주세요." delay={0.2} />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                  className="space-y-4">
                  <input type="text" value={form.contact_name}
                    onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
                    placeholder="담당자 이름"
                    className={inputClass} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="tel" value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="연락처 (010-0000-0000)"
                      className={inputClass} />
                    <input type="email" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="이메일 (선택)"
                      className={inputClass} />
                  </div>
                </motion.div>
              </section>

              {/* Section 4: 참여 인원 */}
              <section className="py-16 border-b border-gray-100">
                <SectionHeader num="04" title="참여 인원" desc="예상 참여 인원수를 선택해주세요." delay={0.25} />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PARTICIPANT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm({ ...form, participants: opt.value })}
                      className={`px-5 py-4 rounded-2xl border text-[14px] text-center transition-all duration-300 ${
                        form.participants === opt.value
                          ? 'border-brand bg-brand/[0.02] text-gray-900 font-medium shadow-sm'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300 bg-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              </section>

              {/* Section 5: 희망 날짜 */}
              <section className="py-16 border-b border-gray-100">
                <SectionHeader num="05" title="희망 날짜" desc="교육을 원하시는 날짜를 선택해주세요. (선택)" delay={0.3} />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
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
                        className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 text-gray-400 hover:border-brand hover:text-brand transition-all"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                    {/* Weekday headers */}
                    <div className="grid grid-cols-7 mb-2">
                      {WEEKDAYS.map((w, i) => (
                        <div key={w} className={`text-center text-[11px] font-medium py-1 ${
                          i === 0 ? 'text-red-300' : 'text-gray-400'
                        }`}>
                          {w}
                        </div>
                      ))}
                    </div>
                    {/* Day cells */}
                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.blanks.map((_, i) => (
                        <div key={`blank-${i}`} />
                      ))}
                      {calendarDays.days.map((d) => {
                        const isSelected = form.preferred_date === d.value;
                        const isDisabled = d.isPast;
                        return (
                          <button
                            key={d.day}
                            type="button"
                            disabled={isDisabled}
                            onClick={() => handleDateSelect(d.value)}
                            className={`aspect-square rounded-xl flex items-center justify-center text-[13px] transition-all duration-200 ${
                              isSelected
                                ? 'bg-brand text-white font-bold shadow-md shadow-brand/25'
                                : isDisabled
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
                    {form.preferred_date && (
                      <p className="text-[13px] text-brand font-medium mt-4 text-center">
                        {form.preferred_date.replace(/-/g, '. ')} 선택됨
                      </p>
                    )}
                  </div>
                </motion.div>
              </section>

              {/* Section 6: 추가 요청사항 */}
              <section className="py-16">
                <SectionHeader num="06" title="추가 요청사항" desc="전달할 내용이 있다면 작성해주세요. (선택)" delay={0.35} />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                  <textarea value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4} placeholder="교육 관련 추가 요청사항을 자유롭게 작성해주세요."
                    className={`${inputClass} resize-none`} />
                </motion.div>
              </section>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

              {/* Info + Submit */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="pt-16 space-y-6"
              >
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100">
                  <GraduationCap size={18} className="text-gray-400 mt-0.5 shrink-0" />
                  <p className="text-[13px] text-gray-400 leading-relaxed">
                    생태 탐구, 브리딩 과학, 사육 표준, 생태 보호 등 다양한 주제의 교육 프로그램을 운영합니다.
                    교육 내용은 기관의 요구에 맞게 조정 가능합니다.
                  </p>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || submitting}
                  className="w-full py-5 rounded-2xl text-[15px] font-semibold btn-primary transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
                >
                  {submitting ? (
                    '신청 중...'
                  ) : (
                    <>교육 프로그램 신청하기 <ArrowRight size={16} /></>
                  )}
                </button>

                {!canSubmit && (
                  <p className="text-center text-[12px] text-gray-300">
                    프로그램 유형, 기관 유형, 기관명, 담당자 이름, 연락처는 필수 항목입니다.
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
