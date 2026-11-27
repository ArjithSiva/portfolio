import { useState } from 'react'
import { FadeUp } from '../components/ui/FadeUp'
import { SectionHeading } from '../components/ui/SectionHeading'
import MagicBento, { type MagicBentoItem } from '../components/bento/MagicBento'
// Skill chip + detail-panel styles still live here (the card styling itself
// now comes from the new React Bits Magic Bento).
import '../components/bento/MagicBento.css'
import { languageCards, type Skill } from '../data/languages'
import { useTheme } from '../hooks/useTheme'
import { accentRgb } from '../lib/color'

// Each card owns its selection: tapping a chip swaps the chip list for that
// skill's description inside the same box, with a back link.
function SkillCard({ id, label, title, skills }: { id: string; label: string; title: string; skills: Skill[] }) {
  const [selected, setSelected] = useState<Skill | null>(null)
  return (
    <div className="skill-card" data-skill={id}>
      <p className="skill-card__eyebrow">{label}</p>
      <h3 className="skill-card__title">{title}</h3>
      {selected ? (
        <div className="skill-detail" aria-live="polite">
          <button
            type="button"
            className="skill-detail__back"
            onClick={(e) => {
              e.stopPropagation()
              setSelected(null)
            }}
          >
            &larr; All skills
          </button>
          <p className="skill-detail__name">{selected.name}</p>
          <p className="skill-detail__desc">{selected.description}</p>
        </div>
      ) : (
        <ul className="skill-chip-list" role="list">
          {skills.map((skill) => (
            <li key={skill.name}>
              <button
                type="button"
                className="skill-chip"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelected(skill)
                }}
              >
                {skill.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function Skills() {
  const { mode } = useTheme()

  const items: MagicBentoItem[] = languageCards.map((card) => ({
    id: card.id,
    colSpan: card.wide ? 2 : 1,
    rowSpan: 2,
    content: <SkillCard id={card.id} label={card.label} title={card.title} skills={card.skills} />,
  }))

  return (
    <section id="skills" className="relative px-6 py-28 md:py-36">
      <div className="max-w-5xl mx-auto">
        <SectionHeading index="03" eyebrow="Skill Tree" title="Awakened Skills" />
        <FadeUp className="mt-6">
          <p className="text-ink-muted max-w-xl">
            The languages I read, write, and think in — from scripting the backend to firmware on a
            microcontroller. Tap a skill for details.
          </p>
        </FadeUp>
        <FadeUp className="mt-14 tokens-panel">
          <MagicBento
            items={items}
            columns={4}
            rowHeight={128}
            gap={14}
            theme="dark"
            glowColor={accentRgb(mode)}
            enableStars
            particleCount={24}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect
            intro
          />
        </FadeUp>

      </div>
    </section>
  )
}
