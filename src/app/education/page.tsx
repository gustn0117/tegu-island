'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, GraduationCap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

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

export default function EducationPage() {
  const [form, setForm] = useState({
    org_name: '', org_type: '', org_type_custom: '',
    contact_name: '', phone: '', email: '',
    participants: '', preferred_date: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const inputClass = 'w-full px-5 py-4 rounded-2xl bg-white text-sm text-gray-800 placeholder-gray-300 focus:outline-none transition-all duration-300 border border-gray-200 focus:border-brand/40 focus:ring-2 focus:ring-brand/10';

  const orgTypeValid = form.org_type && (form.org_type !== 'other' || form.org_type_custom);
  const canSubmit = form.org_name && orgTypeValid && form.contact_name && form.phone;

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
            <div className="space-y-16">

              {/* Section 1: 기관 유형 */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-2xl md:text-[28px] font-display font-bold text-gray-900 mb-2">
                  기관 유형.
                  <span className="font-normal text-gray-400 ml-1">어떤 기관에서 신청하시나요?</span>
                </h2>
                <div className="mt-8 space-y-3">
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
                        }`}>
                          {type.label}
                        </p>
                        <p className="text-[13px] text-gray-400 mt-0.5">{type.desc}</p>
                      </div>
                      {form.org_type === type.value && (
                        <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center shrink-0">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {form.org_type === 'other' && (
                  <div className="mt-4">
                    <input type="text" value={form.org_type_custom}
                      onChange={(e) => setForm({ ...form, org_type_custom: e.target.value })}
                      placeholder="기관 유형을 직접 입력해주세요"
                      className={inputClass} />
                  </div>
                )}
              </motion.section>

              {/* Section 2: 기관명 */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <h2 className="text-2xl md:text-[28px] font-display font-bold text-gray-900 mb-2">
                  기관명.
                  <span className="font-normal text-gray-400 ml-1">기관의 정확한 이름을 입력해주세요.</span>
                </h2>
                <div className="mt-8">
                  <input type="text" value={form.org_name}
                    onChange={(e) => setForm({ ...form, org_name: e.target.value })}
                    placeholder="예: OO초등학교"
                    className={inputClass} />
                </div>
              </motion.section>

              {/* Section 3: 담당자 정보 */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl md:text-[28px] font-display font-bold text-gray-900 mb-2">
                  담당자 정보.
                  <span className="font-normal text-gray-400 ml-1">연락받으실 분의 정보를 입력해주세요.</span>
                </h2>
                <div className="mt-8 space-y-4">
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
                </div>
              </motion.section>

              {/* Section 4: 참여 인원 */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <h2 className="text-2xl md:text-[28px] font-display font-bold text-gray-900 mb-2">
                  참여 인원.
                  <span className="font-normal text-gray-400 ml-1">예상 참여 인원수를 선택해주세요.</span>
                </h2>
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                </div>
              </motion.section>

              {/* Section 5: 희망 날짜 */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl md:text-[28px] font-display font-bold text-gray-900 mb-2">
                  희망 날짜.
                  <span className="font-normal text-gray-400 ml-1">교육을 원하시는 날짜가 있다면 선택해주세요.</span>
                </h2>
                <div className="mt-8">
                  <input type="date" value={form.preferred_date}
                    onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
                    className={inputClass} />
                </div>
              </motion.section>

              {/* Section 6: 추가 요청사항 */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <h2 className="text-2xl md:text-[28px] font-display font-bold text-gray-900 mb-2">
                  추가 요청사항.
                  <span className="font-normal text-gray-400 ml-1">전달할 내용이 있다면 작성해주세요.</span>
                </h2>
                <div className="mt-8">
                  <textarea value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4} placeholder="교육 관련 추가 요청사항을 자유롭게 작성해주세요."
                    className={`${inputClass} resize-none`} />
                </div>
              </motion.section>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

              {/* Info + Submit */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-6"
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
                    기관 유형, 기관명, 담당자 이름, 연락처는 필수 항목입니다.
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
