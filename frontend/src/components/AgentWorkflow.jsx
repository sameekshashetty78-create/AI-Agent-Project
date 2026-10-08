import { AGENTS } from '../data/agents'
import AgentCard from './AgentCard'

export default function AgentWorkflow({ agentStatus, agentDetail, phase }) {
  return (
    <section className="panel" aria-labelledby="workflow-heading">
      <div className="panel-heading">
        <p className="eyebrow">Live pipeline</p>
        <h2 id="workflow-heading">AI agent workflow</h2>
        <p className="lede">
          {phase === 'running'
            ? 'Agents are collaborating on this topic.'
            : phase === 'complete'
              ? 'All agents finished. Review the brief below.'
              : 'Idle until you start a run.'}
        </p>
      </div>
      <div className="agent-grid">
        {AGENTS.map((agent, index) => (
          <div key={agent.id} className="agent-step">
            <AgentCard
              agent={agent}
              status={agentStatus[agent.id]}
              detail={agentDetail[agent.id]}
            />
            {index < AGENTS.length - 1 ? <div className="agent-connector" aria-hidden="true" /> : null}
          </div>
        ))}
      </div>
    </section>
  )
}
