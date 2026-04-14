'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import {
  LogIn, Plus, Pencil, Trash2, X, Save, RefreshCw, LogOut, Database,
  Upload, ImageIcon, XCircle, LayoutDashboard, ChevronRight, Search,
  Check, AlertTriangle, Eye, EyeOff, Copy, ArrowUpDown,
} from 'lucide-react';
import CustomSelect from '@/components/CustomSelect';

/* ───── Table definitions ───── */
const TABLES = [
  { key: 'banner_slides', label: '배너', labelEn: 'Banner', desc: '홈페이지 메인 슬라이드 배너', page: '/main' },
  { key: 'notices', label: '공지사항', labelEn: 'Notices', desc: '홈·공지사항 페이지', page: '/main, /main/notices' },
  { key: 'care_sheets', label: '케어시트', labelEn: 'Care Sheets', desc: '홈페이지 사육 가이드 섹션', page: '/main' },
  { key: 'daily_posts', label: '일상', labelEn: 'Daily', desc: '홈·일상 게시판', page: '/main, /main/daily' },
  { key: 'products', label: '상품', labelEn: 'Products', desc: '홈·상품 페이지', page: '/main, /main/products' },
  { key: 'reviews', label: '후기', labelEn: 'Reviews', desc: '홈·후기 페이지', page: '/main, /reviews' },
  { key: 'tegu_species', label: '보유 개체', labelEn: 'Assets', desc: 'OUR ASSETS 페이지·수출 페이지', page: '/main/assets, /export' },
  { key: 'adoptions', label: '분양 개체', labelEn: 'Adoptions', desc: '홈·분양 게시판·상세 페이지', page: '/main, /main/adoption' },
  { key: 'edu_applications', label: '교육 신청', labelEn: 'Education', desc: '교육 신청 접수 내역 (읽기)', page: '/education' },
  { key: 'visit_reservations', label: '방문예약', labelEn: 'Visits', desc: '농장 방문예약 접수 내역', page: '/visit' },
  { key: 'gallery_photos', label: '갤러리', labelEn: 'Gallery', desc: '메인 페이지 갤러리 마퀴 사진', page: '/main' },
];

const TABLE_FIELDS: Record<string, { key: string; label: string; type?: string; placeholder?: string }[]> = {
  banner_slides: [
    { key: 'title', label: '제목', placeholder: '슬라이드 제목' },
    { key: 'title_en', label: '영문 제목', placeholder: 'Slide Title' },
    { key: 'subtitle', label: '부제목', placeholder: '설명 텍스트' },
    { key: 'subtitle_en', label: '영문 부제목', placeholder: 'Description' },
    { key: 'image_url', label: '이미지', type: 'image' },
    { key: 'link', label: '링크 URL', placeholder: '/booking' },
    { key: 'bg', label: '배경색', placeholder: '#000000' },
    { key: 'accent', label: '강조색', placeholder: '#ffffff' },
    { key: 'sort_order', label: '정렬순서', type: 'number' },
    { key: 'is_active', label: '활성', type: 'checkbox' },
  ],
  notices: [
    { key: 'title', label: '제목', placeholder: '공지 제목' },
    { key: 'title_en', label: '영문 제목', placeholder: 'Notice Title' },
    { key: 'date', label: '날짜', placeholder: '2026-02-24' },
    { key: 'tag', label: '태그', placeholder: '공지 / 신규 / 이벤트' },
    { key: 'tag_en', label: '영문 태그', placeholder: 'Notice / New / Event' },
    { key: 'is_active', label: '활성', type: 'checkbox' },
  ],
  care_sheets: [
    { key: 'title', label: '제목', placeholder: '케어시트 제목' },
    { key: 'title_en', label: '영문 제목', placeholder: 'Care Sheet Title' },
    { key: 'description', label: '설명', placeholder: '간략한 설명' },
    { key: 'desc_en', label: '영문 설명', placeholder: 'Brief description' },
    { key: 'icon', label: '아이콘 (이모지)', placeholder: '🌡️' },
    { key: 'sort_order', label: '정렬순서', type: 'number' },
    { key: 'is_active', label: '활성', type: 'checkbox' },
  ],
  daily_posts: [
    { key: 'title', label: '제목', placeholder: '포스트 제목' },
    { key: 'title_en', label: '영문 제목', placeholder: 'Post Title' },
    { key: 'date', label: '날짜', placeholder: '2026-02-24' },
    { key: 'category', label: '카테고리', placeholder: '전시 / 브리딩 / 일상' },
    { key: 'category_en', label: '영문 카테고리', placeholder: 'Exhibition / Breeding / Daily' },
    { key: 'image_url', label: '이미지', type: 'image' },
    { key: 'is_active', label: '활성', type: 'checkbox' },
  ],
  products: [
    { key: 'name', label: '상품명', placeholder: '상품명 입력' },
    { key: 'name_en', label: '영문 상품명', placeholder: 'Product Name' },
    { key: 'price', label: '가격', placeholder: '₩29,000' },
    { key: 'image_url', label: '이미지', type: 'image' },
    { key: 'badge', label: '뱃지', placeholder: '베스트 / 추천' },
    { key: 'badge_en', label: '영문 뱃지', placeholder: 'Best / Recommended' },
    { key: 'is_new', label: '신상품', type: 'checkbox' },
    { key: 'category', label: '카테고리', placeholder: 'supplement / lighting / heating' },
    { key: 'product_type', label: '상품유형', type: 'select', placeholder: 'featured' },
    { key: 'sort_order', label: '정렬순서', type: 'number' },
    { key: 'is_active', label: '활성', type: 'checkbox' },
  ],
  reviews: [
    { key: 'author', label: '작성자', placeholder: '홍길동' },
    { key: 'author_en', label: '영문 작성자', placeholder: 'Hong Gildong' },
    { key: 'rating', label: '평점 (1~5)', type: 'number' },
    { key: 'text', label: '내용', type: 'textarea', placeholder: '후기 내용' },
    { key: 'text_en', label: '영문 내용', type: 'textarea', placeholder: 'Review content' },
    { key: 'type', label: '유형', placeholder: '분양후기 / 용품후기 / 관람후기' },
    { key: 'type_en', label: '영문 유형', placeholder: 'Adoption / Supply / Visit' },
    { key: 'date', label: '날짜', placeholder: '2026-02-24' },
    { key: 'is_active', label: '활성', type: 'checkbox' },
  ],
  tegu_species: [
    { key: 'name', label: '개체명', placeholder: 'SULLIVAN' },
    { key: 'name_en', label: '영문 개체명', placeholder: 'SULLIVAN' },
    { key: 'scientific', label: '학명 / 종', placeholder: 'VARANUS SALVATOR SSP.' },
    { key: 'image_url', label: '이미지', type: 'image' },
    { key: 'status', label: '상태', placeholder: '브리딩중 / 보유중' },
    { key: 'status_en', label: '영문 상태', placeholder: 'Breeding / Keeping' },
    { key: 'sort_order', label: '정렬순서', type: 'number' },
    { key: 'is_active', label: '활성', type: 'checkbox' },
  ],
  adoptions: [
    { key: 'name', label: '개체명', placeholder: '개체명 입력' },
    { key: 'name_en', label: '영문 개체명', placeholder: 'Individual Name' },
    { key: 'species', label: '종', placeholder: '아르헨티나 흑백 테구' },
    { key: 'species_en', label: '영문 종', placeholder: 'Argentine B&W Tegu' },
    { key: 'morph', label: '모프', placeholder: '노말 / 블루 / 알비노' },
    { key: 'morph_en', label: '영문 모프', placeholder: 'Normal / Blue / Albino' },
    { key: 'sex', label: '성별', placeholder: '수컷 / 암컷' },
    { key: 'sex_en', label: '영문 성별', placeholder: 'Male / Female' },
    { key: 'age', label: '나이', placeholder: '2024년 출생' },
    { key: 'age_en', label: '영문 나이', placeholder: 'Born 2024' },
    { key: 'price', label: '분양가', placeholder: '₩500,000' },
    { key: 'status', label: '상태', type: 'select', placeholder: 'Active' },
    { key: 'description', label: '설명', type: 'textarea', placeholder: '개체에 대한 상세 설명' },
    { key: 'desc_en', label: '영문 설명', type: 'textarea', placeholder: 'Detailed description' },
    { key: 'image_url', label: '이미지', type: 'image' },
    { key: 'sort_order', label: '정렬순서', type: 'number' },
    { key: 'is_active', label: '활성', type: 'checkbox' },
  ],
  edu_applications: [
    { key: 'org_name', label: '기관명', placeholder: '기관명' },
    { key: 'org_type', label: '기관유형', type: 'select', placeholder: '학교' },
    { key: 'contact_name', label: '담당자', placeholder: '담당자 이름' },
    { key: 'phone', label: '연락처', placeholder: '010-0000-0000' },
    { key: 'email', label: '이메일', placeholder: 'email@example.com' },
    { key: 'participants', label: '인원수', type: 'number' },
    { key: 'preferred_date', label: '희망 날짜', placeholder: '2026-03-01' },
    { key: 'message', label: '메시지', type: 'textarea', placeholder: '추가 요청 사항' },
    { key: 'status', label: '상태', type: 'select', placeholder: 'pending' },
  ],
  visit_reservations: [
    { key: 'name', label: '이름', placeholder: '예약자 이름' },
    { key: 'phone', label: '연락처', placeholder: '010-0000-0000' },
    { key: 'visitors', label: '인원수', type: 'number' },
    { key: 'visit_date', label: '방문일', placeholder: '2026-03-15' },
    { key: 'visit_time', label: '시간', placeholder: '10:00' },
    { key: 'message', label: '메시지', type: 'textarea', placeholder: '추가 요청 사항' },
    { key: 'status', label: '상태', type: 'select', placeholder: 'pending' },
  ],
  gallery_photos: [
    { key: 'image_url', label: '이미지', type: 'image' },
    { key: 'caption', label: '설명', placeholder: '사진 설명 (선택)' },
    { key: 'sort_order', label: '정렬순서', type: 'number' },
    { key: 'is_active', label: '활성', type: 'checkbox' },
  ],
};

const TABLE_DISPLAY_COLS: Record<string, string[]> = {
  banner_slides: ['id', 'image_url', 'title', 'sort_order', 'is_active'],
  notices: ['id', 'title', 'tag', 'date', 'is_active'],
  care_sheets: ['id', 'icon', 'title', 'sort_order', 'is_active'],
  daily_posts: ['id', 'image_url', 'title', 'category', 'date', 'is_active'],
  products: ['id', 'image_url', 'name', 'price', 'product_type', 'badge', 'is_active'],
  reviews: ['id', 'author', 'rating', 'type', 'date', 'is_active'],
  tegu_species: ['id', 'image_url', 'name', 'scientific', 'status', 'sort_order', 'is_active'],
  adoptions: ['id', 'image_url', 'name', 'species', 'status', 'sort_order', 'is_active'],
  edu_applications: ['id', 'org_name', 'org_type', 'contact_name', 'phone', 'status'],
  visit_reservations: ['id', 'name', 'phone', 'visitors', 'visit_date', 'visit_time', 'status'],
  gallery_photos: ['id', 'image_url', 'caption', 'sort_order', 'is_active'],
};

const PRODUCT_TYPES = [
  { value: 'featured', label: '추천상품' },
  { value: 'new', label: '신상품' },
  { value: 'supply', label: '사육용품' },
];

const ADOPTION_STATUSES = [
  { value: 'Active', label: 'Active (분양 가능)' },
  { value: 'Inactive', label: 'Inactive (분양 완료)' },
];

const EDU_STATUSES = [
  { value: 'pending', label: '대기중' },
  { value: 'confirmed', label: '확정' },
  { value: 'completed', label: '완료' },
  { value: 'cancelled', label: '취소' },
];

const VISIT_STATUSES = [
  { value: 'pending', label: '대기중' },
  { value: 'confirmed', label: '확정' },
  { value: 'completed', label: '방문완료' },
  { value: 'cancelled', label: '취소' },
  { value: 'no_show', label: '미방문' },
];

const ORG_TYPES = [
  { value: 'school', label: '학교' },
  { value: 'government', label: '관공서' },
  { value: 'university', label: '대학교' },
  { value: 'other', label: '기타' },
];

const COL_LABELS: Record<string, string> = {
  id: 'ID', image_url: '이미지', title: '제목', name: '이름', sort_order: '순서',
  is_active: '상태', tag: '태그', date: '날짜', category: '카테고리', icon: '아이콘',
  price: '가격', product_type: '유형', badge: '뱃지', author: '작성자', rating: '평점',
  type: '유형', species: '종', scientific: '학명', status: '상태', morph: '모프',
  org_name: '기관명', org_type: '유형', contact_name: '담당자', phone: '연락처',
  content: '내용', participants: '인원', email: '이메일', preferred_date: '희망날짜',
  visitors: '인원', visit_date: '방문일', visit_time: '시간', message: '메시지',
};

type RecordData = Record<string, unknown>;

/* ───── Toast ───── */
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl border animate-fade-in-up ${
      type === 'success' ? 'bg-white border-green-200 text-green-700' : 'bg-white border-red-200 text-red-600'
    }`}>
      {type === 'success' ? <Check size={16} /> : <AlertTriangle size={16} />}
      <span className="text-[13px] font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 text-gray-300 hover:text-gray-500"><X size={14} /></button>
    </div>
  );
}

/* ═══════ Main ═══════ */
export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('banner_slides');
  const [data, setData] = useState<RecordData[]>([]);
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState<RecordData | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tableCounts, setTableCounts] = useState<Record<string, number>>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  const storedPassword = authenticated ? password : '';

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  }, []);

  const fetchData = useCallback(async (table: string) => {
    setLoading(true);
    const res = await fetch(`/api/admin/${table}`, { headers: { 'x-admin-password': storedPassword } });
    if (res.ok) {
      const result = await res.json();
      setData(result);
      setTableCounts(prev => ({ ...prev, [table]: result.length }));
    }
    setLoading(false);
  }, [storedPassword]);

  const fetchAllCounts = useCallback(async () => {
    const counts: Record<string, number> = {};
    await Promise.all(TABLES.map(async (t) => {
      const res = await fetch(`/api/admin/${t.key}`, { headers: { 'x-admin-password': storedPassword } });
      if (res.ok) { counts[t.key] = (await res.json()).length; }
    }));
    setTableCounts(counts);
  }, [storedPassword]);

  useEffect(() => {
    if (authenticated) { fetchData(activeTab); fetchAllCounts(); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  useEffect(() => {
    if (authenticated) fetchData(activeTab);
  }, [activeTab, authenticated, fetchData]);

  const handleLogin = async () => {
    setLoginError('');
    const res = await fetch('/api/admin/auth', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }),
    });
    const result = await res.json();
    if (result.success) setAuthenticated(true);
    else setLoginError(result.error || '비밀번호가 올바르지 않습니다');
  };

  const handleSave = async () => {
    if (!editItem) return;
    setSaving(true);
    const method = isNew ? 'POST' : 'PUT';
    const payload = { ...editItem };
    if (isNew) { delete payload.id; delete payload.created_at; delete payload.updated_at; }
    try {
      const res = await fetch(`/api/admin/${activeTab}`, {
        method, headers: { 'Content-Type': 'application/json', 'x-admin-password': storedPassword }, body: JSON.stringify(payload),
      });
      if (res.ok) {
        setEditItem(null); setIsNew(false); fetchData(activeTab);
        showToast(isNew ? '새 항목이 추가되었습니다' : '수정이 저장되었습니다', 'success');
      } else { showToast((await res.json()).error || '저장 실패', 'error'); }
    } catch { showToast('네트워크 오류', 'error'); }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    const res = await fetch(`/api/admin/${activeTab}`, {
      method: 'DELETE', headers: { 'Content-Type': 'application/json', 'x-admin-password': storedPassword }, body: JSON.stringify({ id }),
    });
    if (res.ok) { fetchData(activeTab); showToast('삭제되었습니다', 'success'); }
    else showToast('삭제 실패', 'error');
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
    if (activeTab === 'adoptions') { newItem.status = 'Active'; newItem.status_en = 'Active'; }
    if (activeTab === 'edu_applications') { newItem.status = 'pending'; newItem.org_type = 'school'; }
    if (activeTab === 'visit_reservations') { newItem.status = 'pending'; }
    if (['notices', 'daily_posts', 'reviews'].includes(activeTab)) newItem.date = new Date().toISOString().split('T')[0];
    setEditItem(newItem); setIsNew(true);
  };

  const handleDuplicate = (item: RecordData) => {
    const dup = { ...item }; delete dup.id; delete dup.created_at; delete dup.updated_at;
    setEditItem(dup); setIsNew(true);
    showToast('항목을 복제했습니다. 수정 후 저장하세요.', 'success');
  };

  const handleImageUpload = async (file: File, fieldKey: string) => {
    if (!editItem) return;
    setUploading(true);
    const formData = new FormData(); formData.append('file', file); formData.append('folder', activeTab);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', headers: { 'x-admin-password': storedPassword }, body: formData });
      if (res.ok) { const { url } = await res.json(); setEditItem({ ...editItem, [fieldKey]: url }); showToast('이미지 업로드 완료', 'success'); }
      else { showToast((await res.json()).error || '업로드 실패', 'error'); }
    } catch { showToast('업로드 중 오류', 'error'); }
    setUploading(false);
  };

  const filteredData = searchQuery
    ? data.filter((item) => Object.values(item).some((val) => String(val ?? '').toLowerCase().includes(searchQuery.toLowerCase())))
    : data;

  /* ═══════ Login ═══════ */
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-sm px-8">
          <div className="text-center mb-10">
            <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-white shadow-lg flex items-center justify-center border border-gray-100">
              <Image src="/logo-symbol.svg" alt="Tegu Island" width={48} height={48} />
            </div>
            <Image src="/logo-text.svg" alt="TEGU ISLAND" width={160} height={24} className="mx-auto" />
            <p className="text-[11px] tracking-[0.3em] uppercase mt-4 text-gray-400" style={{ fontFamily: 'var(--font-accent)' }}>Admin Panel</p>
          </div>
          <div className="bg-white rounded-2xl p-7 shadow-lg border border-gray-100 space-y-4">
            <div>
              <label className="block text-[12px] font-semibold mb-2 text-gray-500">비밀번호</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="관리자 비밀번호 입력"
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-50 text-sm focus:outline-none focus:bg-white transition-all border border-gray-200 focus:border-brand/40 pr-10"
                  autoFocus
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {loginError && (
              <div className="flex items-center gap-2 text-[12px] text-red-500 bg-red-50 px-4 py-2.5 rounded-lg">
                <AlertTriangle size={14} />{loginError}
              </div>
            )}
            <button onClick={handleLogin} className="w-full py-3.5 rounded-xl text-[14px] font-medium flex items-center justify-center gap-2 btn-primary">
              <LogIn size={16} />로그인
            </button>
          </div>
        </div>
      </div>
    );
  }

  const displayCols = TABLE_DISPLAY_COLS[activeTab] || ['id'];
  const fields = TABLE_FIELDS[activeTab] || [];
  const currentTable = TABLES.find((t) => t.key === activeTab);
  const totalActive = data.filter(d => d.is_active).length;
  const totalInactive = data.length - totalActive;

  /* ═══════ Dashboard ═══════ */
  return (
    <div className="min-h-screen bg-gray-50/80 flex">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-white border-r border-gray-100 z-40 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
        <div className="p-6 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <Image src="/logo-symbol.svg" alt="" width={34} height={34} />
            <div>
              <p className="text-[13px] font-bold text-gray-800">TEGU ISLAND</p>
              <p className="text-[10px] text-gray-400 tracking-wider">ADMIN</p>
            </div>
          </div>
        </div>
        <nav className="p-3 space-y-0.5 overflow-y-auto" style={{ height: 'calc(100vh - 160px)' }}>
          {TABLES.map((t) => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                activeTab === t.key ? 'bg-brand/[0.06] text-brand font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}>
              <div className="min-w-0">
                <span className="text-[13px] block">{t.label}</span>
                <span className={`text-[10px] block truncate mt-0.5 ${activeTab === t.key ? 'text-brand/50' : 'text-gray-300'}`}>{t.desc}</span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-md shrink-0 ml-2 ${activeTab === t.key ? 'bg-brand/10 text-brand' : 'bg-gray-100 text-gray-400'}`}>
                {tableCounts[t.key] ?? '–'}
              </span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-50">
          <button onClick={() => { setAuthenticated(false); setPassword(''); }}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] text-gray-400 hover:text-red-500 hover:bg-red-50/50 transition-all">
            <LogOut size={14} />로그아웃
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all">
                <LayoutDashboard size={18} />
              </button>
              <div className="flex items-center gap-2 text-[13px] text-gray-400">
                <span>관리자</span><ChevronRight size={12} />
                <span className="font-semibold text-gray-700">{currentTable?.label}</span>
                {currentTable?.page && (
                  <span className="text-[11px] text-gray-300 ml-1">→ {currentTable.page}</span>
                )}
              </div>
            </div>
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="검색..." className="pl-10 pr-4 py-2.5 w-56 text-[13px] rounded-xl border border-gray-200 focus:outline-none focus:border-brand/40 bg-gray-50/50 transition-all" />
            </div>
          </div>
        </div>

        <div className="px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">전체</p>
              <p className="text-2xl font-bold text-gray-800">{data.length}<span className="text-[13px] font-normal text-gray-400 ml-1">건</span></p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <p className="text-[11px] font-semibold text-green-500 uppercase tracking-wide mb-1">활성</p>
              <p className="text-2xl font-bold text-green-600">{totalActive}<span className="text-[13px] font-normal text-gray-400 ml-1">건</span></p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">비활성</p>
              <p className="text-2xl font-bold text-gray-400">{totalInactive}<span className="text-[13px] font-normal text-gray-400 ml-1">건</span></p>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-[15px] font-bold text-gray-700">
                {currentTable?.label} 관리
                {searchQuery && <span className="text-[12px] font-normal text-gray-400 ml-2">&ldquo;{searchQuery}&rdquo; 결과 {filteredData.length}건</span>}
              </h2>
              {currentTable?.desc && (
                <p className="text-[11px] text-gray-400 mt-0.5">표시 위치: {currentTable.desc} ({currentTable.page})</p>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={() => fetchData(activeTab)} className="p-2.5 rounded-xl bg-white text-gray-400 hover:text-gray-600 transition-all border border-gray-200" title="새로고침">
                <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
              </button>
              <button onClick={handleNew} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold btn-primary">
                <Plus size={15} />새 항목
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-gray-50/80">
                    {displayCols.map((col) => (
                      <th key={col} className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        <span className="flex items-center gap-1">
                          {COL_LABELS[col] || col}
                          {col !== 'image_url' && <ArrowUpDown size={10} className="text-gray-300" />}
                        </span>
                      </th>
                    ))}
                    <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-gray-400">작업</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={displayCols.length + 1} className="px-5 py-20 text-center text-gray-400 text-sm">
                      <RefreshCw size={24} className="mx-auto mb-3 animate-spin text-brand/40" />불러오는 중...
                    </td></tr>
                  ) : filteredData.length === 0 ? (
                    <tr><td colSpan={displayCols.length + 1} className="px-5 py-20 text-center text-sm">
                      <Database size={24} className="mx-auto mb-3 text-gray-200" />
                      <p className="text-gray-400">{searchQuery ? '검색 결과가 없습니다' : '데이터가 없습니다'}</p>
                      {!searchQuery && <button onClick={handleNew} className="mt-3 text-[12px] text-brand hover:underline">+ 첫 번째 항목 추가</button>}
                    </td></tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item.id as number} className="border-t border-gray-50 hover:bg-brand-50/20 transition-colors duration-150 group/row">
                        {displayCols.map((col) => (
                          <td key={col} className="px-5 py-3.5 text-gray-600 max-w-[220px]">
                            {col === 'is_active' ? (
                              <span className={`inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full font-medium ${item[col] ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${item[col] ? 'bg-green-500' : 'bg-gray-300'}`} />
                                {item[col] ? '활성' : '비활성'}
                              </span>
                            ) : col === 'image_url' ? (
                              item[col] ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={String(item[col])} alt="" className="w-12 h-12 rounded-lg object-cover border border-gray-100" />
                              ) : (
                                <div className="w-12 h-12 rounded-lg bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center">
                                  <ImageIcon size={14} className="text-gray-200" />
                                </div>
                              )
                            ) : col === 'rating' ? (
                              <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={`text-[11px] ${i < Number(item[col]) ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
                                ))}
                              </div>
                            ) : col === 'product_type' ? (
                              <span className="text-[11px] px-2.5 py-1 rounded-md bg-gray-100 text-gray-500 font-medium">
                                {PRODUCT_TYPES.find(pt => pt.value === item[col])?.label || String(item[col] ?? '')}
                              </span>
                            ) : (
                              <span className="truncate block">{String(item[col] ?? '—')}</span>
                            )}
                          </td>
                        ))}
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-40 group-hover/row:opacity-100 transition-opacity">
                            <button onClick={() => handleDuplicate(item)} className="p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all" title="복제"><Copy size={13} /></button>
                            <button onClick={() => { setEditItem({ ...item }); setIsNew(false); }} className="p-2 rounded-lg text-gray-400 hover:text-brand hover:bg-brand-50 transition-all" title="수정"><Pencil size={13} /></button>
                            <button onClick={() => handleDelete(item.id as number)} className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all" title="삭제"><Trash2 size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {filteredData.length > 0 && (
              <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/50 flex items-center justify-between">
                <p className="text-[11px] text-gray-400">총 {filteredData.length}건</p>
                <p className="text-[11px] text-gray-300">TEGU ISLAND Admin</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ═══════ Edit Modal ═══════ */}
      {editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) { setEditItem(null); setIsNew(false); } }}>
          <div className="bg-white rounded-2xl w-full max-w-xl mx-4 max-h-[88vh] flex flex-col shadow-2xl border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-5 shrink-0 border-b border-gray-100">
              <div>
                <h3 className="text-[15px] font-bold text-gray-800">{isNew ? '새 항목 추가' : '항목 수정'}</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">{currentTable?.label}{!isNew && ` · ID: ${String(editItem.id)}`}</p>
              </div>
              <button onClick={() => { setEditItem(null); setIsNew(false); }} className="p-2 rounded-lg text-gray-300 hover:text-gray-500 hover:bg-gray-50 transition-all"><X size={18} /></button>
            </div>
            {/* Body */}
            <div ref={modalRef} className="px-7 py-6 space-y-5 overflow-y-auto flex-1">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-[12px] font-semibold mb-2 text-gray-500">{field.label}</label>
                  {field.type === 'checkbox' ? (
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" checked={!!editItem[field.key]} onChange={(e) => setEditItem({ ...editItem, [field.key]: e.target.checked })} className="sr-only" />
                        <div className={`w-11 h-6 rounded-full transition-all duration-300 ${editItem[field.key] ? 'bg-brand' : 'bg-gray-200'}`}>
                          <div className="w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-all duration-300" style={{ left: editItem[field.key] ? '22px' : '2px' }} />
                        </div>
                      </div>
                      <span className={`text-[13px] font-medium ${editItem[field.key] ? 'text-brand' : 'text-gray-400'}`}>{editItem[field.key] ? '활성' : '비활성'}</span>
                    </label>
                  ) : field.type === 'textarea' ? (
                    <textarea value={String(editItem[field.key] ?? '')} onChange={(e) => setEditItem({ ...editItem, [field.key]: e.target.value })}
                      rows={3} placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-xl text-[13px] focus:outline-none transition-all resize-none border border-gray-200 focus:border-brand/40 bg-gray-50/50 focus:bg-white" />
                  ) : field.type === 'number' ? (
                    <input type="number" value={String(editItem[field.key] ?? '')} onChange={(e) => setEditItem({ ...editItem, [field.key]: Number(e.target.value) })}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-xl text-[13px] focus:outline-none transition-all border border-gray-200 focus:border-brand/40 bg-gray-50/50 focus:bg-white" />
                  ) : field.type === 'select' ? (
                    <CustomSelect
                      options={
                        activeTab === 'adoptions' && field.key === 'status' ? ADOPTION_STATUSES :
                        activeTab === 'edu_applications' && field.key === 'status' ? EDU_STATUSES :
                        activeTab === 'edu_applications' && field.key === 'org_type' ? ORG_TYPES :
                        activeTab === 'visit_reservations' && field.key === 'status' ? VISIT_STATUSES :
                        PRODUCT_TYPES
                      }
                      value={String(editItem[field.key] ?? '')}
                      onChange={(v) => setEditItem({ ...editItem, [field.key]: v })}
                      placeholder={field.placeholder || '선택해주세요'} />
                  ) : field.type === 'image' ? (
                    <div className="space-y-3">
                      {editItem[field.key] ? (
                        <div className="relative group rounded-xl overflow-hidden border border-gray-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={String(editItem[field.key])} alt="미리보기" className="w-full h-48 object-cover" />
                          <button type="button" onClick={() => setEditItem({ ...editItem, [field.key]: '' })}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"><XCircle size={16} /></button>
                          <p className="text-[10px] text-gray-400 px-3 py-2 truncate bg-gray-50 border-t border-gray-100">{String(editItem[field.key])}</p>
                        </div>
                      ) : null}
                      <label className={`flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                        uploading ? 'border-brand/40 bg-brand-50/30' : 'border-gray-200 hover:border-brand/40 bg-gray-50 hover:bg-brand-50/20'}`}
                        onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-brand', 'bg-brand-50/50'); }}
                        onDragLeave={(e) => { e.currentTarget.classList.remove('border-brand', 'bg-brand-50/50'); }}
                        onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-brand', 'bg-brand-50/50'); const f = e.dataTransfer.files[0]; if (f) handleImageUpload(f, field.key); }}>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, field.key); e.target.value = ''; }} />
                        {uploading ? (<><RefreshCw size={20} className="text-brand/50 mb-2 animate-spin" /><p className="text-[12px] text-brand/60">업로드 중...</p></>)
                          : (<><Upload size={20} className="text-gray-300 mb-2" /><p className="text-[12px] text-gray-400">클릭 또는 드래그하여 업로드</p><p className="text-[10px] text-gray-300 mt-1">JPG, PNG, WebP, GIF (최대 10MB)</p></>)}
                      </label>
                      <div className="flex items-center gap-2"><div className="h-px flex-1 bg-gray-100" /><span className="text-[10px] text-gray-300">또는 URL 직접 입력</span><div className="h-px flex-1 bg-gray-100" /></div>
                      <input type="text" value={String(editItem[field.key] ?? '')} onChange={(e) => setEditItem({ ...editItem, [field.key]: e.target.value })}
                        placeholder="https://..." className="w-full px-4 py-3 rounded-xl text-[13px] focus:outline-none transition-all border border-gray-200 focus:border-brand/40 bg-gray-50/50 focus:bg-white" />
                    </div>
                  ) : (
                    <input type="text" value={String(editItem[field.key] ?? '')} onChange={(e) => setEditItem({ ...editItem, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-xl text-[13px] focus:outline-none transition-all border border-gray-200 focus:border-brand/40 bg-gray-50/50 focus:bg-white" />
                  )}
                </div>
              ))}
            </div>
            {/* Footer */}
            <div className="flex justify-end gap-2 px-7 py-5 shrink-0 border-t border-gray-100 bg-gray-50/30 rounded-b-2xl">
              <button onClick={() => { setEditItem(null); setIsNew(false); }} className="px-6 py-2.5 text-[13px] text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors">취소</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-[13px] font-semibold btn-primary disabled:opacity-60">
                {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                {saving ? '저장 중...' : '저장'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
