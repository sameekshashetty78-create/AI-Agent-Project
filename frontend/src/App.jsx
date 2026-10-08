import Header from './components/Header'
import TopicInput from './components/TopicInput'
import AgentWorkflow from './components/AgentWorkflow'
import ResearchResults from './components/ResearchResults'
import SourcesList from './components/SourcesList'
import ResearchReport from './components/ResearchReport'
import DownloadButton from './components/DownloadButton'
import { useResearch } from './hooks/useResearch'
import './App.css'

export default function App() {
  const research = useResearch()

  return (
    <div className="app-shell">
      <Header />
      <main className="dashboard">
        <TopicInput
          topic={research.topic}
          onChange={research.setTopic}
          onSubmit={research.startResearch}
          isRunning={research.isRunning}
          error={research.error}
        />
        <AgentWorkflow
          agentStatus={research.agentStatus}
          agentDetail={research.agentDetail}
          phase={research.phase}
        />
        <ResearchResults result={research.result} />
        <div className="split-grid">
          <SourcesList sources={research.result?.sources} />
          <ResearchReport report={research.result?.report} />
        </div>
        <footer className="app-footer">
          <p>Track 2 · AI Research Team · Mock API until backend is connected.</p>
          <DownloadButton result={research.result} />
        </footer>
      </main>
    </div>
  )
}
