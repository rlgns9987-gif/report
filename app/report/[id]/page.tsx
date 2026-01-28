import { Metadata } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import ReportDetailClient from './ReportDetailClient'

interface Report {
  id: number
  title: string
  date: string
  preview: string
}

async function getReports(): Promise<Report[]> {
  const filePath = path.join(process.cwd(), 'public', 'reports.json')
  const jsonData = await fs.readFile(filePath, 'utf8')
  return JSON.parse(jsonData)
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const reports = await getReports()
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
        siteName: '레포트전부모아',
      },
    }
  } catch {
    return {
      title: '학점은행제 A+ 레포트',
      description: '고품질 레포트 보관함',
    }
  }
}

export default async function ReportDetailPage({ params }: { params: { id: string } }) {
  let report: Report | null = null
  try {
    const reports = await getReports()
    report = reports.find(r => r.id === parseInt(params.id)) || null
  } catch {
    // fallback to null
  }

  return <ReportDetailClient id={params.id} initialReport={report} />
}
