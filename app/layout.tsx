import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '레포트전부모아',
  description: '고품질 검증된 레포트로 학습의 방향을 제시합니다',
  keywords: `학점은행제,학점은행제플래너,학점은행제멘토,사회복지사,직장인학사학위,대학원,학점은행제레포트,레포트,레포트참고사이트,레포트공유,레포트참고,
  학점은행제편입,일반편입학사편입,학점은행제학습플래너,학은제,학은제플래너,학은제멘토,학은제컴공,학점은행제경영학,레포트참고사이트,
  학점은행제41학점,학점은행제106학점,학점은행제컴퓨터공학,학점은행제심리학,학점은행제대학원,학점은행제정보통신공학,
  학점은행제it전공,학점은행제대학교편입,학점은행제4년제편입,학점은행제상담,학점은행제문의,학습플래너,  `,
  openGraph: {
    title: '레포트전부모아',
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
