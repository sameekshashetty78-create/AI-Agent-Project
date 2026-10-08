export function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14.6 9.4 10.8 10.8 9.4 14.6l3.8-1.4 1.4-3.8Z" fill="currentColor" />
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="m16 16 4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M14.2 5.4 18.6 9.8 8 20.4H3.6V16Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="m12.8 6.8 4.4 4.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.5 19 6.2v5.3c0 4.4-2.9 7.6-7 9-4.1-1.4-7-4.6-7-9V6.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="m8.8 12.2 2.1 2.1 4.3-4.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.5 13.4 9 19 10.4 13.4 11.8 12 17.5 10.6 11.8 5 10.4 10.6 9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4v11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="m8 12 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5 19h14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

const ICONS = {
  compass: CompassIcon,
  search: SearchIcon,
  pen: PenIcon,
  shield: ShieldIcon,
}

export function AgentGlyph({ name }) {
  const Icon = ICONS[name] ?? SparkIcon
  return <Icon />
}
