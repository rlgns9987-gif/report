import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server'
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, institution, topic } = body

    // 여기서 실제로는 이메일 전송 서비스나 데이터베이스에 저장
    // 예: SendGrid, Nodemailer, 또는 Notion API 등
    console.log('Contact form submission:', { name, phone, institution, topic })
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // 도메인 연결 전 고정값
      to: 'rlgns9987@gmail.com',       // 테스트용 본인 메일 주소
      subject: "레포트 문의",
      html: `
        <h1>새로운 문의가 접수되었습니다</h1>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>전화번호:</strong> ${phone}</p>
        <p><strong>교육원 이름:</strong> ${institution}</p>
        <p><strong>주제:</strong> ${topic}</p>
      `,
    });
    return NextResponse.json({ success: true,data }, { status: 200 })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
