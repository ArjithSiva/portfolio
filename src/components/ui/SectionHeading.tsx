import { motion } from 'framer-motion'
import TechText from '../rb/TechText'
import { useTheme } from '../../hooks/useTheme'

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: string
  align?: 'left' | 'center'
  tech?: boolean
}

// Eyebrow fades up. Section headings use clean, lightweight Lato (display font)
// by default to conserve memory and eliminate canvas rendering loops.
// TechText is reserved exclusively for the climactic "Join the Guild" section.
export function SectionHeading({ index, eyebrow, title, align = 'left', tech = false }: SectionHeadingProps) {
  const { mode } = useTheme()
  const center = align === 'center'
  const shadow = mode === 'shadow'

  return (
    <div className={center ? 'text-center' : 'text-left'}>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="eyebrow flex items-center gap-3"
        style={{ justifyContent: center ? 'center' : 'flex-start' }}
      >
        <span className="text-ink-faint">{index}</span>
        <span className="h-px w-8 bg-line-strong" />
        <span>{eyebrow}</span>
      </motion.p>

      {tech ? (
        <>
          <h2 className="sr-only">{title}</h2>
          <div
            aria-hidden
            className="mt-3 h-[68px] sm:h-[88px] md:h-[108px]"
            style={center ? undefined : { marginLeft: '-5%', width: '100%' }}
          >
            <TechText
              key={mode}
              text={title.toUpperCase()}
              fontFamily="'Cinzel', serif"
              fontWeight={500}
              fontSize={84}
              letterSpacing={0.02}
              align={center ? 'center' : 'left'}
              color={shadow ? '#f8f4ff' : '#1e2f67'}
              accentColor={shadow ? '#a855f7' : '#4c7de3'}
              reach={150}
              labels={false}
              draggable={false}
              clickKick={false}
            />
          </div>
        </>
      ) : (
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
          className={`mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide uppercase ${shadow ? 'text-ink' : 'title-electric'}`}
        >
          {title}
        </motion.h2>
      )}
    </div>
  )
}
