'use client'

import { useState, FormEvent, useEffect } from 'react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [showForm, setShowForm] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const [loginId, setLoginId] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
      setShowForm(true)
      setShowSuccess(false)
      setLoginId('')
      setLoginPassword('')
    }
  }, [isOpen])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const validId = 'admin'
    const validPassword = '1234'

    if (loginId === validId && loginPassword === validPassword) {
      setShowForm(false)
      setShowSuccess(true)

      setTimeout(() => {
        onClose()
      }, 2000)
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.')
      setLoginPassword('')
    }
  }

  const handleClose = () => {
    onClose()
  }

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="modal active" onClick={handleModalClick}>
      <div className="modal-content">
        <button className="close-btn" onClick={handleClose}>
          ×
        </button>

        {showForm && (
          <div>
            <h2 className="modal-title">로그인</h2>

            <div className="info-box">
              <strong>🔐 회원 로그인</strong>
              <br />
              학점은행제 A+ 레포트 보관함에 오신 것을 환영합니다.
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>아이디 *</label>
                <input
                  type="text"
                  placeholder="아이디를 입력하세요"
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>비밀번호 *</label>
                <input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="submit-btn">
                로그인
              </button>
            </form>
          </div>
        )}

        {showSuccess && (
          <div className="success-message active">
            <div className="success-icon">✅</div>
            <h2 style={{ color: '#c77dff', marginBottom: '1rem' }}>로그인 성공!</h2>
            <p style={{ color: '#999', lineHeight: 1.8 }}>
              환영합니다.
              <br />
              <br />
              곧 메인 페이지로 이동합니다. 😊
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
