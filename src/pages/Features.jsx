const features = [
  { name: 'Terminal UI', desc: 'Interactive Ink-based TUI with streaming output, autocomplete, and a keyboard-driven settings panel.' },
  { name: 'Sessions & Forks', desc: 'Local SQLite sessions stored as append-only entry trees. Resume, fork, or clone without losing context.' },
  { name: 'Typed Tools', desc: 'Read, search, edit, write, and run bounded shell commands through a typed tool registry.' },
  { name: 'Permission Gates', desc: 'Allow, ask, or deny each risky tool call. Session-scoped grants and plan-mode clamps keep you in control.' },
  { name: 'Context Compaction', desc: 'Model-assisted summaries and Headroom-lite compression keep long sessions within context limits.' },
  { name: 'Skills', desc: 'Progressive-disclosure instruction packages. Reuse Cursor, Claude Code, and custom skill roots.' },
  { name: 'Subagents', desc: 'Delegate independent work through a normal task tool, with foreground and background task groups.' },
  { name: 'Plan Mode', desc: 'Read-only planning workflow that writes durable plan artifacts before switching to implementation.' },
]

export default function Features() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-[30px] py-[120px]">
      <div className="paper-surface relative w-[min(1000px,92vw)] p-[78px] pb-[72px] font-mono text-[15px] leading-[1.5]">
        <p className="font-bold uppercase tracking-[0.12em] text-[12px] text-[rgba(28,27,26,0.5)] mb-7">
          What Furnace does
        </p>
        <ul className="feature-list list-none p-0 m-0">
          {features.map((f) => (
            <li key={f.name}>
              <span className="feature-name">{f.name}</span>
              <span className="feature-desc">{f.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
