import Header from '@/components/Header';
import Footer from '@/components/Footer';

import Link from 'next/link';
import { Mail, MessageCircle, ArrowRight, Shield, Leaf, Heart, BookOpen } from 'lucide-react';

export default function EnglishPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-36 md:pt-40 pb-24 md:pb-28 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-20">
            <p className="text-[12px] md:text-[13px] tracking-[0.3em] uppercase mb-3 text-gray-500/60" style={{ fontFamily: 'var(--font-accent)' }}>
              Welcome to
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight font-display font-bold mb-4 text-gray-900">
              TEGU ISLAND
            </h1>
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="w-14 md:w-20 h-px bg-gradient-to-r from-transparent to-brand/20" />
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-brand/25" />
                <div className="w-2 h-2 rounded-full bg-brand" />
                <div className="w-1.5 h-1.5 rounded-full bg-brand/25" />
              </div>
              <div className="w-14 md:w-20 h-px bg-gradient-to-l from-transparent to-brand/20" />
            </div>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed text-gray-500/60" style={{ fontFamily: 'var(--font-accent)' }}>
              Asia&apos;s Only Specialized Tegu Ecological Exhibition &amp; Breeding Center<br />
              Ecological Exhibition &middot; Professional Line Breeding &middot; Education Programs &middot; Ethical Adoption &middot; TEIU KOREA Export
            </p>
          </div>

          {/* About */}
          <section className="mb-20">
            <h2 className="text-2xl font-display font-bold mb-8 text-gray-900" style={{ fontFamily: 'var(--font-accent)' }}>About Us</h2>
            <div className="space-y-4 text-base leading-relaxed text-gray-500/60">
              <p>TEGU ISLAND is Asia&apos;s only specialized tegu ecological exhibition and breeding center, operating from Seoul, South Korea. We are dedicated to professional line breeding focused on bloodline quality, immersive ecological exhibition, observation-based education, and ethical adoption of tegu lizards.</p>
              <p>Our facility recreates the natural habitat of tegus in Jurassic World-inspired dome enclosures &mdash; an immersive ecological exhibition space where tegus live as they would in the wild. We are not a place that exhibits animals; we are a place that shows the nature of tegus to people. The tegu is at the center, and humans are observers. We strictly prohibit all touch-based and handling experiences, operating exclusively observation-based and educational programs to minimize stress on our animals.</p>
              <p>Our mission is not simply to sell animals &mdash; we connect tegus with families who will love and care for them properly. Every adoption includes health certification, growth records, bloodline documentation, and mandatory ecological care education. We are Asia&apos;s only professional line breeding, ecological exhibition, and education center for tegus.</p>
            </div>
          </section>

          {/* Services */}
          <section className="mb-20">
            <h2 className="text-2xl font-display font-bold mb-8 text-gray-900" style={{ fontFamily: 'var(--font-accent)' }}>Our Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: <Leaf size={20} />, title: 'Ecological Exhibition', desc: 'Jurassic World-inspired dome enclosures recreating natural habitats. Observation-only — no touching, no handling. The tegu is the center, humans are observers.' },
                { icon: <BookOpen size={20} />, title: 'Education Programs', desc: 'Observation-based educational programs for schools, universities, and institutions. No stressful handling — learn through watching tegus in their natural behaviors.' },
                { icon: <Heart size={20} />, title: 'Professional Line Breeding', desc: 'Asia\'s premier line breeding program focused on bloodline quality, with full lineage archive, clutch data, and pairing records.' },
                { icon: <Shield size={20} />, title: 'Ethical Adoption', desc: 'Not selling — connecting families. Health certification, growth records, bloodline documentation, mandatory care education, and lifetime post-adoption support.' },
              ].map((s, i) => (
                <div key={i} className="p-8 md:p-10 rounded-2xl lg:rounded-3xl bg-white subtle-border">
                  <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand/60 mb-3">{s.icon}</div>
                  <h3 className="text-base font-semibold text-gray-800/70 mb-1" style={{ fontFamily: 'var(--font-accent)' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500/50">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Export */}
          <section className="mb-20">
            <h2 className="text-2xl font-display font-bold mb-8 text-gray-900" style={{ fontFamily: 'var(--font-accent)' }}>International Export (TEIU KOREA)</h2>
            <div className="p-8 md:p-10 rounded-2xl lg:rounded-3xl bg-white subtle-border">
              <p className="text-base leading-relaxed mb-4 text-gray-500/60">
                TEIU KOREA is Asia&apos;s premier tegu export brand and our international export division. As the only specialized tegu export operation in Asia, we offer professionally line-bred tegus with verified bloodline quality to buyers worldwide. Every export includes full CITES documentation, veterinary health certification, growth records, and ethical temperature-controlled shipping with animal welfare as the top priority.
              </p>
              <Link href="/export" className="inline-flex items-center gap-2 text-sm text-brand/70 hover:text-brand transition-all duration-300">
                View Export Details <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          {/* Contact */}
          <section className="text-center p-12 md:p-14 rounded-2xl lg:rounded-3xl subtle-border bg-white">
            <h2 className="text-2xl font-display font-bold mb-4 text-gray-900" style={{ fontFamily: 'var(--font-accent)' }}>International Inquiries</h2>
            <p className="text-base mb-2 text-gray-500/60">Oh Junhyuk (오준혁) &mdash; Director, TEGU ISLAND / TEIU KOREA</p>
            <p className="text-base mb-1 text-gray-500/50">+82-10-8802-8361</p>
            <p className="text-[13px] mb-2 text-gray-400/60">Ace Gold Tower #211, 100 Gasan Digital 1-ro, Geumcheon-gu, Seoul, South Korea</p>
            <p className="text-[13px] mb-8 text-gray-400/50">For export inquiries, adoption consultations, educational program partnerships, and international collaboration</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://pf.kakao.com/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-sm bg-[#FEE500] text-[#3C1E1E] transition-all duration-300 hover:shadow-[0_4px_16px_rgba(254,229,0,0.2)]">
                <MessageCircle size={16} /> KakaoTalk
              </a>
              <a href="mailto:teguisland@example.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl border border-gray-300/50 text-sm text-gray-600/70 hover:border-gray-400/60 transition-all duration-300">
                <Mail size={16} /> Email
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
