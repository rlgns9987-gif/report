import { Metadata } from 'next'
import ReportDetailClient from './ReportDetailClient'

interface Report {
  id: number
  title: string
  date: string
  preview: string
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/reports.json`, {
      cache: 'no-store'
    })
    const reports: Report[] = await res.json()
    const report = reports.find(r => r.id === parseInt(params.id))
    
    if (!report) {
      return {
        title: '레포트를 찾을 수 없습니다 | 학점은행제 A+ 레포트',
        description: '요청하신 레포트를 찾을 수 없습니다.',
      }
    }

    return {
      title: `${report.title} | 학점은행제 A+ 레포트`,
      description: report.preview.substring(0, 150) + '...',
      openGraph: {
        title: report.title,
        description: report.preview.substring(0, 150) + '...',
        type: 'article',
        publishedTime: report.date,
      },
    }
  } catch (error) {
    return {
      title: '학점은행제 A+ 레포트',
      description: '고품질 레포트 보관함',
    }
  }
}

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  return <ReportDetailClient id={params.id} />
}