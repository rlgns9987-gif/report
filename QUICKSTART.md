# 🚀 빠른 시작 가이드

## 📦 설치 및 실행 (5분 완료)

### 1단계: 의존성 설치
```bash
npm install
```

### 2단계: 개발 서버 실행
```bash
npm run dev
```

### 3단계: 브라우저에서 확인
```
http://localhost:3000
```

끝! 🎉

---

## 🌐 배포하기 (가장 쉬운 방법)

### Vercel 배포 (권장) - 3분
1. https://github.com 에서 새 레포지토리 생성
2. 코드 푸시:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. https://vercel.com 방문
4. "New Project" → GitHub 레포지토리 선택 → "Deploy"
5. 완료! (2-3분 후 자동 배포)

### Netlify 배포 - 3분
1. 위와 동일하게 GitHub에 푸시
2. https://netlify.com 방문
3. "New site from Git" → 레포지토리 선택
4. Build command: `npm run build`
5. Publish directory: `.next`
6. "Deploy" 클릭

---

## 📝 레포트 데이터 수정

`/public/reports.json` 파일을 열어서 수정하세요:

```json
{
  "id": 16,
  "title": "새로운 레포트 제목",
  "date": "2024-01-20",
  "preview": "레포트 미리보기 내용..."
}
```

---

## ✉️ 이메일 수신 설정 (선택사항)

현재는 문의가 콘솔에만 출력됩니다.
실제 이메일을 받으려면:

### SendGrid 사용 (무료)
1. https://sendgrid.com 가입 (무료 플랜: 월 100통)
2. API Key 발급
3. Vercel/Netlify에서 환경 변수 추가:
   - `SENDGRID_API_KEY=your_key_here`
4. `app/api/contact/route.ts` 파일에 아래 코드 추가:

```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

await sgMail.send({
  to: 'your-email@example.com',
  from: 'noreply@yourdomain.com', // SendGrid에서 인증 필요
  subject: '새로운 문의',
  html: `
    <h2>새로운 문의</h2>
    <p>이름: ${body.name}</p>
    <p>전화번호: ${body.phone}</p>
    <p>교육원: ${body.institution}</p>
    <p>주제: ${body.topic}</p>
  `,
})
```

---

## 🎨 커스터마이징

### 로고 변경
`components/Header.tsx` 파일:
```tsx
<div className="logo">
  🎓 학점은행 A+  ← 여기를 수정
</div>
```

### 색상 변경
`app/globals.css` 파일에서:
```css
/* 보라색 계열을 다른 색으로 변경 */
#9d4edd → 원하는 색상 코드
#c77dff → 원하는 색상 코드
```

### 연락처 정보 변경
`components/Footer.tsx` 파일:
```tsx
대표자: 유기훈  ← 수정
이메일: rlgns987@naver.com  ← 수정
```

---

## 🔧 문제 해결

### 빌드 오류
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 포트 이미 사용 중
```bash
# 다른 포트로 실행
PORT=3001 npm run dev
```

### TypeScript 오류
```bash
# 타입 체크 무시하고 빌드
npm run build -- --no-type-check
```

---

## 📚 추가 문서

- 상세 배포 가이드: `DEPLOYMENT.md`
- 프로젝트 구조: `README.md`

---

## 💡 팁

1. **테스트 계정**
   - ID: admin
   - PW: 1234

2. **개발 중 자동 새로고침**
   - 코드 수정하면 자동으로 반영됨

3. **프로덕션 빌드 테스트**
   ```bash
   npm run build
   npm start
   ```

4. **SEO 최적화**
   - `app/layout.tsx`의 metadata 수정

---

## 🆘 도움이 필요하신가요?

- Next.js 공식 문서: https://nextjs.org/docs
- GitHub Issues: 프로젝트 레포지토리에서 이슈 생성
- 이메일: rlgns987@naver.com

---

**즐거운 개발 되세요! 🚀**
