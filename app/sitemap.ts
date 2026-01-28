import { MetadataRoute } from 'next'
import { promises as fs } from 'fs'
import path from 'path'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.xn--om2b21cn6ci3lrqdy3uu4b.com'
  
  // reports.json 읽기
  const filePath = path.join(process.cwd(), 'public', 'reports.json')
  const jsonData = await fs.readFile(filePath, 'utf8')
  const reports = JSON.parse(jsonData)
  
  // 날짜 형식 변환 함수 (2024.01.02 -> 2024-01-02)
  const convertDate = (dateStr: string) => {
    try {
      // "2024.01.02" 형식을 "2024-01-02" 형식으로 변환
      const converted = dateStr.replace(/\./g, '-')
      const date = new Date(converted)
      
      // 유효한 날짜인지 확인
      if (isNaN(date.getTime())) {
        return new Date() // 유효하지 않으면 현재 날짜 반환
      }
      return date
    } catch {
      return new Date()
    }
  }
  
  // 레포트 페이지들
  const reportPages = reports.map((report: any) => ({
    url: `${baseUrl}/report/${report.id}`,
    lastModified: convertDate(report.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    ...reportPages,
  ]
}
