export default function ResearchReport({ report }) {
  return (
    <section className="panel" aria-labelledby="report-heading">
      <div className="panel-heading">
        <p className="eyebrow">Deliverable</p>
        <h2 id="report-heading">Final research report</h2>
      </div>
      {!report ? (
        <div className="empty-state">
          <p>The synthesis agent will publish a full brief here.</p>
        </div>
      ) : (
        <article className="report">
          <h3>{report.title}</h3>
          {report.sections.map((section) => (
            <section key={section.heading}>
              <h4>{section.heading}</h4>
              <p>{section.body}</p>
            </section>
          ))}
        </article>
      )}
    </section>
  )
}
