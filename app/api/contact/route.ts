import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, institution, topic } = body

    // 여기서 실제로는 이메일 전송 서비스나 데이터베이스에 저장
    // 예: SendGrid, Nodemailer, 또는 Notion API 등
    console.log('Contact form submission:', { name, phone, institution, topic })

    // Netlify Forms 대신 여기서 처리
    // 실제 배포 시에는 이메일 전송 서비스 연동 필요
    
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
