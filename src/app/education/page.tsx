'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomSelect, { type SelectOption } from '@/components/CustomSelect';
import { Check, CheckCircle, ChevronDown, GraduationCap, ArrowRight, BookOpen, Users, CalendarDays, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const orgTypeOptions: SelectOption[] = [
  { value: 'school', label: '학교 (초·중·고)' },
  { value: 'university', label: '대학교' },
  { value: 'government', label: '관공서 / 공공기관' },
  { value: 'other', label: '기타' },
];

const STEPS = [
  { title: '기관 정보', titleEn: 'Organization', desc: '교육을 신청하는 기관 정보를 입력해주세요.', icon: <BookOpen size={16} /> },
  { title: '담당자 정보', titleEn: 'Contact Person', desc: '연락 담당자의 정보를 입력해주세요.', icon: <Users size={16} /> },
  { title: '교육 상세', titleEn: 'Program Details', desc: '교육 프로그램 관련 상세 내용을 입력해주세요.', icon: <CalendarDays size={16} /> },
  { title: '추가 요청사항', titleEn: 'Additional Notes', desc: '추가로 전달할 내용이 있다면 작성해주세요.', icon: <MessageSquare size={16} /> },
];

const PROGRAMS = [
  { title: '생태 탐구', desc: '테구의 자연 서식지와 생태를 직접 관찰' },
  { title: '브리딩 과학', desc: '전문 육종 원리와 유전학 기초' },
  { title: '사육 표준', desc: '올바른 사육 환경 조성법 실습' },
  { title: '생태 보호', desc: 'CITES와 야생동물 보전 교육' },
];

export default function EducationPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [form, setForm] = useState({
    org_name: '', org_type: '', contact_name: '',
    phone: '', email: '', participants: '',
    preferred_date: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const inputClass = 'w-full px-5 py-4 rounded-2xl bg-white text-sm text-gray-800/80 placeholder-gray-400/35 focus:outline-none transition-all duration-300 border border-gray-200 focus:border-brand/40 focus:ring-2 focus:ring-brand/10';

  const completeStep = (step: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(Array.from(prev));
      next.add(step);
      return next;
    });
    if (step < STEPS.length - 1) setActiveStep(step + 1);
  };

  const toggleStep = (step: number) => {
    setActiveStep(activeStep === step ? -1 : step);
  };

  const canSubmit = form.org_name && form.org_type && form.contact_name && form.phone;

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
    } catch { /* ignore */ }
    setSubmitting(false);
  };

  const completedCount = completedSteps.size;
  const progress = (completedCount / STEPS.length) * 100;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-36 md:pt-40 pb-28 md:pb-32 px-8">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16 md:mb-20"
          >
            <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-amber-100/60">
              <GraduationCap size={32} className="text-amber-700" />
            </div>
            <p
              className="text-[12px] md:text-[13px] tracking-[0.3em] uppercase mb-3 text-gray-400"
              style={{ fontFamily: 'var(--font-accent)' }}
            >
              Education Program Application
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
            <p className="text-base mt-5 text-gray-500 max-w-lg mx-auto leading-relaxed">
              학교, 관공서, 대학 등 기관을 위한 전문 교육 프로그램입니다.<br />
              아래 양식을 단계별로 작성해주세요.
            </p>
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
            <div className="space-y-5">
              {/* Program Preview Cards */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
              >
                {PROGRAMS.map((prog, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-white subtle-border text-center"
                  >
                    <p className="text-[13px] font-semibold text-gray-700 mb-1">{prog.title}</p>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{prog.desc}</p>
                  </div>
                ))}
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl bg-white p-5 subtle-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-semibold text-gray-500">
                    진행률
                  </span>
                  <span className="text-[12px] font-bold text-brand">
                    {completedCount} / {STEPS.length} 단계
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand to-brand-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>

              {/* Steps */}
              {STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                const isCompleted = completedSteps.has(idx);

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + idx * 0.05 }}
                    className={`rounded-2xl lg:rounded-3xl overflow-hidden transition-all duration-500 ${
                      isActive
                        ? 'bg-white shadow-xl shadow-brand/[0.04] border border-brand/15'
                        : isCompleted
                        ? 'bg-white subtle-border'
                        : 'bg-white border border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    {/* Step Header */}
                    <button
                      onClick={() => toggleStep(idx)}
                      className="w-full flex items-center gap-4 px-7 py-6 text-left group"
                    >
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                          isCompleted
                            ? 'bg-brand text-white shadow-lg shadow-brand/25'
                            : isActive
                            ? 'bg-brand/[0.08] text-brand'
                            : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'
                        }`}
                      >
                        {isCompleted ? <Check size={18} strokeWidth={2.5} /> : step.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5">
                          <h3 className={`text-[15px] font-display font-bold transition-colors ${
                            isActive ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {step.title}
                          </h3>
                          {isCompleted && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">
                              완료
                            </span>
                          )}
                        </div>
                        <p
                          className="text-[11px] text-gray-400 tracking-[0.1em]"
                          style={{ fontFamily: 'var(--font-accent)' }}
                        >
                          {step.titleEn}
                        </p>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`text-gray-300 transition-transform duration-500 shrink-0 ${
                          isActive ? 'rotate-180 text-brand' : ''
                        }`}
                      />
                    </button>

                    {/* Step Content */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1, transitionEnd: { overflow: 'visible' } }}
                          exit={{ overflow: 'hidden', height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="px-7 pb-8 pt-0">
                            <div className="h-px bg-gradient-to-r from-brand/10 via-brand/5 to-transparent mb-6" />
                            <p className="text-[13px] text-gray-400 mb-6 leading-relaxed">{step.desc}</p>

                            {/* Step 1: Organization */}
                            {idx === 0 && (
                              <div className="space-y-5">
                                <div>
                                  <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">기관명 *</label>
                                  <input type="text" required value={form.org_name}
                                    onChange={(e) => setForm({ ...form, org_name: e.target.value })}
                                    placeholder="예: OO초등학교" className={inputClass} />
                                </div>
                                <div>
                                  <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">기관 유형 *</label>
                                  <CustomSelect required options={orgTypeOptions} value={form.org_type}
                                    onChange={(v) => setForm({ ...form, org_type: v })} placeholder="선택해주세요" />
                                </div>
                                <button onClick={() => form.org_name && form.org_type && completeStep(0)}
                                  disabled={!form.org_name || !form.org_type}
                                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl text-[13px] font-semibold btn-primary disabled:opacity-40 disabled:cursor-not-allowed mt-3">
                                  다음 단계 <ArrowRight size={14} />
                                </button>
                              </div>
                            )}

                            {/* Step 2: Contact */}
                            {idx === 1 && (
                              <div className="space-y-5">
                                <div>
                                  <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">담당자 이름 *</label>
                                  <input type="text" required value={form.contact_name}
                                    onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
                                    className={inputClass} />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">연락처 *</label>
                                    <input type="tel" required value={form.phone}
                                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                      placeholder="010-0000-0000" className={inputClass} />
                                  </div>
                                  <div>
                                    <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">이메일</label>
                                    <input type="email" value={form.email}
                                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                                      placeholder="example@school.ac.kr" className={inputClass} />
                                  </div>
                                </div>
                                <button onClick={() => form.contact_name && form.phone && completeStep(1)}
                                  disabled={!form.contact_name || !form.phone}
                                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl text-[13px] font-semibold btn-primary disabled:opacity-40 disabled:cursor-not-allowed mt-3">
                                  다음 단계 <ArrowRight size={14} />
                                </button>
                              </div>
                            )}

                            {/* Step 3: Details */}
                            {idx === 2 && (
                              <div className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">참여 인원수</label>
                                    <input type="number" value={form.participants}
                                      onChange={(e) => setForm({ ...form, participants: e.target.value })}
                                      placeholder="예: 30" className={inputClass} />
                                  </div>
                                  <div>
                                    <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">희망 날짜</label>
                                    <input type="date" value={form.preferred_date}
                                      onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
                                      className={inputClass} />
                                  </div>
                                </div>
                                <button onClick={() => completeStep(2)}
                                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl text-[13px] font-semibold btn-primary mt-3">
                                  다음 단계 <ArrowRight size={14} />
                                </button>
                              </div>
                            )}

                            {/* Step 4: Message */}
                            {idx === 3 && (
                              <div className="space-y-5">
                                <div>
                                  <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">추가 요청사항</label>
                                  <textarea value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    rows={4} placeholder="교육 관련 추가 요청 사항이 있으시면 작성해주세요."
                                    className={`${inputClass} resize-none`} />
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}

              {/* Info Notice */}
              <div className="flex items-start gap-4 p-6 md:p-7 rounded-2xl bg-amber-50/40 border border-amber-200/15">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-amber-100/60">
                  <GraduationCap size={16} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-amber-800/60 mb-1">교육 프로그램 안내</p>
                  <p className="text-[13px] text-amber-800/40 leading-relaxed">
                    생태 탐구, 브리딩 과학, 사육 표준, 생태 보호 등 다양한 주제를 포함합니다.
                    교육 내용은 기관의 요구에 맞게 조정 가능합니다.
                  </p>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!canSubmit || submitting}
                className="w-full py-4.5 rounded-2xl text-[15px] tracking-wider font-semibold btn-primary transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
              >
                {submitting ? (
                  '신청 중...'
                ) : (
                  <>교육 프로그램 신청하기 <ArrowRight size={16} /></>
                )}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
