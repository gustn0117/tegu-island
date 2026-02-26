import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { Thermometer, UtensilsCrossed, Home, Snowflake } from 'lucide-react';
import { ReactNode } from 'react';

export default function CareGuidePage() {
  const guides: { title: string; titleEn: string; icon: ReactNode; sections: { heading: string; content: string }[] }[] = [
    {
      title: '생태형 기초 사육 가이드',
      titleEn: 'Ecological Basic Care Guide',
      icon: <Thermometer size={22} className="text-brand/60" />,
      sections: [
        { heading: '온도 관리 (자연 서식지 재현)', content: '바스킹 스팟: 38-43°C / 쿨 사이드: 24-27°C / 야간: 21-24°C. 남미 자연 서식지의 온도 구배를 재현하며, 서모스탯을 사용하여 항시 모니터링하세요.' },
        { heading: '습도 관리 (열대 환경 조성)', content: '전체 습도 60-80% 유지. 자연 서식지의 열대 환경을 재현하기 위해 미스팅 시스템 또는 수동 분무로 관리. 습도 게이지 필수.' },
        { heading: '조명 (자연 일조량 재현)', content: 'UVB 10.0 + 바스킹 램프 병행. 자연 광주기에 맞춰 12시간 ON / 12시간 OFF. 6개월마다 UVB 교체.' },
        { heading: '기질 (자연 토양 환경)', content: '코코넛 파이버 + 사이프러스 멀치 혼합 추천. 깊이 15-20cm. 야생에서의 버로잉(파기) 본능을 충족시켜 자연 행동을 유도합니다.' },
      ],
    },
    {
      title: '생태형 식단 & 영양 가이드',
      titleEn: 'Ecological Diet & Nutrition Guide',
      icon: <UtensilsCrossed size={22} className="text-brand/60" />,
      sections: [
        { heading: '베이비 (0-6개월)', content: '야생 식단 기반: 곤충(두비아, 귀뚜라미) 70% + 과일/채소 30%. 매일 급여. 칼슘+D3 더스팅 필수. 자연 먹이 활동을 유도합니다.' },
        { heading: '준성체 (6개월-2년)', content: '자연 잡식성 재현: 단백질 50% + 과일/채소 40% + 소량 생고기 10%. 2-3일 간격 급여. 비타민 보충.' },
        { heading: '성체 (2년+)', content: '야생 성체 식단 기반: 과일/채소 50% + 단백질 40% + 보충식 10%. 주 2-3회 급여. 비만 주의.' },
        { heading: '급여 금지 식품', content: '양파, 마늘, 아보카도, 초콜릿, 유제품, 가공식품 절대 금지. 자연 서식지에 존재하지 않는 식품은 제공하지 않습니다.' },
      ],
    },
    {
      title: '생태형 인클로저 셋업 가이드',
      titleEn: 'Ecological Enclosure Setup Guide',
      icon: <Home size={22} className="text-brand/60" />,
      sections: [
        { heading: '사이즈 기준 (서식지 재현)', content: '성체 기준: 최소 240x120x90cm (8x4x3ft). 자연 서식지처럼 충분한 활동 공간 확보가 핵심입니다. 베이비는 소형 사육장에서 시작.' },
        { heading: '레이아웃 (자연 환경 구현)', content: '바스킹 존 / 쿨 존 / 은신처 / 워터 디쉬 / 버로잉 에리어 구획 분리. 야생의 다양한 미세환경을 재현합니다.' },
        { heading: '안전 (생태 보호)', content: '탈출 방지 잠금장치 필수. 유리/아크릴 두께 충분. 전기장비 방수 처리. 개체의 안전이 최우선입니다.' },
      ],
    },
    {
      title: '브루메이션(동면) 가이드',
      titleEn: 'Brumation Guide',
      icon: <Snowflake size={22} className="text-brand/60" />,
      sections: [
        { heading: '시기 (자연 주기 존중)', content: '보통 10월-2월. 식욕 감소, 활동량 저하가 자연스러운 신호. 야생의 계절 주기를 존중하며 절대 강제로 시키지 않습니다.' },
        { heading: '조건 (계절 변화 재현)', content: '온도 15-18°C로 서서히 낮춤. 자연의 계절 변화에 맞춰 조명 줄임. 물은 항시 제공. 먹이 제공 중단.' },
        { heading: '모니터링 (건강 기록 관리)', content: '체중 매주 체크 및 기록. 급격한 체중 감소 시 수의사 상담. 탈수 징후 관찰. 성장 기록을 꾸준히 유지합니다.' },
      ],
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-36 md:pt-40 pb-28 md:pb-32 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-20 md:mb-24">
            <p className="text-[12px] md:text-[13px] tracking-[0.3em] uppercase mb-3 text-gray-400"
              style={{ fontFamily: 'var(--font-accent)' }}>Ecological Care Guide</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-gray-900 font-bold tracking-tight">
              생태형 케어가이드
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
              테구의 자연 서식지 연구를 기반으로 한 생태형 사육 가이드입니다.<br />
              자연에 가장 가까운 환경을 조성하여, 테구가 본래의 습성대로 살아갈 수 있도록 안내합니다.
            </p>
          </div>

          <div className="space-y-8">
            {guides.map((guide, gi) => (
              <div key={gi} className="rounded-2xl lg:rounded-3xl bg-white overflow-hidden subtle-border card-hover">
                <div className="px-8 md:px-10 py-8 md:py-10 flex items-center gap-4" style={{ borderBottom: '1px solid rgba(209,213,219,0.3)' }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(33,84,51,0.08)' }}>
                    {guide.icon}
                  </div>
                  <div>
                    <p className="text-[12px] tracking-[0.15em] uppercase mb-0.5 text-gray-400" style={{ fontFamily: 'var(--font-accent)' }}>
                      {guide.titleEn}
                    </p>
                    <h2 className="text-xl font-display font-bold text-gray-900">
                      {guide.title}
                    </h2>
                  </div>
                </div>
                <div className="px-8 md:px-10 py-8 md:py-10 space-y-8">
                  {guide.sections.map((sec, si) => (
                    <div key={si} className="flex gap-4">
                      <div className="w-1 shrink-0 rounded-full" style={{ background: 'linear-gradient(180deg, rgba(33,84,51,0.3), rgba(33,84,51,0.05))' }} />
                      <div>
                        <h3 className="text-[15px] font-semibold text-gray-700/70 mb-1.5">{sec.heading}</h3>
                        <p className="text-[15px] leading-[1.8] text-gray-500">{sec.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
