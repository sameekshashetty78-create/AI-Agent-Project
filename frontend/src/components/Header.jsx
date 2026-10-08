import { SparkIcon } from './Icons'

export default function Header() {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark">
          <SparkIcon />
        </span>
        <div>
          <p className="brand-kicker">Track 2 · Hackathon</p>
          <h1>Aether Lab</h1>
        </div>
      </div>
      <p className="brand-tag">AI Research Team</p>
    </header>
  )
}
