export default function TopicForm({ topic, onTopicChange, onStart, onReset, phase }) {
  const running = phase === 'running'
  const canStart = topic.trim().length > 2 && !running

  function handleSubmit(event) {
    event.preventDefault()
    onStart()
  }

  return (
    <section className="panel topic-panel" aria-labelledby="topic-heading">
      <div className="panel-head">
        <h2 id="topic-heading">Research topic</h2>
        <p>Describe what the team should investigate. Agents will run in sequence.</p>
      </div>

      <form className="topic-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="research-topic">
          Research topic
        </label>
        <textarea
          id="research-topic"
          name="topic"
          rows={3}
          maxLength={280}
          placeholder="e.g. Climate-resilient urban agriculture in South Asia"
          value={topic}
          onChange={(event) => onTopicChange(event.target.value)}
          disabled={running}
        />
        <div className="topic-actions">
          <span className="hint">{topic.trim().length}/280</span>
          <div className="button-row">
            {(phase === 'complete' || phase === 'error') && (
              <button type="button" className="btn ghost" onClick={onReset}>
                New run
              </button>
            )}
            <button type="submit" className="btn primary" disabled={!canStart}>
              {running ? 'Research in progress…' : 'Start Research'}
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}
