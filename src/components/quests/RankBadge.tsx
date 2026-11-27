import type { QuestRank } from '../../data/projects'

// Always a dark chip with light text: the page background tokens flip to light in
// System Mode (and even inside the dark panels `bg-void` stays light), which made
// the old badge unreadable.
const rankStyle: Record<QuestRank, string> = {
  S: 'text-white border-accent-soft shadow-[0_0_14px_-2px_var(--color-accent-soft)]',
  A: 'text-accent-soft border-accent-soft',
  B: 'text-[var(--rank-b)] border-white/40',
  C: 'text-[var(--rank-c)] border-white/30',
  D: 'text-[var(--rank-d)] border-white/20',
}

export function RankBadge({ rank, className = '' }: { rank: QuestRank; className?: string }) {
  return (
    <span
      title={`${rank}-rank quest`}
      className={`inline-flex h-7 min-w-7 items-center justify-center border bg-[var(--chip-bg)]/90 px-1.5 font-display text-sm font-bold ${rankStyle[rank]} ${className}`}
    >
      {rank}
    </span>
  )
}
