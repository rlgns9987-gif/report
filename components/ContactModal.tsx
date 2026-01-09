'use client'

import { useState, FormEvent, useEffect } from 'react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [showForm, setShowForm] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [institution, setInstitution] = useState('')
  const [topic, setTopic] = useState('')
  const [privacyAgree, setPrivacyAgree] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
      setShowForm(true)
      setShowSuccess(false)
      setName('')
      setPhone('')
      setInstitution('')
      setTopic('')
      setPrivacyAgree(false)
    }
  }, [isOpen])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      // API Route로 전송
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          institution,
          topic,
        }),
      })

      if (response.ok) {
        setShowForm(false)
        setShowSuccess(true)

        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        throw new Error('전송 실패')
      }
    } catch (error) {
      alert('문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.')
      console.error('Error:', error)
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
            <h2 className="modal-title">문의하기</h2>

            <div className="info-box">
              <strong>📞 문의 안내</strong>
              <br />
              레포트 관련 문의사항을 남겨주시면 빠르게 답변드리겠습니다.
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>이름 *</label>
                <input
                  type="text"
                  placeholder="홍길동"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>전화번호 *</label>
                <input
                  type="tel"
                  placeholder="010-1234-5678"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>수강중인 교육원 *</label>
                <input
                  type="text"
                  placeholder="예: 숭실원격교육원"
                  required
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>레포트 주제 *</label>
                <input
                  type="text"
                  placeholder="예: 청소년관련법 중 한 가지를 선택하여 기술하고..."
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div style={{ margin: '2rem 0 1.5rem 0' }}>
                <div
                  style={{
                    background: 'rgba(157, 78, 221, 0.05)',
                    border: '1px solid rgba(157, 78, 221, 0.2)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    marginBottom: '1rem',
                  }}
                >
                  <h4 style={{ color: '#c77dff', marginBottom: '1rem', fontSize: '1rem' }}>
                    개인정보 수집 및 이용 동의
                  </h4>
                  <div style={{ color: '#b0b0b0', fontSize: '0.9rem', lineHeight: 1.8 }}>
                    <p style={{ marginBottom: '1rem' }}>
                      레포트전부모아(이하 '회사'라 한다)는 개인정보 보호법 제30조에 따라 정보 주체의 개인정보를
                      보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이
                      개인정보 처리지침을 수립, 공개합니다.
                    </p>

                    <p style={{ marginBottom: '0.8rem' }}>
                      <strong style={{ color: '#c77dff' }}>제1조 (개인정보의 처리목적)</strong>
                    </p>
                    <p style={{ marginBottom: '1rem' }}>
                      회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적
                      이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에
                      따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                    </p>

                    <p style={{ marginBottom: '0.5rem' }}>1. 홈페이지 회원 가입 및 관리</p>
                    <p style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
                      회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별․인증, 회원자격 유지․관리, 각종
                      고지․통지, 고충 처리 등을 목적으로 개인정보를 처리합니다.
                    </p>

                    <p style={{ marginBottom: '0.5rem' }}>2. 재화 또는 서비스 제공</p>
                    <p style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
                      서비스 제공, 콘텐츠 제공, 맞춤서비스 제공, 본인인증 등을 목적으로 개인정보를 처리합니다.
                    </p>

                    <p style={{ marginBottom: '0.5rem' }}>3. 고충 처리</p>
                    <p style={{ marginBottom: '1.5rem', paddingLeft: '1rem' }}>
                      민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락․통지, 처리 결과 통보 등의 목적으로
                      개인정보를 처리합니다.
                    </p>

                    <p style={{ marginBottom: '0.8rem' }}>
                      <strong style={{ color: '#c77dff' }}>제2조 (처리하는 개인정보 항목)</strong>
                    </p>
                    <p style={{ marginBottom: '1rem' }}>회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
                    <p style={{ marginBottom: '0.5rem' }}>
                      필수항목: 성명, 전화번호, 교육원명, 레포트 주제
                    </p>

                    <p style={{ marginBottom: '0.8rem' }}>
                      <strong style={{ color: '#c77dff' }}>제3조 (개인정보의 보유 및 이용기간)</strong>
                    </p>
                    <p style={{ marginBottom: '1rem' }}>
                      회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집시에 동의받은
                      개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다. 문의 처리 완료 후 즉시
                      파기하며, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.
                    </p>

                    <p style={{ marginBottom: '0.8rem' }}>
                      <strong style={{ color: '#c77dff' }}>제4조 (정보주체의 권리)</strong>
                    </p>
                    <p style={{ marginBottom: '1rem' }}>
                      정보주체는 회사에 대해 언제든지 개인정보 열람, 정정, 삭제, 처리정지 요구 등의 권리를
                      행사할 수 있습니다.
                    </p>
                  </div>
                </div>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: '#e0e0e0',
                    fontSize: '0.95rem',
                  }}
                >
                  <input
                    type="checkbox"
                    required
                    checked={privacyAgree}
                    onChange={(e) => setPrivacyAgree(e.target.checked)}
                    style={{
                      width: '18px',
                      height: '18px',
                      marginRight: '0.7rem',
                      cursor: 'pointer',
                      accentColor: '#9d4edd',
                    }}
                  />
                  <span>
                    개인정보 수집 및 이용에 동의합니다. <span style={{ color: '#ff6b6b' }}>*</span>
                  </span>
                </label>
              </div>

              <button type="submit" className="submit-btn">
                문의하기
              </button>
            </form>
          </div>
        )}

        {showSuccess && (
          <div className="success-message active">
            <div className="success-icon">✅</div>
            <h2 style={{ color: '#c77dff', marginBottom: '1rem' }}>문의가 접수되었습니다!</h2>
            <p style={{ color: '#999', lineHeight: 1.8 }}>
              빠른 시일 내에 연락드리겠습니다.
              <br />
              <br />
              감사합니다. 😊
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
