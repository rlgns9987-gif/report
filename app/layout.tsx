import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '학점은행제 A+ 레포트 보관함',
  description: '고품질 검증된 레포트로 학습의 방향을 제시합니다',
  keywords: '학점은행제, 레포트, 사회복지, 경영학, 보육교사, 심리학',
  openGraph: {
    title: '학점은행제 A+ 레포트 보관함',
    description: '고품질의 검증된 레포트로 학습의 방향을 제시합니다',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
