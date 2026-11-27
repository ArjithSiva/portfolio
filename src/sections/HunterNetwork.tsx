import { SectionHeading } from '../components/ui/SectionHeading'
import { FadeUp } from '../components/ui/FadeUp'
import ChromaGrid, { type ChromaItem } from '../components/rb/ChromaGrid'
import { hunterNetwork } from '../data/hunterNetwork'
import { useTheme } from '../hooks/useTheme'

const BASE = import.meta.env.BASE_URL

// Accent colour per channel (also baked into the generated tile art in
// public/network/*.svg).
// Tile highlight follows the site palette (violet family in Shadow Mode, blue family in
// System Mode) instead of each brand's own colour, so the grid reads as one set.
const SHADOW_ACCENTS = ['#a855f7', '#8b5cf6', '#c084fc', '#7c3aed', '#a855f7', '#8b5cf6', '#c084fc', '#7c3aed', '#a855f7']
const SYSTEM_ACCENTS = ['#4c7de3', '#578eed', '#72c1f9', '#1e2f67', '#4c7de3', '#578eed', '#72c1f9', '#1e2f67', '#4c7de3']

export function HunterNetwork() {
  const { mode } = useTheme()

  const ramp = mode === 'shadow' ? SHADOW_ACCENTS : SYSTEM_ACCENTS
  const items: ChromaItem[] = hunterNetwork.map((c, i) => ({
    image: `${BASE}network/${c.platform.toLowerCase()}.svg`,
    title: c.hunterName,
    subtitle: c.platform,
    accent: ramp[i % ramp.length],
    url: c.href,
    alt: `${c.platform} — ${c.hunterName}`,
  }))

  return (
    <section id="hunter-network" className="relative px-6 py-28 md:py-36">
      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeading index="09" eyebrow="Hunter Frequencies" title="Hunter Network" />
        <FadeUp className="mt-6">
          <p className="text-ink-muted max-w-xl">Every channel this account transmits on. Hover or touch a tile to light it up.</p>
        </FadeUp>

        <FadeUp className="mt-14 tokens-panel">
          <ChromaGrid
            items={items}
            columns={3}
            minCardWidth={200}
            aspectRatio="4 / 3"
            theme="dark"
            frame={false}
          />
        </FadeUp>
      </div>
    </section>
  )
}
