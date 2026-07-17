import { useEffect, useState } from 'react'

export const RELEASE_MANIFEST_URL =
  'https://raw.githubusercontent.com/amoreX/furnace/main/src/releases.json'

export function isReleaseManifest(value) {
  if (value?.schemaVersion !== 1 || !Array.isArray(value.releases) || value.releases.length === 0) {
    return false
  }
  const versions = new Set()
  return value.releases.every((release) => {
    if (
      !/^\d+\.\d+\.\d+$/.test(release?.version ?? '')
      || !/^\d{4}-\d{2}-\d{2}$/.test(release?.date ?? '')
      || typeof release?.summary !== 'string'
      || !Array.isArray(release?.changes)
      || release.changes.length === 0
      || versions.has(release.version)
    ) {
      return false
    }
    versions.add(release.version)
    return true
  })
}

export function useReleases() {
  const [state, setState] = useState({
    error: null,
    releases: [],
    status: 'loading',
  })

  useEffect(() => {
    const controller = new AbortController()

    async function loadReleases() {
      try {
        const response = await fetch(RELEASE_MANIFEST_URL, {
          cache: 'no-store',
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status}.`)
        const manifest = await response.json()
        if (!isReleaseManifest(manifest)) throw new Error('GitHub returned an invalid release manifest.')
        if (!controller.signal.aborted) {
          setState({ error: null, releases: manifest.releases, status: 'ready' })
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setState({
            error: error instanceof Error ? error.message : 'Unable to load releases from GitHub.',
            releases: [],
            status: 'error',
          })
        }
      }
    }

    loadReleases()
    return () => controller.abort()
  }, [])

  return state
}
