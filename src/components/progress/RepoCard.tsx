import { motion } from 'framer-motion'
import { Star, GitFork } from 'lucide-react'
import { Button } from '../ui/Button'
import { TechTag } from '../ui/TechTag'
import { SystemPanel } from '../ui/SystemPanel'
import { formatRelativeTime } from '../../lib/format'
import type { GithubRepo } from '../../types/github'

interface RepoCardProps {
  repo: GithubRepo
  number: number
  delay?: number
}

export function RepoCard({ repo, number, delay = 0 }: RepoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <SystemPanel size="sm" className="p-6 flex flex-col" fullHeight>
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[0.65rem] tracking-[0.2em] text-ink-faint">
            {String(number).padStart(2, '0')}
          </span>
          {(repo.stars > 0 || repo.forks > 0) && (
            <div className="flex items-center gap-3 text-ink-faint">
              {repo.stars > 0 && (
                <span className="flex items-center gap-1 font-mono text-[0.65rem]">
                  <Star size={12} /> {repo.stars}
                </span>
              )}
              {repo.forks > 0 && (
                <span className="flex items-center gap-1 font-mono text-[0.65rem]">
                  <GitFork size={12} /> {repo.forks}
                </span>
              )}
            </div>
          )}
        </div>

        <h4 className="font-display text-lg font-bold text-ink mb-2 break-words">{repo.name}</h4>

        <p className="text-ink-muted text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {repo.description || 'No description provided.'}
        </p>

        <div className="flex items-center justify-between gap-3 mb-5">
          {repo.language ? <TechTag>{repo.language}</TechTag> : <span />}
          <span className="font-mono text-[0.62rem] text-ink-faint whitespace-nowrap">
            Updated {formatRelativeTime(repo.pushedAt)}
          </span>
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-4 border-t border-line">
          <Button href={repo.url} target="_blank" rel="noreferrer" variant="secondary" icon={false}>
            View Repository
          </Button>
          {repo.homepageUrl && (
            <Button href={repo.homepageUrl} target="_blank" rel="noreferrer" variant="ghost" icon={false}>
              Live Demo
            </Button>
          )}
        </div>
      </SystemPanel>
    </motion.div>
  )
}
