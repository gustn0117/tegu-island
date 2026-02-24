'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption { value: string; label: string }

export default function CustomSelect({ options, value, onChange, placeholder = '선택해주세요', required }: {
  options: SelectOption[]; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // 열릴 때 선택된 항목으로 스크롤
  useEffect(() => {
    if (open && listRef.current && value) {
      const active = listRef.current.querySelector('[data-active="true"]');
      if (active) active.scrollIntoView({ block: 'nearest' });
    }
  }, [open, value]);

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-white text-sm transition-all duration-300 border cursor-pointer
          ${open
            ? 'border-brand/40 ring-2 ring-brand/10 shadow-sm'
            : 'border-gray-200 hover:border-gray-300'}
          ${selected ? 'text-gray-800' : 'text-gray-400'}`}>
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <ChevronDown size={16} className={`shrink-0 text-gray-400 transition-transform duration-300 ease-out ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* hidden input for form validation */}
      {required && !value && (
        <input tabIndex={-1} className="opacity-0 absolute bottom-0 left-1/2 w-px h-px pointer-events-none" required value="" onChange={() => {}} />
      )}

      {/* dropdown */}
      {open && (
        <div ref={listRef}
          className="absolute z-50 mt-2 w-full bg-white rounded-2xl border border-gray-100 shadow-xl shadow-black/[0.06] py-1.5 max-h-64 overflow-y-auto overscroll-contain"
          style={{ animation: 'customSelectIn 0.2s ease-out' }}>
          {options.map(opt => {
            const isActive = opt.value === value;
            return (
              <button key={opt.value} type="button" data-active={isActive}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full flex items-center justify-between gap-3 px-5 py-3 text-sm transition-colors duration-150 cursor-pointer
                  ${isActive
                    ? 'text-brand font-medium bg-brand/[0.04]'
                    : 'text-gray-600 hover:bg-gray-50/80 active:bg-gray-100/60'}`}>
                <span className="truncate">{opt.label}</span>
                {isActive && <Check size={15} className="shrink-0 text-brand" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
