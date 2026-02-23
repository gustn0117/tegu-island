# TEGU ISLAND 웹사이트

## 로컬 실행

```bash
tar -xzf tegu-island.tar.gz
cd tegu-island
npm install
npm run dev
# http://localhost:3000
```

## 사이트 구조

- `/` — 랜딩 페이지 (Enter → 메인)
- `/main` — 메인: 배너(4개) → 공지·케어시트 → 일상 → 추천상품 → 신상품 → 사육용품 → 후기
- `/booking` — 방문예약
- `/care-guide` — 케어가이드
- `/policy` — 정책 (LIVE ANIMAL 계좌이체 등)
- `/export` — TEIU KOREA 수출
- `/contact` — 분양 문의
- `/reviews` — 후기
- `/en` — English 페이지

## 영어 지원

마우스 호버 시 영어 툴팁 + /en 영어 전용 페이지 + 헤더 EN/KO 전환 버튼

## 결제

- 사육용품/굿즈: 네이버페이, 카카오페이
- LIVE ANIMAL: 카톡 문의 → 계좌이체 (정책 페이지 고지)

## 커스터마이징

- 이미지: `/public/images/`에 실제 이미지 추가 후 코드 교체
- 카카오톡: `pf.kakao.com` → 실제 채널 URL
- CDN: `next.config.mjs`에서 `images.remotePatterns` 설정
