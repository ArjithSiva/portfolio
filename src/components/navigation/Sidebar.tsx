import { sections, guildSection } from '../../data/sections'
import { socials } from '../../data/socials'
import { useActiveSection } from '../../hooks/useActiveSection'
import { ThemeToggle } from '../ui/ThemeToggle'
import LineSidebar from '../LineSidebar'

const allSections = [...sections, guildSection]
const allIds = allSections.map((s) => s.id)

export function Sidebar() {
  const active = useActiveSection(allIds)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      aria-label="Section navigation"
      className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col justify-between px-8 py-10 z-40"
    >
      <div>
        <button
          onClick={() => scrollTo('awakening')}
          className="font-display text-lg font-bold tracking-widest text-ink hover:text-accent-3 transition-colors"
        >
          ARJITH A
        </button>

        <div className="mt-16">
          <LineSidebar
            items={allSections.map((s) => s.label)}
            defaultActive={Math.max(0, allSections.findIndex((s) => s.id === active))}
            onItemClick={(index: number) => scrollTo(allSections[index].id)}
            accentColor="var(--color-accent-3)"
            textColor="var(--color-ink-faint)"
            markerColor="var(--color-line-strong)"
            itemGap={24}
            fontSize={0.7}
            className="font-mono tracking-[0.18em] uppercase"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-4 mb-8">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={social.label}
              title={social.label}
              className="text-ink-faint hover:text-accent-3 transition-colors"
            >
              <social.icon size={16} />
            </a>
          ))}
        </div>
        <ThemeToggle compact />
      </div>
    </nav>
  )
}
