import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { isReleaseManifest, RELEASE_MANIFEST_URL, useReleases } from '../useReleases.js'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useReleases', () => {
  it('loads a valid canonical manifest directly from Furnace GitHub', async () => {
    const remoteManifest = {
      schemaVersion: 1,
      releases: [{
        version: '9.9.9',
        date: '2026-07-18',
        status: 'published',
        commit: 'abc',
        summary: 'Remote release',
        changes: [{ kind: 'added', text: 'Loaded from GitHub.' }],
      }],
    }
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => remoteManifest,
    })
    vi.stubGlobal('fetch', fetchMock)

    const { result } = renderHook(() => useReleases())
    expect(result.current).toEqual({ error: null, releases: [], status: 'loading' })
    await waitFor(() => expect(result.current).toEqual({
      error: null,
      releases: remoteManifest.releases,
      status: 'ready',
    }))
    expect(fetchMock).toHaveBeenCalledWith(RELEASE_MANIFEST_URL, expect.objectContaining({
      cache: 'no-store',
      signal: expect.any(AbortSignal),
    }))
  })

  it('surfaces invalid or unavailable manifests as an error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ schemaVersion: 1, releases: [] }),
    }))

    const { result } = renderHook(() => useReleases())
    await waitFor(() => expect(result.current).toEqual({
      error: 'GitHub returned an invalid release manifest.',
      releases: [],
      status: 'error',
    }))
    expect(isReleaseManifest({ schemaVersion: 1, releases: [] })).toBe(false)
  })
})
