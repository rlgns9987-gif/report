import { NextResponse } from 'next/server'

export async function GET() {
  const fs = require('fs').promises
  const path = require('path')
  
  try {
    // reports.json 읽기
    const filePath = path.join(process.cwd(), 'public', 'reports.json')
    const jsonData = await fs.readFile(filePath, 'utf8')
    const reports = JSON.parse(jsonData)
    
    const baseUrl = 'https://www.xn--om2b21cn6ci3lrqdy3uu4b.com'
    
    // 최신 20개만
    const latestReports = reports
      .sort((a: any, b: any) => b.id - a.id)
      .slice(0, 20)
    
    // RSS XML 생성
    const rssItems = latestReports.map((report: any) => `
    <item>
      <title><![CDATA[${report.title}]]></title>
      <link>${baseUrl}/report/${report.id}</link>
      <description><![CDATA[${report.preview.substring(0, 200)}...]]></description>
      <pubDate>${new Date(report.date.replace(/\./g, '-')).toUTCString()}</pubDate>
      <guid>${baseUrl}/report/${report.id}</guid>
    </item>`).join('')
    
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>레포트전부모아</title>
    <link>${baseUrl}</link>
    <description>학점은행제 A+ 고품질 검증된 레포트 보관함</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`
    
    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    })
  } catch (error) {
    return new NextResponse('Error generating RSS', { status: 500 })
  }
}