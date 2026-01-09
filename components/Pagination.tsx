'use client'

import { useEffect, useState } from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isSmallMobile, setIsSmallMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
      setIsSmallMobile(window.innerWidth <= 375)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (totalPages <= 1) return null

  const pageGroupSize = isSmallMobile ? 3 : isMobile ? 5 : 10
  const currentGroup = Math.ceil(currentPage / pageGroupSize)
  const startPage = (currentGroup - 1) * pageGroupSize + 1
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages)

  const handlePageChange = (page: number) => {
    onPageChange(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="pagination">
      {!isMobile && currentPage > 1 && (
        <button className="page-btn" onClick={() => handlePageChange(1)}>
          «
        </button>
      )}

      <button
        className="page-btn"
        disabled={currentGroup === 1}
        onClick={() => handlePageChange(startPage - 1)}
      >
        {isMobile ? '‹' : '‹ 이전'}
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
        <button
          key={page}
          className={`page-btn ${page === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="page-btn"
        disabled={endPage === totalPages}
        onClick={() => handlePageChange(endPage + 1)}
      >
        {isMobile ? '›' : '다음 ›'}
      </button>

      {!isMobile && currentPage < totalPages && (
        <button className="page-btn" onClick={() => handlePageChange(totalPages)}>
          »
        </button>
      )}
    </div>
  )
}
