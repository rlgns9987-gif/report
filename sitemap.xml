import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.xn--om2b21cn6ci3lrqdy3uu4b.com'
  
  // reports.json 읽기
  const fs = require('fs').promises
  const path = require('path')
  const filePath = path.join(process.cwd(), 'public', 'reports.json')
  const jsonData = await fs.readFile(filePath, 'utf8')
  const reports = JSON.parse(jsonData)
  
  // 레포트 페이지들
  const reportPages = reports.map((report: any) => ({
    url: `${baseUrl}/report/${report.id}`,
    lastModified: new Date(report.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...reportPages,
  ]
}