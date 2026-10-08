export default function ResearchResults({ result }) {
  if (!result) {
    return (
      <section className="panel" aria-labelledby="results-heading">
        <div className="panel-heading">
          <p className="eyebrow">Output</p>
          <h2 id="results-heading">Research results</h2>
        </div>
        <div className="empty-state">
          <p>No results yet. Start a run to generate a summary, sources, and a full report.</p>
        </div>
      </section>
    )
  }

  const { summary, confidence } = result

  return (
    <section className="panel" aria-labelledby="results-heading">
      <div className="panel-heading split">
        <div>
          <p className="eyebrow">Output</p>
          <h2 id="results-heading">Research results</h2>
          <p className="lede">{summary.headline}</p>
        </div>
        <div className="confidence">
          <span>Confidence</span>
          <strong>{Math.round(confidence * 100)}%</strong>
        </div>
      </div>
      <p className="summary-body">{summary.overview}</p>
      <div className="findings-grid">
        <div>
          <h3>Key findings</h3>
          <ol>
            {summary.keyFindings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <div>
          <h3>Open questions</h3>
          <ul>
            {summary.openQuestions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
