# 학점은행제 A+ 레포트 보관함

Next.js로 구축된 학점은행제 레포트 플랫폼입니다.

## 기능

- 📚 레포트 검색 및 필터링
- 📄 레포트 상세보기 및 미리보기
- 🔐 로그인 시스템
- 📞 문의하기 (개인정보 수집 동의 포함)
- 📱 반응형 디자인 (모바일 최적화)
- 🎨 다크 테마 UI

## 시작하기

### 설치

```bash
npm install
# 또는
yarn install
```

### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
# 또는
yarn build
```

### 프로덕션 실행

```bash
npm start
# 또는
yarn start
```

## 배포

### Vercel 배포

가장 쉬운 방법은 [Vercel Platform](https://vercel.com/new)을 사용하는 것입니다.

1. GitHub 레포지토리에 코드 푸시
2. Vercel에서 Import
3. 자동 배포

### Netlify 배포

1. `netlify.toml` 파일이 이미 포함되어 있습니다
2. Netlify에 GitHub 레포지토리 연결
3. 자동 배포

## 폴더 구조

```
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact API
│   ├── layout.tsx                # 루트 레이아웃
│   ├── page.tsx                  # 메인 페이지
│   └── globals.css               # 글로벌 스타일
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── SearchSection.tsx
│   ├── ReportGrid.tsx
│   ├── Pagination.tsx
│   ├── DetailPage.tsx
│   ├── LoginModal.tsx
│   ├── ContactModal.tsx
│   └── Footer.tsx
├── public/
│   └── reports.json              # 레포트 데이터
├── package.json
├── next.config.js
└── tsconfig.json
```

## 주요 기능 설명

### 레포트 데이터 관리

레포트 데이터는 `/public/reports.json` 파일에 저장됩니다. 세션 스토리지를 사용하여 초기 로딩 시간을 최적화합니다.

### 라우팅

- `/` - 메인 페이지
- `/report/[id]` - 레포트 상세 페이지 (클라이언트 사이드 라우팅)

### API Routes

- `POST /api/contact` - 문의하기 폼 제출

## 환경 변수

필요한 경우 `.env.local` 파일을 생성하여 환경 변수를 설정할 수 있습니다:

```env
# 이메일 서비스 (SendGrid, Nodemailer 등)
EMAIL_SERVICE_API_KEY=your_api_key
```

## 커스터마이징

### 레포트 데이터 추가

`/public/reports.json` 파일을 수정하여 레포트를 추가/수정할 수 있습니다:

```json
{
  "id": 16,
  "title": "레포트 제목",
  "date": "2024-01-20",
  "preview": "레포트 미리보기 내용..."
}
```

### 스타일 변경

- 전역 스타일: `app/globals.css`
- 색상 변경: CSS 변수 또는 인라인 스타일 수정

### 이메일 통합

`app/api/contact/route.ts` 파일에서 이메일 서비스를 연동할 수 있습니다:

```typescript
// SendGrid 예시
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
await sgMail.send({
  to: 'your-email@example.com',
  from: 'noreply@example.com',
  subject: '새로운 문의',
  text: `이름: ${name}\n전화번호: ${phone}...`,
})
```

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS
- **Deployment**: Vercel / Netlify

## 라이센스

© 2024 레포트전부모아. All rights reserved.

## 문의

이메일: rlgns987@naver.com
