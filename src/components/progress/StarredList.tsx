import { Star } from 'lucide-react'
import FadeContent from '../rb/FadeContent'
import { formatRelativeTime } from '../../lib/format'
import type { GithubRepo } from '../../types/github'

// Compact starred-repo list. Replaces the big three-column card grid so
// Progress, Quests and Shadow Army don't all show the same repo-card shape.
export function StarredList({ repos, emptyMessage }: { repos: GithubRepo[]; emptyMessage: string }) {
  if (repos.length === 0) return <p className="mt-5 text-ink-faint text-sm">{emptyMessage}</p>

  return (
    <FadeContent effect="fade" stagger={0.04} duration={0.6} blur className="mt-5 grid gap-x-10 md:grid-cols-2">
      {repos.map((repo, i) => (
        <a
          key={repo.id}
          href={repo.url}
          target="_blank"
          rel="noreferrer"
          className="group flex items-baseline gap-4 border-b border-line py-3 transition-colors hover:border-line-strong hover:bg-accent-3/5"
        >
          <span className="font-mono text-[0.62rem] tracking-[0.2em] text-accent-3">{String(i + 1).padStart(2, '0')}</span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-display font-bold text-ink group-hover:text-accent-3">{repo.name}</span>
            <span className="block truncate text-[0.8rem] text-ink-muted">{repo.description || 'No description provided.'}</span>
          </span>
          <span className="hidden shrink-0 text-right font-mono text-[0.6rem] uppercase tracking-wider text-ink-muted sm:block">
            {repo.language ?? '—'}
            <span className="block normal-case tracking-normal">{formatRelativeTime(repo.pushedAt)}</span>
          </span>
          {repo.stars > 0 && (
            <span className="flex shrink-0 items-center gap-1 font-mono text-[0.65rem] text-ink-muted">
              <Star size={11} className="text-accent-3" /> {repo.stars}
            </span>
          )}
        </a>
      ))}
    </FadeContent>
  )
}
