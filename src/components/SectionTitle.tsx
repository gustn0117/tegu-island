'use client';

interface SectionTitleProps {
  ko: string;
  en: string;
  sub?: string;
  subEn?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({ ko, en, sub, subEn, align = 'center' }: SectionTitleProps) {
  return (
    <div className={`mb-16 md:mb-20 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <p className="text-[11px] md:text-[12px] tracking-[0.3em] uppercase mb-4 text-gray-500"
        style={{ fontFamily: 'var(--font-accent)' }}>
        {en}
      </p>
      <h2
        className="en-tooltip text-3xl md:text-4xl font-display font-bold tracking-tight inline-block text-gray-900"
        data-en={en}
      >
        {ko}
      </h2>
      <div className={`flex items-center gap-4 mt-6 ${align === 'center' ? 'justify-center' : ''}`}>
        <div className="h-px w-14 md:w-20 bg-gradient-to-r from-transparent to-brand/20" />
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand/25" />
          <div className="w-2 h-2 rounded-full bg-brand" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand/25" />
        </div>
        <div className="h-px w-14 md:w-20 bg-gradient-to-l from-transparent to-brand/20" />
      </div>
      {sub && (
        <p className="en-tooltip text-base mt-6 max-w-lg mx-auto leading-relaxed text-gray-500"
          data-en={subEn || ''}>
          {sub}
        </p>
      )}
    </div>
  );
}
