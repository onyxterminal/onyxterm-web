import { motion } from 'motion/react'
import Logo from './Logo.jsx'

const LEFT = [
  { label: 'workspace', y: 92, to: 178 },
  { label: 'tab', y: 220, to: 210 },
  { label: 'pane', y: 348, to: 242 },
]

const RIGHT = [
  { label: 'shell', y: 66, to: 172 },
  { label: 'claude', y: 158, to: 200 },
  { label: 'codex', y: 250, to: 230 },
  { label: 'editor', y: 342, to: 258 },
]

const PILL_W = 118
const PILL_H = 26

function Pill({ x, y, label, anchor }) {
  const left = anchor === 'end' ? x - PILL_W : x
  return (
    <g>
      <rect
        x={left}
        y={y - PILL_H / 2}
        width={PILL_W}
        height={PILL_H}
        rx={13}
        fill="#ffffff"
        stroke="#cfcfc9"
      />
      <text
        x={left + PILL_W / 2}
        y={y + 4}
        textAnchor="middle"
        fill="#0a0a0a"
        style={{
          font: '500 11px "JetBrains Mono", monospace',
          letterSpacing: '0.02em',
        }}
      >
        {label}
      </text>
    </g>
  )
}

export default function Diagram() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="dot-bg absolute inset-0 opacity-45" aria-hidden />
      <svg
        viewBox="0 0 1000 430"
        className="relative block w-full"
        role="img"
        aria-label="Onyx workspace model: a workspace holds tabs, a tab holds panes, and a pane runs a shell, claude, codex or the editor."
      >
        {/* left connectors */}
        {LEFT.map((n, i) => (
          <motion.path
            key={n.label}
            d={`M ${196} ${n.y} H 340 V ${n.to} H 436`}
            fill="none"
            stroke="#cfcfc9"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
        {LEFT.map((n) => (
          <circle key={`ld-${n.label}`} cx="46" cy={n.y} r="3" fill="#0a0a0a" />
        ))}

        {/* right connectors */}
        {RIGHT.map((n, i) => (
          <motion.path
            key={n.label}
            d={`M ${804} ${n.y} H 660 V ${n.to} H 564`}
            fill="none"
            stroke="#cfcfc9"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.24 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
        {RIGHT.map((n) => (
          <circle key={`rd-${n.label}`} cx="954" cy={n.y} r="3" fill="#0a0a0a" />
        ))}

        {/* labels */}
        {LEFT.map((n) => (
          <Pill key={`lp-${n.label}`} x={196} y={n.y} label={n.label} anchor="end" />
        ))}
        {RIGHT.map((n) => (
          <Pill key={`rp-${n.label}`} x={804} y={n.y} label={n.label} anchor="start" />
        ))}

        {/* centre */}
        <motion.rect
          x="436"
          y="166"
          width="128"
          height="128"
          rx="26"
          fill="#0a0a0a"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: '500px 230px' }}
        />
        <g transform="translate(474,204) scale(0.042)">
          <Logo size={1254} tone="inverse" />
        </g>
        <text
          x="500"
          y="322"
          textAnchor="middle"
          fill="#0a0a0a"
          className="pixel"
          style={{ font: '400 15px "Geist Pixel", monospace' }}
        >
          one workspace
        </text>
      </svg>
    </div>
  )
}