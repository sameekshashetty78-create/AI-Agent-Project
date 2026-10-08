import { useCallback, useRef, useState } from 'react'
import { startResearchRun } from '../api/mockResearch'

const idleStatuses = {
  explore: 'idle',
  gather: 'idle',
  write: 'idle',
  verify: 'idle',
}

const idleDetails = {
  explore: 'Waiting to map the problem space.',
  gather: 'Waiting to collect sources.',
  write: 'Waiting to draft the brief.',
  verify: 'Waiting to check claims.',
}

export function useResearch() {
  const [topic, setTopic] = useState('')
  const [phase, setPhase] = useState('idle')
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [agentStatus, setAgentStatus] = useState(idleStatuses)
  const [agentDetail, setAgentDetail] = useState(idleDetails)
  const runId = useRef(0)

  const resetAgents = useCallback(() => {
    setAgentStatus(idleStatuses)
    setAgentDetail(idleDetails)
  }, [])

  const startResearch = useCallback(async () => {
    const nextTopic = topic.trim()
    if (!nextTopic) {
      setError('Enter a research topic to begin.')
      return
    }

    const currentRun = ++runId.current
    setError('')
    setResult(null)
    setPhase('running')
    resetAgents()

    try {
      const payload = await startResearchRun({
        topic: nextTopic,
        onAgentUpdate: ({ id, status, detail }) => {
          if (currentRun !== runId.current) return
          setAgentStatus((prev) => ({ ...prev, [id]: status }))
          setAgentDetail((prev) => ({ ...prev, [id]: detail }))
        },
      })

      if (currentRun !== runId.current) return
      setResult(payload)
      setPhase('complete')
    } catch (err) {
      if (currentRun !== runId.current) return
      setPhase('error')
      setError(err.message || 'Research run failed. Try again.')
    }
  }, [resetAgents, topic])

  return {
    topic,
    setTopic,
    phase,
    error,
    result,
    agentStatus,
    agentDetail,
    startResearch,
    isRunning: phase === 'running',
  }
}
