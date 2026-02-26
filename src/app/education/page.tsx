'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomSelect, { type SelectOption } from '@/components/CustomSelect';
import { Check, CheckCircle, ChevronDown, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const orgTypeOptions: SelectOption[] = [
  { value: 'school', label: '학교 (초·중·고)' },
  { value: 'university', label: '대학교' },
  { value: 'government', label: '관공서 / 공공기관' },
  { value: 'other', label: '기타' },
];

const STEPS = [
  { title: '기관 정보', titleEn: 'Organization', desc: '교육을 신청하는 기관 정보를 입력해주세요.' },
  { title: '담당자 정보', titleEn: 'Contact Person', desc: '연락 담당자의 정보를 입력해주세요.' },
  { title: '교육 상세', titleEn: 'Program Details', desc: '교육 프로그램 관련 상세 내용을 입력해주세요.' },
  { title: '추가 요청사항', titleEn: 'Additional Notes', desc: '추가로 전달할 내용이 있다면 작성해주세요.' },
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

  return (
    <>
      <Header />
      <main className="min-h-screen pt-36 md:pt-40 pb-28 md:pb-32 px-8">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-20 md:mb-24">
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
            <p className="text-base mt-5 text-gray-500">
              학교, 관공서, 대학 등 기관을 위한 전문 교육 프로그램입니다.<br />
              아래 양식을 작성하여 교육을 신청해주세요.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-24 rounded-2xl lg:rounded-3xl bg-white subtle-border">
              <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center bg-green-500/5">
                <CheckCircle size={32} className="text-green-500/60" />
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900">교육 신청이 접수되었습니다</h3>
              <p className="text-sm mt-3 text-gray-500/50">
                확인 후 담당자님께 빠른 시일 내에 연락드리겠습니다.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                const isCompleted = completedSteps.has(idx);

                return (
                  <div
                    key={idx}
                    className={`rounded-2xl overflow-hidden transition-all duration-300 border ${
                      isActive ? 'border-brand/20 shadow-lg shadow-brand/5' : 'border-gray-100'
                    } bg-white`}
                  >
                    {/* Step Header */}
                    <button
                      onClick={() => toggleStep(idx)}
                      className="w-full flex items-center gap-4 px-7 py-5 text-left"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-all duration-300 ${
                          isCompleted
                            ? 'bg-brand text-white'
                            : isActive
                            ? 'bg-brand/10 text-brand'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {isCompleted ? <Check size={16} /> : idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] font-display font-bold text-gray-900">
                          {step.title}
                        </h3>
                        <p
                          className="text-[11px] text-gray-400 tracking-wide"
                          style={{ fontFamily: 'var(--font-accent)' }}
                        >
                          {step.titleEn}
                        </p>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`text-gray-300 transition-transform duration-300 shrink-0 ${
                          isActive ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Step Content */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-7 pb-7 pt-1">
                            <p className="text-[13px] text-gray-400 mb-6">{step.desc}</p>

                            {/* Step 1: Organization */}
                            {idx === 0 && (
                              <div className="space-y-4">
                                <div>
                                  <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">
                                    기관명 *
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    value={form.org_name}
                                    onChange={(e) => setForm({ ...form, org_name: e.target.value })}
                                    placeholder="예: OO초등학교"
                                    className={inputClass}
                                  />
                                </div>
                                <div>
                                  <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">
                                    기관 유형 *
                                  </label>
                                  <CustomSelect
                                    required
                                    options={orgTypeOptions}
                                    value={form.org_type}
                                    onChange={(v) => setForm({ ...form, org_type: v })}
                                    placeholder="선택해주세요"
                                  />
                                </div>
                                <button
                                  onClick={() => form.org_name && form.org_type && completeStep(0)}
                                  disabled={!form.org_name || !form.org_type}
                                  className="mt-2 px-6 py-3 rounded-xl text-[13px] font-medium btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                  다음 단계
                                </button>
                              </div>
                            )}

                            {/* Step 2: Contact */}
                            {idx === 1 && (
                              <div className="space-y-4">
                                <div>
                                  <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">
                                    담당자 이름 *
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    value={form.contact_name}
                                    onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
                                    className={inputClass}
                                  />
                                </div>
                                <div>
                                  <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">
                                    연락처 *
                                  </label>
                                  <input
                                    type="tel"
                                    required
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    placeholder="010-0000-0000"
                                    className={inputClass}
                                  />
                                </div>
                                <div>
                                  <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">
                                    이메일
                                  </label>
                                  <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="example@school.ac.kr"
                                    className={inputClass}
                                  />
                                </div>
                                <button
                                  onClick={() => form.contact_name && form.phone && completeStep(1)}
                                  disabled={!form.contact_name || !form.phone}
                                  className="mt-2 px-6 py-3 rounded-xl text-[13px] font-medium btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                  다음 단계
                                </button>
                              </div>
                            )}

                            {/* Step 3: Details */}
                            {idx === 2 && (
                              <div className="space-y-4">
                                <div>
                                  <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">
                                    참여 인원수
                                  </label>
                                  <input
                                    type="number"
                                    value={form.participants}
                                    onChange={(e) => setForm({ ...form, participants: e.target.value })}
                                    placeholder="예: 30"
                                    className={inputClass}
                                  />
                                </div>
                                <div>
                                  <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">
                                    희망 날짜
                                  </label>
                                  <input
                                    type="date"
                                    value={form.preferred_date}
                                    onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
                                    className={inputClass}
                                  />
                                </div>
                                <button
                                  onClick={() => completeStep(2)}
                                  className="mt-2 px-6 py-3 rounded-xl text-[13px] font-medium btn-primary"
                                >
                                  다음 단계
                                </button>
                              </div>
                            )}

                            {/* Step 4: Message */}
                            {idx === 3 && (
                              <div className="space-y-4">
                                <div>
                                  <label className="text-[13px] text-gray-600/55 mb-2 block font-medium">
                                    추가 요청사항
                                  </label>
                                  <textarea
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    rows={4}
                                    placeholder="교육 관련 추가 요청 사항이 있으시면 작성해주세요."
                                    className={`${inputClass} resize-none`}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Info Notice */}
              <div className="flex items-start gap-3 p-6 rounded-2xl bg-amber-50/40 border border-amber-200/15">
                <GraduationCap size={14} className="text-amber-500/50 mt-0.5 shrink-0" />
                <p className="text-[13px] text-amber-800/50 leading-relaxed">
                  교육 프로그램은 테구의 생태, 브리딩, 사육 표준, 생태 보호 등을 포함합니다.
                  교육 내용은 기관의 요구에 맞게 조정 가능하며, 신청 후 상세 안내를 받으실 수 있습니다.
                </p>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!canSubmit || submitting}
                className="w-full py-4 rounded-2xl text-[15px] tracking-wider font-medium btn-primary transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? '신청 중...' : '교육 프로그램 신청하기'}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
