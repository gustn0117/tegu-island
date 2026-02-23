'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { LogIn, Plus, Pencil, Trash2, X, Save, RefreshCw, LogOut, Database, Upload, ImageIcon, XCircle } from 'lucide-react';

const TABLES = [
  { key: 'banner_slides', label: '배너', labelEn: 'Banner' },
  { key: 'notices', label: '공지사항', labelEn: 'Notices' },
  { key: 'care_sheets', label: '케어시트', labelEn: 'Care Sheets' },
  { key: 'daily_posts', label: '일상', labelEn: 'Daily' },
  { key: 'products', label: '상품', labelEn: 'Products' },
  { key: 'reviews', label: '후기', labelEn: 'Reviews' },
  { key: 'tegu_species', label: '종', labelEn: 'Species' },
  { key: 'adoptions', label: '분양', labelEn: 'Adoption' },
];

const TABLE_FIELDS: Record<string, { key: string; label: string; type?: string }[]> = {
  banner_slides: [
    { key: 'title', label: '제목' },
    { key: 'title_en', label: '영문 제목' },
    { key: 'subtitle', label: '부제목' },
    { key: 'subtitle_en', label: '영문 부제목' },
    { key: 'image_url', label: '이미지', type: 'image' },
    { key: 'link', label: '링크 URL' },
    { key: 'bg', label: '배경색' },
    { key: 'accent', label: '강조색' },
    { key: 'sort_order', label: '정렬순서', type: 'number' },
    { key: 'is_active', label: '활성', type: 'checkbox' },
  ],
  notices: [
    { key: 'title', label: '제목' },
    { key: 'title_en', label: '영문 제목' },
    { key: 'date', label: '날짜' },
    { key: 'tag', label: '태그' },
    { key: 'tag_en', label: '영문 태그' },
    { key: 'is_active', label: '활성', type: 'checkbox' },
  ],
  care_sheets: [
    { key: 'title', label: '제목' },
    { key: 'title_en', label: '영문 제목' },
    { key: 'description', label: '설명' },
    { key: 'desc_en', label: '영문 설명' },
    { key: 'icon', label: '아이콘' },
    { key: 'sort_order', label: '정렬순서', type: 'number' },
    { key: 'is_active', label: '활성', type: 'checkbox' },
  ],
  daily_posts: [
    { key: 'title', label: '제목' },
    { key: 'title_en', label: '영문 제목' },
    { key: 'date', label: '날짜' },
    { key: 'category', label: '카테고리' },
    { key: 'category_en', label: '영문 카테고리' },
    { key: 'image_url', label: '이미지', type: 'image' },
    { key: 'is_active', label: '활성', type: 'checkbox' },
  ],
  products: [
    { key: 'name', label: '상품명' },
    { key: 'name_en', label: '영문 상품명' },
    { key: 'price', label: '가격' },
    { key: 'badge', label: '뱃지' },
    { key: 'badge_en', label: '영문 뱃지' },
    { key: 'is_new', label: '신상품', type: 'checkbox' },
    { key: 'category', label: '카테고리' },
    { key: 'product_type', label: '상품유형' },
    { key: 'sort_order', label: '정렬순서', type: 'number' },
    { key: 'is_active', label: '활성', type: 'checkbox' },
  ],
  reviews: [
    { key: 'author', label: '작성자' },
    { key: 'author_en', label: '영문 작성자' },
    { key: 'rating', label: '평점', type: 'number' },
    { key: 'text', label: '내용', type: 'textarea' },
    { key: 'text_en', label: '영문 내용', type: 'textarea' },
    { key: 'type', label: '유형' },
    { key: 'type_en', label: '영문 유형' },
    { key: 'date', label: '날짜' },
    { key: 'is_active', label: '활성', type: 'checkbox' },
  ],
  tegu_species: [
    { key: 'name', label: '종 이름' },
    { key: 'name_en', label: '영문 이름' },
    { key: 'scientific', label: '학명' },
    { key: 'status', label: '상태' },
    { key: 'status_en', label: '영문 상태' },
    { key: 'sort_order', label: '정렬순서', type: 'number' },
    { key: 'is_active', label: '활성', type: 'checkbox' },
  ],
  adoptions: [
    { key: 'name', label: '개체명' },
    { key: 'name_en', label: '영문 개체명' },
    { key: 'species', label: '종' },
    { key: 'species_en', label: '영문 종' },
    { key: 'morph', label: '모프' },
    { key: 'morph_en', label: '영문 모프' },
    { key: 'sex', label: '성별' },
    { key: 'sex_en', label: '영문 성별' },
    { key: 'age', label: '나이' },
    { key: 'age_en', label: '영문 나이' },
    { key: 'price', label: '분양가' },
    { key: 'status', label: '분양상태' },
    { key: 'status_en', label: '영문 상태' },
    { key: 'description', label: '설명', type: 'textarea' },
    { key: 'desc_en', label: '영문 설명', type: 'textarea' },
    { key: 'image_url', label: '이미지', type: 'image' },
    { key: 'sort_order', label: '정렬순서', type: 'number' },
    { key: 'is_active', label: '활성', type: 'checkbox' },
  ],
};

const TABLE_DISPLAY_COLS: Record<string, string[]> = {
  banner_slides: ['id', 'image_url', 'title', 'sort_order', 'is_active'],
  notices: ['id', 'title', 'tag', 'date', 'is_active'],
  care_sheets: ['id', 'title', 'icon', 'sort_order', 'is_active'],
  daily_posts: ['id', 'image_url', 'title', 'category', 'date', 'is_active'],
  products: ['id', 'name', 'price', 'product_type', 'is_active'],
  reviews: ['id', 'author', 'rating', 'type', 'is_active'],
  tegu_species: ['id', 'name', 'status', 'sort_order', 'is_active'],
  adoptions: ['id', 'image_url', 'name', 'species', 'morph', 'status', 'price', 'is_active'],
};

type RecordData = Record<string, unknown>;

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('banner_slides');
  const [data, setData] = useState<RecordData[]>([]);
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState<RecordData | null>(null);
  const [isNew, setIsNew] = useState(false);

  const storedPassword = authenticated ? password : '';

  const fetchData = useCallback(async (table: string) => {
    setLoading(true);
    const res = await fetch(`/api/admin/${table}`, {
      headers: { 'x-admin-password': storedPassword },
    });
    if (res.ok) {
      setData(await res.json());
    }
    setLoading(false);
  }, [storedPassword]);

  useEffect(() => {
    if (authenticated) {
      fetchData(activeTab);
    }
  }, [authenticated, activeTab, fetchData]);

  const handleLogin = async () => {
    setLoginError('');
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const result = await res.json();
    if (result.success) {
      setAuthenticated(true);
    } else {
      setLoginError(result.error || '로그인 실패');
    }
  };

  const handleSave = async () => {
    if (!editItem) return;
    const method = isNew ? 'POST' : 'PUT';
    const payload = { ...editItem };
    if (isNew) {
      delete payload.id;
      delete payload.created_at;
      delete payload.updated_at;
    }
    const res = await fetch(`/api/admin/${activeTab}`, {
      method,
      headers: { 'Content-Type': 'application/json', 'x-admin-password': storedPassword },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setEditItem(null);
      setIsNew(false);
      fetchData(activeTab);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    const res = await fetch(`/api/admin/${activeTab}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': storedPassword },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchData(activeTab);
  };

  const handleNew = () => {
    const fields = TABLE_FIELDS[activeTab];
    const newItem: RecordData = {};
    fields.forEach((f) => {
      if (f.type === 'checkbox') newItem[f.key] = true;
      else if (f.type === 'number') newItem[f.key] = 0;
      else newItem[f.key] = '';
    });
    if (activeTab === 'products') newItem.product_type = 'featured';
    if (activeTab === 'adoptions') { newItem.status = '분양가능'; newItem.status_en = 'Available'; }
    setEditItem(newItem);
    setIsNew(true);
  };

  const handleImageUpload = async (file: File, fieldKey: string) => {
    if (!editItem) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', activeTab);
    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: { 'x-admin-password': storedPassword },
      body: formData,
    });
    if (res.ok) {
      const { url } = await res.json();
      setEditItem({ ...editItem, [fieldKey]: url });
    } else {
      const { error } = await res.json();
      alert(error || '업로드 실패');
    }
  };

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white grain-overlay">
        <div className="relative z-10 w-full max-w-sm px-8">
          <div className="text-center mb-10">
            <Image src="/logo-symbol.svg" alt="Tegu Island" width={56} height={56} className="mx-auto mb-4" />
            <Image src="/logo-text.svg" alt="TEGU ISLAND" width={160} height={24} className="mx-auto" />
            <p className="text-[10px] tracking-[0.25em] uppercase mt-3 text-gray-400">Admin Panel</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="비밀번호"
              className="w-full px-4 py-3.5 rounded-xl bg-white text-sm focus:outline-none transition-all duration-300 border border-gray-200"
            />
            {loginError && <p className="text-[11px] text-red-500/80 text-center">{loginError}</p>}
            <button
              onClick={handleLogin}
              className="w-full py-3.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 btn-primary"
            >
              <LogIn size={15} />
              로그인
            </button>
          </div>
        </div>
      </div>
    );
  }

  const displayCols = TABLE_DISPLAY_COLS[activeTab] || ['id'];
  const fields = TABLE_FIELDS[activeTab] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image src="/logo-symbol.svg" alt="Tegu Island" width={32} height={32} />
            <div className="flex items-baseline gap-2">
              <Image src="/logo-text.svg" alt="TEGU ISLAND" width={100} height={16} />
              <span className="text-[10px] px-2 py-0.5 rounded-md font-medium bg-gray-100 text-gray-500">Admin</span>
            </div>
          </div>
          <button
            onClick={() => { setAuthenticated(false); setPassword(''); }}
            className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-gray-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50"
          >
            <LogOut size={13} />
            로그아웃
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {TABLES.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-5 py-2.5 text-[12px] rounded-xl whitespace-nowrap transition-all duration-300 font-medium ${
                activeTab === t.key
                  ? 'bg-gray-900 text-white shadow-[0_4px_16px_rgba(0,0,0,0.1)]'
                  : 'text-gray-500 bg-white hover:text-gray-700 hover:bg-white/80 subtle-border'
              }`}
            >
              {t.label}
              <span className="ml-1 text-[10px] opacity-60">{t.labelEn}</span>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100">
              <Database size={14} className="text-gray-400" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-700">
                {TABLES.find((t) => t.key === activeTab)?.label} 관리
              </h2>
              <p className="text-[11px] text-gray-400">{data.length}건의 데이터</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => fetchData(activeTab)}
              className="p-2.5 rounded-xl bg-white text-gray-400 hover:text-gray-600 transition-all subtle-border"
            >
              <RefreshCw size={14} />
            </button>
            <button
              onClick={handleNew}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-[12px] font-medium btn-primary"
            >
              <Plus size={14} />
              추가
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl overflow-hidden subtle-border">
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="bg-gray-50">
                  {displayCols.map((col) => (
                    <th key={col} className="px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      {col}
                    </th>
                  ))}
                  <th className="px-5 py-4 text-right text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={displayCols.length + 1} className="px-5 py-16 text-center text-gray-400 text-sm">
                    <RefreshCw size={20} className="mx-auto mb-2 animate-spin text-gray-300" />
                    로딩 중...
                  </td></tr>
                ) : data.length === 0 ? (
                  <tr><td colSpan={displayCols.length + 1} className="px-5 py-16 text-center text-gray-400 text-sm">
                    <Database size={20} className="mx-auto mb-2 text-gray-200" />
                    데이터가 없습니다
                  </td></tr>
                ) : (
                  data.map((item) => (
                    <tr key={item.id as number} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors duration-200">
                      {displayCols.map((col) => (
                        <td key={col} className="px-5 py-4 text-gray-600 max-w-[200px] truncate">
                          {col === 'is_active' ? (
                            <span className={`text-[10px] px-2.5 py-1 rounded-lg font-medium ${item[col] ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                              {item[col] ? '활성' : '비활성'}
                            </span>
                          ) : col === 'image_url' ? (
                            item[col] ? (
                              <img src={String(item[col])} alt="" className="w-12 h-12 rounded-lg object-cover border border-gray-100" />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                                <ImageIcon size={14} className="text-gray-200" />
                              </div>
                            )
                          ) : (
                            String(item[col] ?? '')
                          )}
                        </td>
                      ))}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => { setEditItem({ ...item }); setIsNew(false); }}
                            className="p-2 rounded-lg text-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-all"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id as number)}
                            className="p-2 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) { setEditItem(null); setIsNew(false); } }}>
          <div className="bg-white rounded-2xl w-full max-w-lg mx-4 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-7 py-5 sticky top-0 bg-white z-10 rounded-t-2xl border-b border-gray-100">
              <div>
                <h3 className="text-sm font-semibold text-gray-700">
                  {isNew ? '새 항목 추가' : '항목 수정'}
                </h3>
                {!isNew && <p className="text-[10px] text-gray-400 mt-0.5">ID: {String(editItem.id)}</p>}
              </div>
              <button onClick={() => { setEditItem(null); setIsNew(false); }}
                className="p-2 rounded-lg text-gray-300 hover:text-gray-500 hover:bg-gray-50 transition-all">
                <X size={18} />
              </button>
            </div>
            <div className="px-7 py-6 space-y-5">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-[11px] font-semibold mb-2 text-gray-500">{field.label}</label>
                  {field.type === 'checkbox' ? (
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={!!editItem[field.key]}
                          onChange={(e) => setEditItem({ ...editItem, [field.key]: e.target.checked })}
                          className="sr-only"
                        />
                        <div className={`w-10 h-5 rounded-full transition-all duration-300 ${editItem[field.key] ? 'bg-gray-900' : 'bg-gray-200'}`}>
                          <div className={`w-4 h-4 rounded-full bg-white shadow-sm absolute top-0.5 transition-all duration-300`}
                            style={{ left: editItem[field.key] ? '22px' : '2px' }} />
                        </div>
                      </div>
                      <span className="text-[12px] text-gray-600">{editItem[field.key] ? '활성' : '비활성'}</span>
                    </label>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      value={String(editItem[field.key] ?? '')}
                      onChange={(e) => setEditItem({ ...editItem, [field.key]: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl text-[12px] focus:outline-none transition-all duration-300 resize-none border border-gray-200"
                    />
                  ) : field.type === 'number' ? (
                    <input
                      type="number"
                      value={String(editItem[field.key] ?? '')}
                      onChange={(e) => setEditItem({ ...editItem, [field.key]: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl text-[12px] focus:outline-none transition-all duration-300 border border-gray-200"
                    />
                  ) : field.type === 'image' ? (
                    <div className="space-y-3">
                      {editItem[field.key] ? (
                        <div className="relative group rounded-xl overflow-hidden border border-gray-200">
                          <img
                            src={String(editItem[field.key])}
                            alt="미리보기"
                            className="w-full h-48 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setEditItem({ ...editItem, [field.key]: '' })}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <XCircle size={16} />
                          </button>
                          <p className="text-[10px] text-gray-400 px-3 py-2 truncate bg-gray-50">{String(editItem[field.key])}</p>
                        </div>
                      ) : null}
                      <label
                        className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-gray-200 hover:border-brand/40 bg-gray-50 hover:bg-brand-50/30 transition-all duration-300 cursor-pointer"
                        onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-brand', 'bg-brand-50/50'); }}
                        onDragLeave={(e) => { e.currentTarget.classList.remove('border-brand', 'bg-brand-50/50'); }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove('border-brand', 'bg-brand-50/50');
                          const file = e.dataTransfer.files[0];
                          if (file) handleImageUpload(file, field.key);
                        }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, field.key);
                            e.target.value = '';
                          }}
                        />
                        <Upload size={20} className="text-gray-300 mb-2" />
                        <p className="text-[12px] text-gray-400">클릭 또는 드래그하여 이미지 업로드</p>
                        <p className="text-[10px] text-gray-300 mt-1">JPG, PNG, WebP, GIF (최대 10MB)</p>
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-gray-100" />
                        <span className="text-[10px] text-gray-300">또는 URL 직접 입력</span>
                        <div className="h-px flex-1 bg-gray-100" />
                      </div>
                      <input
                        type="text"
                        value={String(editItem[field.key] ?? '')}
                        onChange={(e) => setEditItem({ ...editItem, [field.key]: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-4 py-3 rounded-xl text-[12px] focus:outline-none transition-all duration-300 border border-gray-200"
                      />
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={String(editItem[field.key] ?? '')}
                      onChange={(e) => setEditItem({ ...editItem, [field.key]: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-[12px] focus:outline-none transition-all duration-300 border border-gray-200"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 px-7 py-5 sticky bottom-0 bg-white rounded-b-2xl border-t border-gray-100">
              <button
                onClick={() => { setEditItem(null); setIsNew(false); }}
                className="px-5 py-2.5 text-[12px] text-gray-400 hover:text-gray-600 transition-colors rounded-xl hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-[12px] font-medium btn-primary"
              >
                <Save size={13} />
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
