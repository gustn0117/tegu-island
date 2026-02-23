import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "테구아일랜드 TEGU ISLAND | 아시아 유일의 테구 전문 농장",
  description: "아시아 유일의 테구도마뱀 전문 라인브리딩 농장. 생태형 전시·교육·브리딩·분양. Asia's only specialized Tegu farm.",
  keywords: "테구, 테구도마뱀, tegu, tegu island, 테구아일랜드, 파충류, reptile, breeding",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" style={{ backgroundColor: '#ffffff' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Noto+Sans+KR:wght@300;400;500;600;700;800;900&family=Cormorant+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ backgroundColor: '#ffffff' }}>
        {children}
      </body>
    </html>
  );
}
