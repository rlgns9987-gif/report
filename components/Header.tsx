'use client'

import Link from 'next/link'

interface HeaderProps {
  onLoginClick: () => void
  onContactClick: () => void
}

export default function Header({ onLoginClick, onContactClick }: HeaderProps) {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          🎓 학점은행 A+
        </Link>
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
