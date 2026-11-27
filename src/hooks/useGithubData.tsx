import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { fetchGithubData } from '../lib/githubProvider'
import type { DataStatus, GithubContributions, GithubProfile, GithubRepo } from '../types/github'

interface GithubDataState {
  status: DataStatus
  profile: GithubProfile | null
  /** Every public repo under the account — feeds Shadow Army. */
  repos: GithubRepo[]
  /** Repos starred via the GitHub account — feeds Progress Log. */
  starred: GithubRepo[]
  /** Contribution calendar from the build-time snapshot, when available. */
  contributions: GithubContributions | null
  lastSynced: number | null
  fromCache: boolean
}

const initial: GithubDataState = {
  status: 'loading',
  profile: null,
  repos: [],
  starred: [],
  contributions: null,
  lastSynced: null,
  fromCache: false,
}

const GithubContext = createContext<GithubDataState>(initial)

// Mounted once in App so every section reads the same state from a single
// load (see lib/githubProvider.ts).
export function GithubProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GithubDataState>(initial)

  useEffect(() => {
    let cancelled = false
    fetchGithubData().then((result) => {
      if (cancelled) return
      if (result.error || !result.data) {
        setState((prev) => ({ ...prev, status: 'error' }))
        return
      }
      setState({
        status: 'ready',
        profile: result.data.profile,
        repos: result.data.repos,
        starred: result.data.starred,
        contributions: result.data.contributions ?? null,
        lastSynced: result.lastSynced,
        fromCache: result.fromCache,
      })
    })
    return () => {
      cancelled = true
    }
  }, [])

  return <GithubContext.Provider value={state}>{children}</GithubContext.Provider>
}

export function useGithubData(): GithubDataState {
  return useContext(GithubContext)
}
