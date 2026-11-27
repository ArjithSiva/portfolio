import { SectionHeading } from '../components/ui/SectionHeading'
import { FadeUp } from '../components/ui/FadeUp'
import RepoDriftWall from '../components/army/RepoDriftWall'
import { useGithubData } from '../hooks/useGithubData'
import { useMemo } from 'react'
import { useInView } from '../hooks/useInView'

export function ShadowArmy() {
  const github = useGithubData()
  // Mounted only within ~one screen of the viewport (the 3D tile wall is a lot of
  // composited layers), and its animation loop runs only while actually on screen.
  const [nearRef, near] = useInView<HTMLDivElement>('600px 0px')
  const [viewRef, visible] = useInView<HTMLDivElement>('0px')
  // Forks and archived repos clutter the wall; show the repos that are actually mine and alive.
  const repos = useMemo(() => github.repos.filter((r) => !r.isFork && !r.isArchived), [github.repos])

  return (
    <section id="shadow-army" className="relative py-28 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading index="07" eyebrow="Shadow Army" title="Summoned Projects" />
        <FadeUp className="mt-6">
          <p className="text-ink-muted max-w-xl">
            Every original public repository under my account, drifting in formation — click any tile to open it on GitHub.
          </p>
        </FadeUp>
      </div>

      <div className="mt-14 px-6">
        {github.status === 'error' ? (
          <p className="text-ink-muted text-sm py-8 text-center">
            GitHub repositories couldn't be loaded right now.
          </p>
        ) : github.status === 'loading' ? (
          <p className="text-ink-muted text-sm py-8 text-center">Summoning…</p>
        ) : (
          <div ref={nearRef} style={{ height: 620 }} className="max-w-6xl mx-auto">
            <div ref={viewRef} className="h-full">
              {near && <RepoDriftWall repos={repos} playing={visible} />}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
