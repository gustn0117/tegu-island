import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { supabase } from '@/lib/supabase';
import type { TeguSpecies } from '@/lib/types';
import { FileCheck, Truck, Mail, Shield, Globe, ArrowRight } from 'lucide-react';

export const revalidate = 60;

export default async function ExportPage() {
  const { data: species } = await supabase
    .from('tegu_species')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  const speciesList = (species as TeguSpecies[]) || [];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-36 md:pt-40 pb-28 md:pb-32 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-20 md:mb-24">
            <p className="text-[12px] md:text-[13px] tracking-[0.3em] uppercase mb-3 text-gray-400/50 font-accent" style={{ fontFamily: 'var(--font-accent)' }}>
              International Export Division
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-gray-900 font-bold tracking-tight">
              TEIU KOREA
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
            <p className="text-base mt-5 max-w-lg mx-auto text-gray-500/50" style={{ fontFamily: 'var(--font-accent)' }}>
              Asia&apos;s Premier Tegu Export Brand — Asia&apos;s only specialized tegu breeding facility offering professionally line-bred tegus with verified bloodline records, CITES-compliant documentation, and veterinary health certification for worldwide delivery.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20 md:mb-24">
            {[
              { icon: <FileCheck size={22} />, title: 'CITES Compliant', desc: 'Full CITES permits and legal export documentation — the only specialized tegu export operation in Asia' },
              { icon: <Shield size={22} />, title: 'Health Certified', desc: 'Complete veterinary health certification with verified bloodline records, growth data, and breeding lineage documentation' },
              { icon: <Truck size={22} />, title: 'Safe Shipping', desc: 'Temperature-controlled live animal logistics with ethical handling protocols prioritizing animal welfare' },
            ].map((f, i) => (
              <div key={i} className="p-8 md:p-10 rounded-2xl lg:rounded-3xl bg-white text-center subtle-border card-hover">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 bg-brand/[0.08]">
                  <div className="text-brand/55">{f.icon}</div>
                </div>
                <h3 className="text-[15px] font-semibold text-gray-800/70 mb-1.5" style={{ fontFamily: 'var(--font-accent)' }}>{f.title}</h3>
                <p className="text-[13px] leading-relaxed text-gray-500/45">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Available Species */}
          <div className="rounded-2xl lg:rounded-3xl bg-white p-10 md:p-12 mb-10 subtle-border">
            <p className="text-[12px] md:text-[13px] tracking-[0.15em] uppercase mb-1.5 text-gray-400/45" style={{ fontFamily: 'var(--font-accent)' }}>Available Species</p>
            <h2 className="text-xl font-display font-bold text-gray-900 mb-8">수출 가능 종</h2>
            {speciesList.length === 0 ? (
              <div className="py-10 text-center rounded-2xl" style={{ border: '1px dashed rgba(120,120,120,0.12)', background: 'rgba(120,120,120,0.015)' }}>
                <Globe size={24} className="mx-auto mb-2 text-gray-300/25" />
                <p className="text-sm text-gray-500/40">등록된 종 정보가 없습니다</p>
              </div>
            ) : (
              <div className="space-y-0">
                {speciesList.map((sp) => (
                  <div key={sp.id} className="flex items-center justify-between py-4 hover:bg-gray-50/30 -mx-2 px-2 rounded-lg transition-all duration-300 border-b border-gray-500/[0.06]">
                    <div>
                      <p className="text-[15px] text-gray-800/70 font-medium" style={{ fontFamily: 'var(--font-accent)' }}>{sp.name_en}</p>
                      <p className="text-[13px] italic text-gray-400/40 mt-0.5">{sp.scientific}</p>
                    </div>
                    <span className={`text-[12px] px-3.5 py-1.5 rounded-lg font-medium ${
                      sp.status_en === 'Available' ? 'bg-green-50 text-green-700/70' :
                      sp.status_en === 'Coming Soon' ? 'bg-sky-50 text-sky-700/70' :
                      'bg-amber-50 text-amber-700/70'
                    }`}>{sp.status_en}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Process */}
          <div className="rounded-2xl lg:rounded-3xl bg-white p-10 md:p-12 mb-10 subtle-border">
            <p className="text-[12px] md:text-[13px] tracking-[0.15em] uppercase mb-1.5 text-gray-400/45" style={{ fontFamily: 'var(--font-accent)' }}>Export Process</p>
            <h2 className="text-xl font-display font-bold text-gray-900 mb-8">수출 절차</h2>
            <div className="space-y-6">
              {[
                { step: '01', title: 'Inquiry', desc: 'Contact us via email or KakaoTalk with your requirements. As Asia\'s only specialized tegu export facility, we offer expert consultation on species and bloodline selection.' },
                { step: '02', title: 'Quotation & Lineage', desc: 'Detailed quotation including animal pricing, professional line breeding lineage records, shipping, and CITES documentation costs.' },
                { step: '03', title: 'CITES Documentation', desc: 'We handle all CITES permits and export documentation — fully compliant with international wildlife trade regulations.' },
                { step: '04', title: 'Health Certification', desc: 'Comprehensive veterinary examination with full health certification, growth records, and bloodline verification documents.' },
                { step: '05', title: 'Ethical Shipping', desc: 'Temperature-controlled live animal shipment via approved carriers with stress-minimizing protocols and animal welfare priority.' },
                { step: '06', title: 'After-care Support', desc: 'Post-delivery ecological care guidance, growth monitoring support, and ongoing consultation from our professional breeding team.' },
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-display font-bold text-sm transition-all duration-300 bg-brand/[0.07] text-brand/50">
                    {s.step}
                  </div>
                  <div className="pt-1">
                    <p className="text-[15px] font-semibold text-gray-800/70" style={{ fontFamily: 'var(--font-accent)' }}>{s.title}</p>
                    <p className="text-[14px] mt-1 leading-relaxed text-gray-500/45">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center p-14 rounded-2xl lg:rounded-3xl bg-white subtle-border relative overflow-hidden">
            <div className="absolute inset-0 grain-overlay" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center bg-brand/[0.08]">
                <Mail size={24} className="text-brand/50" />
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-accent)' }}>
                Get in Touch
              </h3>
              <p className="text-base mb-10 text-gray-500/50">
                For export inquiries, bloodline consultations, CITES documentation, and professional breeding partnerships
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://pf.kakao.com/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-medium transition-all duration-300 hover:shadow-[0_4px_16px_rgba(254,229,0,0.2)] bg-[#FEE500] text-[#3C1E1E]">
                  KakaoTalk Inquiry
                </a>
                <a href="mailto:teguisland@example.com"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-sm btn-outline group transition-all duration-300">
                  <Mail size={15} />
                  Email Us
                  <ArrowRight size={13} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                </a>
              </div>
              <p className="text-[12px] mt-10 text-gray-400/40">
                TEGU ISLAND · Oh Junhyuk · Seoul, South Korea · +82-10-8802-8361
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
