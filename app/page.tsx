'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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

function HomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [reports, setReports] = useState<Report[]>([])
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'))
  const [itemsPerPage] = useState(6)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

  useEffect(() => {
    const sessionData = sessionStorage.getItem('reportsData')
    if (sessionData) {
      setReports(JSON.parse(sessionData))
    } else {
      fetch('/reports.json')
        .then(res => res.json())
        .then(data => {
          setReports(data)
          sessionStorage.setItem('reportsData', JSON.stringify(data))
        })
        .catch(err => console.error('Error loading reports:', err))
    }
  }, [])

  // URL 업데이트
  // useEffect(() => {
  //   const params = new URLSearchParams()
  //   if (searchQuery) params.set('q', searchQuery)
  //   if (currentPage > 1) params.set('page', currentPage.toString())
    
  //   const newUrl = params.toString() ? `/?${params.toString()}` : '/'
  //   router.replace(newUrl, { scroll: false })
  // }, [searchQuery, currentPage, router])

  useEffect(() => {
    const pageParam = searchParams.get('page')
    const queryParam = searchParams.get('q')
    
    if (pageParam) {
      setCurrentPage(parseInt(pageParam))
    }
    if (queryParam !== null) {
      setSearchQuery(queryParam)
    }
  }, [searchParams])
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    router.push(`/?${params.toString()}`, { scroll: false })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    sessionStorage.setItem('lastPage', page.toString())
    sessionStorage.setItem('lastQuery', searchQuery)
    
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (page > 1) params.set('page', page.toString())
    router.push(`/?${params.toString()}`, { scroll: false })
  }

  const filteredReports = reports
    .map(r => {
      const query = searchQuery.toLowerCase()
      const titleMatch = r.title.toLowerCase().includes(query)
      const previewMatch = r.preview.toLowerCase().includes(query)
      
      let score = 0
      if (titleMatch) score += 2
      if (previewMatch) score += 1
      
      return { ...r, score }
    })
    .filter(r => r.score > 0)
    .sort((a, b) => {
      if (searchQuery) {
        if (b.score !== a.score) return b.score - a.score
      }
      return b.id - a.id
    })

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
              onPageChange={handlePageChange}
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

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}