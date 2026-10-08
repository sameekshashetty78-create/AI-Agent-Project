import { formatReportText } from '../api/mockResearch'
import { DownloadIcon } from './Icons'

export default function DownloadButton({ result }) {
  const disabled = !result

  function handleDownload() {
    if (!result) return
    const blob = new Blob([formatReportText(result)], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const slug = result.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    link.href = url
    link.download = `${slug || 'research'}-report.txt`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <button type="button" className="download-btn" onClick={handleDownload} disabled={disabled}>
      <DownloadIcon />
      Download Report
    </button>
  )
}
