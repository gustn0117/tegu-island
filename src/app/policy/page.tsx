import Header from '@/components/Header';
import Footer from '@/components/Footer';
import KakaoButton from '@/components/KakaoButton';
import { Shield, Heart, Leaf, AlertTriangle } from 'lucide-react';

export default function PolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-36 md:pt-40 pb-28 md:pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-20 md:mb-24">
            <p className="text-[12px] md:text-[13px] tracking-[0.3em] uppercase mb-3 text-gray-400"
              style={{ fontFamily: 'var(--font-accent)' }}>
              Policy & Philosophy
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 tracking-tight">
              정책 & 철학
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
          </div>

          <div className="space-y-10">
            {/* Core Philosophy */}
            <div className="rounded-2xl lg:rounded-3xl bg-white subtle-border p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center">
                  <Heart size={22} className="text-brand/60" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-gray-900">핵심 철학</h2>
                  <p className="text-[12px] md:text-[13px] tracking-widest uppercase text-gray-400/50" style={{ fontFamily: 'var(--font-accent)' }}>Core Philosophy</p>
                </div>
              </div>
              <div className="space-y-3 text-[15px] leading-relaxed text-gray-600/60">
                <p><strong className="text-gray-800">&ldquo;우리는 동물을 전시하는 곳이 아니라, 테구의 자연을 사람에게 보여주는 곳입니다.&rdquo;</strong></p>
                <p>테구아일랜드는 쥬라기 월드의 돔형 생태관처럼, 테구가 자연 그대로의 모습으로 살아가는 공간을 사람에게 보여주는 관찰형 생태 전시 공간입니다. 테구가 중심이며, 사람은 관찰자입니다.</p>
                <p><strong className="text-gray-800">&ldquo;우리는 단순 판매가 아니라, 가족이 될 수 있는 인연을 이어주는 곳입니다.&rdquo;</strong></p>
                <p>분양은 단순 거래가 아닌, 테구와 사람이 가족이 되는 과정입니다. 모든 분양자는 사전 케어 교육을 이수해야 하며, 건강 인증서·성장 기록·혈통 정보가 함께 제공됩니다.</p>
                <p><strong className="text-gray-800">&ldquo;우리는 아시아 유일의 전문 라인브리딩·생태 전시·교육 센터입니다.&rdquo;</strong></p>
                <p>테구아일랜드는 전문 라인브리딩을 통해 혈통의 품질을 유지하고, 생태 전시와 교육을 통해 테구와 사람의 올바른 관계를 제시합니다. 터치 기반이 아닌, 관찰 기반의 프로그램만을 운영합니다.</p>
              </div>
            </div>

            {/* Animal Welfare */}
            <div className="rounded-2xl lg:rounded-3xl bg-white subtle-border p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center">
                  <Leaf size={22} className="text-brand/60" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-gray-900">동물복지 정책</h2>
                  <p className="text-[12px] md:text-[13px] tracking-widest uppercase text-gray-400/50" style={{ fontFamily: 'var(--font-accent)' }}>Animal Welfare Policy</p>
                </div>
              </div>
              <ul className="space-y-2 text-[15px] text-gray-600/60">
                <li>• <strong className="text-gray-700">생태 보호 원칙:</strong> 모든 개체는 자연 서식지를 정밀하게 재현한 돔형 생태 환경에서 사육됩니다</li>
                <li>• <strong className="text-gray-700">관찰형 전시 철학:</strong> 관람객에 의한 터치, 핸들링, 소음 유발 행위를 일절 금지합니다. 테구가 중심이며, 사람은 관찰자입니다</li>
                <li>• <strong className="text-gray-700">스트레스 최소화:</strong> 스트레스 제로를 목표로, 소규모 인원 제한 운영과 관찰 기반 프로그램만을 시행합니다</li>
                <li>• <strong className="text-gray-700">단계별 생태 환경:</strong> 성장 단계별(베이비·준성체·성체) 자연 환경에 최적화된 개별 사육 공간을 제공합니다</li>
                <li>• <strong className="text-gray-700">건강 관리 기록:</strong> 정기 건강 검진, 성장 기록, 혈통 데이터를 체계적으로 유지·관리합니다</li>
                <li>• <strong className="text-gray-700">윤리적 브리딩:</strong> 전문 라인브리딩을 통해 혈통 품질을 유지하며, 근친교배를 철저히 배제합니다</li>
                <li>• <strong className="text-gray-700">교육 중심 운영:</strong> 관찰형·교육형 프로그램을 통해 테구에 대한 올바른 이해와 존중을 교육합니다</li>
              </ul>
            </div>

            {/* Live Animal Sales Policy */}
            <div className="rounded-2xl lg:rounded-3xl bg-white subtle-border p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center">
                  <AlertTriangle size={22} className="text-brand/60" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-gray-900">LIVE ANIMAL 분양 정책</h2>
                  <p className="text-[12px] md:text-[13px] tracking-widest uppercase text-gray-400/50" style={{ fontFamily: 'var(--font-accent)' }}>Live Animal Adoption Policy</p>
                </div>
              </div>
              <div className="space-y-3 text-[15px] leading-relaxed text-gray-600/60">
                <p><strong className="text-gray-800">인연 연결 원칙:</strong> 분양은 단순 판매가 아닌, 테구와 가족이 될 수 있는 인연을 이어주는 과정입니다. 카카오톡 상담 → 사전 교육 → 환경 확인 → 계좌이체 방식으로만 진행됩니다.</p>
                <p><strong className="text-gray-800">필수 사전 교육:</strong> 모든 분양자는 생태형 케어 교육을 필수로 이수해야 합니다. 교육 미이수 시 분양이 불가합니다. 테구의 자연 습성을 존중하는 사육법을 교육합니다.</p>
                <p><strong className="text-gray-800">건강 인증 & 혈통 기록:</strong> 분양 개체의 건강 인증서, 성장 기록, 전문 라인브리딩 혈통 정보를 모두 제공합니다.</p>
                <p><strong className="text-gray-800">생태형 환경 확인:</strong> 분양 전 자연 서식지를 재현한 사육 환경 세팅 여부를 확인합니다.</p>
                <p><strong className="text-gray-800">평생 케어 지원:</strong> 분양 후에도 생태형 사육 상담과 건강 모니터링을 지속적으로 제공합니다.</p>
              </div>
            </div>

            {/* Payment Policy */}
            <div className="rounded-2xl lg:rounded-3xl bg-white subtle-border p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center">
                  <Shield size={22} className="text-brand/60" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-gray-900">결제 정책</h2>
                  <p className="text-[12px] md:text-[13px] tracking-widest uppercase text-gray-400/50" style={{ fontFamily: 'var(--font-accent)' }}>Payment Policy</p>
                </div>
              </div>
              <div className="space-y-3 text-[15px] text-gray-600/60">
                <p><strong className="text-gray-800">사육용품·굿즈:</strong> 네이버페이, 카카오페이 결제 가능</p>
                <p><strong className="text-gray-800">LIVE ANIMAL(생체 분양):</strong> 카카오톡 상담 → 사전 교육 이수 → 환경 확인 → 계좌이체만 가능 (윤리적 분양 절차 필수)</p>
                <p><strong className="text-gray-800">생태 전시 관람·교육 프로그램:</strong> 현장 결제 또는 사전 카카오페이 결제</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <KakaoButton />
    </>
  );
}
