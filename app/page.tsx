'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import SearchSection from '@/components/SearchSection'
import ReportGrid from '@/components/ReportGrid'
import Pagination from '@/components/Pagination'
import LoginModal from '@/components/LoginModal'
import ContactModal from '@/components/ContactModal'
import Footer from '@/components/Footer'

export interface Report {
  id: number
  title: string
  date: string
  preview: string
}

export default function Home() {
  const [reports, setReports] = useState<Report[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

  useEffect(() => {
    // 세션 스토리지에서 데이터 로드
    const sessionData = sessionStorage.getItem('reportsData')
    if (sessionData) {
      setReports(JSON.parse(sessionData))
    } else {
      // JSON 파일에서 로드
      fetch('/reports.json')
        .then(res => res.json())
        .then(data => {
          setReports(data)
          sessionStorage.setItem('reportsData', JSON.stringify(data))
        })
        .catch(err => console.error('Error loading reports:', err))
    }
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

const filteredReports = reports
  .map(r => {
    const query = searchQuery.toLowerCase()
    const titleMatch = r.title.toLowerCase().includes(query)
    const previewMatch = r.preview.toLowerCase().includes(query)
    
    // 우선순위 점수 부여
    let score = 0
    if (titleMatch) score += 2  // 제목 매치 = 높은 점수
    if (previewMatch) score += 1 // 내용 매치 = 낮은 점수
    
    return { ...r, score }
  })
  .filter(r => r.score > 0)  // 점수 있는 것만
  .sort((a, b) => b.score - a.score)  // 점수 높은 순으로 정렬

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentReports = filteredReports.slice(startIndex, endIndex)

  return (
    <>
      <Header 
        onLoginClick={() => setShowLoginModal(true)}
        onContactClick={() => setShowContactModal(true)}
      />
      
      <Hero />
      <SearchSection onSearch={handleSearch} searchQuery={searchQuery} />
      
      <main className="container">
        <h2 className="section-title">최신 업로드 레포트</h2>
        {currentReports.length > 0 ? (
          <>
            <ReportGrid reports={currentReports} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="no-results">
            검색 결과가 없습니다. 다른 키워드로 검색해보세요.
          </div>
        )}
      </main>

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
