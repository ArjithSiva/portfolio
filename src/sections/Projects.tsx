import { SectionHeading } from '../components/ui/SectionHeading'
import { FadeUp } from '../components/ui/FadeUp'
import { QuestMasonry } from '../components/quests/QuestMasonry'
import { projects } from '../data/projects'

export function Projects() {
  return (
    <section id="quests" className="relative px-6 py-28 md:py-36">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="05" eyebrow="Gate Raid" title="Quests" />
        <FadeUp className="mt-4">
          <p className="text-ink-muted max-w-2xl text-sm md:text-base leading-relaxed">
            {projects.length} projects, from production systems running in live clinics and hospitals to hackathon builds and
            hardware. Featured quests lead the grid; use the Quest Log to filter. Hover a card for the summary, click it for the full breakdown.
          </p>
        </FadeUp>

        <FadeUp className="mt-10">
          <QuestMasonry />
        </FadeUp>
      </div>
    </section>
  )
}
