import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('production hosting', () => {
  it('serves the SPA entry point for direct subpage requests', () => {
    const config = JSON.parse(readFileSync(join(process.cwd(), 'vercel.json'), 'utf8'))

    expect(config.rewrites).toContainEqual({
      source: '/(.*)',
      destination: '/index.html',
    })
  })
})
