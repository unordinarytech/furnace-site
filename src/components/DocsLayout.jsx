import { Link, useParams } from 'react-router-dom'
import DocsNoise from './DocsNoise.jsx'

const SECTIONS = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'commands', label: 'Commands' },
  { id: 'tools', label: 'Tools' },
  { id: 'safety', label: 'Safety' },
  { id: 'configuration', label: 'Configuration' },
]

export default function DocsLayout({ children }) {
  const { section = 'getting-started' } = useParams()

  return (
    <div className="docs-root">
      <div className="docs-panels">
        <DocsNoise />
        <aside className="docs-sidebar">
          <div className="docs-sidebar-header">
            <Link to="/" className="docs-back-link">
              FURNACE
            </Link>
          </div>
          <nav className="docs-nav">
            {SECTIONS.map((s) => (
              <Link
                key={s.id}
                to={`/docs/${s.id}`}
                className={`docs-nav-link ${section === s.id ? 'active' : ''}`}
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </aside>
        <article className="docs-content">
          {children}
        </article>
      </div>
    </div>
  )
}
