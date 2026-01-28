import { promises as fs } from 'fs'
import path from 'path'
import HomeClient from './HomeClient'

export interface Report {
  id: number
  title: string
  date: string
  preview: string
}

export default async function Home() {
  let reports: Report[] = []
  try {
    const filePath = path.join(process.cwd(), 'public', 'reports.json')
    const jsonData = await fs.readFile(filePath, 'utf8')
    reports = JSON.parse(jsonData)
  } catch (error) {
    console.error('Error loading reports:', error)
  }

  return <HomeClient initialReports={reports} />
}
