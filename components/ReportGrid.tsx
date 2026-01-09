import Link from 'next/link'
import { Report } from '@/app/page'

interface ReportGridProps {
  reports: Report[]
}

export default function ReportGrid({ reports }: ReportGridProps) {
  return (
    <div className="report-grid">
      {reports.map((report) => (
        <Link 
          key={report.id} 
          href={`/report/${report.id}`}
          className="report-card"
        >
          <div className="report-thumbnail">📚</div>
          <div className="report-content">
            <h3 className="report-title">{report.title}</h3>
            <div className="report-meta">
              <span>📅 {report.date}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
