import { AgentGlyph } from './Icons'

const STATUS_LABEL = {
  idle: 'Idle',
  running: 'Running',
  complete: 'Complete',
}

export default function AgentCard({ agent, status, detail }) {
  return (
    <article className={`agent-card is-${status}`}>
      <div className="agent-icon">
        <AgentGlyph name={agent.icon} />
      </div>
      <div className="agent-copy">
        <div className="agent-meta">
          <h3>{agent.name}</h3>
          <span className={`status-pill is-${status}`}>{STATUS_LABEL[status]}</span>
        </div>
        <p className="agent-role">{agent.role}</p>
        <p className="agent-detail">{detail || agent.description}</p>
        {status === 'running' ? <div className="progress-bar" aria-hidden="true" /> : null}
      </div>
    </article>
  )
}
