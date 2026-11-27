import { motion } from 'framer-motion'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { ContributionGraph } from '../components/progress/ContributionGraph'
import { StarredList } from '../components/progress/StarredList'
import CountUp from '../components/rb/CountUp'
import { useTheme } from '../hooks/useTheme'
import { useGithubData } from '../hooks/useGithubData'
import { GITHUB_USERNAME } from '../data/github'

export function Progress() {
  const { mode } = useTheme()
  const github = useGithubData()

  const memberSince = github.profile ? new Date(github.profile.createdAt).getFullYear() : null
  const chartColor = mode === 'shadow' ? 'a855f7' : '4c7de3'

  return (
    <section id="progress" className="relative px-6 py-28 md:py-36">
      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeading index="06" eyebrow="Hunter Progress" title="Progress Log" />

        {/* No System Window here on purpose — the streak and stats sit
            directly on the page, same treatment as Shadow Army below. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-14"
        >
          <div className="flex items-center justify-between mb-6">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent-3 font-semibold">GitHub</p>
            {github.status === 'ready' && <span className="font-mono text-xs text-accent-3">@{GITHUB_USERNAME}</span>}
          </div>

          {github.status === 'error' ? (
            <p className="text-ink-muted text-sm py-8 text-center">
              GitHub activity couldn't be loaded right now — the profile is still the source of truth.
            </p>
          ) : (
            <>
              {github.contributions ? (
                <div className="rounded-xl border border-line-strong bg-surface-raised/60 p-5 sm:p-6">
                  <ContributionGraph data={github.contributions} />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <img
                    src={`https://ghchart.rshah.org/${chartColor}/${GITHUB_USERNAME}`}
                    alt={`${GITHUB_USERNAME}'s GitHub contribution graph`}
                    className="w-full min-w-[640px]"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="mt-10 grid grid-cols-3 gap-6 pb-10 border-b border-line">
                <StatBlock
                  label="Repositories"
                  value={github.status === 'ready' ? github.profile?.publicRepos : null}
                  loading={github.status === 'loading'}
                />
                <StatBlock
                  label="Followers"
                  value={github.status === 'ready' ? github.profile?.followers : null}
                  loading={github.status === 'loading'}
                />
                <StatBlock
                  label="Member Since"
                  value={github.status === 'ready' ? memberSince : null}
                  loading={github.status === 'loading'}
                />
              </div>

              <div className="mt-12">
                <h3 className="font-mono text-xs tracking-[0.22em] uppercase text-accent-3 pb-3 border-b border-line-strong">
                  Starred
                </h3>
                <StarredList
                  repos={github.starred}
                  emptyMessage={github.status === 'loading' ? 'Loading starred repositories…' : 'No starred repositories yet.'}
                />
              </div>

              {github.lastSynced && (
                <p className="mt-8 font-mono text-[0.6rem] text-ink-faint">
                  {github.fromCache ? 'Cached' : 'Synced'} · {new Date(github.lastSynced).toLocaleString()}
                </p>
              )}
            </>
          )}

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" variant="secondary">
              View GitHub
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function StatBlock({ label, value, loading }: { label: string; value: number | null | undefined; loading: boolean }) {
  return (
    <div className="text-center border-l border-line first:border-l-0">
      <p className="font-display text-2xl sm:text-3xl font-bold text-ink">
        {loading || value == null ? '—' : <CountUp to={value} duration={1.4} separator="" />}
      </p>
      <p className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-accent-3 mt-1">{label}</p>
    </div>
  )
}
