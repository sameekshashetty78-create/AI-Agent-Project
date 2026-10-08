export default function TopicInput({ topic, onChange, onSubmit, isRunning, error }) {
  return (
    <section className="panel launch-panel" aria-labelledby="launch-heading">
      <div className="panel-heading">
        <p className="eyebrow">Mission control</p>
        <h2 id="launch-heading">Start autonomous research</h2>
        <p className="lede">
          Enter a topic. Four specialist agents explore, gather evidence, write a brief, then verify claims.
        </p>
      </div>

      <form
        className="launch-form"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <label htmlFor="research-topic">Research topic</label>
        <div className="launch-row">
          <input
            id="research-topic"
            name="topic"
            type="text"
            value={topic}
            onChange={(event) => onChange(event.target.value)}
            placeholder="e.g. Multi-agent systems for scientific discovery"
            disabled={isRunning}
            autoComplete="off"
          />
          <button type="submit" className="primary-btn" disabled={isRunning}>
            {isRunning ? 'Researching…' : 'Start Research'}
          </button>
        </div>
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : (
          <p className="hint">Backend is mocked for the demo. Results appear after the agent workflow completes.</p>
        )}
      </form>
    </section>
  )
}
