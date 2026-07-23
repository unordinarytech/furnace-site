import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import FeatureGrid from './FeatureGrid.jsx'

vi.mock('./GraphCardBackground.jsx', () => ({
  default: ({ accent, dim, children }) => (
    <div data-accent={accent} data-dim={dim}>
      {children}
    </div>
  ),
}))

describe('FeatureGrid', () => {
  it('uses a single-column mobile layout while preserving home typography', () => {
    const { container } = render(<FeatureGrid variant="home" />)

    expect(container.firstChild).toHaveClass('w-full', 'max-w-[520px]', 'md:w-[60vw]', 'md:h-[60vh]')
    expect(screen.getByText('/Fork Any Conversation')).toHaveClass('font-mono', 'text-[13px]')
    expect(screen.getByText(/Furnace keeps graph-based conversations/)).toHaveClass('font-serif', 'text-[15px]')
  })

  it('uses a single-column mobile standalone layout and preserves hover behavior', () => {
    const { container } = render(<FeatureGrid variant="standalone" />)
    const grid = within(container)
    const firstCard = grid.getByText('/Fork Any Conversation').parentElement.parentElement
    const secondBackground = grid.getByText('Saves Tokens').parentElement.parentElement

    expect(container.firstChild).toHaveClass('w-full', 'max-w-[520px]', 'md:w-[min(860px,92vw)]', 'md:h-[60vh]', 'mx-auto')
    expect(grid.getByText('/Fork Any Conversation')).toHaveClass('text-[12px]')
    expect(grid.getByText('/Fork Any Conversation')).not.toHaveClass('font-mono')
    expect(grid.getByText(/Furnace keeps graph-based conversations/)).not.toHaveClass('font-serif', 'text-[15px]')

    fireEvent.mouseEnter(firstCard)

    expect(firstCard).toHaveAttribute('data-accent', 'true')
    expect(secondBackground).toHaveAttribute('data-dim', 'true')
  })
})
