'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  onLoginClick: () => void
  onContactClick: () => void
}

export default function Header({ onLoginClick, onContactClick }: HeaderProps) {
  const router = useRouter()
  
  const handleLogoClick = () => {
    // 메인으로 이동하면서 완전 새로고침
    window.location.href = '/'
  }
  
  return (
    <header>
      <nav>
        <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          🎓 학점은행 A+
        </div>
        <ul className="nav-menu">
          <li>
            <a onClick={onContactClick}>문의하기</a>
          </li>
        </ul>
        <button className="login-btn" onClick={onLoginClick}>
          로그인
        </button>
      </nav>
    </header>
  )
}