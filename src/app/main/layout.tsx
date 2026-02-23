import Header from '@/components/Header';
import Footer from '@/components/Footer';
import KakaoButton from '@/components/KakaoButton';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[64px] md:pt-[110px]">
        {children}
      </main>
      <Footer />
      <KakaoButton />
    </>
  );
}
