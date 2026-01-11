'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LoginModal from '@/components/LoginModal'
import ContactModal from '@/components/ContactModal'

interface Report {
  id: number
  title: string
  date: string
  preview: string
}

export default function ReportDetailClient({ id }: { id: string }) {
  const router = useRouter()
  const [report, setReport] = useState<Report | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

  useEffect(() => {
    const sessionData = sessionStorage.getItem('reportsData')
    let reports: Report[] = []

    if (sessionData) {
      reports = JSON.parse(sessionData)
      const foundReport = reports.find(r => r.id === parseInt(id))
      if (foundReport) {
        setReport(foundReport)
      } else {
        router.push('/')
      }
    } else {
      fetch('/reports.json')
        .then(res => res.json())
        .then(data => {
          sessionStorage.setItem('reportsData', JSON.stringify(data))
          const foundReport = data.find((r: Report) => r.id === parseInt(id))
          if (foundReport) {
            setReport(foundReport)
          } else {
            router.push('/')
          }
        })
        .catch(() => router.push('/'))
    }
  }, [id, router])

  const handleDownload = () => {
    alert('로그인이 필요한 서비스입니다.\n비회원은 문의해주세요.')
    setShowContactModal(true)
  }

  if (!report) {
    return (
      <>
        <Header 
          onLoginClick={() => setShowLoginModal(true)}
          onContactClick={() => setShowContactModal(true)}
        />
        <div className="container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <p>로딩 중...</p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header 
        onLoginClick={() => setShowLoginModal(true)}
        onContactClick={() => setShowContactModal(true)}
      />

      <div className="detail-page">
        <button className="back-btn" onClick={() => router.back()}>
          ← 목록으로 돌아가기
        </button>

        <div className="detail-header">
          <h1 className="detail-title">{report.title}</h1>
          <div className="detail-meta">
            <span>📅 {report.date}</span>
          </div>
        </div>

        <div className="preview-section">
          <h3>레포트 미리보기</h3>
          <div className="preview-content">{report.preview}</div>

          <div className="blurred-content">
            본론 내용이 여기에 계속됩니다... 이론적 배경과 실증 분석, 사례 연구 등이 상세히 포함되어 있습니다. 
            전문적인 문헌 고찰과 함께 깊이 있는 분석이 이어집니다. 관련 이론들을 체계적으로 정리하고, 
            실제 사례를 통해 이론의 적용 가능성을 검증합니다. 다양한 선행 연구를 참고하여 학술적 깊이를 더하고, 
            비판적 분석을 통해 새로운 시사점을 도출합니다.
          </div>
        </div>

        <div className="download-section">
          <h3>🔒 전체 내용 확인하기</h3>
          <p>로그인 후 전체 레포트를 다운로드하실 수 있습니다.</p>
          <button className="download-btn" onClick={handleDownload}>
            다운로드 요청
          </button>
        </div>
      </div>

      <Footer />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </>
  )
}