import { useState } from 'react'

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderInline(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
}

function CopyButton({ code }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      type="button"
      className="copy-button"
      onClick={handleCopy}
      aria-label="Copy code"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

function renderTable(lines) {
  const rows = lines
    .filter((l) => l.startsWith('|') && l.endsWith('|'))
    .map((l) =>
      l
        .slice(1, -1)
        .split('|')
        .map((cell) => cell.trim()),
    )

  if (rows.length < 2) return null

  const [header, separator, ...body] = rows
  if (!separator.every((cell) => /^[-:]+$/.test(cell))) return null

  return (
    <table>
      <thead>
        <tr>{header.map((cell, i) => <th key={i} dangerouslySetInnerHTML={{ __html: renderInline(cell) }} />)}</tr>
      </thead>
      <tbody>
        {body.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} dangerouslySetInnerHTML={{ __html: renderInline(cell) }} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function renderBlockReact(lines) {
  if (lines.length === 0) return null

  const first = lines[0]

  if (first.startsWith('|') && lines.every((l) => l.startsWith('|'))) {
    const table = renderTable(lines)
    if (table) return table
  }

  if (first.startsWith('# ')) {
    return <h1 dangerouslySetInnerHTML={{ __html: renderInline(first.slice(2)) }} />
  }
  if (first.startsWith('## ')) {
    return <h2 dangerouslySetInnerHTML={{ __html: renderInline(first.slice(3)) }} />
  }
  if (first.startsWith('### ')) {
    return <h3 dangerouslySetInnerHTML={{ __html: renderInline(first.slice(4)) }} />
  }

  if (first.startsWith('- ') || first.startsWith('* ')) {
    return (
      <ul>
        {lines
          .filter((l) => l.startsWith('- ') || l.startsWith('* '))
          .map((l, i) => <li key={i} dangerouslySetInnerHTML={{ __html: renderInline(l.slice(2)) }} />)}
      </ul>
    )
  }

  if (/^\d+\.\s/.test(first)) {
    return (
      <ol>
        {lines
          .filter((l) => /^\d+\.\s/.test(l))
          .map((l, i) => <li key={i} dangerouslySetInnerHTML={{ __html: renderInline(l.replace(/^\d+\.\s/, '')) }} />)}
      </ol>
    )
  }

  if (first.startsWith('> ')) {
    return <blockquote dangerouslySetInnerHTML={{ __html: lines.map((l) => renderInline(l.replace(/^>\s?/, ''))).join('<br>') }} />
  }

  return <p dangerouslySetInnerHTML={{ __html: renderInline(lines.join(' ')) }} />
}

export function renderMarkdownReact(source) {
  const blocks = []
  let current = []
  let inCode = false
  let codeLines = []
  let codeLang = ''

  for (const rawLine of source.split('\n')) {
    const line = rawLine

    if (inCode) {
      if (line.startsWith('```')) {
        const code = codeLines.join('\n')
        blocks.push(
          <div key={blocks.length} className="code-block-wrapper">
            <CopyButton code={code} />
            <pre><code className={codeLang ? `language-${codeLang}` : ''}>{code}</code></pre>
          </div>,
        )
        inCode = false
        codeLines = []
        codeLang = ''
      } else {
        codeLines.push(line)
      }
      continue
    }

    if (line.startsWith('```')) {
      if (current.length > 0) {
        blocks.push(<div key={blocks.length}>{renderBlockReact(current)}</div>)
        current = []
      }
      inCode = true
      codeLang = line.slice(3).trim()
      continue
    }

    if (line.trim() === '') {
      if (current.length > 0) {
        blocks.push(<div key={blocks.length}>{renderBlockReact(current)}</div>)
        current = []
      }
      continue
    }

    current.push(line)
  }

  if (current.length > 0) {
    blocks.push(<div key={blocks.length}>{renderBlockReact(current)}</div>)
  }

  return blocks
}

export default function Markdown({ source }) {
  const elements = renderMarkdownReact(source)
  return <div className="markdown-body">{elements}</div>
}
