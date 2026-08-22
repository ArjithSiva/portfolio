import { motion } from 'framer-motion'
import { Star, GitFork, ArrowUpRight } from 'lucide-react'
import { formatRelativeTime } from '../../lib/format'
import type { GithubRepo } from '../../types/github'

interface RepoListProps {
  title: string
  repos: GithubRepo[]
  emptyMessage: string
}

// A plain, boxless row list — used for "Latest 6" where the full
// system-panel quest-card treatment (see RepoCard) was too heavy for a
// simple recent-activity feed. Favourites still uses RepoCard/RepoGrid.
export function RepoList({ title, repos, emptyMessage }: RepoListProps) {
  return (
    <div>
      <h3 className="font-mono text-xs tracking-[0.22em] uppercase text-accent-3 pb-3 border-b border-line-strong">
        {title}
      </h3>

      {repos.length === 0 ? (
        <p className="mt-5 text-ink-faint text-sm">{emptyMessage}</p>
      ) : (
        <ul className="mt-1">
          {repos.map((repo, i) => (
            <RepoListItem key={repo.id} repo={repo} number={i + 1} delay={i * 0.05} />
          ))}
        </ul>
      )}
    </div>
  )
}

function RepoListItem({ repo, number, delay = 0 }: { repo: GithubRepo; number: number; delay?: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay }}
      className="border-b border-line last:border-b-0"
    >
      <a
        href={repo.url}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-4 py-4 -mx-2 px-2 transition-colors hover:bg-surface-raised/40"
      >
        <span className="font-mono text-[0.65rem] text-ink-faint w-6 shrink-0">
          {String(number).padStart(2, '0')}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="font-display font-bold text-ink group-hover:text-accent-3 transition-colors">
              {repo.name}
            </span>
            {repo.language && (
              <span className="font-mono text-[0.62rem] tracking-wide text-ink-faint">{repo.language}</span>
            )}
          </div>
          <p className="text-ink-muted text-sm mt-1 line-clamp-1">
            {repo.description || 'No description provided.'}
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-3 font-mono text-[0.62rem] text-ink-faint shrink-0">
          {repo.stars > 0 && (
            <span className="flex items-center gap-1">
              <Star size={12} /> {repo.stars}
            </span>
          )}
          {repo.forks > 0 && (
            <span className="flex items-center gap-1">
              <GitFork size={12} /> {repo.forks}
            </span>
          )}
          <span className="whitespace-nowrap">{formatRelativeTime(repo.pushedAt)}</span>
        </div>

        <ArrowUpRight
          size={16}
          className="text-ink-faint group-hover:text-accent-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
        />
      </a>
    </motion.li>
  )
}
