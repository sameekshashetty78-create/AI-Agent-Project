export default function SourcesList({ sources = [] }) {
  return (
    <section className="panel" aria-labelledby="sources-heading">
      <div className="panel-heading">
        <p className="eyebrow">Evidence</p>
        <h2 id="sources-heading">Sources and citations</h2>
        <p className="lede">Placeholder records until the gathering agent is connected to a live corpus.</p>
      </div>
      {sources.length === 0 ? (
        <div className="empty-state">
          <p>Citations will appear here after a research run.</p>
        </div>
      ) : (
        <ol className="source-list">
          {sources.map((source, index) => (
            <li key={source.id} className="source-card">
              <span className="source-index">{index + 1}</span>
              <div>
                <p className="source-title">{source.title}</p>
                <p className="source-meta">
                  {source.authors} · {source.year} · {source.type}
                </p>
                <p className="source-note">{source.note}</p>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.url}
                </a>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
