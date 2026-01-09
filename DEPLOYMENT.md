# 배포 가이드

이 문서는 Next.js 프로젝트를 다양한 플랫폼에 배포하는 방법을 설명합니다.

## 1. Vercel 배포 (권장)

Vercel은 Next.js를 만든 회사로, 가장 쉽고 최적화된 배포 방법입니다.

### 단계:

1. **GitHub에 코드 푸시**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```

2. **Vercel 계정 생성**
   - https://vercel.com 방문
   - GitHub 계정으로 로그인

3. **프로젝트 Import**
   - "New Project" 클릭
   - GitHub 레포지토리 선택
   - "Import" 클릭

4. **배포 설정**
   - Framework Preset: Next.js (자동 감지)
   - Build Command: `npm run build` (기본값)
   - Output Directory: `.next` (기본값)
   - "Deploy" 클릭

5. **완료!**
   - 몇 분 후 배포 완료
   - 제공된 URL로 사이트 접속 가능

### 환경 변수 설정 (선택사항)

1. Vercel 대시보드 → Project Settings
2. Environment Variables 탭
3. 필요한 환경 변수 추가
   - `EMAIL_SERVICE_API_KEY` 등

## 2. Netlify 배포

### 방법 1: Git 연동

1. **GitHub에 코드 푸시** (위와 동일)

2. **Netlify 계정 생성**
   - https://netlify.com 방문
   - GitHub 계정으로 로그인

3. **New site from Git**
   - GitHub 레포지토리 선택
   - Branch: main
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Netlify Next.js 플러그인 설치**
   ```bash
   npm install -D @netlify/plugin-nextjs
   ```
   - `netlify.toml` 파일은 이미 포함되어 있습니다

5. **Deploy** 클릭

### 방법 2: Netlify CLI

```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 로그인
netlify login

# 빌드
npm run build

# 배포
netlify deploy --prod
```

## 3. 자체 서버 배포

Node.js 서버가 있는 경우:

```bash
# 빌드
npm run build

# PM2로 실행 (권장)
npm install -g pm2
pm2 start npm --name "report-bank" -- start

# 또는 직접 실행
npm start
```

### Nginx 리버스 프록시 설정

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 4. Docker 배포

### Dockerfile 생성

```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

### 실행

```bash
# 이미지 빌드
docker build -t report-bank .

# 컨테이너 실행
docker run -p 3000:3000 report-bank
```

## 5. 배포 전 체크리스트

- [ ] `npm run build` 로컬에서 테스트
- [ ] 환경 변수 설정 확인
- [ ] `/public/reports.json` 데이터 확인
- [ ] 이메일 서비스 연동 (필요시)
- [ ] 도메인 설정
- [ ] SSL 인증서 (Vercel/Netlify는 자동)
- [ ] 개인정보처리방침 업데이트

## 6. 이메일 서비스 연동 (선택사항)

현재 `/api/contact` 엔드포인트는 콘솔에만 로그를 남깁니다.
실제 이메일을 받으려면 서비스를 연동하세요:

### SendGrid 사용

```bash
npm install @sendgrid/mail
```

`app/api/contact/route.ts`:
```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  await sgMail.send({
    to: 'your-email@example.com',
    from: 'noreply@yourdomain.com',
    subject: '새로운 문의',
    html: `
      <h2>새로운 문의가 접수되었습니다</h2>
      <p><strong>이름:</strong> ${body.name}</p>
      <p><strong>전화번호:</strong> ${body.phone}</p>
      <p><strong>교육원:</strong> ${body.institution}</p>
      <p><strong>주제:</strong> ${body.topic}</p>
    `,
  })
  
  return NextResponse.json({ success: true })
}
```

### Nodemailer 사용

```bash
npm install nodemailer
```

```typescript
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: 'your-email@example.com',
  subject: '새로운 문의',
  html: '...',
})
```

## 7. 도메인 연결

### Vercel
1. Project Settings → Domains
2. 도메인 입력
3. DNS 설정 (A 레코드 또는 CNAME)

### Netlify
1. Domain settings → Add custom domain
2. DNS 설정 따라하기

## 8. 성능 최적화

- [ ] 이미지 최적화 (Next.js Image 컴포넌트 사용)
- [ ] 코드 스플리팅 확인
- [ ] 캐싱 전략 설정
- [ ] CDN 활용 (Vercel/Netlify 자동)
- [ ] Lighthouse 점수 확인

## 문제 해결

### 빌드 실패
- `node_modules` 삭제 후 재설치
- `package-lock.json` 또는 `yarn.lock` 커밋 확인
- Node.js 버전 확인 (18 이상 권장)

### API Route 작동 안 함
- 서버리스 함수 제한 확인
- 로그 확인 (Vercel/Netlify 대시보드)
- CORS 설정 확인

### 스타일 깨짐
- CSS 파일 경로 확인
- 빌드 후 `.next` 폴더 확인

## 추가 리소스

- [Next.js 배포 문서](https://nextjs.org/docs/deployment)
- [Vercel 문서](https://vercel.com/docs)
- [Netlify 문서](https://docs.netlify.com)
