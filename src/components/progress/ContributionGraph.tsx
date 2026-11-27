import { useMemo } from 'react'
import type { GithubContributions } from '../../types/github'

// Own heat-map built from the build-time snapshot (scripts/fetch-github.mjs),
// replacing the third-party ghchart image that was another thing that could
// fail. Colours come from the theme accent so it flips with Shadow/System mode.
const CELL = 11
const GAP = 3

export function ContributionGraph({ data }: { data: GithubContributions }) {
  const { weeks, max } = useMemo(() => {
    const flat = data.weeks.flat().map((d) => d.count)
    return { weeks: data.weeks, max: Math.max(1, ...flat) }
  }, [data])

  const level = (count: number) => {
    if (count <= 0) return 0
    const r = count / max
    return r > 0.75 ? 4 : r > 0.5 ? 3 : r > 0.25 ? 2 : 1
  }
  // Solid ramp tokens (--heat-0..4) defined per theme in index.css, so cells
  // stay vivid on both the near-black and the icy-blue page.
  const fills = ['var(--heat-0)', 'var(--heat-1)', 'var(--heat-2)', 'var(--heat-3)', 'var(--heat-4)']

  const width = weeks.length * (CELL + GAP)
  const height = 7 * (CELL + GAP)

  return (
    <div>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="min-w-[640px] w-full"
          role="img"
          aria-label={`${data.total} contributions in the last year`}
        >
          {weeks.map((week, x) =>
            week.map((day, y) => (
              <rect
                key={day.date}
                x={x * (CELL + GAP)}
                y={y * (CELL + GAP)}
                width={CELL}
                height={CELL}
                rx={2}
                fill={fills[level(day.count)]}
              >
                <title>{`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}</title>
              </rect>
            )),
          )}
        </svg>
      </div>
      <p className="mt-3 font-mono text-[0.62rem] tracking-[0.18em] uppercase text-accent-3">
        {data.total} contributions in the last year
      </p>
    </div>
  )
}
