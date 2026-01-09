export default function Footer() {
  return (
    <footer>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginBottom: '2rem',
          }}
        >
          <div>
            <h3 style={{ color: '#c77dff', fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 700 }}>
              사업자 정보
            </h3>
            <p style={{ color: '#999', fontSize: '0.9rem', lineHeight: 1.8 }}>
              대표자: 유기훈
              <br />
              이메일: rlgns987@naver.com
            </p>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(157, 78, 221, 0.1)',
            paddingTop: '2rem',
            marginTop: '2rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <p style={{ color: '#777', fontSize: '0.85rem' }}>
              © 2024 레포트전부모아. All rights reserved.
            </p>
            <p style={{ color: '#777', fontSize: '0.85rem' }}>
              본 사이트의 모든 콘텐츠는 저작권법의 보호를 받습니다.
            </p>
          </div>

          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'rgba(157, 78, 221, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(157, 78, 221, 0.1)',
            }}
          >
            <p style={{ color: '#888', fontSize: '0.8rem', lineHeight: 1.6 }}>
              ⚠️ <strong style={{ color: '#c77dff' }}>중요 안내:</strong> 본 레포트는 학습 참고자료로만
              제공되며, 무단 복제 및 표절은 학칙에 의해 처벌받을 수 있습니다. 레포트를 참고하여 본인의 생각과
              이해를 바탕으로 작성하시기 바랍니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
