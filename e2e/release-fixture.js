export const RELEASE_MANIFEST_URL =
  'https://raw.githubusercontent.com/amoreX/furnace/main/src/releases.json'

export const releaseManifestFixture = {
  schemaVersion: 1,
  releases: [
    {
      version: '0.2.5',
      date: '2026-07-18',
      status: 'published',
      commit: '5139ad49821c0b5ad9398724039df75cdbb3640d',
      summary: 'Release notes are now visible wherever you use Furnace.',
      changes: [
        { kind: 'added', text: 'Added a first-launch What’s New panel for each installed version.' },
        { kind: 'added', text: 'Added a Git-derived changelog to the Furnace website.' },
      ],
    },
    {
      version: '0.2.3',
      date: '2026-07-17',
      status: 'published',
      commit: '802bf36d0ccd0e4ec9c8487573894f8864c9be64',
      summary: 'Furnace can now update itself.',
      changes: [
        { kind: 'added', text: 'Added `furnace update` and `furnace --update`.' },
      ],
    },
    {
      version: '0.1.23',
      date: '2026-07-16',
      status: 'tagged',
      commit: '587a3d05b014c56738f84b2176efc54e38896a2f',
      summary: 'Usage visibility and multitasking arrived together.',
      changes: [
        { kind: 'added', text: 'Added usage history and pinned chats.' },
      ],
    },
  ],
}

export function mockReleaseManifest(context) {
  return context.route(RELEASE_MANIFEST_URL, (route) =>
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(releaseManifestFixture),
    }))
}
