import type { CSSProperties } from 'react'
import { FadeUp } from '../components/ui/FadeUp'
import { SectionHeading } from '../components/ui/SectionHeading'
import LogoLoop, { type LogoItem } from '../components/logos/LogoLoop'
import { gearLogos } from '../data/tools'

// Resting state: every logo shares one flat tint (icon-font logos inherit the text
// colour; image logos render as a currentColor mask). On hover/focus a logo lights
// up in its real brand colours and grows. `ink` logos are black in their own brand
// (GitHub, Vercel, Flask...), so they take the theme's ink colour to stay visible.
const BRAND: Record<string, string> = {
  React: '#61DAFB',
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  Java: '#ED8B00',
  HTML5: '#E34F26',
  CSS3: '#1572B6',
  'Node.js': '#5FA04E',
  Express: 'ink',
  Flask: 'ink',
  'Tailwind CSS': '#06B6D4',
  Bootstrap: '#7952B3',
  MySQL: '#4479A1',
  SQLAlchemy: '#D71F00',
  MongoDB: '#47A248',
  Firebase: '#FFCA28',
  Docker: '#2496ED',
  Git: '#F05032',
  GitHub: 'ink',
  Linux: '#FCC624',
  Bash: '#4EAA25',
  Arduino: '#00979D',
  'ESP32 / Espressif': '#E7352C',
  'Embedded C': '#659AD2',
  Vite: '#8B5CF6',
  Claude: '#D97757',
  Render: '#46E3B7',
  PostgreSQL: '#4169E1',
  Ollama: 'ink',
  Gemini: '#4285F4',
  Perplexity: '#20B8CD',
  Fedora: '#51A2DA',
  Vercel: 'ink',
  Cloudflare: '#F38020',
  Apache: '#D22128',
  Nginx: '#009639',
  "Let's Encrypt": '#2EC4B6',
  Ubuntu: '#E95420',
  'GitHub Actions': '#2088FF',
  PHP: '#777BB4',
  SQLite: '#44A8E0',
  Pandas: '#E70488',
  NumPy: '#4DABCF',
  'scikit-learn': '#F7931E',
  OpenCV: '#5C3EE8',
  Jupyter: '#F37626',
  MQTT: '#C026D3',
  'Socket.IO': 'ink',
  'Raspberry Pi': '#C51A4A',
  Postman: '#FF6C37',
  // single-colour image logos: masked, recoloured on hover
  ChatGPT: '#10A37F',
  'Bolt.new': '#49A2F8',
}
// Multi-colour image logos swap to the real artwork on hover.
const FULL_COLOUR = new Set(['VS Code', 'Google', 'Antigravity', 'Microsoft', 'React Bits'])

const brandOf = (title?: string) => {
  const c = title ? BRAND[title] : undefined
  return c === 'ink' ? 'var(--color-ink)' : c
}

const logos: LogoItem[] = gearLogos.map((item) => ({
  ...item,
  hoverColor: brandOf(item.title) ?? 'var(--color-accent-3)',
}))

// Hover/focus: scale up and lift slightly so the label underneath stays clear.
const grow =
  'inline-flex items-center origin-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ' +
  'group-hover/item:scale-[1.7] group-hover/item:-translate-y-1.5 group-hover/item:z-10 ' +
  'group-focus-within/item:scale-[1.7] group-focus-within/item:-translate-y-1.5 motion-reduce:transition-none'

const renderItem = (item: LogoItem, key: React.Key) => {
  if ('node' in item) return <span key={key} className={grow}>{item.node}</span>

  const name = item.title ?? item.alt ?? ''
  const full = FULL_COLOUR.has(name)
  const size = { width: 'var(--logoloop-logoHeight)', height: 'var(--logoloop-logoHeight)' } as CSSProperties
  const mask = {
    ...size,
    WebkitMaskImage: `url(${item.src})`,
    maskImage: `url(${item.src})`,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    '--rune-c': brandOf(name) ?? 'currentColor',
  } as CSSProperties

  return (
    <span key={key} role="img" aria-label={name} className={`relative inline-block ${grow}`} style={size}>
      <span
        className={`absolute inset-0 bg-current transition-[opacity,background-color] duration-300 ${
          full
            ? 'group-hover/item:opacity-0 group-focus-within/item:opacity-0'
            : 'group-hover/item:bg-[var(--rune-c)] group-focus-within/item:bg-[var(--rune-c)]'
        }`}
        style={mask}
      />
      {full && (
        <img
          src={item.src}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-300 group-hover/item:opacity-100 group-focus-within/item:opacity-100"
        />
      )}
    </span>
  )
}

export function Gear() {
  return (
    <section id="gear" className="relative py-28 md:py-36 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading index="04" eyebrow="Hunter Gear" title="Skill Runes" />
        <FadeUp className="mt-6">
          <p className="text-ink-muted max-w-xl">
            Frameworks, software, and tools — the gear loadout behind the languages in the Skill Tree. Drag it, or hover a rune to light it up.
          </p>
        </FadeUp>
      </div>
      <div className="mt-14 lg:pl-10 text-ink-muted" style={{ fontSize: 30 }}>
        <LogoLoop
          logos={logos}
          renderItem={renderItem}
          speed={70}
          logoHeight={30}
          gap={56}
          fadeOut
          fadeOutColor="var(--color-void)"
          scaleOnHover
          labels="hover"
          ariaLabel="Frameworks, software, and tools"
        />
      </div>
    </section>
  )
}
