import { sections, guildSection } from '../../data/sections'
import { socials } from '../../data/socials'
import { useTheme } from '../../hooks/useTheme'
import { ThemeToggle } from '../ui/ThemeToggle'
import StaggeredMenu from './StaggeredMenu'

// Mobile-only nav (desktop keeps the Sidebar/LineSidebar). Colors are
// passed in explicitly per theme rather than as CSS custom properties,
// since StaggeredMenu drives some of them through GSAP color tweens,
// which need a literal parseable color string rather than a var()
// reference.
const THEME_COLORS = {
  shadow: {
    layers: ['#1c0a35', '#7c3aed'],
    accent: '#a855f7',
    button: '#f3ecff',
    buttonOpen: '#a855f7',
  },
  system: {
    layers: ['#bfe3f7', '#0892d0'],
    accent: '#0892d0',
    button: '#0a1f3d',
    buttonOpen: '#0892d0',
  },
} as const

export function MobileNav() {
  const { mode } = useTheme()
  const theme = THEME_COLORS[mode]

  const items = [...sections, guildSection].map((section) => ({
    label: section.label,
    ariaLabel: `Go to ${section.label}`,
    link: `#${section.id}`,
  }))

  const socialItems = socials.map((social) => ({
    label: social.label,
    link: social.href,
  }))

  return (
    <div className="lg:hidden h-16">
      <StaggeredMenu
        isFixed
        position="right"
        items={items}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering
        colors={[...theme.layers]}
        accentColor={theme.accent}
        menuButtonColor={theme.button}
        openMenuButtonColor={theme.buttonOpen}
        changeMenuColorOnOpen
        footer={<ThemeToggle />}
      />
    </div>
  )
}
