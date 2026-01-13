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
    siteName: '레포트전부모아',  // ← 이거 추가
  },
  verification: {
    google: '-z_QNbyHrlJUrnU3vLB6NWhE1ln2rTTWQOsaSR0tzQ4',  // ← 여기에 content 값만 입력
    other: {
      'naver-site-verification': 'c4f2f0f085bc2d5342adad27f46616859b95dbd1',
    },
    
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: '레포트전부모아',
              alternateName:'학점은행제 레포트',
              url: 'https://www.xn--om2b21cn6ci3lrqdy3uu4b.com',
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
