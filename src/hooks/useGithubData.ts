import { useEffect, useState } from 'react'
import { featuredRepositories } from '../data/github'
import { fetchGithubData, pickFavouriteRepos, pickLatestRepos } from '../lib/githubProvider'
import type { DataStatus, GithubProfile, GithubRepo } from '../types/github'

interface GithubDataState {
  status: DataStatus
  profile: GithubProfile | null
  latest: GithubRepo[]
  favourites: GithubRepo[]
  lastSynced: number | null
  fromCache: boolean
}

export function useGithubData(): GithubDataState {
  const [state, setState] = useState<GithubDataState>({
    status: 'loading',
    profile: null,
    latest: [],
    favourites: [],
    lastSynced: null,
    fromCache: false,
  })

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
        latest: pickLatestRepos(result.data.repos, 6),
        favourites: pickFavouriteRepos(result.data.repos, featuredRepositories),
        lastSynced: result.lastSynced,
        fromCache: result.fromCache,
      })
    })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
