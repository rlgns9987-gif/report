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
                      <strong style={{ color: '#c77dff' }}>제2조 (개인정보의 처리 및 보유기간)</strong>
                    </p>
                    <p style={{ marginBottom: '0.5rem' }}>
                      ① 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집시에 동의받은
                      개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                    </p>
                    <p style={{ marginBottom: '1rem' }}>
                      ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
                    </p>
                    <p style={{ marginBottom: '0.5rem', paddingLeft: '1rem' }}>
                      1. 홈페이지 회원 가입 및 관리 : 사업자/단체 홈페이지 탈퇴 시까지
                    </p>
                    <p style={{ marginBottom: '0.3rem', paddingLeft: '2rem' }}>
                      1) 관계 법령 위반에 따른 수사, 조사 등이 진행 중인 경우에는 해당 수사, 조사 종료 시까지
                    </p>
                    <p style={{ marginBottom: '1rem', paddingLeft: '2rem' }}>
                      2) 홈페이지 이용에 따른 채권 및 채무관계 잔존 시에는 해당 채권, 채무 관계 정산 시까지
                    </p>

                    <p style={{ marginBottom: '0.8rem' }}>
                      <strong style={{ color: '#c77dff' }}>제3조 (처리하는 개인정보 항목)</strong>
                    </p>
                    <p style={{ marginBottom: '1rem' }}>회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
                    <p style={{ marginBottom: '1.5rem', paddingLeft: '1rem' }}>
                      필수항목: 성명, 전화번호, 교육원명, 레포트 주제
                    </p>

                    <p style={{ marginBottom: '0.8rem' }}>
                      <strong style={{ color: '#c77dff' }}>제4조 (정보주체의 권리와 그 행사 방법)</strong>
                    </p>
                    <p style={{ marginBottom: '0.5rem' }}>
                      ① 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
                    </p>
                    <p style={{ marginBottom: '0.3rem', paddingLeft: '1rem' }}>1. 개인정보 열람 요구</p>
                    <p style={{ marginBottom: '0.3rem', paddingLeft: '1rem' }}>2. 오류 등이 있을 경우 정정 요구</p>
                    <p style={{ marginBottom: '0.3rem', paddingLeft: '1rem' }}>3. 삭제요구</p>
                    <p style={{ marginBottom: '0.5rem', paddingLeft: '1rem' }}>4. 처리정지 요구</p>
                    <p style={{ marginBottom: '0.5rem' }}>
                      ② 제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.
                    </p>
                    <p style={{ marginBottom: '1rem' }}>
                      ③ 정보주체는 개인정보 보호법 등 관계 법령을 위반하여 회사가 처리하고 있는 정보주체 본인이나 타인의 개인정보 및 사생활을 침해하여서는 아니 됩니다.
                    </p>

                    <p style={{ marginBottom: '0.8rem' }}>
                      <strong style={{ color: '#c77dff' }}>제5조 (개인정보의 파기)</strong>
                    </p>
                    <p style={{ marginBottom: '0.5rem' }}>
                      ① 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
                    </p>
                    <p style={{ marginBottom: '0.5rem' }}>
                      ② 개인정보 파기의 절차 및 방법은 다음과 같습니다.
                    </p>
                    <p style={{ marginBottom: '0.5rem', paddingLeft: '1rem' }}>
                      1. 파기절차: 회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.
                    </p>
                    <p style={{ marginBottom: '1.5rem', paddingLeft: '1rem' }}>
                      2. 파기방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.
                    </p>

                    <p style={{ marginBottom: '0.8rem' }}>
                      <strong style={{ color: '#c77dff' }}>제6조 (개인정보의 안전성 확보조치)</strong>
                    </p>
                    <p style={{ marginBottom: '0.5rem' }}>
                      회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 하고 있습니다.
                    </p>
                    <p style={{ marginBottom: '0.3rem', paddingLeft: '1rem' }}>
                      1. 관리적 조치: 내부관리계획 수립 및 시행, 정기적 직원 교육 등
                    </p>
                    <p style={{ marginBottom: '0.3rem', paddingLeft: '1rem' }}>
                      2. 기술적 조치: 개인정보처리시스템 등의 접근 권한 관리, 접근통제시스템 설치, 고유 식별정보 등의 암호화, 보안프로그램 설치
                    </p>
                    <p style={{ marginBottom: '1.5rem', paddingLeft: '1rem' }}>
                      3. 물리적 조치: 전산실, 자료보관실 등의 접근통제
                    </p>

                    <p style={{ marginBottom: '0.8rem' }}>
                      <strong style={{ color: '#c77dff' }}>제7조 (개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항)</strong>
                    </p>
                    <p style={{ marginBottom: '0.5rem' }}>
                      ① 회사는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.
                    </p>
                    <p style={{ marginBottom: '0.5rem' }}>
                      ② 쿠키는 웹사이트를 운영하는데 이용되는 서버가 이용자의 컴퓨터 브라우저에 보내는 소량의 정보이며 이용자들의 컴퓨터 내의 하드디스크에 저장되기도 합니다.
                    </p>
                    <p style={{ marginBottom: '0.3rem', paddingLeft: '1rem' }}>
                      가. 쿠키의 사용 목적: 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.
                    </p>
                    <p style={{ marginBottom: '0.3rem', paddingLeft: '1rem' }}>
                      나. 쿠키의 설치·운영 및 거부: 웹브라우저 상단의 도구&gt;인터넷 옵션&gt;개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.
                    </p>
                    <p style={{ marginBottom: '1.5rem', paddingLeft: '1rem' }}>
                      다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.
                    </p>

                    <p style={{ marginBottom: '0.8rem' }}>
                      <strong style={{ color: '#c77dff' }}>제8조 (개인정보 보호책임자)</strong>
                    </p>
                    <p style={{ marginBottom: '0.5rem' }}>
                      회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                    </p>
                    <p style={{ marginBottom: '0.3rem', paddingLeft: '1rem' }}>▶ 개인정보 보호책임자</p>
                    <p style={{ marginBottom: '0.3rem', paddingLeft: '1rem' }}>성명: 유기훈</p>
                    <p style={{ marginBottom: '1.5rem', paddingLeft: '1rem' }}>이메일: rlgns987@naver.com</p>

                    <p style={{ marginBottom: '0.8rem' }}>
                      <strong style={{ color: '#c77dff' }}>제9조 (개인정보 열람청구)</strong>
                    </p>
                    <p style={{ marginBottom: '0.5rem' }}>
                      정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다. 회사는 정보주체의 개인정보 열람 청구가 신속하게 처리되도록 노력하겠습니다.
                    </p>
                    <p style={{ marginBottom: '0.3rem', paddingLeft: '1rem' }}>▶ 개인정보 열람청구 접수·처리 부서</p>
                    <p style={{ marginBottom: '1.5rem', paddingLeft: '1rem' }}>이메일: rlgns987@naver.com</p>

                    <p style={{ marginBottom: '0.8rem' }}>
                      <strong style={{ color: '#c77dff' }}>제10조 (권익침해 구제 방법)</strong>
                    </p>
                    <p style={{ marginBottom: '0.5rem' }}>
                      정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다.
                    </p>
                    <p style={{ marginBottom: '0.3rem', paddingLeft: '1rem' }}>▶ 개인정보 침해신고센터 (한국인터넷진흥원 운영)</p>
                    <p style={{ marginBottom: '0.3rem', paddingLeft: '2rem' }}>소관 업무: 개인정보 침해사실 신고, 상담 신청</p>
                    <p style={{ marginBottom: '0.3rem', paddingLeft: '2rem' }}>홈페이지: privacy.kisa.or.kr</p>
                    <p style={{ marginBottom: '0.3rem', paddingLeft: '2rem' }}>전화: (국번없이) 118</p>
                    <p style={{ marginBottom: '1rem', paddingLeft: '2rem' }}>주소: (58324) 전남 나주시 진흥길 9(빛가람동 301-2) 3층 개인정보침해신고센터</p>

                    <p style={{ marginBottom: '0.3rem', paddingLeft: '1rem' }}>▶ 개인정보 분쟁조정위원회</p>
                    <p style={{ marginBottom: '0.3rem', paddingLeft: '2rem' }}>소관업무: 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)</p>
                    <p style={{ marginBottom: '0.3rem', paddingLeft: '2rem' }}>홈페이지: www.kopico.go.kr</p>
                    <p style={{ marginBottom: '0.3rem', paddingLeft: '2rem' }}>전화: (국번없이) 1833-6972</p>
                    <p style={{ marginBottom: '1rem', paddingLeft: '2rem' }}>주소: (03171)서울특별시 종로구 세종대로 209 정부서울청사 4층</p>

                    <p style={{ marginBottom: '0.3rem', paddingLeft: '1rem' }}>▶ 대검찰청 사이버범죄수사단: 02-3480-3573 (www.spo.go.kr)</p>
                    <p style={{ marginBottom: '1.5rem', paddingLeft: '1rem' }}>▶ 경찰청 사이버안전국: 182 (http://cyberbureau.police.go.kr)</p>

                    <p style={{ marginBottom: '0.8rem' }}>
                      <strong style={{ color: '#c77dff' }}>제11조 (개인정보 처리방침 변경)</strong>
                    </p>
                    <p style={{ marginBottom: '1rem' }}>
                      이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
                    </p>

                    <p style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#c77dff' }}>시행일자: 2024년 1월 10일</strong>
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
