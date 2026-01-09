'use client'

import { useState, KeyboardEvent } from 'react'

interface SearchSectionProps {
  onSearch: (query: string) => void
  searchQuery: string
}

export default function SearchSection({ onSearch, searchQuery }: SearchSectionProps) {
  const [inputValue, setInputValue] = useState(searchQuery)

  const handleSearch = () => {
    onSearch(inputValue)
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="search-section">
      <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
        <input
          type="text"
          className="search-box"
          placeholder="레포트 주제를 입력하세요..."
          style={{ flex: 1 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="search-btn" onClick={handleSearch}>
          검색
        </button>
      </div>
    </div>
  )
}
